export default function Log() {
  const messages = [];
  let newIndex = 0;
  const ret = function log(message) {
    let newMessage = '';
    for (let i = 0; i < this.padding; i++) {
      newMessage += '\u00A0';
    }
    newMessage += message;
    messages.push(newMessage);
  };
  ret.getAllMessages = () => messages;
  ret.getNewMessages = () => {
    const r = messages.slice(newIndex);
    newIndex = messages.length;
    return r;
  };
  return ret;
}
