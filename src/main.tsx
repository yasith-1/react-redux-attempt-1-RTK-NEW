import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import store from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provider එක මගින් මුළු Application එකටම Redux store එක ලබා දෙයි */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
