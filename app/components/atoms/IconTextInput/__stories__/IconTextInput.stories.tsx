import React, { useState } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import IconTextInputComponent from '../index';
import searchIcon from '../../../../static/image/searchIcon.svg';

export default {
  title: 'atoms/IconTextInput',
  decorators: [withKnobs],
};

const StoryWithHooks = () => {
  const [value, setValue] = useState('');
  return (
    <BackGround>
      <IconTextInputComponent
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={text('placeholder', 'Channel name')}
        imgSrc={searchIcon}
      />
    </BackGround>
  );
};

export const IconTextInput = () => <StoryWithHooks />;

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
`;
