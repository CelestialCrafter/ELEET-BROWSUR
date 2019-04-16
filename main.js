const {app, BrowserWindow, Menu, session} = require('electron');
const autoUpdater = require('auto-updater');
const appVersion = require('./package.json').version;
const os = require('os').platform();
const DiscordRPC = require('discord-rpc');

const clientId = '566830481790861322';
let mainWindow;

if(require('electron-squirrel-startup')) app.quit();

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: '#23272A',
		icon: __dirname + '/icon.png',
    show: false,
    center: true
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.once('ready-to-show', () => mainWindow.show());

	const template = [
	  {
	    label: 'App',
	    submenu: [
	      { role: 'minimize' },
	      { role: 'close' },
				{
					label: 'Open DevTools',
					click() {mainWindow.openDevTools();}
				}
	    ]
	  }
	]

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	mainWindow.webContents.session.webRequest.onBeforeRequest(['*://*./*'], (details, cb) => {
    let shouldBeBlocked = false;

		if (require('./adlist.js').test(details.url)) shouldBeBlocked = true;

    if (shouldBeBlocked) console.log('Ad Blocked: ' + JSON.stringify(details));

		if (shouldBeBlocked) cb({ cancel: true });
		else cb({ cancel: false });
  });

  module.exports = mainWindow;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  if (mainWindow == null) {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      },
      frame: false,
      backgroundColor: '#23272A',
			icon: __dirname + '/icon.png',
      show: false,
      center: true
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });

    module.exports = mainWindow;
  }
});

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

const setActivity = async () => {
  if (!rpc || !mainWindow) return;

	rpc.clearActivity();
  rpc.setActivity({
    details: 'Using ELEET BROWSUR',
    state: 'ELEET BROWSUR BEST',
    startTimestamp,
    largeImageKey: 'icon',
    largeImageText: 'ELEET BROWSUR',
    instance: false
  });
};

rpc.on('ready', () => setActivity());
rpc.login({ clientId }).catch(console.error);
