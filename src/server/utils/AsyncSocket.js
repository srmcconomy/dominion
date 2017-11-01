import shortid from 'shortid';

const TIMEOUT = 60000;

export default class AsyncSocket {
  constructor(socket, broadcast) {
    this.socket = socket;
    this.broadcast = broadcast;
  }

  reconnectListeners = new Set();

  emit(...args) {
    this.socket.emit(...args);
  }

  setSocket(socket) {
    this.socket = socket;
    this.reconnectListeners.forEach(func => func());
  }

  onReconnect(func) {
    this.reconnectListeners.add(func);
  }

  offReconnect(func) {
    this.reconnectListeners.delete(func);
  }

  emitAndWait(type, data, timeout = TIMEOUT) {
    return new Promise(res => {
      const id = shortid.generate();
      const emit = () => {
        console.log('emit');
        this.emit(type, { id, ...data });
      };
      const interval = setInterval(emit, timeout);
      this.onReconnect(emit);
      console.log(`waiting for ${id}`);
      this.socket.on(id, d => {
        console.log(`${id} received`);
        console.log(d);
        this.offReconnect(emit);
        clearInterval(interval);
        res(d);
      });
      emit();
    });
  }
}
