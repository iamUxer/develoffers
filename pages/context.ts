import { createContext } from 'react';

// 로그인 체크 타입 정의
export type LoginCheckContextProps = {
  isLogin?: boolean | null;
  setLogin: (value: boolean) => void;
  isLoading?: boolean | null;
  setLoading: (value: boolean) => void;
};
// 로그인 체크 컨텍스트 초기값 셋팅
export const LoginCheckContext = createContext<LoginCheckContextProps>({
  isLogin: null,
  setLogin: () => {},
  isLoading: null,
  setLoading: () => {},
});
// 업데이트 타입 정의
export type UpdateContextProps = {
  isUpdate?: boolean | undefined;
  setIsUpdate: (value: boolean) => void;
  isProfile?: boolean | undefined;
  setProfile?: (value: boolean) => void;
  isAbout?: boolean | undefined;
  setAbout?: (value: boolean) => void;
};
// 업데이트 컨텍스트 초기값 셋팅
export const UpdateContext = createContext<UpdateContextProps>({
  isUpdate: false,
  setIsUpdate: () => {},
  isProfile: false,
  setProfile: () => {},
  isAbout: false,
  setAbout: () => {},
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
