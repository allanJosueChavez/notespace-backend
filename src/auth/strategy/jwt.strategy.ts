import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  // validate functino receievs the payload decoded from the JWT
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.password;
    if (!user) {
      throw new Error('User not found');
    }
    return user;
    // Common error if you don't return anything. You get a 401 error.
  }
  // The Passport Strategy validates the header of the request and if it is valid it returns the payload of the JWT.
  // The validate method is called by the Passport Strategy and it returns the payload of the JWT once it's determinated its validity.
}

// A strategy is a design pattern that allows you to provide a unique implementation for a family of algorithms.
// Therefore it must contain the @Injectable() decorator in order to be injected in other classes. In this case the JwtStrategy class is injected in the AuthModule.
// This class JwtStrategy uses the PassportStrategy class from the @nestjs/passport package in order to handle the authentication.
