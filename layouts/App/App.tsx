import React from 'react';
import loadable from '@loadable/component'; // 이거 코드스플리팅 알아서 해주고 알아서 불러와준다.
import { Switch, Route, Redirect } from 'react-router';

// 코드 스플리팅
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  return (
    <>
      {/* Switch: 여러개 중에서 하나만 되도록 만들어줌 */}
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/workspace/:workspace" component={Workspace} />
      </Switch>
    </>
  );
};

export default App;
