import store from '../store.js';
import { BrowserWindow } from 'electron';

const logEventName = 'log-api-response';


export function registerIpcHandlers(ipcMain) {
	ipcMain.handle('get-store-value', async (_event, key) => {
		return store.get(key);
	});

	ipcMain.handle('set-store-value', async (_event, { key, value }) => {
		store.set(key, value);
	});

	ipcMain.handle('delete-store-value', async (_event, key) => {
		store.delete(key);
	});

	ipcMain.handle('log-api-response', async (_event, data) => {
		BrowserWindow.fromWebContents(_event.sender).webContents.send(logEventName, data);
	});
}



