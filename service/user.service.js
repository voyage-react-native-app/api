import moment from 'moment';
import bcrypt from 'bcrypt';

import User from '../model/user.model.js';
import constants from '../util/constants.js';

export const createUser = async params => {
    const existingUserCheck = await User.findOne({ email: params.email });

    if(existingUserCheck) throw constants.EXISTING_USER;

    const user = new User({
        username: params.username,
        email: params.email,
        password: bcrypt.hashSync(params.password, 10),
        date: moment().add(1, 'hours').format()
    });

    await user.save();
}

export const setPlaceTypes = async ({ email, selectedPlaceTypes }) => {
    const user = await User.findOne({ email });
    user.preferences.placeTypes = selectedPlaceTypes;

    await user.save();
}
