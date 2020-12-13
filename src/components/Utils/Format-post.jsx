export default function formatPost(str = '', length) {
  if (str.length <= length) return str;
  const newLength = str.lastIndexOf(' ', length);
  const newStr = `${str.slice(0, newLength)} ...`;
  return newStr;
}
