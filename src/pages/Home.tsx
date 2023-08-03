import { Header } from "components/Header";
import { Toolbar } from "components/Toolbar";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Header />
      <Toolbar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
