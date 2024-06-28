import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { TrainingCreate } from '../../component/training-create/training-create.tsx';

export function TrainingCreatePage() {
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
