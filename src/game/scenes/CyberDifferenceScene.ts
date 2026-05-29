import Phaser from "phaser";
import type { Question } from "../../types/Question";

export class CyberDifferenceScene extends Phaser.Scene {
  private question: Question;
  private selectedMarkers: Phaser.GameObjects.Arc[] = [];
  private validatedHotspotIds = new Set<string>();
  private roundScore: number = 0;
  private numberGoodAnswers: number = 0;
  private imageScale = 1;
  private gameTimer: number = 0;

  constructor(question: Question) {
    super("CyberDifferenceScene");
    this.question = question;
  }

  preload() {
    this.load.image("question-image", this.question.image);
    this.gameTimer = this.time.now;
  }

  create() {
    const image = this.add.image(0, 0, "question-image").setOrigin(0, 0);

    this.imageScale = Math.min(
      Number(this.scale.width) / image.width,
      Number(this.scale.height) / image.height
    );

    image.setInteractive();

    image.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this.selectedMarkers.length >= this.question.hotspots.length) {
        return;
      }

      //marker des zones selectionnées par le joueur
      const marker = this.add
        .circle(pointer.x, pointer.y, 20, 0x00aaff, 0.25)
        .setStrokeStyle(3, 0x00aaff)
        .setInteractive();

      this.selectedMarkers.push(marker);

      //supprimer le marker au click pour permettre au joueur de corriger ses erreurs
      //suppression visuelle du marker
      marker.on("pointerdown", () => {
        marker.destroy();

        //suppression du marker de la liste des markers selectionnés
        this.selectedMarkers = this.selectedMarkers.filter(
          (selectedMarker) => selectedMarker !== marker
        );
      });
    });

    // zone debug pour afficher les zones de bonne réponse
    this.question.hotspots.forEach((hotspot) => {
      this.add
        .rectangle(
          hotspot.x * this.imageScale,
          hotspot.y * this.imageScale,
          hotspot.width * this.imageScale,
          hotspot.height * this.imageScale,
          0x00ff00,
          0.25
        )
        .setOrigin(0, 0);
    });

    image.setScale(this.imageScale);
  }

  public validateSelections = () => {
    const scale = this.imageScale;

    this.selectedMarkers.forEach((marker) => {
      const matchingHotspot = this.question.hotspots.find((hotspot) => {
        const hotspotAlreadyValidated = this.validatedHotspotIds.has(hotspot.id);

        if (hotspotAlreadyValidated) {
          return false;
        }

        return (
          marker.x >= hotspot.x * scale &&
          marker.x <= (hotspot.x + hotspot.width) * scale &&
          marker.y >= hotspot.y * scale &&
          marker.y <= (hotspot.y + hotspot.height) * scale
        );
      });

      if (matchingHotspot) {
        this.numberGoodAnswers += 1;
        this.validatedHotspotIds.add(matchingHotspot.id);

        marker.setFillStyle(0x00ff00, 0.35);
        marker.setStrokeStyle(3, 0x00ff00);

        console.log("Bonne zone :", matchingHotspot.label);
        console.log("roundScore :", this.roundScore);
      } else {
        marker.setFillStyle(0xff0000, 0.35);
        marker.setStrokeStyle(3, 0xff0000);

        console.log("Mauvaise selection");
      }
    });
    
    // calcul du score total
    const timeTaken = (this.time.now - this.gameTimer) / 1000;

    this.roundScore = this.numberGoodAnswers * 20
                      + Math.max(0, 20
                        * this.numberGoodAnswers
                        - timeTaken * 2
                      )
                      - (this.question.hotspots.length - this.numberGoodAnswers) * 5;

    this.roundScore = Math.round(this.roundScore);
    
    return this.roundScore;
  };
}
