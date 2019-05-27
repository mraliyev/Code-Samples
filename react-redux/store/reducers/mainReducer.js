import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { statReducer } from './statReducer';
import { ticketReducer } from './ticketReducer';
import { userReducer } from './userReducer';
import { phoneReducer } from './phoneReducer';
import { settingReducer } from './settingReducer';

const mainReducer = combineReducers({
  auth: authReducer,
  tickets: ticketReducer,
  stats: statReducer,
  usersOnline: userReducer,
  phones: phoneReducer,
  settings: settingReducer,
});

export default mainReducer;
