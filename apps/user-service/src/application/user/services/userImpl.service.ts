import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/user/models/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UserResponse } from '../dto/user.response';
import { UserService } from 'src/domain/index.domain';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto){
    try{
    const UserExist =  await this.userRepository.findOne({where: {email: createUserDto.email}});
    if (UserExist) {
      return new UserResponse(`User with email ${createUserDto.email} is registered`);
    }
    createUserDto.password = await hash(createUserDto.password, 10);

    const newUser = await this.userRepository.save({
      email: createUserDto.email,
      password: createUserDto.password,
      isAdmin: createUserDto.isAdmin
    });
    return new UserResponse('',newUser);
    }
    catch (error){
      return new UserResponse(`An error ocurred when finding ` + error.message);
    }
    //return 'This action adds a new User';
  }

  async verifyUser(email: string, password: string){
    try{
    const UserExist =  await this.userRepository.findOne({where: {email: email}});
    if (!UserExist) {
      return new UserResponse(`User with email ${email} is not registered`);
      }
    const verifiedPassword = await this.comparePassword(password, UserExist.password);
    if (!verifiedPassword) {
      return new UserResponse(`Password is incorrect`);
    }
    return UserExist.id;
    }
    catch (error){
      return new UserResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async comparePassword(password: string, attempt: string): Promise<boolean> {
    return await compare(password, attempt);
  }

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
