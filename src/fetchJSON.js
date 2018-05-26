// @flow strict-local

async function fetchJSON<TResponse, TParams: ?{}>(
  endpointPath: string,
  params: TParams,
): Promise<TResponse> {
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
