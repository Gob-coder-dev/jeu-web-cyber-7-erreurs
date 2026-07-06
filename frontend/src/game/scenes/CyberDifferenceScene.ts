import Phaser from "phaser";
import type {
  Hotspot,
  PublicQuestion,
  SelectionPoint,
} from "../../types/Question";

type SelectedMarker = {
  marker: Phaser.GameObjects.Arc;
  imageX: number;
  imageY: number;
};

type CorrectedHotspot = Hotspot & { found: boolean };

type CorrectionRect = {
  rect: Phaser.GameObjects.Rectangle;
  originalX: number;
  originalY: number;
  originalWidth: number;
  originalHeight: number;
  color: number;
  hotspot: CorrectedHotspot;
};

export class CyberDifferenceScene extends Phaser.Scene {
  private readonly question: PublicQuestion;
  private selectedMarkers: SelectedMarker[] = [];
  private correctionRects: CorrectionRect[] = [];
  private imageScale = 1;
  private questionImage?: Phaser.GameObjects.Image;
  private hotspotTooltip?: Phaser.GameObjects.Text;
  private currentTooltipHotspotId: string | null = null;
  private isReadOnly = false;
  private showDebugHotspots = false;
  private magnifierCamera?: Phaser.Cameras.Scene2D.Camera;
  private readonly loupeSize = 160;
  private readonly zoomFactor = 2.5;
  private isMagnifierEnabled = false;

  constructor(question: PublicQuestion) {
    super("CyberDifferenceScene");
    this.question = question;
  }

  preload() {
    this.load.image("question-image", this.question.image);
  }

  create() {
    const image = this.add.image(0, 0, "question-image").setOrigin(0, 0);
    this.questionImage = image;

    this.magnifierCamera = this.cameras.add(
      0,
      0,
      this.loupeSize,
      this.loupeSize,
    );
    this.magnifierCamera.setZoom(this.zoomFactor);
    this.magnifierCamera.setVisible(false);

    this.hotspotTooltip = this.add
      .text(0, 0, "", {
        fontSize: "14px",
        color: "#000000",
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: { x: 10, y: 8 },
        wordWrap: { width: 280 },
      })
      .setDepth(100)
      .setOrigin(0, 0)
      .setVisible(false);

    this.resizeScene(Number(this.scale.width), Number(this.scale.height));
    image.setInteractive();

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      this.updateMagnifier(pointer);
    });

    this.input.on("gameout", () => {
      this.hideHotspotTooltip();
      this.hideMagnifier();
    });

    image.on("pointerout", () => {
      this.hideHotspotTooltip();
      this.hideMagnifier();
    });

    image.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this.isReadOnly) {
        return;
      }

      if (this.selectedMarkers.length >= this.question.hotspotCount) {
        return;
      }

      const marker = this.add
        .circle(pointer.x, pointer.y, 20, 0x00aaff, 0.25)
        .setStrokeStyle(3, 0x00aaff)
        .setInteractive()
        .setDepth(4);

      this.selectedMarkers.push({
        marker,
        imageX: pointer.x / this.imageScale,
        imageY: pointer.y / this.imageScale,
      });

      marker.on("pointerout", () => {
        this.hideHotspotTooltip();
      });

      marker.on(
        "pointerdown",
        (
          _pointer: Phaser.Input.Pointer,
          _localX: number,
          _localY: number,
          event: Phaser.Types.Input.EventData,
        ) => {
          if (this.isReadOnly) {
            return;
          }

          event.stopPropagation();
          marker.destroy();
          this.selectedMarkers = this.selectedMarkers.filter(
            (selectedMarker) => selectedMarker.marker !== marker,
          );
        },
      );
    });
  }

  public getSelections(): SelectionPoint[] {
    return this.selectedMarkers.map(({ imageX, imageY }) => ({
      x: imageX,
      y: imageY,
    }));
  }

  public showCorrection(hotspots: CorrectedHotspot[]) {
    this.isReadOnly = true;
    this.hideMagnifier();

    this.correctionRects.forEach(({ rect }) => {
      rect.destroy();
    });
    this.correctionRects = [];

    hotspots.forEach((hotspot) => {
      const color = hotspot.found ? 0x22c55e : 0xdcb233;
      const rect = this.add
        .rectangle(
          hotspot.x * this.imageScale,
          hotspot.y * this.imageScale,
          hotspot.width * this.imageScale,
          hotspot.height * this.imageScale,
          color,
          0.25,
        )
        .setOrigin(0, 0)
        .setStrokeStyle(3, color)
        .setInteractive()
        .setDepth(6)
        .setVisible(this.showDebugHotspots || this.isReadOnly);

      rect.on("pointerover", () => {
        this.showHotspotTooltip(hotspot);
      });

      rect.on("pointerout", () => {
        this.hideHotspotTooltip();
      });

      this.correctionRects.push({
        rect,
        originalX: hotspot.x,
        originalY: hotspot.y,
        originalWidth: hotspot.width,
        originalHeight: hotspot.height,
        color,
        hotspot,
      });
    });
  }

  private showHotspotTooltip(hotspot: CorrectedHotspot) {
    if (this.hotspotTooltip === undefined) {
      return;
    }

    if (
      this.currentTooltipHotspotId === hotspot.id &&
      this.hotspotTooltip.visible
    ) {
      return;
    }

    this.currentTooltipHotspotId = hotspot.id;
    this.hotspotTooltip.setText(hotspot.explanation);

    const tooltipWidth = this.hotspotTooltip.width;
    const tooltipHeight = this.hotspotTooltip.height;

    const hotspotX = hotspot.x * this.imageScale;
    const hotspotY = hotspot.y * this.imageScale;
    const hotspotWidth = hotspot.width * this.imageScale;

    let tooltipX = hotspotX + hotspotWidth + 12;
    let tooltipY = hotspotY;

    if (tooltipX + tooltipWidth > Number(this.scale.width)) {
      tooltipX = hotspotX - tooltipWidth - 12;
    }

    if (tooltipX < 0) {
      tooltipX = 12;
    }

    if (tooltipY + tooltipHeight > Number(this.scale.height)) {
      tooltipY = Number(this.scale.height) - tooltipHeight - 12;
    }

    if (tooltipY < 0) {
      tooltipY = 12;
    }

    this.hotspotTooltip.setPosition(tooltipX, tooltipY);
    this.hotspotTooltip.setVisible(true);
  }

  private hideHotspotTooltip() {
    this.currentTooltipHotspotId = null;
    this.hotspotTooltip?.setVisible(false);
  }

  private updateMagnifier(pointer: Phaser.Input.Pointer) {
    if (
      this.magnifierCamera === undefined ||
      !this.isMagnifierEnabled ||
      this.isReadOnly
    ) {
      this.hideMagnifier();
      return;
    }

    this.magnifierCamera.setVisible(true);
    this.magnifierCamera.setPosition(
      pointer.x - this.loupeSize / 2,
      pointer.y - this.loupeSize / 2,
    );
    this.magnifierCamera.centerOn(pointer.x, pointer.y);
  }

  private hideMagnifier() {
    this.magnifierCamera?.setVisible(false);
  }

  public resizeScene = (width: number, height: number) => {
    if (this.questionImage === undefined) {
      return;
    }

    this.imageScale = Math.min(
      width / this.questionImage.width,
      height / this.questionImage.height,
    );

    this.questionImage.setScale(this.imageScale);

    this.selectedMarkers.forEach(({ marker, imageX, imageY }) => {
      marker.setPosition(imageX * this.imageScale, imageY * this.imageScale);
    });

    this.correctionRects.forEach(
      ({ rect, originalX, originalY, originalWidth, originalHeight }) => {
        rect.setPosition(
          originalX * this.imageScale,
          originalY * this.imageScale,
        );
        rect.setSize(
          originalWidth * this.imageScale,
          originalHeight * this.imageScale,
        );
      },
    );

    this.hideHotspotTooltip();
    this.hideMagnifier();
  };

  public toggleDebugHotspots = () => {
    this.showDebugHotspots = !this.showDebugHotspots;
    this.correctionRects.forEach(({ rect }) => {
      rect.setVisible(this.showDebugHotspots || this.isReadOnly);
    });
  };

  public toggleMagnifier(isActive: boolean) {
    this.isMagnifierEnabled = isActive;

    if (!isActive) {
      this.hideMagnifier();
    }
  }
}
