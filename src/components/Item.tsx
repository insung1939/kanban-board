//react
import { useState } from "react";
//style
import styled from "styled-components";
import { color } from "../styles/theme";
//mui
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
//recoil
import {
  IColumnState,
  IItem,
  columnState,
  dragState,
  IDragState,
} from "../recoil/atoms/kanban";
import { useRecoilState } from "recoil";

// ---------------------------------------------------------------------
interface IItemProps {
  contentData: IItem;
  id: number;
  deleteItem: (id: number) => void;
  editItem: (id: number, text: string) => void;
  moveItemInSameColumn: (endItemIndex: number) => void;
  moveItemToDifferentColumn: (endItemIndex: number) => void;
}

interface ItemContentProps {
  isFocus: boolean;
}

export default function Item(props: IItemProps) {
  const {
    contentData,
    id,
    deleteItem,
    editItem,
    moveItemInSameColumn,
    moveItemToDifferentColumn,
  } = props;
  //state
  const [dragData, setDragData] = useRecoilState<IDragState>(dragState);
  const [column] = useRecoilState<IColumnState>(columnState(id));
  //item text
  const [item, setItem] = useState<string>(contentData.text);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  //아이템 드래그 시작
  const handleDragStart = (e: React.DragEvent<HTMLInputElement>) => {
    setDragData({
      ...dragData,
      startColumnId: id,
      startItemIndex: GetItemIndex(),
      startItemId: contentData.id,
      startItemText: contentData.text,
    });
    e.stopPropagation();
  };

  //아이템 드래그 중
  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  //item id의 index 가져오는 함수
  const GetItemIndex = () => {
    return column.content.findIndex((el) => {
      return el.id === contentData.id;
    });
  };

  //드래그 드롭
  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    //상위요소로 이벤트 전파 막기
    e.stopPropagation();
    if (dragData.startColumnId === id) {
      //같은 컬럼 내 이동
      moveItemInSameColumn(GetItemIndex());
    } else {
      //다른 컬럼으로 이동
      moveItemToDifferentColumn(GetItemIndex());
    }
  };

  return (
    <ItemContent
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      isFocus={isFocus}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ItemInput value={item} onChange={handleItemInput} autoFocus />
      <IconButton
        onClick={() => editItem(contentData.id, item)}
        sx={{ padding: "0 5px" }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => deleteItem(contentData.id)}
        sx={{ padding: "0 5px" }}
      >
        <DeleteIcon />
      </IconButton>
    </ItemContent>
  );
}

//style
const ItemContent = styled.div<ItemContentProps>`
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  background: ${color.white};
  border: ${(props) => (props.isFocus ? `2px solid ${color.primary}` : "")};
`;

const ItemInput = styled.input`
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
