import { Router } from "express";
import { body, param, query } from "express-validator";
import { validationResultMiddleware } from "../../middlewares/validateFieldsMiddleware";
import { users } from "data/data";
import { createUser, deleteUser, getUserById, listUsers, updateUser } from "controllers/users";

const router = Router();

router.get('/',
    query('skip').default(0).toInt(),
    query('limit').optional().toInt(),
    listUsers);

router.post('/',
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail().custom(value => users.findIndex(({ email }) => email === value) === -1).withMessage('Invalid or already used email'),
    validationResultMiddleware,
    createUser
);

router.get('/:id',
    param('id').toInt(),
    getUserById);

router.delete('/:id', deleteUser);

router.put('/:id',
    param('id').toInt(),
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail().custom((value, {req: { params = {}}}) => users.findIndex(({ email, id }) => email === value && params.id !== id) === -1).withMessage('Invalid or already used email'),
    validationResultMiddleware,
    updateUser)

export default router;
