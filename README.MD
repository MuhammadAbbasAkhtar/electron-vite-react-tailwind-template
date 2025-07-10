# Electron + Vite + React + Tailwind Template

A boilerplate to quickly kickstart desktop apps using:
- ⚡ Electron
- ⚛️ React
- 🎨 TailwindCSS(v4)
- 🔥 Vite

## 📁 Folder Structure

```
├── .editorconfig    - Editor formatting rules
├── jsconfig.json    - JS path aliases and intellisense config
├── package.json     - Project metadata and scripts
├── vite.config.js   - Vite config with Electron plugins
├── main/            - Electron main process (backend)
│   ├── main.js          - Electron app entry point
│   ├── preload.js       - Preload script to expose safe IPC APIs
│   ├── store.js         - Electron Store for persistent settings
│   ├── handlers/
│   |   └── ipcHandlers.js   - All IPC methods exposed to renderer
└── renderer/          ----/ Frontend (React + Tailwind)
    ├── index.html         ----/ HTML entry file
    ├── renderer.js        ----/ Entry point for the renderer process
    ├── tailwind.config.js ----/ Tailwind CSS config
    ├── src/
	│   ├── App.jsx ----/ App wrapper and layout
	│   ├── main.jsx ----/ React root entry
	│   ├── style.css ----/ Tailwind and global styles
	│   ├── components/ ----/ Shared UI components
	│   |   ├── index.js
	│   │   └── Layout.jsx
	│   ├── pages/ ----/ Page-level components
	│   │   ├── Home.jsx
	│   │   └── index.js
	│   └── utils/ ----/ Reusable utilities and helpers
				    ├── ErrorBoundary.jsx
				    └── index.js

```
