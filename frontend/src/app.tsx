import { ComponentType, useEffect } from 'react';
import {
  BrowserRouter,
  BrowserRouterProps,
  MemoryRouterProps,
  Route,
  Routes,
} from 'react-router-dom';
import { PrivateRoute } from './component/private-route/private-route.tsx';
import { AppRoute, AuthorizationStatus } from './const.ts';
import { useAppDispatch, useAppSelector } from './hook';
import { IntroPage } from './page/intro-page/intro-page.tsx';
import { LoginPage } from './page/login-page/login-page.tsx';
import { MainPage } from './page/main-page/main-page.tsx';
import { NotFoundPage } from './page/not-found-page/not-found-page.tsx';
import { QuestionnairePage } from './page/questionnaire-page/questionnaire-page.tsx';
import { RegistrationPage } from './page/registration-page/registration-page.tsx';
import { TrainingCreatePage } from './page/training-create-page/training-create-page.tsx';
import { TrainingDetailPage } from './page/training-detail-page/training-detail-page.tsx';
import { TrainingListPage } from './page/training-list-page/training-list-page.tsx';
import { checkAuthAction } from './store/api-action/user-auth-action.ts';
import { getAuthorizationStatus } from './store/api-communication/api-communication.selectors.ts';

type CustomRouterProps = BrowserRouterProps | MemoryRouterProps;

interface AppProps {
  RouterComponent?: ComponentType<CustomRouterProps>;
  routerProps?: CustomRouterProps;
}

export function App({
  RouterComponent = BrowserRouter,
  routerProps = {},
}: Readonly<AppProps>) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    <RouterComponent {...routerProps}>
      <Routes>
        <Route
          path={AppRoute.Intro}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
              declinedElement={AppRoute.Main}
            >
              <IntroPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Main}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Intro}
            >
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
              declinedElement={AppRoute.Main}
            >
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
              declinedElement={AppRoute.Main}
            >
              <RegistrationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Questionnaire}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Intro}
            >
              <QuestionnairePage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.CreateTraining}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Intro}
            >
              <TrainingCreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.ListTraining}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Intro}
            >
              <TrainingListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainingCard}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Intro}
            >
              <TrainingDetailPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RouterComponent>
  );
}
