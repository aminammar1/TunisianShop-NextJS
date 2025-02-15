import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@/lib/storage'
import userReducer from './userSlice'
import productReducer from './ProductSlice'
import cartReducer from './cartSlice'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const UserReducer = persistReducer(persistConfig, userReducer)
const ProductReducer = persistReducer(persistConfig, productReducer)
const CartReducer = persistReducer(persistConfig, cartReducer)
const AddressReducer = persistReducer(persistConfig, addressReducer)
const OrderReducer = persistReducer(persistConfig, orderReducer)

export const store = configureStore({
  reducer: {
    user: UserReducer,
    product: ProductReducer,
    cartItem: CartReducer,
    address: AddressReducer,
    order: OrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
