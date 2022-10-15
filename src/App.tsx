//style
import styled from "styled-components";
import { color } from "./styles/theme";
//recoil
import { listState, IListState } from "./recoil/atoms/listState";
import { useRecoilState } from "recoil";
//components
import List from "./components/List";
import ListCreator from "./components/ListCreator";
import { useEffect } from "react";

// ---------------------------------------------------------------------

export default function App() {
  const [list] = useRecoilState<IListState[]>(listState);
  useEffect(() => {
    console.log("list", list);
  });

  return (
    <div className="App">
      <AppTitle>Kanban Board</AppTitle>
      <BoardStyle>
        {list.map((item) => (
          <List key={item.id} item={item} />
        ))}
        <ListCreator />
      </BoardStyle>
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
  height: 70vh;
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
`;
