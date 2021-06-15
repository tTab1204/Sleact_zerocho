import React, { useCallback, useState } from 'react';
import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import useSWR from 'swr';

// 화면에 반영되는 데이터는 useState으로 관리,
// 화면에 반영되지 않는 데이터는 useRef로 관리,
// revalidate: 내가 원할 때 api 호출할 수 있게 해준다.
// SWR은 주기적으로 서버로 요청을 보내는데, 이게 많아지면 당연히 서버쪽에 부하가 심해지겠지?

// revalidate: 서버에 요청 보내고 데이터 다시 가져오기
// mutate: 서버에 요청 안 보내고 데이터 수정하기
const LogIn = () => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          'http://localhost:3095/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          mutate(false, true);
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (!error && data) {
    console.log('로그인됨', data);
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
