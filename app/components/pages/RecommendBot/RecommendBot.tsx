import React from 'react';
import RecommendBotContent from '../../organisms/RecommendBotContent';
import Header from '../../organisms/WindowHeader';
import { useRecommendBotHeaderMenu } from './useRecommendBotHeaderMenu';

const RecommendBot: React.FC = () => {
  const { headerMenus, screenMenus } = useRecommendBotHeaderMenu();
  return (
    <>
      <Header withMenu headerMenus={headerMenus} screenMenus={screenMenus} />
      <RecommendBotContent />
    </>
  );
};

export default RecommendBot;
