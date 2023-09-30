import { createContext } from 'react';

// 업데이트 타입 정의
export type ContextProps = {
  isUpdate?: boolean | undefined;
  setIsUpdate: (value: boolean) => void;
};
// 업데이트 컨텍스트 초기값 셋팅
export const AppContext = createContext<ContextProps>({
  isUpdate: false,
  setIsUpdate: () => {},
});
// 포스팅 수정 모달 타입 정의
export type PostingEditModalProps = {
  isModal?: boolean | undefined;
  setModal: (value: boolean) => void;
  isEdit?: any;
  setEdit: (value: any) => void;
};
// 포스팅 수정 모달 컨텍스트 초기값 셋팅
export const PostingEditModalContext = createContext<PostingEditModalProps>({
  isModal: false,
  setModal: () => {},
  isEdit: {},
  setEdit: () => {},
});
