import { useDispatch, useSelector } from 'react-redux';
import {
  openScreenMenu as openScreenMenuAction,
  closeScreenMenu as closeScreenMenuAction,
} from '../../../redux/modules/ui/screenMenuUI';

export function useScreenMenu() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.screenMenuUI.isOpen);
  const openScreenMenu = () => dispatch(openScreenMenuAction());
  const closeScreenMenu = () => dispatch(closeScreenMenuAction());

  return { isOpen, openScreenMenu, closeScreenMenu };
}
