import { push } from 'connected-react-router';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appConst from '../../../modules/constants/appConst';
import { routes } from '../../../modules/constants/routes';
import { openDefaultBrowser } from '../../../redux/middlewares/desktopIntegrationMiddleware';
import { selectedChannelInfoSelector } from '../../../redux/modules/api/selectors/slackChannelList';
import { startWatchLoadingSelector } from '../../../redux/modules/api/selectors/startWatchLoading';
import { startWatch } from '../../../redux/modules/sagas/startWatchSagas';
import RecommendBotContent from './RecommendBotContent';

const RecommendBotContentPage: React.FC = () => {
  const dispatch = useDispatch();
  const channelInfo = useSelector((state) =>
    selectedChannelInfoSelector(state)
  );
  const isLoading = useSelector(startWatchLoadingSelector);
  const handleBack = useCallback(() => dispatch(push(routes.HOME)), [dispatch]);
  const handleRetry = useCallback(() => dispatch(startWatch()), [dispatch]);
  const onClickHelp = useCallback(
    () => dispatch(openDefaultBrowser(appConst.LP_INVITE_BOT_URL)),
    [dispatch]
  );

  return (
    <RecommendBotContent
      channelName={channelInfo ? channelInfo.name : ''}
      handleBack={handleBack}
      handleRetry={handleRetry}
      onClickHelp={onClickHelp}
      isLoading={isLoading}
    />
  );
};

export default RecommendBotContentPage;
