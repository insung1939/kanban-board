//style
import { useState } from "react";
import styled from "styled-components";
import { color } from "../styles/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

interface ICardProps {
  key: number;
  value: string;
  editCard: () => void;
  deleteCard: () => void;
}

interface CardContentProps {
  isFocus: boolean;
}

export default function Card({ key, value, editCard, deleteCard }: ICardProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <CardContent
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onFocus={() => setIsShow(false)}
      isFocus={isShow}
    >
      <CardInput />
      {isShow && (
        <>
          <EditIcon sx={{ margin: "auto", paddingRight: "5px" }} />
          <IconButton onClick={deleteCard} sx={{ padding: 0 }}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </CardContent>
  );
}

//style
const CardContent = styled.div<CardContentProps>`
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  background: ${color.white};
  border: ${(props) => (props.isFocus ? `2px solid ${color.primary}` : "")};
`;

const CardInput = styled.input`
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
