import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from "./reducers/index.js";


const persistedState = persistReducer({ key: 'state', storage: AsyncStorage }, rootReducer);
const store = configureStore({
    reducer: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
const persistor = persistStore(store);
setupListeners(store.dispatch)

export { persistor };
export default store;