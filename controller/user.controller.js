import express from 'express';

import * as UserService from '../service/user.service.js';

const userRouter = express.Router();

const register = (req, res, next) => {
    UserService.createUser(req.body)
        .then(() => {
            res
                .status(201)
                .send({
                    message: 'Successfully registered.',
                    hasErrors: false
                })
        })
        .catch(err => {
           next(err);
        });
}

const setPlaceTypes = (req, res, next) => {
    UserService.setPlaceTypes(req.body)
        .then(() => {
            res
                .status(200)
                .send({
                    message: 'Successfully stored selected place types.',
                    hasErrors: false
                })
        })
        .catch(err => {
            next(err);
        });
}

// routes
userRouter.post('/registration', register);
userRouter.post('/placeTypesSelection', setPlaceTypes)

export default userRouter;
