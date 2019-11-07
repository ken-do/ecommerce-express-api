import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import * as bcrypt from 'bcrypt';

import User from './src/models/User';
import IUserData from './src/interfaces/UserData';

passport.use(new BasicStrategy(
    async (username, password, done) => {
        const userObj = new User;
        const user = await userObj.model.findOne({ username: username });

        if (!user) {
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.hashedPassword);
        if (match) {
            return done(null, user);
        }
    }
));

export default passport;