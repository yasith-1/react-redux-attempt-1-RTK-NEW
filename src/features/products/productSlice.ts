import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. API එකෙන් දත්ත ගේන Async Thunk එක
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=5'); // API Call එක
  return response.json(); // ලැබෙන දත්ත payload එක ලෙස යයි
});

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

interface ProductState {
    items: Product[];
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
};

const productSlice = createSlice({
  name: 'products',
  initialState, // status මගින් loading තත්වය බලමු
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // දත්ත එනකල් බලා සිටියි
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success'; // දත්ත සාර්ථකව ලැබුණි
        state.items = action.payload; // API එකෙන් ආපු දත්ත ටික state එකට දාමු
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'; // දත්ත ගෙන ඒම අසාර්ථකයි
      });
  }
});

export default productSlice.reducer;