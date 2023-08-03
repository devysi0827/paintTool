import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <p>파일</p>
      <p>보기</p>
      <p>저장</p>
      <p>이전 행동</p>
      <p>다음 행동</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
`;
