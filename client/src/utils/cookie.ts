export const setCookie = (name: string, value: string, minutes: number) => {
  const now = new Date();
  now.setTime(now.getTime() + minutes * 60 * 1000);
  const expires = "expires=" + now.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
};
export const getCookie = (name: string): string | null | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const foundPart = parts.pop();
    if (foundPart) {
      return foundPart.split(';').shift();
    }
  }
  return null;
};