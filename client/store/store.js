import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@/lib/storage'
import userReducer from './userSlice'
import productReducer from './ProductSlice'
import cartReducer from './cartSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const UserReducer = persistReducer(persistConfig, userReducer)
const ProductReducer = persistReducer(persistConfig, productReducer)
const CartReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    user: UserReducer,
    product: ProductReducer,
    cartItem: CartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
