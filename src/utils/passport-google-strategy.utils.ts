// import { NextFunction, Request, Response } from 'express';
import passportGoogle, { Profile } from 'passport-google-oauth20';
import { RealmApplication } from '../entities/realmApplication.entity';
// import { User } from '../entities/user.entity';
import passport from 'passport';
import { User } from '../entities/user.entity';
const GoogleStrategy = passportGoogle.Strategy;

// export const passportGoogleAuthConfig = async (req: Request, res: Response, next: NextFunction) => {
//   const { clientId } = req.query;

//   try {
//     const realmApplication = await RealmApplication.findOneOrFail({
//       where: {
//         clientId,
//       },
//       relations: ['externalProvider', 'realmApplicationURLs'],
//     });
//     // console.log(realmApplication);

//     const GoogleStrategyConfig = {
//       // Todo [0]
//       clientID: realmApplication.externalProvider[0].key,
//       clientSecret: realmApplication.externalProvider[0].secret,
//       // ToDo vllt eine andere callback bspw. backend von client
//       callbackURL: `http://localhost:3000/api/auth/external/callback`,
//     };

//     const verifyCallback = async (
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: VerifyCallback,
//     ) => {
//       const user = await User.findOne({
//         where: {
//           email: profile._json.email,
//         },
//       });

//       if (user) {
//         // Todo
//         return done(null, { user, callbackUrl: realmApplication.realmApplicationURLs[0].url });
//       }

//       const newUser = User.create({
//         email: profile._json.email,
//         username: profile.displayName,
//         realmApplication: realmApplication,
//       });

//       const savedUser = await User.save(newUser).catch((err) => {
//         return done(err, undefined);
//       });

//       // Todo
//       return done(null, { user: savedUser, callbackUrl: realmApplication.realmApplicationURLs[0].url });
//     };

//     passport.use('test', new GoogleStrategy(GoogleStrategyConfig, verifyCallback));
//     next();
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

export const createGoogleStrategy = async (clientId: string) => {
  // console.log('gronkg', clientId);

  const realmApplication = await RealmApplication.findOneOrFail({
    where: {
      clientId,
    },
    relations: ['externalProvider', 'realmApplicationURLs'],
  });
  // console.log(realmApplication);

  const GoogleStrategyConfig = {
    // Todo [0]
    clientID: realmApplication.externalProvider[0].key,
    clientSecret: realmApplication.externalProvider[0].secret,
    // ToDo vllt eine andere callback bspw. backend von client
    callbackURL: `http://localhost:3000/api/auth/external/google?clientId=${clientId}`,
  };

  const strategy = new GoogleStrategy(GoogleStrategyConfig, async function (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb,
  ) {
    console.log('test lol');
    const user = await User.findOne({
      where: {
        email: profile._json.email,
        realmApplication,
      },
    });

    if (user) {
      // Todo
      return cb(null, { user, callbackUrl: realmApplication.realmApplicationURLs[0].url });
    }

    const newUser = User.create({
      email: profile._json.email,
      username: profile.displayName,
      realmApplication: realmApplication,
    });

    const savedUser = await User.save(newUser).catch((err) => {
      return cb(err, undefined);
    });

    // Todo
    return cb(null, { user: savedUser, callbackUrl: realmApplication.realmApplicationURLs[0].url });
  });

  return strategy;
};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((id, cb) => {
  cb(null, {});
});
