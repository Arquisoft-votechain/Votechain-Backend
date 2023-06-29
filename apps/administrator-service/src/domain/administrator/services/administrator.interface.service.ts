import { CreateAdministratorDto, UpdateAdministratorDto } from "src/application/index.application";
import { Administrator } from "../models/administrator.entity";


export interface AdministratorService{
    create(createAdministratorDto: CreateAdministratorDto);
    findAll(): Promise<Administrator[]>;
    findOne(id: number);
    findByDNI(dniAdministrator: any);
    findByUserId(userId: any);
    update(id: any, updateAdministratorDto: Partial<UpdateAdministratorDto>);
    remove(id: any): Promise<void>;
}