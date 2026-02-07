import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { count: 0 },
  reducers: {
    // Action එක සහ Reducer එක දෙකම මෙතන තියෙන්නේ
    addToCart: (state) => {
      state.count += 1; // කෙලින්ම අගය වෙනස් කළ හැක (Immer පාවිච්චි වන බැවින්)
    }
  }
});

export const { addToCart } = cartSlice.actions; // Action එක export කිරීම
export default cartSlice.reducer; // Reducer එක export කිරීම