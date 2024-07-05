import { useEffect } from 'react';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { MainPopularTraining } from '../../component/main-popular-training/main-popular-training.tsx';
import { MainSpecialForYou } from '../../component/main-special-for-you/main-special-for-you.tsx';
import { MainSpecialOffer } from '../../component/main-special-offer/main-special-offer.tsx';
import { useAppDispatch } from '../../hook';
import {
  fetchTraining,
  fetchTrainingFouYou,
} from '../../store/api-action/data-action.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function MainPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setMenuStatus(MenuType.MAIN));
    dispatch(fetchTraining());
    dispatch(fetchTrainingFouYou());
  }, [dispatch]);

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
