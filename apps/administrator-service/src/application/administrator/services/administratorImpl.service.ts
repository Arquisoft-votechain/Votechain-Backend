import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorResponse } from '../dto/administrator.response';
import { Administrator, AdministratorService } from 'src/domain/index.domain';
import { CreateAdministratorDto } from '../dto/create-administrator.dto';
import { UpdateAdministratorDto } from '../dto/update-administrator.dto';
import { SchoolClient } from 'src/shared/school/school.client';
import { UserClient } from 'src/shared/user/user.client';

@Injectable()
export class AdministratorServiceImpl implements AdministratorService {
  constructor(@InjectRepository(Administrator) private administratorRepository: Repository<Administrator>,
    private readonly schoolClient: SchoolClient,
    private readonly userClient: UserClient){}

  async create(createAdministratorDto: CreateAdministratorDto){

    try{
    const UserExist = this.userClient.getUserById(createAdministratorDto.userId);
    if(!UserExist){
      return new AdministratorResponse(`User with id ${createAdministratorDto.userId} is not registered`);
    }

    const SchoolExist = this.schoolClient.getSchoolById(createAdministratorDto.schoolId);
    if(!SchoolExist){
      return new AdministratorResponse(`School with id ${createAdministratorDto.schoolId} is not registered`);
    }

    const newAdministrator = await this.administratorRepository.save({
      name: createAdministratorDto.name,
      lastName: createAdministratorDto.lastName,
      age: createAdministratorDto.age,
      identifier: createAdministratorDto.identifier,
      dni: createAdministratorDto.dni,
      schoolId: createAdministratorDto.schoolId,
      userId: createAdministratorDto.userId,
      });
    return new AdministratorResponse('',newAdministrator);
    }catch (error){
      return new AdministratorResponse(`An error ocurred when finding ` + error.message);
    }
    //return 'This action adds a new Administrator';
  }

  async findAll(): Promise<Administrator[]> {
    return this.administratorRepository.find();
  }

  async findOne(id: number){
    try{
      const AdministratorExist =  await this.administratorRepository.findOne({where: {id: id}});

    if (!AdministratorExist) {
      return new AdministratorResponse(`Administrator with id ${id} is not registered`);
    }
    return new AdministratorResponse('',AdministratorExist);
    }catch (error){
      return new AdministratorResponse(`An error ocurred when finding ` + error.message);
    }
    
    //return `This action returns a #${id} Administrator`;
  }

  async findByDNI(dniAdministrator: any){
    try{
      const AdministratorExist =  await this.administratorRepository.findOne(
      {
        where: {
          dni: dniAdministrator,
        }
      });

      if (!AdministratorExist) {
        return new AdministratorResponse(`Administrator with dni ${dniAdministrator} is not registered`);
      }
      return new AdministratorResponse('',AdministratorExist);
    }catch(error){
      return new AdministratorResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findByUserId(userId: any){
    try{
      const administratorExist = await this.administratorRepository.findOne(
      {
        where: {
          userId: userId,
        }
      });

      if (!administratorExist) {
        return new AdministratorResponse(`Administrator with User Id ${userId} is not registered`);
        }
    return new AdministratorResponse('',administratorExist);
    }catch(error){
      return new AdministratorResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async update(id: any, updateAdministratorDto: Partial<UpdateAdministratorDto>) {
    const AdministratorExist =  await this.administratorRepository.findOne({where: {id: id}});

    if (!AdministratorExist) throw new NotFoundException(`Administrator with id ${id} is not registered`);
    const updatedAdministrator = Object.assign(AdministratorExist,updateAdministratorDto);

    return await this.administratorRepository.save(updatedAdministrator);
    //return `This action updates a #${id} Administrator`;
  }

  async remove(id: any): Promise<void> {
    const AdministratorExist =  await this.administratorRepository.findOne({where: {id}});

    if (!AdministratorExist) throw new NotFoundException(`Administrator with id ${id} is not registered`);

    await this.administratorRepository.remove(id);
    //return `This action removes a #${id} Administrator`;
  }
}
