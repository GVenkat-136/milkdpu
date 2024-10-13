import Jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';


interface Users {
  _id: ObjectId | string;
  name: string;
  contact: string;
  email: string;
  password: string;
  role: string;
  organizationId: ObjectId | string;
}

export async function generateTokens(params: Users){
  try {
    const JWT_SECRET: string = process.env.JWT_SECRET || '';
    if (!JWT_SECRET) {
      throw new Error('JWT secret is not defined');
    }

    const payload = {
      _id: params._id.toString(),
      name: params.name,
      contact: params.contact,
      email: params.email,
      role: params.role,
      organizationId: params.organizationId.toString()
    };

    const accessToken = await Jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = await Jwt.sign(payload, JWT_SECRET, { expiresIn: '7h' });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Failed to create tokens');
  }
}

export async function verifyToken(token: string) {
  try {
    const JWT_SECRET: string = process.env.JWT_SECRET || '';
    if (!JWT_SECRET) {
      throw new Error('JWT secret is not defined');
    }

    const decoded = await Jwt.verify(token, JWT_SECRET) as Users;
    
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Invalid or expired token');
  }
}