import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

import { userSagas } from './user/user.sagas';

import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  //all allow actions to be exected in Parallel- initiliase them all at once
  yield all([call(fetchCollectionsStart), call(userSagas), call(cartSagas)]);
}
