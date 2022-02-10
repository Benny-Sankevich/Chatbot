import { AuthStateInterface } from './models';

const sessionStorageUser = JSON.parse(sessionStorage.getItem('user'));

const state: AuthStateInterface = {
  user: sessionStorageUser ? sessionStorageUser : null,
};

export default state;
