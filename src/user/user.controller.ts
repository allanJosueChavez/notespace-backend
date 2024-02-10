import { Controller, Get, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from'../auth/guard'; 
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard) // Placing it here is going to protect all the methods of the controller
@Controller('user')
export class UserController {
  
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard) // If I only place it here, above the method, it will protect the method, but not the controller
  @Get('me')
  // If we need  param in GetUser we can do it by just defining it like: @GetUser('email')  email: string
  getMe(@GetUser() user: User) { // Type User is coming from the Prisma client
    console.log('The user is: ');
    console.log(user);
    // return user;
    // return req.user;
    return this.userService.getMe(user);
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() user_info : User) {
    console.log('The user is: ');
    console.log(userId);
    return this.userService.editUser(userId,  user_info);
    // return 'olivia rodrigo'
  }
}
