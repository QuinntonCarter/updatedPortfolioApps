import { generateRandomPositiveInt } from '../../lib/utils';

// @ts-ignore
export default async (req, res) => {
  const number = generateRandomPositiveInt();

  res.status(200).json({ number });
};
