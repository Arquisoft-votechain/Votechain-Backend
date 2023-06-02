import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UserResponse } from './dto/user.response';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hash(createUserDto.password, 10);

    const newUser = await this.userRepository.save({
      email: createUserDto.email,
      password: createUserDto.password
    });
    return newUser;
    //return 'This action adds a new User';
  }

  /*async decryptPassword(password: string, attempt: string): Promise<boolean> {
    return await compare(attempt, password);
  }*/

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: any){
    try{
      const UserExist =  await this.userRepository.findOne({where: {id}});

    if (!UserExist) {
      return new UserResponse(`User with id ${id} is not registered`);
    }
    return new UserResponse('',UserExist);
    }catch (error){
      return new UserResponse(`An error ocurred when finding ` + error.message);
    }
    //return `This action returns a #${id} User`;
  }

  async update(id: any, updateUserDto: Partial<UpdateUserDto>) {
    const UserExist =  await this.userRepository.findOne({where: {id}});

    if (!UserExist) throw new NotFoundException(`User with id ${id} is not registered`);
    updateUserDto.password = await hash(updateUserDto.password, 10);
    const updatedUser = Object.assign(UserExist,updateUserDto);

    return await this.userRepository.save(updatedUser);
    //return `This action updates a #${id} User`;
  }

  async remove(id: any): Promise<void> {
    const UserExist =  await this.userRepository.findOne({where: {id}});

    if (!UserExist) throw new NotFoundException(`User with id ${id} is not registered`);

    await this.userRepository.remove(id);
    //return `This action removes a #${id} User`;
  }
}
