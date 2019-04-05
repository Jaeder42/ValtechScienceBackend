import { Request, Response } from 'express';
import { verify } from './isVerified';
import { writeFile } from 'fs';

export const postFact = (req: Request, res: Response) => {
  const { position, source, user, url } = req.body;
  if (!position || !source || !user || !url) {
    return res.status(400).json({
      message: 'position, source, user and url are required fields'
    });
  }
  if (!verify(source)) {
    return res.status(400).json({ message: 'Non-verified source' });
  }

  return res.json();
};
