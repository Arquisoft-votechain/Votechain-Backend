import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestRoleDto } from './dto/request-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { error } from 'console';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ){

  }

  async create(requestRoleDto: RequestRoleDto) {
    
    try{
      const role = this.roleRepository.create(requestRoleDto);
      await this.roleRepository.save(role);
      
      return role;
    }catch(error){
      console.log(error)
    }

  }

  findAll() {
    return this.roleRepository.find({});
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOneBy({id});
    
    if(!role) throw new NotFoundException(`Role with id ${id} not found`);
    
    return role;
  }

  async update(id: number, requestRoleDto: RequestRoleDto) {
    
    const role = await this.roleRepository.preload({
      id: id,
      ...requestRoleDto
    })

    if( !role) throw new NotFoundException(`Role with id ${id} not found`);

    return await this.roleRepository.save(role);
  }

  async remove(id: number): Promise<ResponseRoleDto> {
    const role = await this.roleRepository.findOneBy({id});
    
    if(!role) throw new NotFoundException(`Role with id ${id} not found`);

    return await this.roleRepository.remove(role);

  }
}
