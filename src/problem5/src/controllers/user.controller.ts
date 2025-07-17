import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
  const { name } = req.query;
  const users = await userService.getUsers(name as string);
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await userService.createUser(name, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Email must be unique' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await userService.updateUser(Number(id), name, email);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found or email duplicate' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(Number(id));
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};