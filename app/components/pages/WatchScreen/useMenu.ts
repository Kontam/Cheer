import { remote } from 'electron';

export const useMenu = () => {
  const window = remote.getCurrentWindow();
  const handleMenuButtonMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    window.setIgnoreMouseEvents(false);
  };
  const handleMenuButtonMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    window.setIgnoreMouseEvents(true, { forward: true });
  };
  return {
    hasMenu: true,
    handleMenuButtonMouseEnter,
    handleMenuButtonMouseLeave,
  };
};
