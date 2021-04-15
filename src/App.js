
import "./App.css";
import styled from "styled-components";
import { Authentication } from "./components/auth/index";
import imageLogin from './assets/images/loginImage.jpg';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:url(${imageLogin}) no-repeat center center fixed;
  background-size: cover;
`;

function App() {
  return (
    <AppContainer>
      <Authentication />
    </AppContainer>
  );
}

export default App;
