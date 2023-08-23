const generateId = () => {
  const random = Math.random().toString(32).substring(2);
  const randomDate = Date.now().toString(32);
  return random + randomDate;
};

console.log(generateId());
export default generateId;
