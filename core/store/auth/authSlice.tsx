/* eslint-disable prettier/prettier */
import {create} from 'zustand';
import {createSelectors} from '../utils';
import type {UserType} from './utils';
import {setToken, getToken, removeToken} from './utils';

interface AuthState {
  user: UserType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: UserType) => void;
  updateToken: (data: any) => void;
  signOut: () => void;
  hydrate: () => void;
}
const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  user: null,
  signIn: async user => {
    await setToken(user);
    set({status: 'signIn', user: user});
  },
  signOut: async () => {
    await removeToken();
    set({status: 'signOut', user: null});
  },
  hydrate: async () => {
    try {
      const userToken = await getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
  updateToken:async (user:any) =>{
    await setToken(user);
  }
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (user: UserType) => _useAuth.getState().signIn(user);
export const hydrateAuth = () => _useAuth.getState().hydrate();
export const updateToken =(user:any) => _useAuth.getState().updateToken(user);
