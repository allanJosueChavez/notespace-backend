import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [], // Here the service of user is exported
})
export class UserModule {}
