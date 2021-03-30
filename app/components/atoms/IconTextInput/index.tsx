import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  imgSrc?: string;
  placeholder?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const IconTextInput: React.FC<Props> = ({
  onChange,
  value,
  imgSrc,
  placeholder,
  inputProps,
}) => {
  return (
    <Container>
      <FlexContainer>
        <ImgContainer>
          <Img src={imgSrc} />
        </ImgContainer>
        <Text
          type="text"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          {...inputProps}
        />
      </FlexContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${styleConst.basicWhite};
  border-radius: 7px;
  padding: 0 7px;
`;

const Text = styled.input<any>`
  border: none;
  height: 40px;
  border-radius: 7px;
  font-size: 2rem;
  width: 100%;
  color: ${styleConst.messageLabel};
  margin-left: 5px;
  padding-left: 5px;

  ::placeholder {
    color: ${styleConst.lightLabel};
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div``;

const Img = styled.img`
  height: 25px;
  width: 25px;
`;

export default IconTextInput;
