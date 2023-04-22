import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, 
    persistStore, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import rootReducer from "./reducers/index.js";


const persistedState = persistReducer({ key: 'state', storage: AsyncStorage }, rootReducer);
const store = configureStore({
    reducer: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
const persistor = persistStore(store);
setupListeners(store.dispatch)

export { persistor };
export default store;