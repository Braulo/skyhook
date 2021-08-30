import { Profile, VerifyCallback, Strategy } from 'passport-google-oauth20';
import { RealmApplication } from '../entities/realmApplication.entity';
import passport from 'passport';
import { User } from '../entities/user.entity';

export const createGoogleStrategy = async (clientId: string) => {
  const realmApplication = await RealmApplication.findOneOrFail({
    where: {
      clientId,
    },
    relations: ['externalProvider', 'realmApplicationURLs'],
  });

  const googleProviderConfig = realmApplication.externalProvider.find((providerData) => {
    return (providerData.name = process.env.GoogleAuthProviderName || 'Google');
  });

  const GoogleStrategyConfig = {
    clientID: googleProviderConfig?.key || '',
    clientSecret: googleProviderConfig?.secret || '',
    callbackURL: `${process.env.GoogleAuthCallbackURI}${clientId}`,
  };

  const verifyLogin = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const user = await User.createQueryBuilder('Users')
      .where(`Users.email='${profile._json.email}'`)
      .orWhere(`Users.externalProviderId='${profile.id}'`)
      .getOne();

    if (user) {
      return done(null, { user, callbackUrl: realmApplication.realmApplicationURLs[0].url });
    }

    const newUser = User.create({
      email: profile._json.email,
      username: profile.displayName,
      realmApplication: realmApplication,
      externalProviderId: profile.id,
      externalProviderName: process.env.GoogleAuthProviderName || 'Google',
    });

    const savedUser = await User.save(newUser).catch((err) => {
      return done(err, undefined);
    });

    return done(null, { user: savedUser, callbackUrl: realmApplication.realmApplicationURLs[0].url });
  };

  return new Strategy(GoogleStrategyConfig, verifyLogin);
};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((id, cb) => {
  cb(null, {});
});
