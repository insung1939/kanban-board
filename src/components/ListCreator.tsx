//react
import { useState } from "react";
//style
import styled from "styled-components";
import { color } from "../styles/theme";
//mui
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
//recoil
import { useSetRecoilState } from "recoil";
import { listState } from "../recoil/atoms/listState";

export default function ListCreator() {
  const createList = useSetRecoilState(listState);
  const [listTitle, setListTitle] = useState<string>("");
  const [addListMode, setAddListMode] = useState<boolean>(false);
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
    const today = new Date();
    const newList = {
      id: today.getTime(),
      title: listTitle,
      contents: [],
    };
    createList((list) => [...list, newList]);
    setAddListMode(false);
  };

  const handleEnterInput = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === "Enter") {
      handleAddList();
    }
  };
  return (
    <>
      {addListMode ? (
        <ActiveAddList>
          <ListTitleInput
            type="text"
            placeholder="타이틀 입력..."
            onChange={handleListTitle}
            onKeyDown={handleEnterInput}
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
    </>
  );
}

//style
const InactiveAddList = styled.div`
  flex: 0 0 auto;
  width: 17%;
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
  flex: 0 0 auto;
  width: 17%;
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
