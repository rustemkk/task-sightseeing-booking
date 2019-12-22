export const callAPI = (method, path, body = {}) => {
  return fetch(path, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: method === 'POST' ? JSON.stringify(body) : undefined
  })
    .then(res => res.json())
    .catch(err => console.log('Error:', err));
}