//style
import styled from "styled-components";
import { color } from "./styles/theme";
//recoil
import { columnState, columnIds } from "./recoil/atoms/kanban";
import { useRecoilState, useRecoilCallback } from "recoil";
//components
import List from "./components/Column";
import ListCreator from "./components/ColumnCreator";
import { useEffect } from "react";

// ---------------------------------------------------------------------

export default function App() {
  //state
  const [idList, setIdList] = useRecoilState<number[]>(columnIds);

  //컬럼 생성
  const createColumn = useRecoilCallback(
    ({ set }) =>
      (title: string, id: number) => {
        set(columnIds, [...idList, id]);
        set(columnState(id), { id: id, title: title, content: [] });
      }
  );

  //컬럼 삭제
  const deleteColumn = (id: number) => {
    if (idList.length > 2) {
      setIdList((list) => list.filter((el) => el !== id));
    } else {
      alert("칸반 컬럼은 최소 2개 있어야 합니다.");
    }
  };

  return (
    <div className="App">
      <AppTitle>Kanban Board</AppTitle>
      <BoardStyle>
        {idList.map((id) => (
          <List key={id} id={id} deleteColumn={deleteColumn} />
        ))}
        <ListCreator createColumn={createColumn} />
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
