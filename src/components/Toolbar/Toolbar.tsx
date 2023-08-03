import styled from "styled-components";

export default function Toolbar() {
  return (
    <Container>
      <p>클립보드</p>
      <p>이미지</p>
      <p>도구</p>
      <p>브러시</p>
      <p>도형</p>
      <p>크기</p>
      <p>색</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  gap: 10px;
`;
