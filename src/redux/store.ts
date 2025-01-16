import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AutomationReducer from './slices/automations'


const rootReducer = combineReducers({
    AutomationReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;