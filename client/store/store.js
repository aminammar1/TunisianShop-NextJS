import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@/lib/storage'
import userReducer from './userSlice'
import productReducer from './ProductSlice'
import cartReducer from './cartSlice'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'

const persistConfig = {
  key: 'user',
  storage,
}

const UserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: UserReducer,
    product: productReducer,
    cartItem: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store)
