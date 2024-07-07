import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { MainPopularTraining } from '../../component/main-popular-training/main-popular-training.tsx';
import { MainSpecialForYou } from '../../component/main-special-for-you/main-special-for-you.tsx';
import { MainSpecialOffer } from '../../component/main-special-offer/main-special-offer.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchTraining,
  fetchTrainingFouYou,
} from '../../store/api-action/data-action.ts';
import { getIsQuestionnaireOpen } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function MainPage() {
  const navigate = useNavigate();
  const isQuestionnaireOpen = useAppSelector(getIsQuestionnaireOpen);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setMenuStatus(MenuType.MAIN));
    dispatch(fetchTraining());
    dispatch(fetchTrainingFouYou());
  }, [dispatch]);

  useEffect(() => {
    if (isQuestionnaireOpen) {
      navigate(AppRoute.Questionnaire);
    }
  }, [isQuestionnaireOpen, navigate]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <h1 className="visually-hidden">
          FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
        </h1>
        <MainSpecialForYou />
        <MainSpecialOffer />
        <MainPopularTraining />
        {/* <MainLookCompany /> */}
      </main>
    </div>
  );
}
