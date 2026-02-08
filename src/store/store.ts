import { configureStore } from '@reduxjs/toolkit'; // Redux Toolkit වලින් store එක හදන්න අවශ්‍ය function එක import කිරීම.
import cartReducer from '../features/cart/cartSlice'; // Cart එකට අදාළ reducer එක import කිරීම.
import productReducer from '../features/products/productSlice'; // Products වලට අදාළ reducer එක import කිරීම.

// Redux Store එක නිර්මාණය කිරීම.
// මෙතනදී අපි අපගේ සියලුම reducers එකතු කර එක store එකක් හදනවා.
const store = configureStore({
  reducer: {
    cart: cartReducer,     // 'cart' කියන නමින් cartReducer එක store එකට සම්බන්ධ කිරීම.
    products: productReducer // 'products' කියන නමින් productReducer එක store එකට සම්බන්ධ කිරීම.
  }
});

export default store; // හදාගත් store එක මුළු app එක පුරාම පාවිච්චි කරන්න export කිරීම.

// TypeScript සඳහා අවශ්‍ය Types (වර්ග) නිර්මාණය කිරීම.

// RootState: Store එකේ තියෙන සම්පූර්ණ state එකේ structure එක (type එක) ලබා ගැනීම.
// අපිට පස්සේ `useSelector` පාවිච්චි කරනකොට මේ type එක ඕන වෙනවා.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch: Store එකේ dispatch function එකේ type එක ලබා ගැනීම.
// Async thunks (API calls) යවනකොට මේ type එක ඕන වෙනවා.
export type AppDispatch = typeof store.dispatch;