import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.API_KEY

@Injectable()
export class AuthService {
  private users: { email: string; passwordHash: string }[] = [];

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    this.users.push({ email, passwordHash: hash });
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new Error('Invalid credentials');

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    return { token };
  }
}
