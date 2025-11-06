import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole }  from  '@prisma/client';


export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
 password_hash: string;

  @IsEnum(UserRole)
  role: UserRole;
}
