import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Konva from "konva";
import { opacitys } from "./static";
import { PenMode } from "./type";
import {
  canvasHistoryIdxState,
  canvasHistoryState,
  eraserSizeState,
  penColorState,
  penModeState,
  penOpacityState,
  penSizeState,
} from "store/canvasStore";
import { useRecoilState } from "recoil";

export default function Canvas() {
  const [isPainting, setIsPainting] = useState<boolean>(false);
  // konva
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const lastLineRef = useRef<Konva.Line | null>(null);

  // undo, redo layer
  const [history, setHistory] =
    useRecoilState<Konva.Node[]>(canvasHistoryState);
  const [historyIdx, setHistoryIdx] = useRecoilState<number>(
    canvasHistoryIdxState
  );

  // pen value
  const [penMode, setPenMode] = useRecoilState<PenMode>(penModeState);
  const [penColor, setPenColor] = useRecoilState<string>(penColorState);
  const [penSize, setPenSize] = useRecoilState<number>(penSizeState);
  const [penOpacity, setPenOpacity] = useRecoilState<number>(penOpacityState);
  const [eraserSize, setEraserSize] = useRecoilState<number>(eraserSizeState);

  //  function
  const startPaint = () => {
    if (!stageRef.current || !layerRef.current) return;
    setIsPainting(true);
    const pos = stageRef.current.getPointerPosition();
    if (!pos) return;
    const newLine = new Konva.Line({
      stroke: penMode === "eraser" ? "#000" : penColor + opacitys[penOpacity],
      strokeWidth: penMode === "eraser" ? eraserSize : penSize,
      globalCompositeOperation:
        penMode === "eraser" ? "destination-out" : "source-over",
      lineCap: "round",
      lineJoin: "round",
      points: [pos.x, pos.y, pos.x, pos.y],
    });
    layerRef.current.add(newLine);
    lastLineRef.current = newLine;
    if (history.length > 0) {
      setHistory([]);
      setHistoryIdx(historyIdx + 1);
    }
  };

  const paint = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isPainting || !stageRef.current || !lastLineRef.current) return;

    e.preventDefault();
    e.stopPropagation();
    const pos = stageRef.current.getPointerPosition();
    if (!pos) return;
    const newPoints = lastLineRef.current.points().concat([pos.x, pos.y]);
    lastLineRef.current.points(newPoints);
    layerRef.current?.batchDraw();
  };

  const stopPaint = () => {
    setIsPainting(false);
  };

  useEffect(() => {
    const stage = new Konva.Stage({
      container: "mainCanvas",
      width: window.innerWidth - 200,
      height: window.innerHeight * 0.8,
    });
    const layer = new Konva.Layer();
    stage.add(layer);
    stageRef.current = stage;
    layerRef.current = layer;
  }, []);

  return (
    <Container>
      <MainCanvas
        id="mainCanvas"
        onMouseDown={() => startPaint()}
        onMouseMove={(e) => paint(e)}
        onMouseUp={() => stopPaint()}
      />
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  background-color: #c7c6c6;
  width: 100vw;
  height: 86vh;
`;

const MainCanvas = styled.div`
  position: absolute;
  top: 100;
  left: 100;
  background-color: white;
  margin: 20px;
  z-index: 99;
`;
