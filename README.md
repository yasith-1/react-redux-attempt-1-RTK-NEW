# React Redux Toolkit පියවරෙන් පියවර මාර්ගෝපදේශය (Step-by-Step Guide)

මෙම ව්‍යාපෘතිය (Project) මගින් React යෙදුමක (Application) Redux Toolkit (RTK) නිවැරදිව භාවිතා කරන ආකාරය පෙන්වා දෙයි. මෙහිදී TypeScript භාවිතා කර ඇති අතර Code එක තේරුම් ගැනීමට පහසු සිංහල Comments ඇතුළත් කර ඇත.

## ව්‍යාපෘතිය ආරම්භ කිරීම (Getting Started)

ඔබගේ පරිගණකයේ මෙම ව්‍යාපෘතිය ක්‍රියාත්මක කිරීමට පහත පියවර අනුගමනය කරන්න:

1. **Install Dependencies:**
   Terminal එකේ පහත විධානය (command) type කරන්න.
   ```bash
   npm install
   ```
   (හෝ `yarn install`)

2. **Run the Project:**
   Development server එක පණගැන්වීමට:
   ```bash
   npm run dev
   ```

## ව්‍යාපෘතියේ ව්‍යුහය (Project Structure)

Redux Toolkit භාවිතා කරන විට පහත ආකාරයේ ගොනු ව්‍යුහයක් (File Structure) පවත්වා ගැනීම වැදගත් වේ:

*   **`src/store/store.ts`**:
    *   Redux Store එක නිර්මාණය කරන ප්‍රධාන තැන.
    *   මෙහිදී සියලුම Reducers එකතු කර (`configureStore`) ප්‍රධාන Store එක සාදයි.
    *   TypeScript සඳහා අවශ්‍ය `RootState` සහ `AppDispatch` types මෙතනින් export කරයි.

*   **`src/store/hooks.ts`**:
    *   TypeScript සමග වැඩ කිරීමේදී පහසුව සඳහා අපි `useSelector` සහ `useDispatch` වෙනුවට `useAppSelector` සහ `useAppDispatch` සාදා ගනිමු.
    *   මෙමගින් අපිට වැරදි අඩු කර ගැනීමට (Type Safety) සහ පහසුවෙන් කෝඩ් ලිවීමට (IntelliSense) හැකි වේ.

*   **`src/features/`**:
    *   අපගේ යෙදුමේ (Application) එක් එක් කොටස් වලට අදාළ Redux Logic මෙම folder එක තුළ ගබඩා කරයි.
    *   **`cart/cartSlice.ts`**: Cart එකට අදාළ දත්ත සහ ක්‍රියාකාරකම් (Actions).
        *   `createSlice` භාවිතා කර Reducer සහ Actions එකවර සාදයි.
        *   Immer library එක නිසා `state.count += 1` ලෙස කෙලින්ම වෙනස්කම් සිදු කළ හැක.
    *   **`products/productSlice.ts`**: Products වලට අදාළ දත්ත.
        *   `createAsyncThunk` භාවිතා කර API එකකින් දත්ත ලබා ගන්නා (Asynchronous) ආකාරය පෙන්වා දී ඇත.
        *   `extraReducers` මගින් API call එකේ `loading`, `success`, සහ `failed` අවස්ථා පාලනය කරයි.

*   **`src/components/ReduxTest.tsx`**:
    *   Redux Store එක සමග සම්බන්ධ වන React Component එක.
    *   `useAppSelector` මගින් දත්ත කියවීම (Read).
    *   `useAppDispatch` මගින් දත්ත වෙනස් කිරීමට විධාන (Actions/Dispatch) යැවීම.
    *   `useEffect` තුළ `fetchProducts` action එක call කර දත්ත ගෙන්වා ගැනීම.

## Redux ක්‍රියාත්මක වන ආකාරය (Process Flow)

1.  **Store සෑදීම**: `store.ts` හි `configureStore` මගින් සියලුම slices එකතු කරයි.
2.  **Provider සම්බන්ධ කිරීම**: `main.tsx` (හෝ `index.tsx`) හි `<Provider store={store}>` මගින් මුළු App එකටම store එක ලබා දෙයි.
3.  **Slice නිර්මාණය**: `createSlice` මගින් state එක, reducers සහ actions නිර්වචනය කරයි.
4.  **Async Thunks**: API calls සඳහා `createAsyncThunk` භාවිතා කරයි.
5.  **Component භාවිතා කිරීම**:
    *   `useAppDispatch()` -> Action එකක් යවන්න (උදා: `dispatch(addToCart())`).
    *   `useAppSelector()` -> State එකේ අගයක් ලබාගන්න (උදා: `const count = useAppSelector(state => state.cart.count)`).

## විශේෂ කරුණු (Key Points)

*   **Immer Library**: Redux Toolkit වලදී ඔබට state එක කෙලින්ම වෙනස් කරන්න (mutate) පුළුවන් විදියට ලිව්වට, ඇතුලාන්තයෙන් එය Immutable විදියට update වෙනවා.
*   **Typed Hooks**: TypeScript භාවිතා කරනවා නම් අනිවාර්යයෙන්ම `useAppSelector` සහ `useAppDispatch` භාවිතා කරන්න.
*   **Slices**: ඔබේ App එකේ features අනුව logic වෙන් කරන්න (Cart, Users, Products..).

දැන් ඔබට `src/components/ReduxTest.tsx` එක බලලා Redux වැඩ කරන විදිය බලාගන්න පුළුවන්! සුබ පැතුම්!
