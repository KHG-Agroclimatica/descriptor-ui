export async function sendRequest(url: string, method = "GET", data = {}) {

  let body = null;

  if(Object.getOwnPropertyNames(data).length > 0)
    body = JSON.stringify(data);
  else
    body = null;

  const result = await fetch(url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (result.ok) {
    const text = await result.text();

    return text && JSON.parse(text);
  }
  const json = await result.json();

  throw json.Message;
}
