import { Request, Response } from 'express';
import verifiedData from '../utils/verifiedData.json';
export const isVerified = async (req: Request, res: Response) => {
  let verified: boolean = false;
  const { url } = req.query;
  const domain = getDomain(url);
  if (verifiedData.trusted.includes(domain)) {
    verified = true;
  }
  return res.json({
    verified
  });
};

const getDomain = (url: string) => {
  const cleanedUrl = cleanUrl(url);
  const urlSplit = cleanedUrl.replace('https://', '').split('/');
  return `https://${urlSplit[0]}`;
};

const cleanUrl = (url: string) => {
  return url.replace(/\"/gi, '');
};
