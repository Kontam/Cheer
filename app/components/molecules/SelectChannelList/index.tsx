import React, { useMemo } from 'react';
import styled from 'styled-components';
import { SearchedChannels } from '../../../redux/modules/types';
import SelectChannelItem from '../../atoms/SelectChannelItem';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  searchedChannelList: SearchedChannels;
  handleSelectChannel: (channelId: string) => void;
  selectedChannel: string;
};

const SelectChannelList: React.FC<Props> = ({
  searchedChannelList,
  handleSelectChannel,
  selectedChannel,
}) => {
  const renderedList = useMemo(
    () =>
      searchedChannelList.map((channel) => {
        const handleClickItem = () => handleSelectChannel(channel.id);
        return (
          <Item key={channel.id}>
            <SelectChannelItem
              slackChannel={channel}
              onClick={handleClickItem}
              selected={channel.id === selectedChannel}
            />
          </Item>
        );
      }),
    [searchedChannelList, handleSelectChannel, selectedChannel]
  );
  return (
    <Container>
      <List>{renderedList}</List>
    </Container>
  );
};

const Container = styled.div``;
const List = styled.ul`
  height: 340px;
  background-color: ${styleConst.basicWhite};
  overflow-y: scroll;
`;
const Item = styled.li``;

export default SelectChannelList;
