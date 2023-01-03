import * as bcrypt from 'bcrypt';

export const hashData = async (data: string) => {
  return bcrypt.hash(data, 10);
};
