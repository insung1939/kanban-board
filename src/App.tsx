import styled from "styled-components";
import { color } from "./styles/theme";

export default function App() {
  return (
    <div className="App">
      <AppTitle>Kanban Board</AppTitle>
      <BoardStyle>board</BoardStyle>
    </div>
  );
}

//style
const AppTitle = styled.h1`
  color: ${color.black};
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const BoardStyle = styled.div`
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: ${color.white};
`;
