import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { OrderCreatePopup } from '../../component/order-create-popup/order-create-popup.tsx';
import { ReviewCreatePopup } from '../../component/review-create-popup/review-create-popup.tsx';
import { ReviewList } from '../../component/review-list/review-list.tsx';
import { TrainingDetail } from '../../component/training-detail/training-detail.tsx';
import { VideoBlock } from '../../component/video-block/video-block.tsx';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchBalances,
  fetchLatestReview,
  fetchReviewByTraining,
  fetchTrainingDetail,
  fetchUserDetail,
} from '../../store/api-action/data-action.ts';
import {
  getBalances,
  getCurrentTraining,
  getReviews,
  getUserDetail,
} from '../../store/api-communication/api-communication.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function TrainingDetailPage() {
  const { trainingId } = useParams<{ trainingId: string }>();
  const dispatch = useAppDispatch();
  const currentTraining = useAppSelector(getCurrentTraining);
  const reviews = useAppSelector(getReviews);
  const balances = useAppSelector(getBalances);
  const userDetail = useAppSelector(getUserDetail);

  useEffect(() => {
    if (trainingId) {
      dispatch(fetchTrainingDetail(trainingId));
      dispatch(fetchBalances());
      dispatch(fetchReviewByTraining({ trainingId: trainingId }));
      dispatch(fetchLatestReview());
      dispatch(fetchUserDetail());
    }
  }, [dispatch, trainingId]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  if (!trainingId || !currentTraining || !userDetail) {
    return null;
  }

  const currentBalance = balances.find(
    (balance) => balance.training === currentTraining.id,
  );

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <ReviewCreatePopup />
        <OrderCreatePopup />
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewList reviews={reviews} userDetail={userDetail} />
              <div className="training-card">
                <TrainingDetail
                  training={currentTraining}
                  currentBalance={currentBalance}
                />
                <VideoBlock
                  training={currentTraining}
                  currentBalance={currentBalance}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
