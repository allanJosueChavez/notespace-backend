import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService, // word private is to create a property in the class
  ) {}
 
  async signin(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }
      const pwMatches = await argon.verify(user.password, dto.password);
      if (!pwMatches) {
        throw new ForbiddenException('Invalid credentials');
      }
      delete user.password;
    //   return {
    //     message: 'User logged in',
    //     user,
    //     token: await this.signToken(user.id, user.email),
    //   };
    return await this.signToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  // Right now I'm using the same dto for signup and signin. But I wanna have two
  // Because when creating a new user I want to have more attributes like name, lastname, etc.
  // AuthDto is a good name for the signin, but fort the signup an excellent name would be either CreateUserDto or UserDto
  async signup(dto: AuthDto) {
    console.log('signup from auth service');

    try {
      // Generate the password has
      const hash = await argon.hash(dto.password);
      // save the new user in the database
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: hash,
        },
        //   select: {
        //     id: true,
        //     email: true,
        //     createdAt: true,
        //   },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log('Error from prisma. Email already exists');
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signToken(userId: number, email: string) : Promise<{access_token: string}>
  // Types of typescript functions could be void, number, string, etc.
  // The word Promise after the colon represents 
  {
    const configSecret = this.config.get<string>('JWT_SECRET');
    // <string> is 
    const envSecret = process.env.JWT_SECRET;
    const payload = {
      sub: userId,
      email,
    };
    const token = await  this.jwt.signAsync(payload, {
      secret: configSecret,
      expiresIn: '15m',
    });
    return {
        access_token: token,
    }
  }
}
