import { ObjectId } from 'mongodb';

export interface User {
  _id?: string | ObjectId;
  name: string;
  highScore: number;
}