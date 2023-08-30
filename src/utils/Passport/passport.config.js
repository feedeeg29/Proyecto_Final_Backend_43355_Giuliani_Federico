import passport from "passport";
// import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userManager from "../../DAOs/mongo/manager/manager.user.mongo.js";
import { createHash, isValidPassword } from "../utils.js";

// const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: "Iv1.76be997dfddc2044",
                clientSecret: "e3e799a63d667fcf454dac914cc0a9bc7fb48d74",
                callbackURL: "http://localhost:8080/mongouser/githubcallback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await userManager.getUserByEmail(profile._json.email);
                    console.log(profile)
                    if (user) { console.log(user) } else { console.log("no hay usuario") }
                    if (!user) {
                        const newUser = {
                            first_name: profile._json.name.split(" ")[0],
                            last_name: profile._json.name.split(" ")[2],
                            email: profile._json.email,
                            password: createHash(password)
                        };
                        const result = await userManager.createUser(newUser);
                        return done(null, result);
                    } else {
                        return done(null, user);
                    }
                } catch (error) {
                    return done("Error al obtener el usuario" + error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getUserById(id);
        done(null, user);
    });
};

export default initializePassport;
