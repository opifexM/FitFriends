import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { PersonalAccountCoachCertificateList } from '../../component/personal-account-coach-certificate-list/personal-account-coach-certificate-list.tsx';
import { PersonalAccountCoachList } from '../../component/personal-account-coach-list/personal-account-coach-list.tsx';
import { PersonalAccountDetail } from '../../component/personal-account-detail/personal-account-detail.tsx';
import { PersonalAccountVisitorList } from '../../component/personal-account-visitor-list/personal-account-visitor-list.tsx';
import { PersonalAccountVisitorSchedule } from '../../component/personal-account-visitor-schedule/personal-account-visitor-schedule.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchLatestQuestionnaire,
  fetchUserDetail,
} from '../../store/api-action/data-action.ts';
import { getUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getIsQuestionnaireOpen } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function PersonalAccountPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector(getUserDetail);
  const isQuestionnaireOpen = useAppSelector(getIsQuestionnaireOpen);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.PERSONAL));
    dispatch(fetchUserDetail());
    dispatch(fetchLatestQuestionnaire());
  }, [dispatch]);

  useEffect(() => {
    if (isQuestionnaireOpen) {
      navigate(AppRoute.Questionnaire);
    }
  }, [isQuestionnaireOpen, navigate]);

  if (!userDetail) {
    return null;
  }

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
              {userDetail.role === RoleType.VISITOR && (
                <div className="personal-account-user">
                  <PersonalAccountVisitorSchedule />
                  <PersonalAccountVisitorList />
                </div>
              )}
              {userDetail.role === RoleType.COACH && (
                <div className="inner-page__content personal-account-coach">
                  <PersonalAccountCoachList />
                  <PersonalAccountCoachCertificateList />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
