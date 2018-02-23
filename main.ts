import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import 'dotenv/config';

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1000
  });

  // Decide about Packaging Mode or Dev-Mode
  if (process.env.PACKAGE === 'true') {
    mainWindow.loadURL(url.format(
      {
        // __dirname already points to dist/
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      }
    ));
  } else {
    // Loading of the Angular Dev-Server and opening the devTools
    mainWindow.loadURL(process.env.ANGULAR_HOST);
  }

  // Opens devtools
  if (process.env.OPEN_DEV_TOOLS === 'true') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.#
