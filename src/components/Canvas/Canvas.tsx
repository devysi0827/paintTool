import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Konva from "konva";
import { opacitys } from "./static";
import { PenMode } from "./type";

export default function Canvas() {
  const [isPainting, setIsPainting] = useState<boolean>(false);

  // konva
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const lastLineRef = useRef<Konva.Line | null>(null);

  // undo, redo layer
  const [history, setHistory] = useState<Konva.Node[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);

  // pen value
  const [penMode, setPenMode] = useState<PenMode>(false);
  const [lineColor, setLineColor] = useState<string>("#f80000");
  const [lineWidth, setLineWidth] = useState<number>(10);
  const [lineOpacity, setLineOpacity] = useState<number>(10);
  const [eraserWidth, setEraserWidth] = useState<number>(10);

  //  function
  const startPaint = () => {
    if (!stageRef.current || !layerRef.current) return;
    setIsPainting(true);
    const pos = stageRef.current.getPointerPosition();
    if (!pos) return;
    const newLine = new Konva.Line({
      stroke: penMode === "eraser" ? "#000" : lineColor + opacitys[lineOpacity],
      strokeWidth: penMode === "eraser" ? eraserWidth : lineWidth,
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

  // const clearCanvas = () => {
  //   if (!layerRef.current?.children) return;
  //   layerRef.current.removeChildren();
  //   layerRef.current.clear();
  // };

  // const undoCanvas = () => {
  //   const layer = layerRef.current;
  //   if (historyIdx <= 0 || !layer) return;

  //   if (historyIdx >= 1 && layer.children) {
  //     const lastChild = layer.children[layer.children.length - 1];
  //     setHistory([...history, lastChild]);
  //     lastChild.remove();
  //     setHistoryIdx((x) => x - 1);
  //   }
  // };

  // const redoCanvas = () => {
  //   if (history.length === 0) return;

  //   const addChild = history.pop();
  //   if (addChild instanceof Konva.Group || addChild instanceof Konva.Shape) {
  //     layerRef.current?.add(addChild);
  //   }
  //   setHistoryIdx((x) => x + 1);
  // };

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
