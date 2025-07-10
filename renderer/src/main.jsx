import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@utils';
import App from './App';
import './style.css';

const root = createRoot(document.getElementById('root'));
// Use HashRouter in production (Electron), BrowserRouter in dev (Vite dev server)
const Router = import.meta.env.MODE === 'development' ? BrowserRouter : HashRouter;

root.render(
	<ErrorBoundary>
		<Router>
			<App />
		</Router>
	</ErrorBoundary>
);
