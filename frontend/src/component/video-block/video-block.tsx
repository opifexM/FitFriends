import { useState } from 'react';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import { BalanceDto } from 'shared/type/balance/dto/balance.dto.ts';
import { PurchaseStatusType } from 'shared/type/enum/purchase-status-type.enum.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import {
  activateBalancePurchase,
  deactivateBalancePurchase,
  fetchBalances,
} from '../../store/api-action/data-action.ts';

interface VideoBlockProps {
  training: TrainingDto;
  currentBalance: undefined | BalanceDto;
}

export function VideoBlock({
  training,
  currentBalance,
}: Readonly<VideoBlockProps>) {
  const dispatch = useAppDispatch();
  const [playing, setPlaying] = useState(false);

  function handleDeactivate() {
    if (!currentBalance) {
      return;
    }

    dispatch(deactivateBalancePurchase(currentBalance.id))
      .unwrap()
      .then(() => {
        toast.success('Training finished successful', {
          position: 'top-right',
        });
        dispatch(fetchBalances());
        setPlaying(false);
      });
  }

  function handleActivate() {
    if (!currentBalance) {
      return;
    }

    dispatch(activateBalancePurchase(currentBalance.id))
      .unwrap()
      .then(() => {
        toast.success('Training stated successful', {
          position: 'top-right',
        });
        dispatch(fetchBalances());
        setPlaying(true);
      });
  }

  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      <div className="training-video__video">
        <div className="training-video__thumbnail">
          {currentBalance &&
          currentBalance.purchaseStatus === PurchaseStatusType.IN_PROGRESS ? (
            <ReactPlayer
              url={`${UPLOAD_DIRECTORY}${training.videoId}`}
              playing={playing}
              controls
              width="100%"
              height="100%"
            />
          ) : (
            <>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
                />
                <img
                  src={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
                  srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId} 2x`}
                  width="922"
                  height="566"
                  alt="Обложка видео"
                />
              </picture>
              <button className="training-video__play-button btn-reset">
                <svg width="18" height="30" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="training-video__buttons-wrapper">
        {!currentBalance && (
          <button
            className="btn training-video__button training-video__button--start"
            type="button"
            disabled
          >
            Приступить
          </button>
        )}
        {currentBalance &&
          currentBalance.purchaseStatus === PurchaseStatusType.FINISHED && (
            <button
              className="btn training-video__button training-video__button--start"
              type="button"
              disabled
            >
              Приступить
            </button>
          )}
        {currentBalance &&
          currentBalance.purchaseStatus === PurchaseStatusType.NOT_STARTED && (
            <button
              className="btn training-video__button training-video__button--start"
              type="button"
              onClick={handleActivate}
            >
              Приступить
            </button>
          )}
        {currentBalance &&
          currentBalance.purchaseStatus === PurchaseStatusType.IN_PROGRESS && (
            <button
              className="btn training-video__button training-video__button--start"
              type="button"
              onClick={handleDeactivate}
            >
              Закончить
            </button>
          )}
      </div>
    </div>
  );
}
