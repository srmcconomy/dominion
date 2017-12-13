import EventEmitter from 'utils/AsyncEventEmitter';

const methods = [
  'addListener',
  'emit',
  'listeners',
  'on',
  'once',
  'removeAllListeners',
  'removeListener',
  'setMaxListeners',
  'getMaxListeners',
];

const emitters = new WeakMap();

function getEmitter(obj) {
  if (!emitters.has(obj)) {
    emitters.set(obj, new EventEmitter());
  }
  return emitters.get(obj);
}

export default function EventEmitterDecorator(klass) {
  methods.forEach((method) => {
    if (klass.prototype[method]) {
      throw new Error(`"${method}" method is already defined!`);
    }
    klass.prototype[method] = function (...args) {
      return getEmitter(this)[method](...args);
    };
  });
}
