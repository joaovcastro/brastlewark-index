const initialState = {
  content: undefined,
  isFetching: false,
  error: undefined,
};

export default function gnomeInfoReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GNOME_INFO_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'FETCH_GNOME_INFO_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        content: action.content,
      });
    case 'FETCH_GNOME_INFO_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}
