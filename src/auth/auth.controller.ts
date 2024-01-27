import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto, CreateUserDto } from './dto';

@Controller('auth') // The decorator @Controller() takes a string argument that represents the path to the controller
export class AuthController {
  // In order to use a service from a controller, we need to inject, the way to do it is:
  //1. By using the decorator @Injectable() in the service.
  //2. In the controller we need to use a constructor and pass the service as an argument.
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
