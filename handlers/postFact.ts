import { Request, Response } from 'express';
import { verify } from './isVerified';
import { readFileSync, writeFileSync } from 'fs';
import { finished } from 'stream';

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

  let data = JSON.parse(
    await readFileSync('./utils/session-data.json').toString()
  );
  let urlData = findData(data, url);
  if (!urlData) {
    urlData = {
      url,
      votes: { pro: 0, con: 0 },
      links: {
        pro: [],
        con: []
      }
    };
    data.push(urlData);
  }
  urlData.votes[position] += 1;
  urlData.links[position].push({ url: source, reason });
  console.log(JSON.stringify(data));
  await writeFileSync('./utils/session-data.json', JSON.stringify(data));

  return res.json({ data });
};

const findData = (data: any, url: string) => {
  return data.find((d: any) => d.url === url);
};
