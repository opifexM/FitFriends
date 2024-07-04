import { useEffect } from 'react';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { PersonalAccountDetail } from '../../component/personal-account-detail/personal-account-detail.tsx';
import { PersonalAccountList } from '../../component/personal-account-list/personal-account-list.tsx';
import { PersonalAccountSchedule } from '../../component/personal-account-schedule/personal-account-schedule.tsx';
import { useAppDispatch } from '../../hook';
import {
  fetchLatestQuestionnaire,
  fetchUserDetail,
} from '../../store/api-action/data-action.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function PersonalAccountPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.PERSONAL));
    dispatch(fetchUserDetail());
    dispatch(fetchLatestQuestionnaire());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <PersonalAccountDetail />
              <div className="personal-account-user">
                <PersonalAccountSchedule />
                <PersonalAccountList />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
