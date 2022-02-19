import { firebaseAuth } from '../firebase';
import * as authActions from './actions';

export function iniAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        dispatch(authActions.initAuth(authUser));
        unsubscribe();
        resolve();
      }, error => reject(error)
    );
  });
}