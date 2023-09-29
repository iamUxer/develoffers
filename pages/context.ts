import { createContext } from 'react';

// 업데이트 타입 정의
export type ContextProps = {
  isUpdate: boolean | undefined;
  setIsUpdate: (value: boolean) => void;
};
// 업데이트 컨텍스트 초기값 셋팅
export const AppContext = createContext<ContextProps>({
  isUpdate: false,
  setIsUpdate: () => {},
});
