export default function fetchGnomes(profession) {
  const url = profession
    ? `http://localhost:3000/gnomes/?profession=${profession.replace(
        /\s/g,
        '',
      )}`
    : 'http://localhost:3000/gnomes';
  return function(dispatch) {
    dispatch({
      type: 'FETCH_GNOMES_REQUEST',
    });
    return fetch(url)
      .then(async response => {
        const body = await response.json();
        return Object.assign({}, { status: response.status, body });
      })
      .then(({ status, body }) => {
        if (status !== 200) {
          dispatch({
            type: 'FETCH_GNOMES_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_GNOMES_SUCCESS',
            content: body,
          });
        }
      });
  };
}
