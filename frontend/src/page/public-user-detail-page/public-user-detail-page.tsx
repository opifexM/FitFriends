import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { CertificateViewPopup } from '../../component/certificate-view-popup/certificate-view-popup.tsx';
import { Header } from '../../component/header/header.tsx';
import { LocationViewPopup } from '../../component/location-vew-popup/location-view-popup.tsx';
import { PublicAccountCoach } from '../../component/public-account-coach/public-account-coach.tsx';
import { PublicAccountVisitor } from '../../component/public-account-visitor/public-account-visitor.tsx';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchCoachTraining,
  fetchPublicUserDetail,
  fetchUserDetail,
} from '../../store/api-action/data-action.ts';
import {
  getPublicUserDetail,
  getUserDetail,
} from '../../store/api-communication/api-communication.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function PublicUserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const publicUserDetail = useAppSelector(getPublicUserDetail);
  const currentUserDetail = useAppSelector(getUserDetail);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPublicUserDetail(userId));
      dispatch(fetchCoachTraining(userId));
      dispatch(fetchUserDetail());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  if (!userId || !publicUserDetail || !currentUserDetail) {
    return null;
  }
  const isCurrentUser = currentUserDetail.id === publicUserDetail?.id;

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <CertificateViewPopup />
        <LocationViewPopup />
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            {publicUserDetail.role === RoleType.VISITOR && (
              <PublicAccountVisitor
                publicUserDetail={publicUserDetail}
                isCurrentUser={isCurrentUser}
                currentUserDetail={currentUserDetail}
              />
            )}
            {publicUserDetail.role === RoleType.COACH && (
              <PublicAccountCoach
                publicUserDetail={publicUserDetail}
                isCurrentUser={isCurrentUser}
                currentUserDetail={currentUserDetail}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
