import { Response } from "express";

export const successResponse = (res:Response, msg: string, data: object, status: number) => {
    return res.status(status).json({
        status: status,
        message: msg,
        data: data
    });
}

export const errorPayloadResponse = (res:Response, msg: string, data: object, status: number) => {
    return res.status(status || 400).json({
        status: status || 400,
        message: msg || 'Something went wrong!',
        data: data
    });
}

export const errorResponse = (res:Response, msg: string, status: number) => {
    return res.status(status || 400).json({
        status: status || 400,
        message: msg || 'Something went wrong!',
    });
}

export const ackResponse = (res:Response, msg: string, status: number) => {
    return res.status(status).json({
        status: status,
        message: msg || 'success'
    });
}