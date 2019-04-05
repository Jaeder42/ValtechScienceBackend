import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import moment from 'moment';

export const postOp = async (req: Request, res: Response) => {
  try {
    const { position, source, user, url, reason } = req.body;
    const type = 'OPINION';
    const date = moment();
    if (!position || !source || !user || !url) {
      return res.status(400).json({
        message: 'position, source, user and url are required fields'
      });
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
    urlData.links[position].push({ url: source, reason, type, date });
    await writeFileSync('./utils/session-data.json', JSON.stringify(data));

    return res.json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'unexpected error occured while adding opinion' });
  }
};

const findData = (data: any, url: string) => {
  return data.find((d: any) => d.url === url);
};
