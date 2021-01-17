import React from 'react';
import styled from 'styled-components';
import SlackAuthButton from '../../atoms/SlackAuthButton';
import { SlackAuthInfo } from '../../types';
import cheerIcon from '../../../static/image/cheerIcon.svg';
import { styleConst } from '../../../modules/styles/styleConst';
import LoadingImage from '../../atoms/LoadingImage';
import { AuthInfo } from '../../../redux/modules/types';
import ErrorSnackbar from '../../atoms/ErrorSnackBar';

type Props = {
  slackAuthInfo: SlackAuthInfo;
  authInfo: AuthInfo;
  handleStartAuth: (url: string) => void;
};

const LoginForm: React.FC<Props> = ({
  slackAuthInfo,
  handleStartAuth,
  authInfo,
}) => {
  return (
    <Container>
      <CentralizeContainer>
        <CentralizeBackground>
          <img src={cheerIcon} alt="Cheer" />
        </CentralizeBackground>
      </CentralizeContainer>
      <MessageContainer>
        <Text>We would love to cheer you up.</Text>
      </MessageContainer>
      <LoadingContainer>
        <LoadingImage isLoading={authInfo.loading} />
      </LoadingContainer>
      <LoginButtonContainer>
        <SlackAuthButton
          slackAuthInfo={slackAuthInfo}
          onClick={handleStartAuth}
        />
      </LoginButtonContainer>
      <ErrorSnackbar text={authInfo.errorMessage} open={authInfo.isInvalid} />
    </Container>
  );
};

// window 500px - header 30px = 470px
const Container = styled.div`
  padding: 30px;
  background-color: ${styleConst.basicPink};
  height: 470px;
`;

const CentralizeContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CentralizeBackground = styled.div`
  background-color: ${styleConst.basicWhite};
  border-radius: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  padding-right: 10px; // 左右非対称なロゴのバランスをとる
  width: 350px;
`;

const MessageContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Text = styled.p`
  font-size: 2.4rem;
  color: ${styleConst.basicWhite};
  font-family: ${styleConst.englishFont};
`;

const LoadingContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LoginButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
`;
export default LoginForm;
