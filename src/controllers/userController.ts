import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/index';
import { User } from '../models/userModel';

// Update high score or create user if not exists
export const updateHighScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, highscore } = req.body;
  console.log(id, name, highscore);

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }
  if (!name || typeof highscore !== 'number') {
    return res.status(400).json({ error: 'Name and highScore are required' });
  }

  try {
    const db = getDb();
    const result: any = await db.collection<User>('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name, highscore } },
      { upsert: true, returnDocument: 'after' }
    );
    if (!result || !result.value) {
      return res.status(404).json({ error: 'User not found or not created' });
    }
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};