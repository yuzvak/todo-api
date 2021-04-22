const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../settings.json')
const db = require('../db/db')
const bcrypt = require('bcrypt')


let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken('JWT');
opts.secretOrKey = JWT_SECRET;

passport.use(
    'reg',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            bcrypt.hash(password, 10, async function(err, hash) {
                if (err) {
                    return console.log('err');
                }
                const checkExistence = await db.query("SELECT * from users where username = $1", [username])
                if (checkExistence.rows.length > 0) {
                    return done(400)
                } else {
                    const user = await db.query("INSERT INTO users (username, password) values ($1, $2) RETURNING *", [username, hash])
                    done(null, user.rows[0])
                }
            });
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            const user = await db.query("SELECT * from users where username = $1", [username])
            bcrypt.compare(password, user.rows[0].password, function(err, result) {
                if (err) {
                    return console.log('err')
                }
                if (result) {
                    return done(null, user.rows[0]);
                } else {
                    return done(403);
                }
            });
        }
    )
);

passport.use(new JWTstrategy(opts, async (JWT, done) => {
    const checkUser = await db.query("SELECT EXISTS(SELECT id FROM users WHERE id = 1)")
    if(checkUser.rows[0].exists === false) {
        return done('no user')
    }
    done(null, JWT.user)
}));

class UserController {
    async regUser(req, res) {
        res.json({
            success: true,
            id: req.user.id,
            username: req.user.username
        })
    }
    async authUser(req, res) {
        const body = { id: req.user.id, username: req.user.username };
        const token = jwt.sign({ user: body }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ token })
    }
}

module.exports = new UserController();
