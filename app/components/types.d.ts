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
};
