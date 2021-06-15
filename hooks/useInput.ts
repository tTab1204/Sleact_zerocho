import { Dispatch, SetStateAction, useCallback, useState } from 'react';

// TS는 매개변수 타입 추론을 잘 못한다.
// -> 따라서 매개변수는 확실하게 타입 추론을 해줘야 함.
// + 리턴해주는 값에도 순서에 맞게 타입을 붙여줘야 한다.
// 변수는 알아서 추론하기 때문에 내버려두고, 스스로 못할 때 타입을 주자.

// 매개변수를 any타입으로 주면, return값의 value(첫번째 값)값도 any타입으로 자동으로 바뀌지가 않는다.)
type Handler = (e: any) => void;
type ReturnTypes<T = any> = [T, Handler, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T): ReturnTypes<T> => {
  // 제너릭 써주자. any말고
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
