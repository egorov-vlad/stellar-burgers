import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetOrder,
  selectOrderBurgerIsLoading,
  selectOrderBurgerOrder,
  sendOrderBurger
} from '../../services/slices/order-burger-slice';
import {
  resetConstructor,
  selectSelectedBun,
  selectSleetedIngredients
} from '../../services/slices/constructor-slice';
import { selectUser } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const selectedBun = useSelector(selectSelectedBun);
  const selectedIngredients = useSelector(selectSleetedIngredients);
  const user = useSelector(selectUser);

  const constructorItems = {
    bun: selectedBun,
    ingredients: selectedIngredients
  };

  const orderRequest = useSelector(selectOrderBurgerIsLoading);
  const orderModalData = useSelector(selectOrderBurgerOrder);

  const onOrderClick = () => {
    if (!user) {
      navigator('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = constructorItems.ingredients.map(
      (item: TConstructorIngredient) => item._id
    );

    dispatch(
      sendOrderBurger([...ingredientsIds, constructorItems.bun._id])
    ).then(() => {
      dispatch(resetConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    navigator('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
