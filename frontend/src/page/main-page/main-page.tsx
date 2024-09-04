import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { MainSpecialLooking } from '../../component/main-special-looking/main-special-looking.tsx';
import { MainPopularTraining } from '../../component/main-popular-training/main-popular-training.tsx';
import { MainSpecialForYou } from '../../component/main-special-for-you/main-special-for-you.tsx';
import { MainSpecialOffer } from '../../component/main-special-offer/main-special-offer.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchSpecialLookingUser,
  fetchTraining,
  fetchTrainingFouYou,
  fetchTrainingSpecialPrice,
  fetchUserDetail,
} from '../../store/api-action/data-action.ts';
import { getUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getIsQuestionnaireOpen } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function MainPage() {
  const navigate = useNavigate();
  const isQuestionnaireOpen = useAppSelector(getIsQuestionnaireOpen);
  const userDetail = useAppSelector(getUserDetail);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setMenuStatus(MenuType.MAIN));
    dispatch(fetchUserDetail());
    dispatch(fetchTraining());
    dispatch(fetchTrainingFouYou());
    dispatch(fetchTrainingSpecialPrice());
    dispatch(fetchSpecialLookingUser());
  }, [dispatch]);

  useEffect(() => {
    if (isQuestionnaireOpen) {
      navigate(AppRoute.Questionnaire);
    }
  }, [isQuestionnaireOpen, navigate]);

  useEffect(() => {
    if (userDetail && userDetail.role === RoleType.COACH) {
      navigate(AppRoute.PersonalAccount);
    }
  }, [userDetail, navigate]);

  if (!userDetail) {
    return null;
  }

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
        <MainSpecialLooking />
      </main>
    </div>
  );
}
