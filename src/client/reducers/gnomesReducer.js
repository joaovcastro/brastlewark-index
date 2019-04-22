const initialState = {
  content: undefined,
  isFetching: false,
  error: undefined,
};

export default function gnomesReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GNOMES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'FETCH_GNOMES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        content: action.content,
      });
    case 'FETCH_GNOMES_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}
