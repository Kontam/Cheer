import React from 'react';
import Header from '../../organisms/WindowHeader';
import LoginForm from '../../organisms/LoginForm';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';
import { useLoginHeaderMenu } from './useLoginHeaderMenu';

const Login: React.FC = () => {
  const { headerMenus } = useLoginHeaderMenu();
  return (
    <div {...QA_ATTRIBUTES.LOGIN}>
      <Header withMenu headerMenus={headerMenus} />
      <LoginForm />
    </div>
  );
};

export default Login;
