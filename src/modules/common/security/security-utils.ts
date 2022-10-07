import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

const PAYLOAD_COMPONENTS = 2;

// tslint:disable-next-line:no-any
export function extractTokenPayload(request: Request): any | null {

    const header = request.header('Authorization');

    if (!header) {
        return null;
    }

    const chunks = header.split(' ');

    if (chunks.length !== PAYLOAD_COMPONENTS || chunks[0] !== 'Bearer') {
        return null;
    }

    try {
        return jwt.verify(chunks[1], process.env.JWT_SECRET!);
    }
    catch (err) {
        return console.error(err);
    }
}
