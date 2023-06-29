import { Role, RoleService } from "src/domain/index.domain";
import { RoleRequest } from "../dtos/roleRequest.dto";
import { RoleResponse, RoleBasicResponse } from "../dtos/roleResponse.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class RoleServiceImpl implements RoleService {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>) { }

    async createRole(roleRequest: RoleRequest): Promise<RoleResponse> {
        try {
            const rolePreload = this.roleRepository.create(roleRequest);
            const role = await this.roleRepository.save(rolePreload);

            const mappedRole = plainToInstance(RoleBasicResponse, role);

            return new RoleResponse('', mappedRole);
        } catch (error) {
            return new RoleResponse('An error ocurred while saving role: ' + error.message);
        }
    }

    async getAllRoles(): Promise<RoleBasicResponse[]> {

        const roles = await this.roleRepository.find({});
        const mappedRoles = plainToInstance(RoleBasicResponse, roles);

        return mappedRoles;
    }
    
    async getRoleById(id: number): Promise<RoleResponse> {
        
        try {
            const role = await this.roleRepository.findOne({ where: { id: id } });
            if (!role) return new RoleResponse(`A role was not found by id ${id}`);
            
            //const mappedRole = plainToInstance(RoleBasicResponse, role);
          
            return new RoleResponse('',role);

        } catch (error) {
            return new RoleResponse(`An error occcurred while searching role: ${error.message}`);
        }
    }
    
    async updateRoleById(id: number, roleRequest: RoleRequest): Promise<RoleResponse> {
        
        try {
            const role = await this.roleRepository.findOne({ where: { id: id } });
            if (!role) return new RoleResponse(`A role was not found by id ${id}`);
            
            const rolePreload = await this.roleRepository.preload({
                id: id,
                ...roleRequest
            });
            
            const roleUpdated = await this.roleRepository.save(rolePreload);

            return new RoleResponse('',roleUpdated);

        } catch (error) {
            return new RoleResponse(`An error occcurred while updating role: ${error.message}`);
        }
    }
    
    async deleteRoleById(id: number): Promise<RoleResponse> {
        try {
            const role = await this.roleRepository.findOne({ where: { id: id } });
            if (!role) return new RoleResponse(`A role was not found by id ${id}`);
        
            const roleDeleted = await this.roleRepository.remove(role);

            return new RoleResponse('',roleDeleted);

        } catch (error) {
            return new RoleResponse(`An error occcurred while deleting role: ${error.message}`);
        }
    }

}