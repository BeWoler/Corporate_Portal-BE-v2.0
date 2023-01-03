import * as bcrypt from 'bcrypt';

export const compareData = async (data: string, potentialData: string) => {
  return bcrypt.compare(potentialData, data);
};
