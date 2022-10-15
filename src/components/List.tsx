//style
import styled from "styled-components";
import { color } from "../styles/theme";
//mui
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
//recoil
import { useRecoilState } from "recoil";
import {
  IListState,
  IContentState,
  listState,
} from "../recoil/atoms/listState";
import Card from "./Card";

interface IItemProps {
  item: IListState;
}

export default function List({ item }: IItemProps) {
  const [list, setList] = useRecoilState<IListState[]>(listState);
  const [contents, setContents] = useState<IContentState[]>(item.contents);
  const [title, setTitle] = useState<string>(item.title);
  const today = new Date();
  const handleDeleteList = (id: number) => {
    if (list.length > 2) {
      setList((list) => list.filter((item) => item.id !== id));
    } else {
      alert("칸반 컬럼은 최소 2개 있어야 합니다.");
    }
  };
  const handleAddCard = () => {
    const newCard = {
      id: today.getTime(),
      content: "",
    };
    setContents((content) => [...content, newCard]);
  };

  const deleteCard = () => {
    console.log("delete card");
  };

  const editCard = () => {
    const editCard = {
      id: today.getTime(),
      content: "",
    };
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <ListBox draggable>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ListTitle value={title} onChange={handleTitle} />
        <IconButton
          onClick={() => handleDeleteList(item.id)}
          sx={{ padding: 0 }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {contents.map((content) => (
        <Card
          key={content.id}
          value={content.content}
          editCard={editCard}
          deleteCard={deleteCard}
        />
      ))}
      <IconButton
        onClick={handleAddCard}
        sx={{ padding: "0 5px", marginTop: "10px" }}
      >
        <AddIcon />
      </IconButton>
    </ListBox>
  );
}

//style
const ListBox = styled.div`
  padding: 10px;
  background-color: ${color.secondary};
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  width: 17%;
  height: fit-content;
  flex: 0 0 auto;
`;

const ListTitle = styled.input`
  font-size: 16px;
  font-weight: 700;
  color: ${color.black};
  border: none;
  width: 90%;
  background-color: ${color.secondary};
`;
