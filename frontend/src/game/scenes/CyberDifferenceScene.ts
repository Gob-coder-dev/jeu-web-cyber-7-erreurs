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
  private debugHotspots: Phaser.GameObjects.Rectangle[] = [];
  private showDebugHotspots: boolean = false;
  private magnifierCamera!: Phaser.Cameras.Scene2D.Camera;
  private loupeSize = 160;
  private zoomFactor = 2.5;
  private isMagnifierEnabled: boolean = false;

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
    this.magnifierCamera = this.cameras.add(0, 0, this.loupeSize, this.loupeSize);
    this.magnifierCamera.setZoom(this.zoomFactor);
    this.magnifierCamera.setVisible(false);
    // Tooltip d'explication des hotspots
    this.hotspotTooltip = this.add
      .text(0, 0, "", {
        fontSize: "14px",
        color: "#000000",
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: { x: 10, y: 8 },
        wordWrap: { width: 260 },
      })
      .setDepth(10)
      .setOrigin(0, 0)
      .setVisible(false);

    this.resizeScene(Number(this.scale.width), Number(this.scale.height));
    image.setInteractive();

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      //this.showHotspotTooltip(pointer);
      if (!this.isMagnifierEnabled || this.isReadOnly) {
        this.magnifierCamera.setVisible(false);
        return;
      }
      this.magnifierCamera.setVisible(true);
      const camX = pointer.x - this.loupeSize / 2;
      const camY = pointer.y - this.loupeSize / 2;
      this.magnifierCamera.setPosition(camX, camY);
      this.magnifierCamera.centerOn(pointer.x, pointer.y);
    });

    /*
    this.input.on("gameout", () => {
      this.hotspotTooltip?.setVisible(false);
      this.magnifierCamera.setVisible(false);
    });
    */

    image.on("pointerout", () => {
      this.hideHotspotTooltip();
      this.magnifierCamera.setVisible(false);
    });

    image.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      //if (this.hasValidated) return;
      if (this.isReadOnly) return;
      //if (this.selectedMarkers.length >= this.question.hotspots.length) return;
      if (this.selectedMarkers.length >= this.question.hotspotCount) return;
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
        this.hotspotTooltip?.setVisible(false);
      });

      marker.on("pointerdown", (_pointer: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData) => {
        //if (this.hasValidated) return;
        if (this.isReadOnly) return;
        event.stopPropagation();
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
    //this.questionImage?.disableInteractive();

    // Génération des zones de debug si activées
    hotspots.forEach((hotspot) => {
      //const debugHotspot = this.add
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
        .setStrokeStyle(3, color);

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
    if (!this.isReadOnly) {
      this.currentTooltipHotspotId = null;
      this.hotspotTooltip?.setVisible(false);
      return;
    }

    /*
    const imageX = pointer.x / this.imageScale;
    const imageY = pointer.y / this.imageScale;

    const hotspot = this.question.hotspots.find((hotspot) =>
      imageX >= hotspot.x &&
      imageX <= hotspot.x + hotspot.width &&
      imageY >= hotspot.y &&
      imageY <= hotspot.y + hotspot.height
    );

    if (!hotspot) {
      this.currentTooltipHotspotId = null;
      this.hotspotTooltip?.setVisible(false);
      return;
    }
    */

    if (this.hotspotTooltip === undefined) return;
    if (this.currentTooltipHotspotId === hotspot.id && this.hotspotTooltip.visible) return;

    this.currentTooltipHotspotId = hotspot.id;
    this.hotspotTooltip.setText(hotspot.explanation);

    const tooltipWidth = this.hotspotTooltip.width;
    const tooltipHeight = this.hotspotTooltip.height;

    const hotspotX = hotspot.x * this.imageScale;
    const hotspotY = hotspot.y * this.imageScale;
    const hotspotW = hotspot.width * this.imageScale;

    let tooltipX = hotspotX + hotspotW + 12;
    let tooltipY = hotspotY;

    if (tooltipX + tooltipWidth > this.scale.width) {
      tooltipX = hotspotX - tooltipWidth - 12;
    }
    if (tooltipX < 0) tooltipX = 12;

    if (tooltipY + tooltipHeight > this.scale.height) {
      tooltipY = this.scale.height - tooltipHeight - 12;
    }
    if (tooltipY < 0) tooltipY = 12;

    this.hotspotTooltip.setPosition(tooltipX, tooltipY);
    this.hotspotTooltip.setVisible(true);
  };

  private hideHotspotTooltip() {
    this.currentTooltipHotspotId = null;
    this.hotspotTooltip?.setVisible(false);
  }

  public resizeScene = (width: number, height: number) => {
    if (this.questionImage === undefined) return;

    this.imageScale = Math.min(
      width / this.questionImage.width,
      height / this.questionImage.height,
    );

    this.questionImage.setScale(this.imageScale);

    this.selectedMarkers.forEach(({ marker, imageX, imageY }) => {
      marker.setPosition(imageX * this.imageScale, imageY * this.imageScale);
    });

    this.correctionRects.forEach(({ rect, originalX, originalY, originalWidth, originalHeight }) => {
      rect.setPosition(originalX * this.imageScale, originalY * this.imageScale);
      rect.setSize(originalWidth * this.imageScale, originalHeight * this.imageScale);
    });

    this.hideHotspotTooltip();
  };

  public toggleDebugHotspots = () => {
    this.showDebugHotspots = !this.showDebugHotspots;
    this.debugHotspots.forEach((hotspot) => {
      hotspot.setVisible(this.showDebugHotspots);
    });
  };

  public toggleMagnifier(isActive: boolean) {
    this.isMagnifierEnabled = isActive;
    if (!isActive) {
      if (this.magnifierCamera) this.magnifierCamera.setVisible(false);
    }
  }
}
