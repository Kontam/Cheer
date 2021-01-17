import React from 'react';
import Header from '../../organisms/WindowHeader';
import LoginForm from '../../organisms/LoginForm';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

const Login: React.FC = () => {
  return (
    <div {...QA_ATTRIBUTES.LOGIN}>
      <Header />
      <LoginForm />
    </div>
  );
};

export default Login;
