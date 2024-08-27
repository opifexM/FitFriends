import ReactDOM from 'react-dom/client';
import { pdfjs } from 'react-pdf';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { App } from './app.tsx';
import { LoadingScreen } from './component/loading-screen/loading-screen.tsx';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

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

//todo "typescript": "^5.1.3"
