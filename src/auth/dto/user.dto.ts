import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsBoolean()
  verified: boolean; 
}

// Question: Do I have to create a dto for every model or for every controller or function? 
// what about creating and updating they don't require the same attributes, in that case I would need two dtos for the same model.

