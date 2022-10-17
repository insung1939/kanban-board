//react
import { useState } from "react";
//style
import styled from "styled-components";
import { color } from "../styles/theme";
//mui
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

// ---------------------------------------------------------------------

interface IColumnCreatorProps {
  createColumn: (title: string, id: number) => void;
}

export default function ColumnCreator({ createColumn }: IColumnCreatorProps) {
  const [columnTitle, setColumnTitle] = useState<string>("");
  const [addColumnMode, setAddColumnMode] = useState<boolean>(false);
  //컬럼 title input handling
  const handleColumnTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };
  //컬럼 추가 모드 변경
  const handleAddColumnMode = () => {
    setAddColumnMode(true);
  };
  //컬럼 추가하는 것을 취소
  const cancelAddColumn = () => {
    setAddColumnMode(false);
  };
  //컬럼 추가
  const handleAddColumn = () => {
    const id = new Date().getTime();
    createColumn(columnTitle, id);
    setAddColumnMode(false);
    setColumnTitle("");
  };

  const handleEnterInput = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === "Enter") {
      handleAddColumn();
    }
  };
  return (
    <>
      {addColumnMode ? (
        <ActiveAddColumn>
          <ColumnTitleInput
            type="text"
            placeholder="제목 입력..."
            onChange={handleColumnTitle}
            onKeyDown={handleEnterInput}
            autoFocus
          />
          <div style={{ display: "flex" }}>
            <AddColumnButton onClick={handleAddColumn}>추가</AddColumnButton>
            <IconButton onClick={cancelAddColumn} sx={{ padding: 0 }}>
              <ClearIcon />
            </IconButton>
          </div>
        </ActiveAddColumn>
      ) : (
        <InactiveAddColumn onClick={handleAddColumnMode}>
          <AddIcon /> 리스트 추가
        </InactiveAddColumn>
      )}
    </>
  );
}

//style
const InactiveAddColumn = styled.div`
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

const ActiveAddColumn = styled.div`
  flex: 0 0 auto;
  width: 17%;
  padding: 10px;
  background-color: ${color.secondary};
  border: none;
  border-radius: 5px;
  height: fit-content;
`;

const ColumnTitleInput = styled.input`
  border: none;
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

const AddColumnButton = styled.button`
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
