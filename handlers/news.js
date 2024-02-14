const API_ENDPOINT = `https://newsapi.org/v2/everything?sortBy=popularity`;

export async function searchByTopic(topic) {
  const currentDate = new Date().setHours(-24);
  const params = `&q=${encodeURIComponent(topic)}&from=${new Date(currentDate).toISOString().slice(0, 10)}&apiKey=${process.env.NEWS_APIKEY}`;
  const response = await fetch(new URL(`${API_ENDPOINT}${params}`), {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(data => data.json())
    .catch(console.error);

  return response;
}
