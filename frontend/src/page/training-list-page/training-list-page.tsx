import { useEffect } from 'react';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { TrainingFilter } from '../../component/training-filter/training-filter.tsx';
import { TrainingList } from '../../component/training-list/training-list.tsx';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchTraining } from '../../store/api-action/data-action.ts';
import { getUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getTrainingFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import {
  setMenuStatus,
  setTrainingFilterCoachId,
} from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function TrainingListPage() {
  const dispatch = useAppDispatch();
  const trainingFilter = useAppSelector(getTrainingFilter);
  const userDetail = useAppSelector(getUserDetail);

  useEffect(() => {
    if (userDetail && userDetail.role === RoleType.COACH) {
      dispatch(setTrainingFilterCoachId(userDetail.id));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTraining(trainingFilter));
  }, [dispatch, trainingFilter]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <TrainingFilter />
              <TrainingList />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
