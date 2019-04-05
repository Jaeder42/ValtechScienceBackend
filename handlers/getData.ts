import { Request, Response } from 'express';
import urls from '../utils/session-data.json';

export const getShortData = async (req: Request, res: Response) => {
  const { url } = req.query;
  const data = urls.find(d => d.url == url);
  if (data == undefined) res.sendStatus(404);
  // Perhaps wrong to return 404 here...
  else res.send({ url: url, votes: data.votes });
};

export const getLongData = async (req: Request, res: Response) => {
  const { url } = req.query;
  const data = urls.find(d => d.url == url);
  if (data == undefined) res.sendStatus(404);
  // Perhaps wrong to return 404 here...
  else res.send({ url: url, votes: data.votes, links: data.links });
};
