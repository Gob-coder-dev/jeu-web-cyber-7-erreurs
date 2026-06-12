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

      if (this.hotspotTooltip === undefined) {
        return;
      }

      // Si on affiche déjà la bulle d'explication, la laisser comme ça.
      if (this.currentTooltipHotspotId === hoveredHotspot.id && this.hotspotTooltip.visible) {
        return;
      }

      // Donner l'id de l'hotspot actuel pour que les mouvements de la souris ne repositionne pas l'explication.
      this.currentTooltipHotspotId = hoveredHotspot.id;
      this.hotspotTooltip.setText(hoveredHotspot.explanation);

      // Positionne l'explication près de la zone du hotspot (à droite si possible).
      const tooltipWidth = this.hotspotTooltip.width;
      const tooltipHeight = this.hotspotTooltip.height;

      const hotspotX = hoveredHotspot.x * this.imageScale;
      const hotspotY = hoveredHotspot.y * this.imageScale;
      const hotspotW = hoveredHotspot.width * this.imageScale;
      const hotspotH = hoveredHotspot.height * this.imageScale;

      let tooltipX = hotspotX + hotspotW + 12;
      let tooltipY = hotspotY;

      // S'il n'y a pas la place à droite, place à gauche de l'hotspot.
      if (tooltipX + tooltipWidth > this.scale.width) {
        tooltipX = hotspotX - tooltipWidth - 12;
      }
      if (tooltipX < 0) {
        tooltipX = 12;
      }

      if (tooltipY + tooltipHeight > this.scale.height) {
        tooltipY = this.scale.height - tooltipHeight - 12;
      }
      if (tooltipY < 0) {
        tooltipY = 12;
      }

      this.hotspotTooltip.setPosition(tooltipX, tooltipY);
      this.hotspotTooltip.setVisible(true);
    };

    image.on("pointermove", updateHotspotTooltip);

    image.on("pointerout", () => {
      this.hotspotTooltip?.setVisible(false);
    });

    image.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this.hasValidated) {
        return;
      }

      if (this.selectedMarkers.length >= this.question.hotspots.length) {
        return;
      }

      //marker des zones selectionnées par le joueur
      const marker = this.add
        .circle(pointer.x, pointer.y, 20, 0x00aaff, 0.25)
        .setStrokeStyle(3, 0x00aaff)
        .setInteractive();

      this.selectedMarkers.push({
        marker,
        imageX: pointer.x / this.imageScale,
        imageY: pointer.y / this.imageScale,
      });

      const updateMarkerTooltip = (markerPointer: Phaser.Input.Pointer) => {
        updateHotspotTooltip(markerPointer);
      };

      marker.on("pointermove", updateMarkerTooltip);
      marker.on("pointerout", () => {
        this.hotspotTooltip?.setVisible(false);
      });

      //supprimer le marker au click pour permettre au joueur de corriger ses erreurs
      //suppression visuelle du marker
      marker.on("pointerdown", () => {
        if (this.hasValidated) {
          return;
        }

        marker.destroy();

        //suppression du marker de la liste des markers selectionnés
        this.selectedMarkers = this.selectedMarkers.filter(
          (selectedMarker) => selectedMarker.marker !== marker
        );
      });
    });

    // zone debug pour afficher les zones de bonne réponse
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
    if (this.questionImage === undefined) {
      return;
    }

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
    if (this.hasValidated) {
      return 0;
    }

    this.hasValidated = true;

    this.selectedMarkers.forEach((marker) => {
      const matchingHotspot = this.question.hotspots.find((hotspot) => {
        const hotspotAlreadyValidated = this.validatedHotspotIds.has(hotspot.id);

        if (hotspotAlreadyValidated) {
          return false;
        }

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
    
    // calcul du score total
    const timeTaken = (this.time.now - this.gameTimer) / 1000;

    const roundScore = Math.round(
                        this.numberGoodAnswers * 20
                        + Math.max(0, 20
                          * this.numberGoodAnswers
                          - timeTaken * 2
                        )
                        - (this.question.hotspots.length - this.numberGoodAnswers) * 5
                      );

    return roundScore;
  };

  public toggleDebugHotspots = () => {
    this.showDebugHotspots = !this.showDebugHotspots;
    this.debugHotspots.forEach((hotspot) => {
      hotspot.setVisible(this.showDebugHotspots);
    });
  };
}
