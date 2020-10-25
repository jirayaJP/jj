import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param ,Delete, Patch, HttpException, HttpStatus} from '@nestjs/common';
import { CreateUserInput } from './create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { petinfo } from 'src/petInfo/petInfo.entity';

@Controller('User')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    @UsePipes(ValidationPipe)
    CreateUser(
        @Body() CreateUserInput: CreateUserInput,
    ): Promise<User>{
        return this.userService.CreateUser(CreateUserInput);
    }

    @Get()
    async findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':UserId/petregister')
    async findAllPetRegister(@Param('UserId') UserId: string): Promise<petinfo[]>{
        return this.userService.findAllPetRegister(UserId);
    }

    @Get(':UserId/petdonation')
    async findAllPetDonation(@Param('UserId') UserId: string): Promise<petinfo[]>{
        return this.userService.findAllPetDonation(UserId);
    }

    @Get(':UserId/petadoption')
    async findAllPetAdoption(@Param('UserId') UserId: string): Promise<petinfo[]>{
        return this.userService.findAllPetAdoption(UserId);
    }

    @Get('/:UserId')
    async findUserId(@Param('UserId') UserId: string): Promise<User>{
        return this.userService.findUserId(UserId);
    }
    
    @Delete(':UserId/setting/delete')
    deleteUserId(@Param('UserId') UserId: string): Promise<void>{
        return this.userService.deleteUserId(UserId);
    }
    
    @Patch(':UserId/setting/phone')
    async UpdateUserPhone(@Param('UserId') UserId: string,
                          @Body('PhoneNO') PhoneNO: string): Promise<User>{
        return this.userService.UpdateUserPhoneNO(UserId,PhoneNO);  
    }

    @Patch(':UserId/setting/email')
    async UpdateUserEmail(@Param('UserId') UserId: string,
                          @Body('Email') Email: string): Promise<User>{
        return this.userService.UpdateUserEmail(UserId,Email);
    }

    @Patch(':UserId/setting/description')
    async UpdateUserDes(@Param('UserId') UserId: string,
                        @Body('Description') Description: string): Promise<User>{
        return this.userService.UpdateUserDescription(UserId,Description);
    }

    @Patch(':UserId/setting/infosetting')
    async UpdateUserInfo(@Param('UserId') UserId: string,
                         @Body('FirstName') FirstName: string,
                         @Body('LastName') LastName: string,
                         @Body('Birthday') Birthday: Date,
                         @Body('Gender') Gender: string,
                         @Body('Facebook') Facebook: string             
        ): Promise<User>{
        if((FirstName!='')
        && (LastName!='')
        && (Birthday!=null)
        && (Gender!='')){
            return this.userService.UpdateUserInfo(UserId,FirstName,LastName,Birthday,Gender,Facebook);
        }
        else{
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        }
    }
  
}
