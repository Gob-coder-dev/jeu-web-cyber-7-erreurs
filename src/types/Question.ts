export type Hotspot = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  explanation: string;
};

export type Question = {
  id: string;
  title: string;
  instruction: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: Hotspot[];
};
