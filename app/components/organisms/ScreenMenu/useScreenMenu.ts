import { useDispatch, useSelector } from 'react-redux';
import {
  openScreenMenu as openScreenMenuAction,
  closeScreenMenu as closeScreenMenuAction,
} from '../../../redux/modules/ui/screenMenuUI';

export function useScreenMenu() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.screenMenuUI.isOpen);
  const handleClickOtherPlace = () => {
    closeScreenMenu();
  };
  const closeScreenMenu = () => {
    dispatch(closeScreenMenuAction());
    document.removeEventListener('click', handleClickOtherPlace);
  };
  const openScreenMenu = () => {
    dispatch(openScreenMenuAction());
    document.addEventListener('click', handleClickOtherPlace);
  };

  return { isOpen, openScreenMenu, closeScreenMenu };
}
