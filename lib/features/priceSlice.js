import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  selectedCrypto: 'BTC',
  prices: {},
  loading: false,
  error: null,
};

export const fetchCryptoPrice = createAsyncThunk(
  'price/fetchCryptoPrice',
  async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/price/${initialState.selectedCrypto}`); 
    return response.data; 
  }
);

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    cryptoSelected(state, action) {
      state.selectedCrypto = action.payload;
    },
  },
  extraReducers: (builder) => { // Refactored for createAsyncThunk
    builder
      .addCase(fetchCryptoPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.prices[state.selectedCrypto] = action.payload; // Store price data by symbol
      })
      .addCase(fetchCryptoPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

export const { cryptoSelected } = priceSlice.actions;
export default priceSlice.reducer;