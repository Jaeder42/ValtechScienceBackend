import { Request, Response } from 'express';
import { readFileSync } from 'fs';

export const getShortData = async (req: Request, res: Response) => {
  try {
    const urls = JSON.parse(
      readFileSync('./utils/session-data.json').toString()
    );
    const { url } = req.query;
    const data = urls.find((d: any) => d.url == url);
    if (data == undefined) res.sendStatus(404);
    // Perhaps wrong to return 404 here...
    else res.send({ url: url, votes: data.votes });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getLongData = async (req: Request, res: Response) => {
  try {
    const urls = JSON.parse(
      readFileSync('./utils/session-data.json').toString()
    );

    const { url } = req.query;
    const data = urls.find((d: any) => d.url == url);
    if (data == undefined) res.sendStatus(404);
    // Perhaps wrong to return 404 here...
    else res.send({ url: url, votes: data.votes, links: data.links });
  } catch (err) {
    res.sendStatus(500);
  }
};
