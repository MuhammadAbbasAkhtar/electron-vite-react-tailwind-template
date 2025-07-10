import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Home } from '@pages';
import { Layout } from '@components';

const App = () => {
	const navigate = useNavigate();
	window.onerror = function (message, source, lineno, colno, error) {
		console.error('Renderer Error:', { message, source, lineno, colno, error });
	};

	window.onunhandledrejection = function (event) {
		console.error('Unhandled Promise Rejection:', event.reason);
	};

	useEffect(() => {
		if (window.electronAPI && window.electronAPI.onLogApiResponse) {
			const cleanup = window.electronAPI.onLogApiResponse((response) => {
				console.log('App: Received log-api-response:', response);
				if (response?.message && response.status >= 400) {
					toast.error(response.message, {
						position: 'top-right',
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				}
			});
			return cleanup;
		} else {
			console.error('App: electronAPI.onLogApiResponse not available');
		}
	}, []);

	return (
		<div className="bg-white text-black dark:bg-black dark:text-white">
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
				</Route>
			</Routes>
			<Toaster
				position="top-right"
				toastOptions={{
					// Define default options
					className: '',
					duration: 5000,
					removeDelay: 1000,
					style: {
						background: '#363636',
						color: '#fff',
					},

					// Default options for specific types
					success: {
						duration: 3000,
						iconTheme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
		</div>
	);
};

export default App;
