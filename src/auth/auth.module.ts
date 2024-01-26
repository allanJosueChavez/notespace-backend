import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})], // JwtModule.register({}) is needed in order to use the JwtModule in the AuthModule.
  // once the jwtmodule is imported in the authModule the jwtService is available to be injected in the authservice.
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // Don't you ever dare to forget to add the JwtStrategy here. I was going crazy looking through all the projec tin order to find why I was coming accross the error 'jwt' is not defined.
  //Unknown authentication strategy "jwt"
  // Providers are the services that are going to be injected in the controllers.
  // The imports are the modules that are going to be used in the module.
  // The difference between providers and imports is that providers are the services that are going to be injected in the controllers, and imports are the modules that are going to be used in the module.

  // JwtModule can be used in the AuthModule, JwtStrategy can be used in the AuthModule, AuthService can be used in the AuthModule
  // AuthController can be used in the AuthModule.
  // AuthGuard('jwt') can be used in the NoteModule.
})
export class AuthModule {}
