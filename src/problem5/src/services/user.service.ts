import { prisma } from '../utils/prisma';

export const getUsers = async (name?: string) => {
  return prisma.user.findMany({
    where: name ? { name: { contains: name } } : undefined
  });
};

export const createUser = async (name: string, email: string) => {
  return prisma.user.create({ data: { name, email } });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: number, name: string, email: string) => {
  return prisma.user.update({ where: { id }, data: { name, email } });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};