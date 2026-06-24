import Phaser from "phaser";
import type { Question } from "../../types/Question";

export class CyberDifferenceScene extends Phaser.Scene {
  private question: Question;
  private selectedMarkers: {
    marker: Phaser.GameObjects.Arc;
    imageX: number;
    imageY: number;
  }[] = [];
  private validatedHotspotIds = new Set<string>();
  private numberGoodAnswers: number = 0;
  private imageScale = 1;
  private gameTimer: number = 0;
  private hasValidated = false;
  private questionImage?: Phaser.GameObjects.Image;
  private hotspotTooltip?: Phaser.GameObjects.Text;
  private currentTooltipHotspotId: string | null = null;
  private debugHotspots: Phaser.GameObjects.Rectangle[] = [];
  private showDebugHotspots: boolean = false;
  private magnifierCamera!: Phaser.Cameras.Scene2D.Camera;
  private loupeSize = 160;
  private zoomFactor = 2.5;
  private isMagnifierEnabled: boolean = false;

  constructor(question: Question) {
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

    const updateHotspotTooltip = (pointer: Phaser.Input.Pointer) => {
      if (!this.hasValidated) {
        this.currentTooltipHotspotId = null;
        this.hotspotTooltip?.setVisible(false);
        return;
      }

      const imageX = pointer.x / this.imageScale;
      const imageY = pointer.y / this.imageScale;

      const hoveredHotspot = this.question.hotspots.find((hotspot) =>
        imageX >= hotspot.x &&
        imageX <= hotspot.x + hotspot.width &&
        imageY >= hotspot.y &&
        imageY <= hotspot.y + hotspot.height
      );

      if (!hoveredHotspot) {
        this.currentTooltipHotspotId = null;
        this.hotspotTooltip?.setVisible(false);
        return;
      }

      if (this.hotspotTooltip === undefined) return;
      if (this.currentTooltipHotspotId === hoveredHotspot.id && this.hotspotTooltip.visible) return;

      this.currentTooltipHotspotId = hoveredHotspot.id;
      this.hotspotTooltip.setText(hoveredHotspot.explanation);

      const tooltipWidth = this.hotspotTooltip.width;
      const tooltipHeight = this.hotspotTooltip.height;

      const hotspotX = hoveredHotspot.x * this.imageScale;
      const hotspotY = hoveredHotspot.y * this.imageScale;
      const hotspotW = hoveredHotspot.width * this.imageScale;

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

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      updateHotspotTooltip(pointer);
      if (!this.isMagnifierEnabled || this.hasValidated) {
        this.magnifierCamera.setVisible(false);
        return;
      }
      this.magnifierCamera.setVisible(true);
      const camX = pointer.x - this.loupeSize / 2;
      const camY = pointer.y - this.loupeSize / 2;
      this.magnifierCamera.setPosition(camX, camY);
      this.magnifierCamera.centerOn(pointer.x, pointer.y);
    });

    this.input.on("gameout", () => {
      this.hotspotTooltip?.setVisible(false);
      this.magnifierCamera.setVisible(false);
    });

    image.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this.hasValidated) return;
      if (this.selectedMarkers.length >= this.question.hotspots.length) return;
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

      marker.on("pointerdown", (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
        if (this.hasValidated) return;
        event.stopPropagation();
        marker.destroy();
        this.selectedMarkers = this.selectedMarkers.filter(
          (selectedMarker) => selectedMarker.marker !== marker
        );
      });
    });

    // Génération des zones de debug si activées
    this.question.hotspots.forEach((hotspot) => {
      const debugHotspot = this.add
        .rectangle(
          hotspot.x * this.imageScale,
          hotspot.y * this.imageScale,
          hotspot.width * this.imageScale,
          hotspot.height * this.imageScale,
          0x00ff00,
          0.25
        )
        .setOrigin(0, 0)
        .setVisible(this.showDebugHotspots);

      this.debugHotspots.push(debugHotspot);
    });

    this.gameTimer = this.time.now;
  }

  public resizeScene = (width: number, height: number) => {
    if (this.questionImage === undefined) return;

    this.imageScale = Math.min(
      width / this.questionImage.width,
      height / this.questionImage.height
    );

    this.questionImage.setScale(this.imageScale);

    this.selectedMarkers.forEach(({ marker, imageX, imageY }) => {
      marker.setPosition(imageX * this.imageScale, imageY * this.imageScale);
    });

    this.debugHotspots.forEach((debugHotspot, index) => {
      const hotspot = this.question.hotspots[index];
      debugHotspot.setPosition(
        hotspot.x * this.imageScale,
        hotspot.y * this.imageScale
      );
      debugHotspot.setSize(
        hotspot.width * this.imageScale,
        hotspot.height * this.imageScale
      );
    });
  };

  public validateSelections = () => {
    if (this.hasValidated) return 0;

    this.hasValidated = true;
    this.toggleMagnifier(false);

    this.selectedMarkers.forEach((marker) => {
      const matchingHotspot = this.question.hotspots.find((hotspot) => {
        const hotspotAlreadyValidated = this.validatedHotspotIds.has(hotspot.id);

        if (hotspotAlreadyValidated) return false;

        return (
          marker.imageX >= hotspot.x &&
          marker.imageX <= (hotspot.x + hotspot.width) &&
          marker.imageY >= hotspot.y &&
          marker.imageY <= (hotspot.y + hotspot.height)
        );
      });

      if (matchingHotspot) {
        this.numberGoodAnswers += 1;
        this.validatedHotspotIds.add(matchingHotspot.id);
        marker.marker.setFillStyle(0x00ff00, 0.35);
        marker.marker.setStrokeStyle(3, 0x00ff00);
      } else {
        marker.marker.setFillStyle(0xff0000, 0.35);
        marker.marker.setStrokeStyle(3, 0xff0000);
      }
    });

    const timeTaken = (this.time.now - this.gameTimer) / 1000;
    const roundScore = Math.round(
      this.numberGoodAnswers * 20 +
      Math.max(0, 20 * this.numberGoodAnswers - timeTaken * 2) -
      (this.question.hotspots.length - this.numberGoodAnswers) * 5
    );

    return roundScore;
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