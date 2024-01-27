import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    return "It's me my man";
  }
}
