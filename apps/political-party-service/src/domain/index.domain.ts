import { ClassroomService } from "./classroom/services/classroom.interface.service"
import { MasterPoliticalPartyService } from "./master-political-party/services/masterPolitical.interface.service"
import { SchoolService } from './school/services/school.interface.service';
import { RoleService } from './role/services/role.interface.service';
import { PoliticalPartyParticipantService } from './political-party-participant/services/politicalParticipant.interface.service';
import { Classroom } from './classroom/models/classroom.entity';
import { MasterPoliticalParty } from './master-political-party/models/masterPolitical.entity';
import { School } from "./school/models/school.entity";
import { PoliticalPartyParticipant } from './political-party-participant/models/politicalParticipant.entity';
import { Role } from "./role/models/role.entity";


export{
    Classroom,
    ClassroomService,
    MasterPoliticalParty,
    MasterPoliticalPartyService,
    School,
    SchoolService,
    Role,
    RoleService,
    PoliticalPartyParticipant,
    PoliticalPartyParticipantService
}