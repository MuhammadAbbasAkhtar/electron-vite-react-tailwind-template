import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import { resolve } from 'path';

const ElectronMain = resolve(__dirname, 'main');
const ElectronMainFile = resolve(__dirname, 'main/main.js');
const ElectronPreload = resolve(__dirname, 'main/preload.js');
const ElectronRenderer = resolve(__dirname, 'renderer/index.html');
const ElectronHandlers = resolve(__dirname, 'main/handlers');
const RendererSrc = resolve(__dirname, 'renderer/src');
const RendererDIR = resolve(__dirname, 'renderer');
const outDir = resolve(__dirname, 'dist-electron');
const tailwindcssConfig = resolve(__dirname, 'renderer/tailwind.config.js');

console.log('ElectronMain', ElectronMain);
console.log('ElectronMainFile', ElectronMainFile);
console.log('ElectronRenderer', ElectronRenderer);
console.log('ElectronHandlers', ElectronHandlers);
console.log('RendererSrc', RendererSrc);
console.log('RendererDIR', RendererDIR);
console.log('ElectronPreload', ElectronPreload);
console.log('outDir', outDir);
console.log('tailwindcssConfig', tailwindcssConfig);

export default defineConfig({
	// root: resolve(__dirname),
	root: RendererDIR, // Point Vite to the renderer folder
	plugins: [
		tailwindcss({
			config: tailwindcssConfig,
		}),
		react(),
		electron([
			{
				// Main process
				entry: ElectronMainFile, // Main process entry | <project_root>/main/main.js
				vite: {
					build: {
						outDir, // Output for main and preload | <project_root>/dist-electron/
						emptyOutDir: true,
						rollupOptions: {
							external: ['electron', 'axios', 'electron-store', 'fs', 'path'], // Externalize Node.js/Electron modules
							output: {
								format: 'es', // ESM for main.js
								entryFileNames: '[name].js', // Output as main.js
							},
						},
					},
					resolve: {
						alias: {
							'@ipcHandlers': ElectronHandlers, // <project_root>/main/handlers/
							'@components': resolve(RendererSrc, 'components'),
							'@utils': resolve(RendererSrc, 'utils'),
							'@electron-store': resolve(ElectronMain, 'store.js'),
							'@pages': resolve(RendererSrc, 'pages'),
						},
					},
				},
			},
			{
				// Preload script
				entry: ElectronPreload, // Preload script entry | <project_root>/main/preload.js
				vite: {
					build: {
						outDir, // Same output directory | <project_root>/dist-electron/
						emptyOutDir: false, // Avoid clearing main.js
						rollupOptions: {
							external: ['electron'], // Externalize Electron for preload
							output: {
								format: 'cjs', // CommonJS for preload compatibility
								entryFileNames: '[name].js', // Output as preload.js
							},
						},
					},
					resolve: {
						alias: {
							'@ipcHandlers': ElectronHandlers, // <project_root>/main/handlers/
							'@components': resolve(RendererSrc, 'components'),
							'@utils': resolve(RendererSrc, 'utils'),
							'@electron-store': resolve(ElectronMain, 'store.js'),
							'@pages': resolve(RendererSrc, 'pages'),
						},
					},
				},
			},
		]),
		renderer(), // Optimizes renderer process for Electron
	],
	server: {
		port: 3069, // Development server port
		host: '0.0.0.0', // Bind to all interfaces (localhost, 127.0.0.1, etc.)
		strictPort: true, // Fail if port 3069 is unavailable
	},
	build: {
		outDir, // Output build to root/dist
		emptyOutDir: true, // Clear output directory before building
		rollupOptions: {
			input: {
				main: ElectronRenderer, // Entry point
			},
		},
	},
	// 	css: {
	//     postcss: './renderer/postcss.config.js', // Tailwind/PostCSS config
	//   },
	resolve: {
		alias: {
			'@ipcHandlers': ElectronHandlers,
			'@components': resolve(RendererSrc, 'components'),
			'@utils': resolve(RendererSrc, 'utils'),
			'@electron-store': resolve(ElectronMain, 'store.js'),
			'@pages': resolve(RendererSrc, 'pages'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure these are included
	},
});
