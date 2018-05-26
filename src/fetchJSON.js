async function fetchJSON(endpointPath, params) {
  return await fetch(endpointPath, {
    body: params,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method: params == null ? 'GET' : 'POST',
  }).then(res => res.json());
}

export default fetchJSON;
