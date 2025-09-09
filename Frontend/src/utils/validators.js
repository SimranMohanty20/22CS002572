export const validateURL = (url) => {
  const regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;
  return regex.test(url);
};