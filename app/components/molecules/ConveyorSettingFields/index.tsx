import React from 'react';
import styled from 'styled-components';
import FieldTitle from '../../atoms/FieldTitle';
import NumberField from '../../atoms/NumberField';
import appConst from '../../../modules/constants/appConst';
import CheckboxField from '../../atoms/ChekboxField';
import { ScreenSettingFormData } from '../../types';

type Props = {
  formValues: ScreenSettingFormData | undefined;
};

const ConveyorSettingFields: React.FC<Props> = ({ formValues }) => {
  return (
    <>
      <FieldContainer>
        <FieldTitle label="Amount" />
        <InputContainer>
          <NumberField
            name={appConst.FIELD_SCREEN_SETTING_CONVEYOR_AMOUNT}
            min={1}
            max={10}
          />
        </InputContainer>
      </FieldContainer>
      <FieldContainer>
        <CheckboxField
          name={appConst.FIELD_SCREEN_SETTING_CONVEYOR_OVERFLOW}
          label="Overflow"
        />
        <RelatedContainer>
          <FieldTitle label="Queue Limit" />
          <InputContainer>
            <NumberField
              name={appConst.FIELD_SCREEN_SETTING_CONVEYOR_LIMIT}
              min={5}
              max={100}
              disabled={!formValues?.conveyorOverflow}
            />
          </InputContainer>
        </RelatedContainer>
      </FieldContainer>
    </>
  );
};

const FieldContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const InputContainer = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const RelatedContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export default ConveyorSettingFields;
