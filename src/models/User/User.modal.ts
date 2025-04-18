import mongoose, { Schema, Model } from 'mongoose';
import { UserDocument } from './types/index';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import crypto from 'crypto';
import ms from 'ms';

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.genrateAccessToken = function () {
  const payload = {
    name: this.name,
    _id: this._id,
    email: this.email,
  };
  const secretKey: Secret = process.env.ACCESS_TOKEN_SCERET_KEY as Secret;
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRY as unknown as number
  const token = jwt.sign(
    payload,
    secretKey,
    expiresIn ? { expiresIn } : undefined
  );
  return token;
};

UserSchema.methods.genrateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };
  const secretKey: Secret = process.env.REFRESH_TOKEN_SCERET_KEY as Secret;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRY as unknown as number
  const token = jwt.sign(
    payload,
    secretKey,
    expiresIn ? { expiresIn } : undefined
  );
  return token;
};

UserSchema.methods.genrateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex');
  const tokenExpiry = Date.now() + 20000;
  return { unHashedToken, hashedToken, tokenExpiry };
};

export const UserModal: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  UserSchema
);
