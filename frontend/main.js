const electron = require("electron");
var server = require("./backend_print/express.js"); //rodando server backend node ao iniciar projeto.
const menuTemplate = require("./menuTemplate");
// window.$ = window.jQuery = require('./assets/dist/plugins/jquery.min.js');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow() {
	// Create the browser window.

	// mainWindow = new BrowserWindow({ width: 1200, height: 1000,icon: __dirname+'/dist/finant/assets/img/logo1parte.png' })
	mainWindow = new BrowserWindow({
		show: false,
		icon: __dirname + "/dist/finant/assets/img/logo1parte.png",
	});
	mainWindow.maximize();
	//   mainWindow.maximize()
	// and load the index.html of the app.

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "/dist/finant/index.html"),
			protocol: "file:",
			slashes: true,
		})
	);
	// Open the DevTools. console
	mainWindow.webContents.openDevTools();

	mainWindow.webContents.on("did-fail-load", () => {
		console.log("did-fail-load");
		mainWindow.loadURL(
			url.format({
				pathname: path.join(__dirname, "/dist/finant/index.html"),
				protocol: "file:",
				slashes: true,
			})
		);
		// REDIRECT TO FIRST WEBPAGE AGAIN
	});

	// Emitted when the window is closed.
	mainWindow.on("closed", function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate()));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
