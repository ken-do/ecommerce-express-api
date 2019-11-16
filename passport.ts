import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import User from './src/models/User';

passport.use(new BasicStrategy(
    async (username, password, done) => {
        const userModel = new User;
        const user = await userModel.findOne({ username: username });

        if (!user) {
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.hashedPassword);

        if (match) {
            return done(null, user);
        }

        return done(null, false);
    }
));

passport.use(new BearerStrategy(
    async (token: string, done) => {
        const userModel = new User;
        const user = await userModel.findOne({ token });
        if (!user) {
            return done(null, false, 'A user does not exist');
        } else if (new Date(user.tokenExpiryDate) === new Date()) {
            return done(null, false, 'Token was expired');
        }

        return done(null, user);
    }
));

export default passport;