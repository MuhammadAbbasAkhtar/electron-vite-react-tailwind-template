console.log('Preload script loaded');

try {
	const { contextBridge, ipcRenderer } = require('electron');
	contextBridge.exposeInMainWorld('electronAPI', {
		// ─── 🔧 Sample Placeholder Functions Below ───────────────────────────────

		/**
		 * Sample: Send a message from renderer to main.
		 * @param {string} message
		 */
		// sendMessage: (message) => ipcRenderer.send('send-message', message),

		/**
		 * Sample: Request system info from main.
		 * @returns {Promise<Object>} System info object.
		 */
		// getSystemInfo: () => ipcRenderer.invoke('get-system-info'),

		/**
		 * Sample: Listen to a custom event from main process.
		 * @param {Function} callback
		 */
		// onCustomEvent: (callback) => {
		//   ipcRenderer.on('custom-event', (_event, data) => callback(data));
		//   return () => ipcRenderer.removeAllListeners('custom-event');
		// },

		/**
		 * Sample: Open a native dialog from main.
		 * @returns {Promise<Object>} Dialog result.
		 */
		// openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),

		
		/**
		 * Sets a value in the Electron store.
		 * @param {string} key - The key to associate with the given value.
		 * @param {Object} value - The value to store.
		 * @returns {Promise<void>} Resolves when the operation is complete.
		 */
		setStoreValue: (key, value) => ipcRenderer.invoke('set-store-value', { key, value }),
		/**
		 * Retrieves a value from the Electron store.
		 * @param {string} key - The key associated with the value to retrieve.
		 * @returns {Promise<Object>} Resolves with the value associated with the given key.
		 */
		getStoreValue: (key) => ipcRenderer.invoke('get-store-value', key),
		/**
		 * Set a value in the Electron store.
		 * @param {string} key - The key to associate with the given value.
		 * @param {Object} value - The value to store.
		 * @returns {Promise<void>} Resolves when operation is complete.
		 */
		setStoreValue: (key, value) => ipcRenderer.invoke('set-store-value', { key, value }),
		/**
		 * Delete a value from the Electron store.
		 * @param {string} key - The key of the value to delete.
		 * @returns {Promise<void>} Resolves when operation is complete.
		 */
		deleteStoreValue: (key) => ipcRenderer.invoke('delete-store-value', key),
		/**
		 * Registers a callback to handle 'log-api-response' events.
		 * @param {Function} callback - The function to be called with the response data when the 'log-api-response' event is received.
		 * @returns {Function} A function that, when called, removes the listener for the 'log-api-response' event.
		 */
		onLogApiResponse: (callback) => {
			ipcRenderer.on('log-api-response', (_event, response) => {
				// console.log('log-api-response in preload');

				// console.log('response in preload:>> ', response);

				return callback(response);
			});
			return () => ipcRenderer.removeAllListeners('log-api-response');
		},
	});
} catch (error) {
	console.error('Preload error:', error);
}
