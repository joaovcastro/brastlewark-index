import reducer from './gnomeInfoReducer';

describe('Gnome info reducer', () => {
  const initialState = {
    content: undefined,
    isFetching: false,
    error: undefined,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_GNOME_INFO_REQUEST', () => {
    const startAction = {
      type: 'FETCH_GNOME_INFO_REQUEST',
    };
    expect(reducer({}, startAction)).toEqual({ isFetching: true });
  });

  it('should handle FETCH_GNOME_INFO_SUCCESS', () => {
    const successAction = {
      type: 'FETCH_GNOME_INFO_SUCCESS',
      content: { text: 'lorem' },
    };
    expect(reducer({}, successAction)).toEqual({
      isFetching: false,
      content: {
        text: 'lorem',
      },
    });
  });

  it('should handle FETCH_GNOME_INFO_FAILURE', () => {
    const failAction = {
      type: 'FETCH_GNOME_INFO_FAILURE',
      error: '404',
    };
    expect(reducer({}, failAction)).toEqual({
      error: '404',
      isFetching: false,
    });
  });
});
