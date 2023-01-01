import { remote } from 'electron';

export const useMenu = () => {
  const window = remote.getCurrentWindow();
  const handleMenuButtonMouseEnter: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    window.setIgnoreMouseEvents(false);
  };
  const handleMenuButtonMouseLeave: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    window.setIgnoreMouseEvents(true, { forward: true });
  };
  const handleMenuItemClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    window.setIgnoreMouseEvents(true, { forward: true });
  };
  const hasMenu = process.platform !== 'darwin';
  return {
    hasMenu,
    handleMenuButtonMouseEnter,
    handleMenuButtonMouseLeave,
    handleMenuItemClick,
  };
};
