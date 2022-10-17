//react
import { useState } from "react";
//style
import styled from "styled-components";
import { color } from "../styles/theme";
//mui
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
//recoil
import { useRecoilState } from "recoil";
import {
  columnIds,
  columnState,
  dragState,
  IColumnState,
  IDragState,
} from "../recoil/atoms/kanban";
//components
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
  const [dragData] = useRecoilState<IDragState>(dragState);
  const [dragColumn, setDragColumn] = useRecoilState<IColumnState>(
    columnState(dragData.startColumnId)
  );
  const [idList, setIdList] = useRecoilState<number[]>(columnIds);
  //column title
  const [title, setTitle] = useState<string>(column.title);
  //item add mode
  const [showAddInput, setShowAddInput] = useState<boolean>(false);
  //new item input
  const [newItem, setNewItem] = useState<string>("");

  const handleCreateItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  const cancelNewItem = () => {
    setShowAddInput(false);
  };

  //컬럼 아이템 수정
  const editItem = (id: number, text: string) => {
    if (text.length < 1) {
      alert("1자 이상 수정해야 합니다");
    } else {
      const index = column.content.findIndex((el) => {
        return el.id === id;
      });
      const editedContent = [
        ...column.content.slice(0, index),
        { id: id, text: text },
        ...column.content.slice(index + 1),
      ];
      setColumn({ ...column, content: editedContent });
      alert("수정되었습니다!");
    }
  };

  //컬럼 아이템 삭제
  const deleteItem = (id: number) => {
    const editedContent = column.content.filter((el) => el.id !== id);
    setColumn({ ...column, content: editedContent });
  };

  //컬럼 아이템 추가
  const saveNewItem = () => {
    if (newItem.length > 0) {
      const newItemData = {
        id: new Date().getTime(),
        text: newItem,
      };
      setColumn({ ...column, content: [...column.content, newItemData] });
      setShowAddInput(false);
      setNewItem("");
    } else {
      alert("최소 1자 이상 입력해야 합니다!");
    }
  };

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
    const endId = id;
    if (
      startId !== undefined &&
      startId !== 0 &&
      endId !== undefined &&
      endId !== 0
    ) {
      setIdList(changeOrder(findIndex(startId), findIndex(endId), idList));
    }
  };

  //드래그 드롭 후 위치 변경 함수
  const changeOrder = (start: number, end: number, array: any) => {
    let _array = [...array];
    let tmp = _array[end];
    _array[end] = _array[start];
    _array[start] = tmp;
    return _array;
  };

  //id를 가지고 배열의 index를 찾는 함수
  const findIndex = (id: number) => {
    return idList.indexOf(id);
  };

  //같은 컬럼 내 아이템 위치 변경
  const moveItemInSameColumn = (endItemIndex: number) => {
    setColumn({
      ...column,
      content: changeOrder(
        dragData.startItemIndex,
        endItemIndex,
        column.content
      ),
    });
  };

  //다른 컬럼으로 아이템 이동
  const moveItemToDifferentColumn = (endItemIndex: number) => {
    setDragColumn({
      ...dragColumn,
      content: dragColumn.content.filter(
        (el) => el.id !== dragData.startItemId
      ),
    });
    setColumn({
      ...column,
      content: [
        ...column.content.slice(0, endItemIndex + 1),
        { id: new Date().getTime(), text: dragData.startItemText },
        ...column.content.slice(endItemIndex + 1),
      ],
    });
  };

  const handleMoveItem = (e: React.DragEvent<HTMLInputElement>) => {
    if (column.id !== dragData.startColumnId)
      moveItemToDifferentColumn(column.content.length);
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
        <Item
          key={element.id}
          contentData={element}
          id={id}
          deleteItem={deleteItem}
          editItem={editItem}
          moveItemInSameColumn={moveItemInSameColumn}
          moveItemToDifferentColumn={moveItemToDifferentColumn}
        />
      ))}
      {showAddInput && (
        <CreateItemBox>
          <CreateItem onChange={handleCreateItem} autoFocus />
          <IconButton onClick={cancelNewItem} sx={{ padding: "0 5px" }}>
            <ClearIcon />
          </IconButton>
          <IconButton onClick={saveNewItem} sx={{ padding: "0 5px" }}>
            <SaveIcon />
          </IconButton>
        </CreateItemBox>
      )}
      <AlignStyle onDrop={handleMoveItem}>
        <IconButton
          onClick={() => setShowAddInput(true)}
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

const CreateItemBox = styled.div`
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  background: ${color.white};
  border: 2px solid ${color.primary};
`;

const CreateItem = styled.input`
  border-radius: 5px;
  width: 90%;
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  &:focus-visible {
    outline: none;
  }
`;
