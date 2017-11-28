export default function Log() {
  const messages = [];
  let newIndex = 0;
  const ret = function log(message) {
    messages.push(message);
  };
  ret.getAllMessages = () => messages;
  ret.getNewMessages = () => {
    const r = messages.slice(newIndex);
    newIndex = messages.length;
    return r;
  };
  return ret;
}
