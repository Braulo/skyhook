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
    return (providerData.name = 'Google');
  });

  const GoogleStrategyConfig = {
    clientID: googleProviderConfig?.key || '',
    clientSecret: googleProviderConfig?.secret || '',
    // This will be called by goole once the login is successfull (should be added to the Google Callback URI's)
    // This endpoint then will generate the accesstoken / refreshToken
    // and redirect to the realm application client callback url
    callbackURL: `${process.env.SkyhookUrl}/api/auth/external/google?clientId=${clientId}`,
  };

  const verifyLogin = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const user = await User.createQueryBuilder('user')
      .leftJoinAndSelect('user.realmApplication', 'realmApplication')
      .where(`realmApplication.clientId = '${clientId}'`)
      .leftJoinAndSelect('realmApplication.realmApplicationURLs', 'realmApplicationURLs')
      .andWhere(`user.email = '${profile._json.email}'`)
      .getOne();

    // If the user is already created we can just redirect them to the client
    if (user) {
      return done(null, { user, callbackUrl: realmApplication.realmApplicationURLs[0].url });
    }

    const newUser = User.create({
      email: profile._json.email,
      username: profile.displayName,
      realmApplication: realmApplication,
      externalProviderId: profile.id,
      externalProviderName: 'Google',
    });

    const savedUser = await User.save(newUser).catch((err) => {
      return done(err, undefined);
    });

    // callbackUrl = is the realm applicattion endpoint where we want to send the user to
    // once the Google Login was successfull (this url gets the AccessToken / RefreshToken)
    // 'http://localhost:4200/callback?accessToken=123&refreshToken=123' for example
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
