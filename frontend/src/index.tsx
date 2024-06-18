import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { App } from './app.tsx';
import { LoadingScreen } from './component/loading-screen/loading-screen.tsx';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <ToastContainer />
    <LoadingScreen />
    <App />
  </Provider>,
);
