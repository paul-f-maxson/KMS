export interface OnObject<IState, IAction> {
  [actionType: string]: React.Reducer<IState, IAction>;
}

const makeReducer: <IState, IAction extends { type: string }>(
  on: OnObject<IState, IAction>
) => React.Reducer<IState, IAction> = on => (prevState, action) => {
  const fn = on[action.type];
  return fn === undefined ? prevState : fn(prevState, action);
};

export default makeReducer;
