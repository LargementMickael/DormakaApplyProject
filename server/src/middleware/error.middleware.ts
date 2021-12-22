import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(req: Request, res: Response, next: NextFunction, error: HttpException){
    const status: number = error.status || 500;
    const message: string = error.message || 'An error occured';
    res.status(status).send({
        status, message
    })
}

export default errorMiddleware;