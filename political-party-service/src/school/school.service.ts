import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SchoolService {

  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ){

  }

  async create(requestSchoolDto: RequestSchoolDto) {
    try{
      const school = this.schoolRepository.create(requestSchoolDto);
      await this.schoolRepository.save(school);
      
      return school;
    }catch(error){
      console.log(error)
    }
  }

  findAll() {
    return this.schoolRepository.find({});
  }

  async findOne(id: number) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);
    
    return school;
  }

  async update(id: number, requestSchoolDto: RequestSchoolDto) {
    
    const school = await this.schoolRepository.preload({
      id: id,
      ...requestSchoolDto
    })

    if( !school) throw new NotFoundException(`School with id ${id} not found`);

    return await this.schoolRepository.save(school);
  }

  async remove(id: number) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    await this.schoolRepository.remove(school);
  }
}
