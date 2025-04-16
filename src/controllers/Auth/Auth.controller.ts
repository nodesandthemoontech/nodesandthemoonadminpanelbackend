import { Request, Response } from 'express';
import chalk from 'chalk';
import * as yup from 'yup';
import {
  createUserSchema,
  loginUserSchema,
  logoutUserSchema,
} from '../../validators/Auth/index';
import { UserModal } from '../../models/User/User.modal';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const genrateAcessAndRefreshToken = async (
  userId: string
): Promise<TokenPair> => {
  try {
    const UserData = await UserModal.findById(userId);

    if (UserData) {
      const accessToken = await UserData?.genrateAccessToken();
      const refreshToken = await UserData?.genrateRefreshToken();
      UserData.refreshToken = refreshToken;
      await UserData.save({ validateBeforeSave: true });
      return { accessToken, refreshToken };
    } else {
      console.log(chalk.redBright('User not found'));
    }
  } catch (err) {
    console.log(chalk.redBright(err));
    console.log(
      chalk.redBright(
        'Something Went Wrong While Genrating Access And Refresh Token'
      )
    );
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await loginUserSchema.validate(body, { abortEarly: false });
    const { email, password } = body;
    const LoggedInUser = await UserModal.findOne({ email });
    if (!LoggedInUser) {
      return res
        .status(404)
        .json({ error: 'User with this email not exist' });
    } else {
      const isPasswordCorrect = await LoggedInUser.isPasswordCorrect(password);
      if (isPasswordCorrect) {
        const { accessToken, refreshToken } = await genrateAcessAndRefreshToken(
          LoggedInUser._id as string
        );
        return res
          .status(200)
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
          })
          .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .json({ message: 'User Logged In Suceefully' });
      } else {
        return res.status(401).json({ error: 'Invalid Credaintials' });
      }
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await createUserSchema.validate(body, { abortEarly: false });
    const { name, email, password } = body;
    const ExistingUser = await UserModal.findOne({ email });

    if (ExistingUser) {
      return res
        .status(400)
        .json({ error: 'User with this email already exist' });
    } else {
      const CreatedUser = new UserModal({ name, email, password });
      const refreshToken = CreatedUser.genrateRefreshToken();
      CreatedUser.refreshToken = refreshToken;
      const accessToken = CreatedUser.genrateAccessToken();
      await CreatedUser.save();
      return res
        .status(201)
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ message: 'User created sucessfully' });
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const refreshToken = req.cookies.refreshToken;
    await logoutUserSchema.validate(
      { email, refreshToken },
      { abortEarly: false }
    );
    const User = await UserModal.findOne({ email });
    if (User) {
      User.refreshToken = '';
      await User.save({ validateBeforeSave: false });
    }
    res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(200)
      .json({ message: 'Logout sucessfully' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
