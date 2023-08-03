import Canvas from "components/Canvas/Canvas";
import { Header } from "components/Header";
import { Toolbar } from "components/Toolbar";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Header />
      <Hr />
      <Toolbar />
      <Hr />
      <Canvas />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
  width: 99vw;
  height: 1px;
  margin: 0px;
`;
