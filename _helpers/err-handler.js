import constants from '../util/constants.js';

const errorHandler = (err, req, res, next) => {
    switch(err) {
        case constants.EXISTING_USER: {
            return res
                .status(409)
                .json({
                    hasErrors: true,
                    message: err
                })
        }
    }
}

export default errorHandler;
