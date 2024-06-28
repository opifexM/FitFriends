import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { ReviewCreatePopup } from '../../component/review-create-popup/review-create-popup.tsx';
import { ReviewList } from '../../component/review-list/review-list.tsx';
import { TrainingDetail } from '../../component/training-detail/training-detail.tsx';
import { VideoBlock } from '../../component/video-block/video-block.tsx';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchLatestReview,
  fetchReviewByTraining,
  fetchTrainingDetail,
} from '../../store/api-action/data-action.ts';
import {
  getCurrentTraining,
  getReviews,
} from '../../store/api-communication/api-communication.selectors.ts';
import { getIsReviewCreatePopupOpen } from '../../store/ui-settings/ui-settings.selectors.ts';

export function TrainingDetailPage() {
  const { trainingId } = useParams<{ trainingId: string }>();
  const dispatch = useAppDispatch();
  const currentTraining = useAppSelector(getCurrentTraining);
  const reviews = useAppSelector(getReviews);
  const isReviewCreatePopupOpen = useAppSelector(getIsReviewCreatePopupOpen);

  useEffect(() => {
    if (trainingId) {
      dispatch(fetchTrainingDetail(trainingId));
      dispatch(fetchReviewByTraining({ trainingId: trainingId }));
      dispatch(fetchLatestReview());
    }
  }, [dispatch, trainingId]);

  if (!trainingId || !currentTraining) {
    return null;
  }

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        {isReviewCreatePopupOpen && <ReviewCreatePopup />}
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewList reviews={reviews} />
              <div className="training-card">
                <TrainingDetail training={currentTraining} />
                <VideoBlock />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
