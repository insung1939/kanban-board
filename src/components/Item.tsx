//style
import { useState } from "react";
import styled from "styled-components";
import { color } from "../styles/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { columnState, IColumnState, IItem } from "../recoil/atoms/kanban";
import { useRecoilState } from "recoil";

interface IItemProps {
  contentData: IItem;
  id: number;
}

interface ItemContentProps {
  isFocus: boolean;
}

export default function Item({ contentData, id }: IItemProps) {
  //state
  const [column, setColumn] = useRecoilState<IColumnState>(columnState(id));
  const [isShow, setIsShow] = useState<boolean>(false);
  const [contents, setContents] = useState<IItem[]>(column.content);
  const [item, setItem] = useState<string>(contentData.text);

  const deleteItem = (id: number) => {
    setContents((contents) => contents.filter((el) => el.id !== id));
    setColumn({ ...column, content: contents });
  };

  //const detailContent = column[itemIndex].content;

  const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
    // const cardContent = {
    //   id: today.getTime(),
    //   content: e.target.value,
    // };
  };
  const handleDragStart = (e: React.DragEvent<HTMLInputElement>) => {
    // e.dataTransfer.setData(
    //   "startContent",
    //   String(detailContent.indexOf(content))
    // );
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const changeOrder = (start: number, end: number) => {
    // let _contents = [...detailContent];
    // let tmp = _contents[end];
    // _contents[end] = _contents[start];
    // _contents[start] = tmp;
    // return _contents;
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    // const startId = Number(e.dataTransfer.getData("startContent"));
    // const endId = detailContent.indexOf(content);
    // console.log("fsjdhfk", changeOrder(startId, endId));
    // const _list = [...column];
    // const editList = {
    //   id: today.getTime(),
    //   title: _list[itemIndex].title,
    //   content: changeOrder(startId, endId),
    // };
    // setColumn((prev) => prev.splice(itemIndex, 1, editList));
  };
  return (
    <ItemContent
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onFocus={() => setIsShow(false)}
      isFocus={isShow}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ItemInput value={item} onChange={handleItemInput} />
      <EditIcon sx={{ margin: "auto", paddingRight: "5px" }} />
      <IconButton
        onClick={() => deleteItem(contentData.id)}
        sx={{ padding: 0 }}
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
