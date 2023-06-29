import { RoleBasicResponse, RoleRequest, RoleResponse } from "src/application/index.application";

export interface RoleService {
    createRole(roleRequest: RoleRequest): Promise<RoleResponse>;
    getAllRoles(): Promise<RoleBasicResponse[]>;
    getRoleById(id: number): Promise<RoleResponse>;
    updateRoleById(id: number, roleRequest: RoleRequest): Promise<RoleResponse>;
    deleteRoleById(id: number): Promise<RoleResponse>;
}