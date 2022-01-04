import { NextFunction, Request, Response } from "express"

export const userMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const auth = req.headers.authorization;

	if (auth) {
		const [, user] = auth?.split(' '); 

		req.user = user;
	}
  
	next();
}