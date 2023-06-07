import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { AdministratorResponse } from './dto/administrator.response';

@Injectable()
export class AdministratorService {
  constructor(@InjectRepository(Administrator) private administratorRepository: Repository<Administrator>){}

  async create(createAdministratorDto: CreateAdministratorDto): Promise<Administrator> {
    const newAdministrator = await this.administratorRepository.save({
      name: createAdministratorDto.name,
      lastName: createAdministratorDto.lastName,
      age: createAdministratorDto.age,
      identifier: createAdministratorDto.identifier,
      dni: createAdministratorDto.dni,
    });
    return newAdministrator;
    //return 'This action adds a new Administrator';
  }

  async findAll(): Promise<Administrator[]> {
    return this.administratorRepository.find();
  }

  async findOne(id: number){
    try{
      const AdministratorExist =  await this.administratorRepository.findOne({where: {id}});

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

  async update(id: any, updateAdministratorDto: Partial<UpdateAdministratorDto>) {
    const AdministratorExist =  await this.administratorRepository.findOne({where: {id}});

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
