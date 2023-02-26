export const generate = () => {
  const date = new Date();
  return `JDCOM-${date.getFullYear()}${date.getMonth()}${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
}