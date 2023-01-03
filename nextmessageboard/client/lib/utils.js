export const generateRandomPositiveInt = (
  max = 10000,
) => {
  return Math.floor(Math.random() * max);
};
