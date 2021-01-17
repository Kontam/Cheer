import React from 'react';
import styled from 'styled-components';
import { SelectChannelTab } from '../../../redux/modules/types';
import TabItem from '../../atoms/TabItem';
import { TabInfo } from '../../types';

type Props = {
  tabInfos: TabInfo[];
  onItemClick: (name: SelectChannelTab) => void;
  selectedTab: string;
};

const TabBar: React.FC<Props> = ({ tabInfos, onItemClick, selectedTab }) => {
  return (
    <Container>
      <List>
        {tabInfos.map(({ label, name }) => {
          const onClick = () => onItemClick(name);
          return (
            <TabItem
              key={name}
              label={label}
              selected={name === selectedTab}
              onClick={onClick}
            />
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div``;

const List = styled.ul`
  width: 100%;
  display: flex;
`;

export default TabBar;
