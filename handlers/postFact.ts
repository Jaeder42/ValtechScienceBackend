import { Request, Response } from 'express';
import { verify } from './isVerified';
import { readFileSync, writeFileSync } from 'fs';

export const postFact = async (req: Request, res: Response) => {
  const { position, source, user, url, reason } = req.body;
  if (!position || !source || !user || !url) {
    return res.status(400).json({
      message: 'position, source, user and url are required fields'
    });
  }
  if (!verify(source)) {
    return res.status(400).json({ message: 'Non-verified source' });
  }

  let data = JSON.parse(await readFileSync('./session-data.json').toString());
  let urlData = data[url];
  if (!urlData) {
    initPost(data, url);
  }
  data[url][position] += 1;
  data[url].links[position].push(source);

  writeFileSync('./session-data.json', JSON.stringify(data));

  return res.json({ data });
};

export const initPost = (data: any, url: string) => {
  data[url] = {
    pro: 0,
    con: 0,
    links: {
      pro: [],
      con: []
    }
  };
};
