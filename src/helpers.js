const states = ['added', 'removed', 'unchanged', 'changed'];

export default function getState(state) {
  if (states.includes(state)) return state;
  throw new Error(`Unexpected state ${state}`);
}
