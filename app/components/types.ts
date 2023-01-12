import React from 'react';
import { ScreenModes, SelectChannelTab } from '../redux/modules/types';

export type ScreenSettingFormData = {
  mode: ScreenModes;
  conveyorAmount: number;
  conveyorOverflow: boolean;
  conveyorLimit: number;
  gridOverflow: boolean;
  gridLimit: number;
};

export type SlackAuthInfo = {
  clientId: string;
  scope: Readonly<string[]>;
  botScope: Readonly<string[]>;
  redirectUri?: string;
  state?: string;
  team?: string;
};

export type TabInfo = {
  name: SelectChannelTab;
  label: string;
};

export type HeaderMenu = {
  name: string;
  iconNode: any;
  action: () => void;
  itemProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
};

export type FlatMenu = {
  name: string;
  label: string;
  action: React.MouseEventHandler<HTMLButtonElement>;
  itemProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
};

export type PositionX = 'left' | 'right' | 'center';
export type PositionY = 'top' | 'bottom' | 'center';
export type Position = { positionX: PositionX; positionY: PositionY };
