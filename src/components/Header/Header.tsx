import styled from "styled-components";

export default function Header() {
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
  return (
    <Container>
      <p>파일</p>
      <p>보기</p>
      <p>저장</p>
      <p>이전 행동</p>
      <p>다음 행동</p>
      <p>초기화</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 2vh;
  gap: 10px;
`;
