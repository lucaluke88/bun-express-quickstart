import { users } from "data/data";
import { Request, Response } from "express";
import { User } from "types/user";

export const listUsers = (req: Request & { query: Request['query'] & { skip: number, limit: number } }, res: Response) => {
    const { skip, limit = users.length } = req.query;
    const results = users.slice(skip, skip + limit);
    const total = users.length;
    const count = results.length;

    res.status(200).json({ results, total, count });
};

export const createUser = (req: Request<Request['params'], Request['res'], {
    firstName: User['firstName'],
    lastName: User['lastName'],
    email: User['email']
}, Request['query']>, res: Response) => {
    const { firstName, lastName, email } = req.body;
    const newUser = {
        firstName,
        lastName,
        email,
        id: users.length + 1
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const getUserById = (req: Request<{ id: number }, Request['res'], Request['body'], Request['query']>, res: Response) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));
    if (user) {
        res.status(200).json(user);
    } else {
        res.sendStatus(404);
    }
};

export const updateUser = (req: Request<Request['params'], Response, { firstName: string, lastName: string, email: string }, Request['query']>, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = users.find(u => u.id === Number(id));
    if (user) {
        Object.assign(user, { firstName, lastName, email });
        res.status(200).json(user);
    } else {
        res.sendStatus(404);
    }
};

/**
 * Deletes a user.
 *
 * @param {Request<Request['params'], Request['res'], Request['body'], Request['query']>} req - The request object.
 * @param {Response} res - The response object.
 * @return {void} This function does not return anything.
 */
export const deleteUser = (req: Request<Request['params'], Request['res'], Request['body'], Request['query']>, res: Response) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));

    if (user) {
        const index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};
