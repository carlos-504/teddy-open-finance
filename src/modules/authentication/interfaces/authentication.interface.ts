import { Request } from 'express';

export interface UserPayload {
  sub: string;
  userName: string;
}

export interface UserReq extends Request {
  user: UserPayload;
}
