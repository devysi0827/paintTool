import { PenMode } from "components/Canvas/type";
import Konva from "konva";
import { atom, selector } from "recoil";

export const canvasHistoryState = atom<Konva.Node[]>({
  key: "canvasHistory",
  default: [],
});

export const canvasHistoryIdxState = atom<number>({
  key: "canvasHistoryIdx",
  default: 0,
});

export const penModeState = atom<PenMode>({
  key: "penMode",
  default: false,
});

export const penColorState = atom<string>({
  key: "penColor",
  default: "#f80000",
});

export const penSizeState = atom<number>({
  key: "penSize",
  default: 10,
});

export const penOpacityState = atom<number>({
  key: "penOpacity",
  default: 10,
});

export const eraserSizeState = atom<number>({
  key: "eraserSize",
  default: 10,
});
