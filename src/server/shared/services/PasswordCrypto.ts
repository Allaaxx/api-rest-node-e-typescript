import { genSalt, hash, compare } from "bcryptjs";


const SaltRandoms = 8;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SaltRandoms);

  return await hash(password, SaltRandoms); 
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,

};