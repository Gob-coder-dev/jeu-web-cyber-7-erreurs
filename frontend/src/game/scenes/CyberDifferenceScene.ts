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

type CorrectionRect = {
  rect: Phaser.GameObjects.Rectangle;
  originalX: number;
  originalY: number;
  originalWidth: number;
  originalHeight: number;
  color: number;
  hotspot: Hotspot & { found: boolean };
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

    image.on("pointerout", () => {
      this.hideHotspotTooltip();
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
        .setInteractive();

      this.selectedMarkers.push({
        marker,
        imageX: pointer.x / this.imageScale,
        imageY: pointer.y / this.imageScale,
      });

      marker.on("pointerdown", () => {
        if (this.isReadOnly) {
          return;
        }

        marker.destroy();
        this.selectedMarkers = this.selectedMarkers.filter(
          (selectedMarker) => selectedMarker.marker !== marker,
        );
      });
    });
  }

  public getSelections(): SelectionPoint[] {
    return this.selectedMarkers.map(({ imageX, imageY }) => ({
      x: imageX,
      y: imageY,
    }));
  }

  public showCorrection(hotspots: (Hotspot & { found: boolean })[]) {
    this.isReadOnly = true;

    hotspots.forEach((hotspot) => {
      const color = hotspot.found ? 0x22c55e : 0xdcb233;
      const rect = this.add
        .rectangle(
          hotspot.x * this.imageScale,
          hotspot.y * this.imageScale,
          hotspot.width * this.imageScale,
          hotspot.height * this.imageScale,
          color,
          0.25
        )
        .setOrigin(0, 0)
        .setStrokeStyle(3, color)
        .setInteractive();

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

  private showHotspotTooltip(hotspot: Hotspot & { found: boolean }) {
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
      marker.setPosition(
        imageX * this.imageScale,
        imageY * this.imageScale,
      );
    });

    this.correctionRects.forEach(({ rect, originalX, originalY, originalWidth, originalHeight }) => {
      rect.setPosition(originalX * this.imageScale, originalY * this.imageScale);
      rect.setSize(originalWidth * this.imageScale, originalHeight * this.imageScale);
    });

    this.hideHotspotTooltip();
  };
}

