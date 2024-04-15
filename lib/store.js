import { configureStore } from '@reduxjs/toolkit'
import priceReducer from './features/priceSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      price: priceReducer,
    },
  })
}

export default makeStore;