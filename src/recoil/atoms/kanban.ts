import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

// ---------------------------------------------------------------------
export interface IItem {
  id: number;
  text: string;
}

export interface IColumnState {
  id: number;
  title: string;
  content: IItem[];
}

export interface IDragState {
  startColumnId: number;
  startItemIndex: number;
  startItemId: number;
  startItemText: string;
}

//새로고침 후에도 데이터 남이있게 함
const { persistAtom } = recoilPersist();

//컬럼 id
export const columnIds = atom<number[]>({
  key: "columnIds",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//드래그 컬럼 id
export const dragState = atom<IDragState>({
  key: "dragState",
  default: {
    startColumnId: 0,
    startItemIndex: 0,
    startItemId: 0,
    startItemText: "",
  },
  effects_UNSTABLE: [persistAtom],
});

//컬럼 상태(id param 갖음)
export const columnState = atomFamily<IColumnState, number>({
  key: "columnState",
  default: {
    id: new Date().getTime(),
    title: "기본 컬럼..",
    content: [{ id: new Date().getTime(), text: "기본 아이템.." }],
  },
  effects_UNSTABLE: [persistAtom],
});
