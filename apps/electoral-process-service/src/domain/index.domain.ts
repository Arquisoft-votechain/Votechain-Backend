import { ElectoralProcess } from './electoral-process/models/electoralProcess.entity';
import { ElectoralProcessService } from 'src/domain/electoral-process/services/electoralProcess.interface.service';
import { ProcessAdmin } from './process-admin/models/processAdmin.entity';
import { ProcessStudent } from 'src/domain/process-student/models/processStudent.entity';
import { ProcessAdminService } from './process-admin/services/processAdmin.interface.service';
import { ProcessStudentService } from './process-student/services/processStudent.interface.service';

export{
    ElectoralProcess,
    ElectoralProcessService,
    ProcessAdmin,
    ProcessAdminService,
    ProcessStudent,
    ProcessStudentService
}