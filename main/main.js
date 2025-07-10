import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { registerIpcHandlers } from './handlers/ipcHandlers.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

async function createWindow() {
	if (mainWindow) {
		mainWindow.focus();
		return;
	}
	mainWindow = new BrowserWindow({
		width: 1440,
		height: 700,
		// width: width,
		// height: height,
		// x: primaryDisplay.bounds.x, // Position on the main screen
		// y: primaryDisplay.bounds.y,
		// frame: false, // Remove the toolbar (title bar and window controls)
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'), // Points to dist-electron/preload.js
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
		},
	});

	// Log renderer console messages
	mainWindow.webContents.on('console-message', (event, level, message = '', line, sourceId) => {
		console.log(`Renderer console [level ${level}]: ${message} (source: ${sourceId}, line: ${line})`);
	});

	const app_package_path = path.join(__dirname, '../renderer/dist/index.html');
	console.log('app_package_path', app_package_path);


	const loadApp = async () => {
		if (app.isPackaged) {
			console.log('Loading packaged app:', app_package_path);
			await mainWindow.loadFile(app_package_path).catch((error) => {
				console.error('Failed to load packaged app:', error);
				app.quit(); // Quit if packaged app fails to load
			});
		} else {
			console.log('Loading dev server: http://localhost:3069');
			try {
				//  mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
				await mainWindow.loadURL('http://localhost:3069', { timeout: 10000 });
			} catch (error) {
				console.error('Failed to load dev server:', error);
				console.log('Falling back to:', app_package_path);
				try {
					await mainWindow.loadFile(app_package_path);
				} catch (fallbackError) {
					console.error('Failed to load fallback:', fallbackError);
					app.quit(); // Quit if fallback fails
				}
			}
		}
	};

		try {
    await loadApp();
  } catch (error) {
    console.error('Failed to load app:', error);
    app.quit();
  }

	// Open DevTools in dev mode
	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools();
	}
	else {
		//  mainWindow.webContents.openDevTools();
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

const gotTheLock = app.requestSingleInstanceLock();

console.log('gotTheLock :>> ', gotTheLock);
if (!gotTheLock) {
	// app.quit();
} else {
	app.on('second-instance', () => {
		console.log('Second instance attempted to start');
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	app.whenReady().then(() => {
		console.log('App is ready, creating window');
		registerIpcHandlers(ipcMain);
		createWindow();
	});
}

app.on('window-all-closed', () => {
	console.log('All windows closed');
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	console.log('App activated');
	if (mainWindow === null) createWindow();
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
