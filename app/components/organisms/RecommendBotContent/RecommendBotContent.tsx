import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';
import GeneralButton from '../../atoms/GeneralButton';
import inviteBot from '../../../static/image/InviteBot.png';
import LoadingImage from '../../atoms/LoadingImage';
import IconButton from '../../atoms/IconButton';
import questionIcon from '../../../static/image/questionIcon.svg';

type Props = {
  handleBack: React.MouseEventHandler;
  handleRetry: React.MouseEventHandler;
  channelName: string;
  onClickHelp: React.MouseEventHandler;
  isLoading: boolean;
};

const RecommendBotContent: React.FC<Props> = ({
  handleBack,
  handleRetry,
  channelName,
  onClickHelp,
  isLoading,
}) => {
  return (
    <Container>
      <BackButtonContainer>
        <GeneralButton
          label="Back"
          type="button"
          onClick={handleBack}
          buttonType="passive"
        />
      </BackButtonContainer>
      <FlexContainer>
        <MessageContainer>
          <Heading>
            cheer_botを#
            {channelName}
            に招待してください
          </Heading>
          <Description>
            Cheerの使用を他の人に通知します。これが最後のステップです。
          </Description>
        </MessageContainer>
        <IconButton src={questionIcon} onClick={onClickHelp} />
      </FlexContainer>
      <ChannelImageWrapper>
        <ChannelImage src={inviteBot} />
      </ChannelImageWrapper>
      <LoadingImageContainer>
        <LoadingImage isLoading={isLoading} size={50} />
      </LoadingImageContainer>
      <RetryButtonWrapper>
        <GeneralButton
          label={`Retry watch #${channelName}`}
          type="button"
          onClick={handleRetry}
          full
        />
      </RetryButtonWrapper>
    </Container>
  );
};

// window 600px - header 30px = 570px
const Container = styled.div`
  padding: 40px 100px;
  background-color: ${styleConst.basicPink};
  height: 570px;
  position: relative;
`;

const BackButtonContainer = styled.div``;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const MessageContainer = styled.section``;

const Heading = styled.h2`
  color: ${styleConst.basicWhite};
  font-size: 2.4rem;
`;

const Description = styled.p`
  color: ${styleConst.basicWhite};
  font-size: 1.4rem;
  margin-top: 8px;
`;

const ChannelImageWrapper = styled.div`
  margin-top: 50px;
`;

const ChannelImage = styled.img``;

const LoadingImageContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  text-align: center;
`;

const RetryButtonWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  width: 600px;
`;

export default RecommendBotContent;
