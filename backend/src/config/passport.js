import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../models/user.model.js";
import { TenantModel } from "../models/tenant.model.js";
import { LandlordModel } from "../models/landlord.model.js";
import { generateAccessAndRefreshTokens } from "../config/token.js";
import { isProduction } from "../config/env.js";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isProduction
        ? `${process.env.SERVER}/api/v1/user/google/callback`
        : `http://localhost:${process.env.PORT}/api/v1/user/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      //console.log(profile);
      try {
        const email = profile.emails[0]?.value;
        const role = req.query.state; // tenant or landlord
        if (!email) throw Error("email not found");
        let user = await UserModel.findOne({ email });
        if (!user) {
          user = await UserModel.create({
            email,
            name: profile.displayName,
            profilePicture: profile.photos?.[0]?.value || "",
            googleId: profile.id,
            role,
            authProvider: "google",
          });

          // 🔹 Create role specific profile
          if (role === "tenant") {
            await TenantModel.create({
              userId: user._id,
              profile: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
              },
              verification: {
                verified: true,
                verifiedAt: Date.now(),
              },
            });
          }

          if (role === "landlord") {
            await LandlordModel.create({
              userId: user._id,
              profile: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
              },
              verification: {
                verified: true,
                verifiedAt: Date.now(),
              },
            });
          }
        }

        // if (user.role !== role) {
        //   return cb(new Error("Account already registered with another role"));
        // }

        user.refreshTokenExpiresAt = new Date(
          Date.now() +
            Number(process.env.REFRESH_TOKEN_EXPIRY_AT) * 24 * 60 * 60 * 1000,
        );
        await user.save({ validateBeforeSave: false }); //ok here we are saving

        const { accessToken: jwtaccessToken, refreshToken: jwtrefreshToken } =
          await generateAccessAndRefreshTokens(user._id);

        user = user.toObject(); // converting this to object because sending user in req, which czn be later req.user
        user.accessToken = jwtaccessToken;
        user.refreshToken = jwtrefreshToken;

        return cb(null, user);
      } catch (error) {
        console.error("failed to autenticate user", error);
        return cb(error, null);
      }
    },
  ),
);

export default passport;
