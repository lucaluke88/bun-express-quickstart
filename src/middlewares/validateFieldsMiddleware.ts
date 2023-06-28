import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator"

/**
 * Middleware function to handle validation errors.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {void}
 */
export const validationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({
            errors: validationErrors.array()
        });
    } else {
        next();
    }
}