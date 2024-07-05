import { useEffect } from 'react';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { QuestionnaireVisitor } from '../../component/questionnaire-visitor/questionnaire-visitor.tsx';
import { useAppDispatch } from '../../hook';
import { fetchLatestQuestionnaire } from '../../store/api-action/data-action.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function QuestionnairePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLatestQuestionnaire());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <main>
        <div className="background-logo">
          <svg
            className="background-logo__logo"
            width="750"
            height="284"
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg
            className="background-logo__icon"
            width="343"
            height="343"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <QuestionnaireVisitor />
          </div>
        </div>
      </main>
    </div>
  );
}
