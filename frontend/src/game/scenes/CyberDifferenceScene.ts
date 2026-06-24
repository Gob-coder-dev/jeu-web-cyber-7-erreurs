import Phaser from "phaser";
import type {
  PublicQuestion,
  SelectionPoint,
} from "../../types/Question";

type SelectedMarker = {
  marker: Phaser.GameObjects.Arc;
  imageX: number;
  imageY: number;
};

export class CyberDifferenceScene extends Phaser.Scene {
  private readonly question: PublicQuestion;
  private selectedMarkers: SelectedMarker[] = [];
  private imageScale = 1;
  private questionImage?: Phaser.GameObjects.Image;

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

    this.resizeScene(Number(this.scale.width), Number(this.scale.height));
    image.setInteractive();

    image.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
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
  };
}
