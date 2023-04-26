import db from '../../firebase/config';
import { authSlice } from './authReducer';

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authRegisterUser =
  ({ password, email, login, photo = '' }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        email: email,
        photoURL: photo,
      });

      const { displayName, uid, email, photoURL } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email: email,
        photo: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };
export const authLoginUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authLogOutUser = () => async (dispatch, getState) => {
  try {
    await db.auth().signOut();

    dispatch(authSignOut());
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged(user => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          photo: user.photoURL,
          email: user.email,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
  }
};
