import { useEffect } from 'react';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { TrainingCreate } from '../../component/training-create/training-create.tsx';
import { useAppDispatch } from '../../hook';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function TrainingCreatePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <TrainingCreate />
          </div>
        </div>
      </main>
    </div>
  );
}
