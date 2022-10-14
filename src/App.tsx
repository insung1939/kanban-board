//react
import { useState } from "react";
//style
import styled from "styled-components";
import { color } from "./styles/theme";
//mui
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
//recoil
import { listState, IListState } from "./recoil/atoms/listState";
import { useRecoilState } from "recoil";
//components
import List from "./components/List";

// ---------------------------------------------------------------------

export default function App() {
  const [list, setList] = useRecoilState<IListState[]>(listState);
  const [addListMode, setAddListMode] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState<string>("");
  //list title input handling
  const handleListTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value);
    console.log(listTitle);
  };
  //addList 모드 변경
  const handleAddListMode = () => {
    setAddListMode(true);
  };
  //리스트 추가하는 것을 취소
  const handleCancelAddList = () => {
    setAddListMode(false);
  };
  //리스트 추가
  const handleAddList = () => {
    console.log("card list 추가하기");
  };
  return (
    <div className="App">
      <AppTitle>Kanban Board</AppTitle>

      <BoardStyle>
        {list.map((item) => (
          <List key={item.id} item={item} />
        ))}
        {addListMode ? (
          <ActiveAddList>
            <ListTitleInput
              type="text"
              placeholder="타이틀 입력..."
              onChange={handleListTitle}
            />
            <div style={{ display: "flex" }}>
              <AddListButton onClick={handleAddList}>추가</AddListButton>
              <IconButton onClick={handleCancelAddList} sx={{ padding: 0 }}>
                <ClearIcon />
              </IconButton>
            </div>
          </ActiveAddList>
        ) : (
          <InactiveAddList onClick={handleAddListMode}>
            <AddIcon /> 리스트 추가
          </InactiveAddList>
        )}
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
  display: flex;
  height: 70vh;
`;

const InactiveAddList = styled.div`
  width: 20%;
  height: 24px;
  padding: 10px;
  background-color: ${color.gray};
  border: none;
  border-radius: 5px;
  color: ${color.white};
  font-size: 20px;
  transition: 0.6s;
  &:hover {
    opacity: 0.8;
  }
  display: flex;
  line-height: 24px;
  cursor: pointer;
`;

const ActiveAddList = styled.div`
  width: 20%;
  padding: 10px;
  background-color: ${color.secondary};
  border: none;
  border-radius: 5px;
  height: fit-content;
`;

const ListTitleInput = styled.input`
  border: 1px solid ${color.primary};
  width: 90%;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  &:focus-visible {
    outline: 2px solid ${color.primary};
  }
  ::placeholder {
    font-size: 16px;
    color: ${color.black};
  }
`;

const AddListButton = styled.button`
  width: 20%;
  padding: 5px;
  height: 24px;
  background-color: ${color.primary_dark};
  border: none;
  border-radius: 5px;
  color: ${color.white};
  font-weight: bold;
  margin-right: 10px;
  transition: 0.6s;
  &:hover {
    opacity: 0.5;
  }
  cursor: pointer;
`;
