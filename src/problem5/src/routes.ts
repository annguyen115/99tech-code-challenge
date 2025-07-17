// src/routes/items.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create a resource
router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newItem = await prisma.item.create({
    data: { name, description }
  });
  res.json(newItem);
});

// List resources with optional filter by name
router.get('/', async (req: Request, res: Response) => {
  const { name } = req.query;
  const items = await prisma.item.findMany({
    where: name ? { name: { contains: String(name) } } : undefined
  });
  res.json(items);
});

// Get details of a resource
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await prisma.item.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Update resource
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;
  try {
    const updated = await prisma.item.update({
      where: { id },
      data: { name, description }
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete resource
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.item.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: 'Item not found' });
  }
});

export default router;
