import React from 'react';
import styled from 'styled-components';
import ScreenSettingForm from '../../molecules/ScreenSettingForm';
import { styleConst } from '../../../modules/styles/styleConst';
import { FormActiveCell, SystemMessage } from '../../../redux/modules/types';
import { ScreenSettingFormData } from '../../types';
import MessageSnackbar from '../../atoms/MessageSnackBar';

export type Props = {
  handleSubmit: any;
  formValues: ScreenSettingFormData | undefined;
  initialiValues?: ScreenSettingFormData;
  formActiveCell: FormActiveCell;
  onFormActiveCellClick: (cellNum: number) => void;
  onFormInactiveCellClick: (cellNum: number) => void;
  systemMessage: SystemMessage;
  onHideMessage: () => void;
};

const ScreenSetting: React.FC<Props> = ({
  handleSubmit,
  formValues,
  initialiValues,
  formActiveCell,
  onFormActiveCellClick,
  onFormInactiveCellClick,
  systemMessage,
  onHideMessage,
}) => {
  return (
    <Container>
      <ScreenSettingForm
        onSubmit={handleSubmit}
        formValues={formValues}
        initialValues={initialiValues}
        formActiveCell={formActiveCell}
        onFormActiveCellClick={onFormActiveCellClick}
        onFormInactiveCellClick={onFormInactiveCellClick}
      />
      <MessageSnackbar
        text={systemMessage.message}
        open={systemMessage.showing}
        duration={2000}
        onClose={onHideMessage}
      />
    </Container>
  );
};

// window 700px Header 30px
const Container = styled.div`
  padding: 40px;
  background-color: ${styleConst.basicPink};
  height: 670px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default ScreenSetting;
