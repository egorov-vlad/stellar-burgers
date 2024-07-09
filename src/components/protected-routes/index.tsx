import { Preloader } from '@ui';
import { Navigate } from 'react-router';
import { useSelector } from '../../services/store';
import {
  selectIsAuthChecked,
  selectIsAuthenticated
} from '../../services/slices/user-slice';
import { useLocation } from 'react-router-dom';

type TProtectedRoutesProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoutes = ({
  children,
  onlyUnAuth
}: TProtectedRoutesProps) => {
  const isUserAuth = useSelector(selectIsAuthenticated);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isUserAuth) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  if (onlyUnAuth && isUserAuth) {
    return <Navigate to={`${location.state?.from || '/'}`} />;
  }

  return children;
};
