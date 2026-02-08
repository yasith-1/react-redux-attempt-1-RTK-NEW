import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // createAsyncThunk: API calls වැනි asynchronous වැඩ කරන්න අවශ්‍ය tool එක import කිරීම.

// 1. API එකෙන් දත්ත ලබා ගැනීමට (Asynchronous) Async Thunk එකක් හදමු.
// 'products/fetchProducts' යනු Redux action type එකේ නමයි. මෙය debugging වලදී අපිට පේනවා.
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    // `fetch` භාවිතා කරලා බාහිර API එකකින් දත්ත ඉල්ලීම (Request).
    const response = await fetch('https://fakestoreapi.com/products?limit=5');

    // Response එක සාර්ථකද කියලා බලනවා (200 OK range).
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // ලැබෙන දත්ත JSON format එකට හරවනවා. මේක තමයි `action.payload` එක වෙන්නේ.
    return response.json();
  } catch (error) {
    // Error එකක් ආවොත් එය reject කරනවා.
    throw error;
  }
});

// TypeScript: Product එකේ හැඩය (Structure) මොකක්ද කියලා හඳුන්වා දීම.
export interface Product {
  id: number;     // Product එකේ අංකය
  title: string;  // Product එකේ නම
  price: number;  // මිල
  description: string; // විස්තරය
  category: string; // වර්ගය
  image: string;  // රූපයේ URL එක
  rating: {
    rate: number; // රේටින්ග් අගය
    count: number; // රේටින්ග් ගණන
  };
}

// Slice එකේ State එකේ type එක නිර්මාණය කිරීම.
// මෙතන අයිතම (items) සහ status එක තියෙන්න ඕන.
interface ProductState {
  items: Product[];  // Product වර්ගයේ array එකක්.
  status: 'idle' | 'loading' | 'success' | 'failed'; // State එකේ අවස්ථා 4 ක්.
  error: string | null; // Error message එකක් තිබුනොත් store කරන්න.
}

// ආරම්භක අගයන් (Initial State) නිර්වචනය කිරීම.
const initialState: ProductState = {
  items: [],      // මුලින්ම items මුකුත් නෑ (empty array).
  status: 'idle', // තාම මුකුත් වෙලා නෑ (idle).
  error: null,    // මුලින්ම error එකක් නෑ.
};

const productSlice = createSlice({
  name: 'products', // Slide එකේ නම.
  initialState,     // උඩ හදාගත් ආරම්භක අගයන් ලබා දීම.
  reducers: {},     // Synchronous actions (සාමාන්‍ය වෙනස්කම්) අවශ්‍ය නම් මෙතන ලියන්න පුළුවන් (දැනට හිස්ව තබා ඇත).
  extraReducers: (builder) => {
    // 2. Async Thunk එකෙන් එන අවස්ථා 3 (Pending, Fulfilled, Rejected) මෙතනදී handle කරනවා.
    // මෙය `switch` statement එකක් වගේ වැඩ කරනවා.
    builder
      .addCase(fetchProducts.pending, (state) => {
        // API call එක යැවූ පසු, දත්ත තාම එන ගමන්.
        state.status = 'loading';
        state.error = null; // පරණ දෝෂ අයින් කරනවා.
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // දත්ත සාර්ථකව ලැබුණු විට (Success).
        state.status = 'success';
        // API එකෙන් ආපු දත්ත (action.payload) 'items' array එකට දමනවා.
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // යම් දෝෂයක් ආවොත් (Error/Failed).
        state.status = 'failed';
        // මෙතනදී error message එක state එකට දානවා.
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

// Reducer එක export කිරීම. Store එකට මෙය එකතු කරගන්න ඕන.
export default productSlice.reducer;