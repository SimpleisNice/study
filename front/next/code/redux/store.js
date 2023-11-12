let store;

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      const newItemAmount = itemId in state ? state[itemID] + 1 : 1;
      return {
        ...state,
        [itemID]: newItemAmount,
      };
    case "DECREMENT":
      if (state?.[itemID] > 0) {
        return {
          ...state,
          [itemID]: state[itemID] - 1,
        };
      }
      return state;
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(reducer, preloadedState, composeWith);
}
