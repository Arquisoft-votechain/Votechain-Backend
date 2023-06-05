
import { Classroom, ClassroomService } from "src/domain/index.domain";
import { ClassroomBasicResponse, ClassroomResponse } from "../dtos/classroomResponse.dto";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass, plainToInstance } from "class-transformer";

@Injectable()
export class ClassroomServiceImpl implements ClassroomService {

    constructor(
        @InjectRepository(Classroom)
        private readonly classroomRepository: Repository<Classroom>,) { }

    async getAllClassrooms(): Promise<ClassroomBasicResponse[]> {
        const classrooms = await this.classroomRepository.find({relations:['school']});
        const mappedClassrooms = plainToInstance(ClassroomBasicResponse, classrooms);

        mappedClassrooms.forEach((classroom, index) => {
            classroom.school_id = classrooms[index].school.id;
          });
          
        return mappedClassrooms;
    }

    async getClassroomById(id: number): Promise<ClassroomResponse> {
        try {
            const classroom = await this.classroomRepository.findOne(
                {
                    where: { id: id },
                    relations: ['school']
                }
            );
            if (!classroom) return new ClassroomResponse(`A classroom was not found by id ${id}`);
            
            const mappedClassroom = plainToInstance(ClassroomBasicResponse, classroom);
            mappedClassroom.school_id = classroom.school.id;

            return new ClassroomResponse('',mappedClassroom);

        } catch (error) {
            return new ClassroomResponse(`An error occcurred while searching classroom: ${error.message}`);
        }
    }


}