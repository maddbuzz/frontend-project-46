export default function getState(state) {
  switch (state) {
    case 'added':
    case 'removed':
    case 'unchanged':
    case 'changed':
      return state;
    default:
      throw new Error(`Unexpected state ${state}`);
  }
}
