import { Request, Response } from 'express';
import verifiedData from '../utils/verifiedData.json';
export const isVerified = async (req: Request, res: Response) => {
  let verified: boolean = false;
  const { url } = req.query;

  if (verify(url)) {
    verified = true;
  }
  return res.json({
    verified
  });
};

export const verify = (url: string) => {
  const domain = getDomain(url);
  return verifiedData.trusted.includes(domain);
};

const getDomain = (url: string) => {
  const cleanedUrl = cleanUrl(url);
  const urlSplit = cleanedUrl.replace('https://', '').split('/');
  return `https://${urlSplit[0]}`;
};

const cleanUrl = (url: string) => {
  return url.replace(/\"/gi, '');
};
