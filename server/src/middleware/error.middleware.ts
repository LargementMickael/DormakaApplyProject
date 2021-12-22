import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

// Additionnal params add to be first
function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction){
    const status: number = error.status || 500;
    const message: string = error.message || 'An error occured';
    res.status(status).send({
        status, message
    })
}

export default errorMiddleware;