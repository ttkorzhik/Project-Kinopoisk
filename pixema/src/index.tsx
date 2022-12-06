import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {store} from "./store";

import {AuthContextProvider} from "./context/AuthContext";
import {PaginationProvider} from "./context/PaginationContext";
import {ScreenWidthProvider} from "./context/ScreenWidthContext";
import {ThemeProvider} from "./context/ThemeContext";

import App from './components/App/App';

import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthContextProvider>
                <PaginationProvider>
                    <ScreenWidthProvider>
                        <ThemeProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </ThemeProvider>
                    </ScreenWidthProvider>
                </PaginationProvider>
            </AuthContextProvider>
        </Provider>
     </React.StrictMode>
);
