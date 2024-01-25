export const createFetcher = (apiKey: string) => (url: string) => {
  const headers = new Headers({
    'api-key': apiKey,
  });

  return fetch(url, { headers })
    .then(res => res.json());
};


export const baseUrl = 'http://localhost:3000';