import httpStatus from 'http-status';
import { User } from '../users/user.model';
import {
  ILoginUsers,
  ILoginUsersResponse,
  IRefreshTokenResponse,
} from './auth.Interface';
import ApiError from '../../../errors/ApiError';
import Config from '../../../Config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwt.Helpers';

const loginUsers = async (
  payload: ILoginUsers
): Promise<ILoginUsersResponse> => {
  const { email, password } = payload;
  // creating instance of User
  // const user = new User();

  // Access to our instance methods
  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }
  // Matched Password
  if (
    isUserExist &&
    isUserExist?.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id, email: usermail } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, usermail },
    Config.jwt.secret as Secret,
    Config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, usermail },
    Config.jwt.refresh_secret as Secret,
    Config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    email: isUserExist.email,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify Token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      Config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userNumber } = verifiedToken;

  // Checking deleted user's refresh token
  const isUserExist = await User.isUserExist(userNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist._id },
    Config.jwt.secret as Secret,
    Config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
    user: isUserExist,
  };
};

export const AuthService = {
  loginUsers,
  refreshToken,
};
