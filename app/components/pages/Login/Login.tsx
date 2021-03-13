import React from 'react';
import Header from '../../organisms/WindowHeader';
import LoginForm from '../../organisms/LoginForm';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';
import { useLoginHeaderMenu } from './useLoginHeaderMenu';

const Login: React.FC = () => {
  const { headerMenus, screenMenus } = useLoginHeaderMenu();
  return (
    <div {...QA_ATTRIBUTES.LOGIN}>
      <Header headerMenus={headerMenus} screenMenus={screenMenus} />
      <LoginForm />
    </div>
  );
};

export default Login;
