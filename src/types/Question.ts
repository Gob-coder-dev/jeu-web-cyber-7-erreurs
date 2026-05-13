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
  image: string;
  hotspots: Hotspot[];
};
