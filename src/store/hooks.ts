import { useDispatch, useSelector } from 'react-redux'; // Redux library එකෙන්ම එන සාමාන්‍ය hooks import කිරීම.
import type { TypedUseSelectorHook } from 'react-redux'; // TypeScript සඳහා අවශ්‍ය type එකක් import කිරීම.
import type { RootState, AppDispatch } from './store'; // අපි store.ts file එකේ හදාගත් types import කිරීම.

// අපේ application එක පුරාම සාමාන්‍ය `useDispatch` වෙනුවට මේ `useAppDispatch` එක පාවිච්චි කරන්න ඕන.
// මේකෙන් අපිට TypeScript වලදී වැරදි අල්ලගන්න උදව් වෙනවා.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// සාමාන්‍ය `useSelector` වෙනුවට මේක පාවිච්චි කරන්න.
// එතකොට state එකේ තියෙන දේවල් ගැන TypeScript හරියටම දැනගන්නවා (Auto-completion වැඩ කරනවා).
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
