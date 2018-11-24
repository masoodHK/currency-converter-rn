import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const rootStore = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(rootStore);

export {
    rootStore,
    persistor
}