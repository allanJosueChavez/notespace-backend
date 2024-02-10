import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  getMe(user: User) {
    return user;
  }

  editUser(user_id: Number, user_info: User) {
    return user_info;
  }

}
