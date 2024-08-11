import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { PublicAccountCoach } from '../../component/public-account-coach/public-account-coach.tsx';
import { PublicAccountVisitor } from '../../component/public-account-visitor/public-account-visitor.tsx';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchCoachTraining,
  fetchPublicUserDetail,
} from '../../store/api-action/data-action.ts';
import { getPublicUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function PublicUserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const publicUserDetail = useAppSelector(getPublicUserDetail);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPublicUserDetail(userId));
      dispatch(fetchCoachTraining(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  if (!userId || !publicUserDetail) {
    return null;
  }

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            {publicUserDetail.role === RoleType.VISITOR && (
              <PublicAccountVisitor publicUserDetail={publicUserDetail} />
            )}
            {publicUserDetail.role === RoleType.COACH && (
              <PublicAccountCoach publicUserDetail={publicUserDetail} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
