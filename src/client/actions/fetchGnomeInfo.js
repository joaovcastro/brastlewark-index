export default function fecthGnomeInfo(id) {
  return function(dispatch) {
    dispatch({
      type: 'FETCH_GNOME_INFO_REQUEST',
    });
    return fetch(`http://localhost:3000/gnome?id=${id}`)
      .then(async response => {
        const body = await response.json();
        return Object.assign({}, { status: response.status, body });
      })
      .then(({ status, body }) => {
        if (status !== 200) {
          dispatch({
            type: 'FETCH_GNOME_INFO_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_GNOME_INFO_SUCCESS',
            content: body,
          });
        }
      });
  };
}
