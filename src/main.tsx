import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.tsx'
import store from './store.ts'
import {I18nextProvider} from 'react-i18next' 
import myi18n from './utils/i18n.ts';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> 
    {/* Provides the translation context for my application */}
    <I18nextProvider i18n={myi18n} >
    <App />
    </I18nextProvider>
    </Provider>
    
  </React.StrictMode>
)
