import React from 'react';
import styled from 'styled-components';
import ActiveCellSetting from '../ActiveCellSetting';
import FieldTitle from '../../atoms/FieldTitle';
import { FormActiveCell } from '../../../redux/modules/types';
import { ScreenSettingFormData } from '../../types';
import NumberField from '../../atoms/NumberField';
import appConst from '../../../modules/constants/appConst';
import CheckboxField from '../../atoms/ChekboxField';

type Props = {
  formValues: ScreenSettingFormData | undefined;
  formActiveCell: FormActiveCell;
  onFormActiveCellClick: (cellNum: number) => void;
  onFormInactiveCellClick: (cellNum: number) => void;
};

const GridSettingFields: React.FC<Props> = ({
  formValues,
  formActiveCell,
  onFormActiveCellClick,
  onFormInactiveCellClick,
}) => {
  return (
    <>
      <FieldContainer>
        <FieldTitle label="Active Cells" />
        <InputContainer>
          <ActiveCellSetting
            activeCell={formActiveCell}
            onFormActiveCellClick={onFormActiveCellClick}
            onFormInactiveCellClick={onFormInactiveCellClick}
          />
        </InputContainer>
      </FieldContainer>
      <FieldContainer>
        <CheckboxField
          name={appConst.FIELD_SCREEN_SETTING_GRID_OVERFLOW}
          label="Overflow"
        />
        <RelatedContainer>
          <FieldTitle label="Queue Limit" />
          <InputContainer>
            <NumberField
              name={appConst.FIELD_SCREEN_SETTING_GRID_LIMIT}
              min={5}
              max={100}
              disabled={!formValues?.gridOverflow}
            />
          </InputContainer>
        </RelatedContainer>
      </FieldContainer>
    </>
  );
};

const InputContainer = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const FieldContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const RelatedContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export default GridSettingFields;
