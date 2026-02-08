import { useEffect } from 'react'; // React සහ useEffect hook එක
import { useAppSelector, useAppDispatch } from '../store/hooks'; // අපි හදාගත් typed hooks import කිරීම.
import { addToCart } from '../features/cart/cartSlice'; // Cart එකට බඩු දාන action එක.
import { fetchProducts, type Product } from '../features/products/productSlice'; // Products ගෙන්වන thunk සහ Product type එක.

function ReduxTest() {
  // Dispatch function එක ලබා ගැනීම (Actions යවන්න).
  const dispatch = useAppDispatch();

  // Store එකෙන් දත්ත (State) ලබා ගැනීම (Reading State).
  // 'state.cart' එකෙන් cart එකේ count එක ගන්නවා.
  const { count } = useAppSelector((state) => state.cart);
  // 'state.products' එකෙන් items සහ status එක ගන්නවා.
  const { items, status, error } = useAppSelector((state) => state.products);

  // App එක load වෙද්දීම API එකෙන් බඩු ටික ගේමු.
  useEffect(() => {
    // Component එක mount වුනාම 'fetchProducts' action එක dispatch කරනවා.
    dispatch(fetchProducts());
  }, [dispatch]); // dispatch වෙනස් වුනොත් විතරක් ආයේ දුවන්න (සාමාන්‍යයෙන් මේක වෙනස් වෙන්නේ නෑ).

  return (
    <div style={{ padding: '20px' }}>
      <h1>RTK Shopping Store</h1>

      {/* Cart එකේ තියෙන Items ගණන පෙන්වීම */}
      <h3>Cart Items: {count}</h3>

      <hr />

      <h2>Products</h2>

      {/* Loading වෙනකොට පොඩි message එකක් පෙන්වන්න */}
      {status === 'loading' && <p>Loading products...</p>}

      {/* Error එකක් ආවොත් ඒක පෙන්වන්න */}
      {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {/* Products ටික map කරලා පෙන්නන්න */}
        {items.map((product: Product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '150px' }}>
            {/* නම දිග වැඩි නම් මුල් අකුරු 20 විතරක් පෙන්නන්න */}
            <p>{product.title.substring(0, 20)}...</p>

            {/* Button එක click කරාම Cart එකට add වෙන්න action එක යවන්න */}
            <button onClick={() => dispatch(addToCart())}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReduxTest; // Component එක export කිරීම.