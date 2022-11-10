import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

// tslint:disable-next-line:no-any
export function extractTokenPayload(request: Request): any | null {

    const token = request.headers.cookie?.replace(/.*access_token=([^;]+).*/, '$1');

    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    }
    catch (err) {
        return console.error(err);
    }
}
