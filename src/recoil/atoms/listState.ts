// src/recoil/todo.ts
import { atom } from "recoil";

export interface IListState {
  id: string;
  title: string;
  contents: string[];
}

// 리스트의 타이틀 값 input으로 받음
export const inputList = atom<string>({
  key: "inputList",
  default: "",
});

//리스트의 카드 input을 받음
export const inputCardContent = atom<string>({
  key: "inputCardContent",
  default: "",
});

// 업데이트 시킬 listState 배열
export const listState = atom<IListState[]>({
  key: "list",
  default: [
    {
      id: "1",
      title: "Insung",
      contents: ["hello", "i am insung"],
    },
  ],
});
