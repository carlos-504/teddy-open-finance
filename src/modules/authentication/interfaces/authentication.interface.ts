import { Request } from 'express';

export interface UserPayload {
  sub: number;
  userName: string;
}

export interface UserReq extends Request {
  user: UserPayload;
}
