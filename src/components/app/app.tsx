import '../../index.css';
import styles from './app.module.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoutes } from '../protected-routes';
import { useDispatch } from '../../services/store';
import { checkAuth } from '../../services/slices/user-slice';
import { getIngredients } from '../../services/slices/ingredients-slice';

const App = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoutes onlyUnAuth>
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoutes onlyUnAuth>
              <Register />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoutes onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoutes onlyUnAuth>
              <ResetPassword />
            </ProtectedRoutes>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoutes>
                <ProfileOrders />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`Заказ №${location.pathname.split('/')[2]}`}
                onClose={() => navigator('/feed')}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={() => navigator('/profile/orders')}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Описание' onClose={() => navigator('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
