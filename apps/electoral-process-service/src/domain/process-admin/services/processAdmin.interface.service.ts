import { AdministratorBasicResponse } from "src/shared/administrator/administrator.response";

export interface ProcessAdminService {
    getAdministratorsByElectoralProcessId(electoralId: number): Promise<AdministratorBasicResponse[]>;
    assignAdministratorByIdAnElectoralProcessId(adminId: number, electoralId: number);
    unassignAdministratorByIdAnElectoralProcessId(adminId: number, electoralId: number);
}