import { Request, Response } from 'express';
import { readFileSync } from 'fs';

const getAllData = (url:string) => {
  let data = readFileSync('./data.json').toString();
  var urls = JSON.parse(data);
  return urls[url];
};

export const getShortData = async (req: Request, res: Response) => {
  const { url } = req.query;
  const data = getAllData(url);
  if(data == undefined)
    res.sendStatus(404); // Perhaps wrong to return 404 here... 
  else
    res.send({url:url, vote: data.vote});
};

export const getLongData = async (req: Request, res: Response) => {
  const { url } = req.query;
  const data = getAllData(url);
  if(data == undefined)
    res.sendStatus(404); // Perhaps wrong to return 404 here... 
  else
    res.send({url:url, vote: data.vote, links: data.links });
};



