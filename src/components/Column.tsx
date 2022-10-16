//style
import styled from "styled-components";
import { color } from "../styles/theme";
//mui
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
//recoil
import { useRecoilState } from "recoil";
import { columnIds, columnState, IColumnState } from "../recoil/atoms/kanban";
import Item from "./Item";

interface IColumnProps {
  id: number;
  deleteColumn: (id: number) => void;
}

export default function Column(props: IColumnProps) {
  //props
  const { id, deleteColumn } = props;
  //state
  const [column, setColumn] = useRecoilState<IColumnState>(columnState(id));
  const [idList, setIdList] = useRecoilState<number[]>(columnIds);
  //column title
  const [title, setTitle] = useState<string>(column.title);

  //컬럼 삭제
  const handleDeleteColumn = (id: number) => {
    deleteColumn(id);
  };

  //컬럼 제목 input handling
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //컬럼 제목 수정과 아이템 추가는 컬럼의 세부 항목 변경이 필요함.
  //컬럼 제목 수정(인풋입력시 바로 반영)
  const handleSaveTitle = () => {
    setColumn({ ...column, title: title });
    alert("제목이 저장되었습니다!");
  };

  //컬럼 아이템 추가
  const handleAddItem = () => {
    const newItem = {
      id: new Date().getTime(),
      text: "",
    };
    setColumn({ ...column, content: [...column.content, newItem] });
  };

  //컬럼 드래그 시작
  const handleDragStart = (e: React.DragEvent<HTMLInputElement>) => {
    e.dataTransfer.setData("start", String(id));
  };

  //컬럼 드래그 중
  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  //드래그 드롭
  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    const startId = Number(e.dataTransfer.getData("start"));
    console.log("id!!!", startId, id);
    const endId = id;
    setIdList(changeOrder(findIndex(startId), findIndex(endId)));
  };

  //드래그 드롭 후 컬럼 위치 변경 함수
  const changeOrder = (start: number, end: number) => {
    let _idList = [...idList];
    let tmp = _idList[end];
    _idList[end] = _idList[start];
    _idList[start] = tmp;
    return _idList;
  };

  //id를 가지고 배열의 index를 찾는 함수
  const findIndex = (id: number) => {
    return idList.indexOf(id);
  };

  return (
    <ColumnBox
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <AlignStyle>
        <ColumnTitle value={title} onChange={handleTitle} />
        <IconButton onClick={handleSaveTitle} sx={{ padding: "0 5px" }}>
          <SaveIcon />
        </IconButton>
      </AlignStyle>
      {column.content.map((element) => (
        <Item key={element.id} contentData={element} id={id} />
      ))}
      <AlignStyle>
        <IconButton
          onClick={handleAddItem}
          sx={{ padding: "0 5px", marginTop: "10px" }}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteColumn(column.id)}
          sx={{ padding: "0 5px", marginTop: "10px" }}
        >
          <DeleteIcon />
        </IconButton>
      </AlignStyle>
    </ColumnBox>
  );
}

//style
const ColumnBox = styled.div`
  padding: 10px;
  background-color: ${color.secondary};
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  width: 17%;
  height: fit-content;
  flex: 0 0 auto;
`;

const ColumnTitle = styled.input`
  font-size: 16px;
  font-weight: 700;
  color: ${color.black};
  border: none;
  border-radius: 5px;
  width: 90%;
  background-color: ${color.secondary};
  &:focus-visible {
    outline: 2px solid ${color.primary};
  }
`;

const AlignStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
