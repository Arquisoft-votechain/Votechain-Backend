import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { School } from './entities/school.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { RequestClassroomDto } from 'src/classroom/dto/request-classroom.dto';
import { MasterPoliticalParty } from 'src/master-political-party/entities/master-political-party.entity';
import { RequestMasterPoliticalPartyDto } from 'src/master-political-party/dto/request-master-political-party.dto';

@Injectable()
export class SchoolService {
  
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(MasterPoliticalParty)
    private readonly masterPoliticalPartyRepository: Repository<MasterPoliticalParty>,
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

  async createClassroomBySchoolId(id: number, requestClassroomDto: RequestClassroomDto) {
    
    const school = await this.schoolRepository.findOneBy({id});
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    const classroom = this.classroomRepository.create(requestClassroomDto);
    classroom.school = school;

    return await this.classroomRepository.save(classroom);
  }

  async createMasterPoliticalPartyBySchoolId(id: number, requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto) {
    
    const school = await this.schoolRepository.findOneBy({id});
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    const masterPP = this.masterPoliticalPartyRepository.create(requestMasterPoliticalPartyDto);
    masterPP.school = school;

    return await this.masterPoliticalPartyRepository.save(masterPP);
  }

  findAll() {
    return this.schoolRepository.find({});
  }

  async findOne(id: number) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);
    
    return school;
  }

  async findAllClassroomsBySchoolId(id: number) {

    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);


    var clasrooms = [];

    clasrooms = await this.classroomRepository.find({
      where:{
        school:{
          id:id
        }
      }
    })

    return clasrooms;
  }

  async findAllMasterPoliticalPartiesBySchoolId(id: number) {

    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);


    var masterPPs = [];

    masterPPs = await this.masterPoliticalPartyRepository.find({
      where:{
        school:{
          id:id
        }
      }
    })

    return masterPPs;
  }

  async update(id: number, requestSchoolDto: RequestSchoolDto) {
    
    const school = await this.schoolRepository.preload({
      id: id,
      ...requestSchoolDto
    })

    if( !school) throw new NotFoundException(`School with id ${id} not found`);

    return await this.schoolRepository.save(school);
  }

  async updateClassroomBySchoolIdAndId(schoolId: number, id: number, requestClassroomDto: RequestClassroomDto) {
    const school = await this.schoolRepository.findOneBy({id:schoolId});
    
    if(!school) throw new NotFoundException(`School with id ${schoolId} not found`);

    const classroom = await this.classroomRepository.findOneBy({
      id: id,
      school:{
        id:schoolId
      }
    })

    if(!classroom) throw new NotFoundException(`Classroom with id ${id} not found`);

    const clasroomUpdated = await this.classroomRepository.preload({
      id: classroom.id,
      school: classroom.school,
      ...requestClassroomDto
    })

    return await this.classroomRepository.save(clasroomUpdated);
  }

  async updateMasterPPBySchoolIdAndId(schoolId: number, id: number, requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto) {
    const school = await this.schoolRepository.findOneBy({id:schoolId});
    
    if(!school) throw new NotFoundException(`School with id ${schoolId} not found`);

    const masterPP = await this.masterPoliticalPartyRepository.findOneBy({
      id: id,
      school:{
        id:schoolId
      }
    })

    if(!masterPP) throw new NotFoundException(`Master-political-party with id ${id} not found`);

    const masterPPUpdated = await this.masterPoliticalPartyRepository.preload({
      id: masterPP.id,
      school: masterPP.school,
      ...requestMasterPoliticalPartyDto
    })

    return await this.masterPoliticalPartyRepository.save(masterPPUpdated);
  }

  async remove(id: number) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    await this.schoolRepository.remove(school);
  }

  async deleteClassroomBySchoolIdAndId(schoolId: number, id: number) {
    const school = await this.schoolRepository.findOneBy({id:schoolId});
    
    if(!school) throw new NotFoundException(`School with id ${schoolId} not found`);

    const classroom = await this.classroomRepository.findOneBy({
      id: id,
      school:{
        id:schoolId
      }
    })

    if(!classroom) throw new NotFoundException(`Classroom with id ${id} not found`);

    await this.classroomRepository.remove(classroom);
  }

  async deleteMasterPPBySchoolIdAndId(schoolId: number, id: number) {
    const school = await this.schoolRepository.findOneBy({id:schoolId});
    
    if(!school) throw new NotFoundException(`School with id ${schoolId} not found`);

    const masterPP = await this.masterPoliticalPartyRepository.findOneBy({
      id: id,
      school:{
        id:schoolId
      }
    })

    if(!masterPP) throw new NotFoundException(`Master-political-party with id ${id} not found`)

    await this.masterPoliticalPartyRepository.remove(masterPP);
  }
}
