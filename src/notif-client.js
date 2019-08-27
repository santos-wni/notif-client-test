import io from 'socket.io-client';

class NotifClient {
  constructor(url, path, functions, opts = {}) {
    let options = {
      autoConnect: false,
      path: path,
      cookieHttpOnly: false,
      pingTimeout: 60000,
      transportOptions: {
        polling: {
          extraHeaders: {}
        }
      }
    };
    if(opts['licensegroup'] && opts['licensegroup'] !== '')
      options['transportOptions']['polling']['extraHeaders']['x-wni-licensegroup'] = opts['licensegroup'];
    if(opts['idtoken'] && opts['idtoken'] !== '')
      options['transportOptions']['polling']['extraHeaders']['id-token'] = opts['idtoken'];
    this.socket = io(url, options);
    // register functions
    ['connect', 'message', 'disconnect', 'reconnect_error', 'error'].forEach(key => {
      const func = functions[key];
      if(func) this.socket.on(key, func);
    });
  }
  connect() {
    this.socket.open();
  }
  disconnect() {
    this.socket.close();
  }
  isConnected() {
    return this.socket.connected;
  }
}
export { NotifClient };