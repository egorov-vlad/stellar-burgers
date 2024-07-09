import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  loginUser,
  selectError,
  selectUserIsLoading
} from '../../services/slices/user-slice';
import { Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const isLoading = useSelector(selectUserIsLoading);

  let errorText = useSelector(selectError) as string;

  useEffect(() => {
    dispatch(clearError());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password })).then(() => {
      navigator('/profile');
    });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
