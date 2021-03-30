import React from 'react';
import styled from 'styled-components';
import {
  SelectChannelUI,
  SearchedChannels,
  SlackChannelState,
  ChannelHistories,
  SlackChannelInfo,
  SelectChannelTab,
} from '../../../redux/modules/types';
import SelectChannelList from '../../molecules/SelectChannelList';
import GeneralButton from '../../atoms/GeneralButton';
import IconTextInput from '../../atoms/IconTextInput';
import TabBar from '../../molecules/TabBar';
import { styleConst } from '../../../modules/styles/styleConst';
import searchIcon from '../../../static/image/searchIcon.svg';
import LoadingImage from '../../atoms/LoadingImage';
import { TabInfo } from '../../types';
import ErrorSnackbar from '../../atoms/ErrorSnackBar';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

type Props = {
  channelList: SlackChannelState[];
  searchedChannelList: SearchedChannels;
  channelHistories: ChannelHistories;
  handleSelectChannel: (channelId: string) => void;
  selectChannelUI: SelectChannelUI;
  handleSearchStringChange: React.ChangeEventHandler<HTMLInputElement>;
  handleStartWatch: () => void;
  handleTabItemClick: (name: SelectChannelTab) => void;
  tabInfos: TabInfo[];
  slackChannelInfo: SlackChannelInfo;
  isLoading: boolean;
};

const SelectChannel: React.FC<Props> = ({
  channelList,
  searchedChannelList,
  handleSelectChannel,
  selectChannelUI,
  channelHistories,
  handleSearchStringChange,
  handleStartWatch,
  handleTabItemClick,
  tabInfos,
  slackChannelInfo,
  isLoading,
}) => {
  const { searchString, selectedChannel, selectedTab } = selectChannelUI;
  return (
    <Container>
      <Wrapper>
        <InputContainer>
          <IconTextInput
            onChange={handleSearchStringChange}
            value={searchString}
            placeholder="Channel name"
            imgSrc={searchIcon}
            inputProps={QA_ATTRIBUTES.SEARCH_CHANNEL_INPUT}
          />
        </InputContainer>
        <ListContainer>
          <TabBar
            tabInfos={tabInfos}
            selectedTab={selectedTab}
            onItemClick={handleTabItemClick}
          />
          <SelectChannelList
            searchedChannelList={
              selectedTab === 'all' ? searchedChannelList : channelHistories
            }
            handleSelectChannel={handleSelectChannel}
            selectedChannel={selectedChannel}
          />
        </ListContainer>
        <LoadingImageContainer>
          <LoadingImage isLoading={isLoading} size={30} />
        </LoadingImageContainer>
        <ButtonContainer>
          <GeneralButton
            type="button"
            onClick={handleStartWatch}
            label={
              selectedChannel
                ? `Start watching #${
                    channelList.find(
                      (channel) => channel.id === selectedChannel
                    )?.name
                  }`
                : `Select channel`
            }
            full
            disabled={selectedChannel === ''}
          />
        </ButtonContainer>
      </Wrapper>
      <ErrorSnackbar
        text={slackChannelInfo.error_message}
        open={slackChannelInfo.error}
      />
    </Container>
  );
};

// window800px - header30px
const Container = styled.div`
  padding-top: 30px;
  background-color: ${styleConst.basicPink};
  height: 570px;
`;

const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;
`;

const InputContainer = styled.div``;
const ListContainer = styled.div`
  margin-top: 15px;
`;

const LoadingImageContainer = styled.div`
  text-align: center;
  height: 30px;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

export default SelectChannel;
