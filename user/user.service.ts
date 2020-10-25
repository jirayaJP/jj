import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { petinfo } from 'src/petInfo/petInfo.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(petinfo)private petInfoRepository: Repository<petinfo>,
    
    ){}

    async CreateUser(CreateUserInput: CreateUserInput): Promise<User>{
        const {UserName, Password, FirstName, LastName, ProfilePicURL, Birthday, Gender, PhoneNo, Email, LocationLat, LocationLong, Facebook, AvgPoint, Description, TimeUpdate} = CreateUserInput;
        
        const user = this.userRepository.create({
            id: uuid(),
            UserName,
            Password,
            FirstName,
            LastName,
            ProfilePicURL,
            Birthday,
            Gender,
            PhoneNo,
            Email,
            LocationLat,
            LocationLong,
            Facebook,
            AvgPoint,
            Description,
            TimeUpdate
        });

        return this.userRepository.save(user);
    }

    async getUser(UserName: string): Promise<User>{
        return this.userRepository.findOne({UserName});
    }

    async findAll(): Promise<User[]> {
        const res = await this.userRepository.find();
        console.log(res);
        
        return res;
    }
    async findUserId(UserId:string): Promise<User>{
        const found = await this.userRepository.findOne({where:{ UserId }});
        if (!found) {
            throw new NotFoundException(`Task with ID ${UserId} not found`);
        }
        return found;
    }
    async findUserByUsername(UserName:string): Promise<User>{
        return this.userRepository.findOne({where:{UserName:UserName}});
    }

    async findUserByEmail(Email:string):Promise<User>{
        return this.userRepository.findOne({where:{Email:Email}});
    }

    async saveUser(user:User){
        return this.userRepository.save(user);
    }

    async UpdateUserPhoneNO(UserId:string, PhoneNO: string): Promise<User>{
        const userinfo = await this.findUserId(UserId)
        userinfo.PhoneNo = PhoneNO;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserEmail(UserId: string,Email: string): Promise<User>{
        const userinfo = await this.findUserId(UserId)
        userinfo.Email = Email;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserInfo(UserId: string,FirstName:string,LastName:string,Birthday:Date,Gender:string,Facebook: string): Promise<User>{              
        const userinfo = await this.findUserId(UserId);
        userinfo.FirstName = FirstName;
        userinfo.LastName = LastName;
        userinfo.Birthday = Birthday;
        userinfo.Gender = Gender;
        userinfo.Facebook = Facebook;
        await this.userRepository.save(userinfo);
        return userinfo;
    }

    async UpdateUserDescription(UserId: string,Description: string): Promise<User>{
        const userinfo = await this.findUserId(UserId);
        userinfo.Description = Description;
        await this.userRepository.save(userinfo);

        return userinfo;
    }

    async findAllPetRegister(UserId:string): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{UserId:UserId, regPetStatus:"register"}});
    }

    async findAllPetAdoption(UserId:string): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{ AdopUserId: UserId ,adopPetStatus:"adoption"}});
    }

    async findAllPetDonation(UserId:string): Promise<petinfo[]>{
        return this.petInfoRepository.find({where:{ UserId: UserId , regPetStatus:"donation"}});
    }

    async deleteUserId(id:string): Promise<void>{
        await this.userRepository.delete(id);
    }


}
