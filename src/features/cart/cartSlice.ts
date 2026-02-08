import { createSlice } from '@reduxjs/toolkit'; // Redux state එක manage කරන්න අවශ්‍ය slice එක හදන්න import කිරීම.

// Cart එකට අදාල state එක සහ actions නිර්මාණය කිරීම.
// 'Slice' එකක් කියන්නේ Redux store එකෙන් පොඩි කොටසක් (like a slice of cake).
const cartSlice = createSlice({
  name: 'cart', // මේ slice එකේ නම. Debugging  වලදී මේ නම පේනවා.
  initialState: { count: 0 }, // ආරම්භක අගය (Cart එකේ item ගණන 0 යි).
  reducers: {
    // Action එක සහ State එක වෙනස් කරන Reducer Logic එක.
    // මෙහි 'state' කියන්නේ දැනට තියෙන අගයයි.
    addToCart: (state) => {
      // Redux Toolkit වල Immer library එක තියෙන නිසා අපිට state එක කෙලින්ම වෙනස් කරන්න (Mutate) පුළුවන්.
      // උදාහරණයක් ලෙස `state.count += 1` කියලා ලියන්න පුළුවන්.
      // නමුත් සාමාන්‍ය Redux වලදී මෙය තහනම්ය (Immutable update patterns භාවිතා කළ යුතුය).
      state.count += 1;
    }
  }
});

// Component එකේදී පාවිච්චි කරන්න Action එක export කරයි.
// `dispatch(addToCart())` කියලා component එකේ call කරන්න පුළුවන්.
export const { addToCart } = cartSlice.actions;

// Store එකට සම්බන්ධ කරන්න Reducer එක export කරයි.
// මෙය store.ts file එකේදී import කරගනු ලැබේ.
export default cartSlice.reducer;