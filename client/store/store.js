import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@/utils/storage'
import userReducer from './userSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const UserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
