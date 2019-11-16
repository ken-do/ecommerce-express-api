import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';

import User from './src/models/User';

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
        
        return done(null, false);
    }
));

export default passport;