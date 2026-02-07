import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../store/store';
import { fetchProducts } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';

function ReduxTest() {
    const dispatch = useDispatch<AppDispatch>();

    // Store එකෙන් දත්ත ලබා ගැනීම
    const { count } = useSelector((state: RootState) => state.cart);
    const { items, status } = useSelector((state: RootState) => state.products);

    // App එක load වෙද්දීම API එකෙන් බඩු ටික ගේමු
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>RTK Shopping Store</h1>
                <h3 style={{ margin: 0 }}>
                    Cart Items: <span style={styles.cartBadge}>{count}</span>
                </h3>
            </div>

            <hr style={{ borderColor: '#444' }} />

            <h2>Products</h2>
            {status === 'loading' && <p>Loading products...</p>}

            <div style={styles.grid}>
                {items.map((product) => (
                    <div key={product.id} style={styles.card}>
                        <p>{product.title.substring(0, 20)}...</p>
                        <button 
                            onClick={() => dispatch(addToCart())}
                            style={styles.primaryButton}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: '#333',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    },
    cartBadge: {
        backgroundColor: '#444',
        padding: '8px 15px',
        borderRadius: '20px',
        fontWeight: 'bold' as const,
        border: '1px solid #555',
    },
    count: {
        color: '#646cff',
        marginLeft: '5px',
        fontSize: '1.2rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#2a2a2a',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #3a3a3a',
    },
    productList: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
        marginTop: '15px',
    },
    productItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 15px',
        borderRadius: '8px',
    },
    addButton: {
        padding: '5px 10px',
        fontSize: '0.8rem',
        backgroundColor: '#444',
    },
    primaryButton: {
        width: '100%',
        marginTop: '10px',
        backgroundColor: '#646cff',
        color: 'white',
        border: 'none',
    }
};

export default ReduxTest;