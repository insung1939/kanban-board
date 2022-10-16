import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IItem {
  id: number;
  text: string;
}

export interface IColumnState {
  id: number;
  title: string;
  content: IItem[];
}

//새로고침 후에도 데이터 남이있게 함
const { persistAtom } = recoilPersist();

export const columnIds = atom<number[]>({
  key: "columnIds",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const columnState = atomFamily<IColumnState, number>({
  key: "",
  default: {
    id: 1,
    title: "",
    content: [{ id: 2, text: "" }],
  },
  effects_UNSTABLE: [persistAtom],
});
