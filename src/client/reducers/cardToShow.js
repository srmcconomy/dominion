export default function (state = null, action) {
  switch (action.type) {
    case 'look-at-card':
      return action.card;
    default:
      return state;
  }
}
