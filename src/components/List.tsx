import { IListState } from "../recoil/atoms/listState";
//style
import styled from "styled-components";
import { color } from "../styles/theme";
//mui
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

interface IItemProps {
  item: IListState;
}

export default function List({ item }: IItemProps) {
  const handleDeleteList = () => {
    console.log("delete list");
  };
  const handleAddCard = () => {
    console.log("delete list");
  };
  return (
    <ListBox>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 5px",
        }}
      >
        <ListTitle>{item.title}</ListTitle>
        <IconButton onClick={handleDeleteList} sx={{ padding: 0 }}>
          <DeleteIcon />
        </IconButton>
      </div>
      {item.contents.map((content, index) => (
        <CardContent key={index} value={content} />
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
  width: 20%;
  height: fit-content;
`;

const ListTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${color.black};
`;

const CardContent = styled.input`
  width: 90%;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  ::placeholder {
    font-size: 16px;
    color: ${color.black};
  }
`;
