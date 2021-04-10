import React from 'react';
import styled from 'styled-components';
import { reduxForm, InjectedFormProps } from 'redux-form';
import appConst from '../../../modules/constants/appConst';
import SelectField, { Option } from '../../atoms/SelectField';
import GeneralButton from '../../atoms/GeneralButton';
import { FormActiveCell } from '../../../redux/modules/types';
import FieldTitle from '../../atoms/FieldTitle';
import ConveyorSettingFields from '../ConveyorSettingFields';
import GridSettingFields from '../GridSettingFields';
import { ScreenSettingFormData } from '../../types';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

export type OwnProps = {
  formValues: ScreenSettingFormData | undefined;
  formActiveCell: FormActiveCell;
  onFormActiveCellClick: (cellNum: number) => void;
  onFormInactiveCellClick: (cellNum: number) => void;
};

type Props = InjectedFormProps<ScreenSettingFormData> & OwnProps;

const modeOptions: Option[] = [
  {
    label: 'grid',
    value: appConst.SCREEN_MODE_GRID,
  },
  {
    label: 'conveyor',
    value: appConst.SCREEN_MODE_CONVEYOR,
  },
];

const ScreenSettingForm: React.FC<Props> = ({
  handleSubmit,
  formValues,
  formActiveCell,
  onFormActiveCellClick,
  onFormInactiveCellClick,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FieldTitle label="Screen Mode" />
      <InputContainer>
        <SelectField
          name={appConst.FIELD_SCREEN_SETTING_MODE}
          options={modeOptions}
          exAttributes={QA_ATTRIBUTES.SCREEN_MODE_SELECT}
        />
      </InputContainer>
      {formValues && formValues.mode === appConst.SCREEN_MODE_CONVEYOR ? (
        <ConveyorSettingFields formValues={formValues} />
      ) : (
        <GridSettingFields
          formValues={formValues}
          formActiveCell={formActiveCell}
          onFormActiveCellClick={onFormActiveCellClick}
          onFormInactiveCellClick={onFormInactiveCellClick}
        />
      )}
      <FieldContainer>
        <ButtonWrapper>
          <GeneralButton
            label="Save"
            type="submit"
            exAttributes={QA_ATTRIBUTES.SCREEN_SETTING_SUBMIT}
          />
        </ButtonWrapper>
      </FieldContainer>
    </Form>
  );
};

const Form = styled.form`
  width: 90%;
  height: 100%;
  position: relative;
`;

const FieldContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const InputContainer = styled.div`
  max-width: 300px;
  margin-top: 5px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  text-align: right;
  width: 100%;
  bottom: 0;
`;

export default reduxForm<ScreenSettingFormData, any>({
  form: appConst.FORM_SCREEN_SETTING,
})(ScreenSettingForm);
