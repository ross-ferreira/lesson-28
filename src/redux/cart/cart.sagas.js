import { all, call, takeLatest, put } from 'redux-saga/effects';

//listening for User actions
import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

/**
 * CART SAGA CALLS
 **/
export function* clearCartOnSignOut() {
  yield put(clearCart());
}

/**
 * CART SAGA Listeners
 **/
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

/**
 * CART ROOT SAGA
 **/

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
