// statusFetcher.ts
const createStatusFetcher = (apiKey: string) => (url: string) =>
  fetch(url, {
    headers: { 'Authorization': apiKey },
  }).then((response) => response.status);

export { createStatusFetcher };
