import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

type ButtonType = 'active' | 'passive';

type Props = {
  label: string;
  type: string;
  onClick?: React.MouseEventHandler;
  full?: boolean;
  disabled?: boolean;
  buttonType?: ButtonType;
  exAttributes?: any;
};

const GeneralButton: React.FC<Props> = ({
  label,
  type,
  onClick,
  disabled = false,
  full = false,
  buttonType = 'active',
  exAttributes,
}) => {
  return (
    <>
      <Input
        type={type}
        onClick={onClick}
        value={label}
        full={full}
        disabled={disabled}
        buttonType={buttonType}
        {...exAttributes}
      />
    </>
  );
};

export const Input = styled.input<{ full: boolean; buttonType: ButtonType }>`
  ${({ buttonType, disabled, full }) => {
    let bgc: string;
    let bgcHover: string;
    let color: string;
    switch (buttonType) {
      case 'active':
        bgc = styleConst.basicGreen;
        color = styleConst.darkGreen;
        bgcHover = styleConst.lightGreen;
        break;
      case 'passive':
        bgc = styleConst.lightGray;
        color = styleConst.basicLabel;
        bgcHover = styleConst.thinGray;
        break;
      default:
        return ``;
    }
    const disabledStyle = `opacity: 0.5;`;
    const enabledStyle = `
      transition: 0.2
      cursor: pointer;
      :hover {
        background-color: ${bgcHover};
      }
      `;
    return `
      background-color: ${bgc};
      color: ${color};
      ${disabled ? disabledStyle : enabledStyle}
      ${full ? `width: 100%;` : ``}
    `;
  }}

  padding: 5px 12px;
  font-size: 2rem;
  box-shadow: 0 3px 6px ${styleConst.basicShadow};
  border: none;
`;

export default GeneralButton;
