import React, { useCallback } from 'react';
import styled from 'styled-components';
import { GridMessages, Members } from '../../../redux/modules/types';
import GridCell from '../../molecules/GridCell';
import gridInfo from './gridInfo';

type Props = {
  gridMessages: GridMessages;
  members: Members;
};

const MessageGrid: React.FC<Props> = ({ gridMessages, members }) => {
  const getMember = useCallback(
    (id: string) => members.find((member) => id === member.id),
    [members]
  );
  return (
    <Container>
      {gridInfo.map((grid) => {
        const gridMessage = gridMessages.find(
          (gm) => gm.cell === grid.cellNum && gm.showing
        );
        return (
          <GridCell
            key={grid.cellNum}
            gridMessage={gridMessage}
            positionX={grid.positionX}
            positionY={grid.positionY}
            member={getMember(
              (gridMessage && gridMessage?.message?.user) || ''
            )}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
`;

export default MessageGrid;
