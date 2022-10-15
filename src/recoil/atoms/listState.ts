import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IContentState {
  id: number;
  content: string;
}

export interface IListState {
  id: number;
  title: string;
  contents: IContentState[];
}

//새로고침 후에도 데이터 남이있게 함
const { persistAtom } = recoilPersist();

// 업데이트 시킬 listState 배열
export const listState = atom<IListState[]>({
  key: "listState",
  default: [
    {
      id: 1,
      title: "Insung",
      contents: [],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
