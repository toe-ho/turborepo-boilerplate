import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Use jsonwebtoken for decoding JWTs
import { IHttpLog } from '@repo/type';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params } = req;
    const start = Date.now();

    // Extract userId from JWT
    let user = '';

    try {
      const authHeader = req.headers['authorization'];

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decoded: any = jwt.decode(token);
        user = decoded?.username || 'Unknown';
      }
    } catch (error) {
      console.error('Failed to decode JWT:', error instanceof Error ? error.message : 'Unknown error');
    }

    // Intercept response data
    const originalSend = res.send.bind(res);

    res.send = (responseBody: any) => {
      const responseTime = Date.now() - start;
      const { statusCode } = res;

      const isBinaryResponse =
        Buffer.isBuffer(responseBody) ||
        res.get('Content-Type')?.startsWith('application/octet-stream') ||
        res.get('Content-Type')?.startsWith('image/') ||
        res.get('Content-Type')?.startsWith('application/pdf');

      // Format and truncate response body if too large
      const formattedResponseBody = isBinaryResponse
        ? ''
        : typeof responseBody === 'object'
          ? JSON.stringify(responseBody, null, 2)
          : responseBody;
      const truncatedResponseBody = formattedResponseBody
        ? formattedResponseBody.length > 2000
          ? formattedResponseBody.substring(0, 2000) + '... [TRUNCATED]'
          : formattedResponseBody
        : '';

      // Create HTTP log object
      const httpLog: Omit<IHttpLog, 'id'> = {
        user,
        url: originalUrl,
        method,
        responseTime,
        body: JSON.stringify(body),
        query: JSON.stringify(query),
        params: JSON.stringify(params),
        responseCode: statusCode,
        responseBody: truncatedResponseBody,
      };

      console.log(`=====================================\n`);
      console.log(`${new Date().toLocaleString()} [INFO] [HttpLog] ${JSON.stringify(httpLog)}`);
      console.log(`=====================================\n`);

      return originalSend(responseBody);
    };

    next();
  }
}
