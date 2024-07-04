import { useAppSelector } from '../../hook';
import { getLastQuestionnaire } from '../../store/api-communication/api-communication.selectors.ts';

const WEEK_DAYS_COUNT = 7;

export function PersonalAccountSchedule() {
  const questionnaire = useAppSelector(getLastQuestionnaire);

  if (!questionnaire) {
    return null;
  }

  return (
    <div className="personal-account-user__schedule">
      <div className="personal-account-user__form">
        <div className="personal-account-user__input">
          <label>
            <span className="personal-account-user__label">
              План на день, ккал
            </span>
            <input
              type="text"
              name="schedule-for-the-day"
              value={questionnaire.dailyCalorieBurn}
              disabled
            />
          </label>
        </div>
        <div className="personal-account-user__input">
          <label>
            <span className="personal-account-user__label">
              План на неделю, ккал
            </span>
            <input
              type="text"
              name="schedule-for-the-week"
              value={questionnaire.dailyCalorieBurn * WEEK_DAYS_COUNT}
              disabled
            />
          </label>
        </div>
      </div>
    </div>
  );
}
