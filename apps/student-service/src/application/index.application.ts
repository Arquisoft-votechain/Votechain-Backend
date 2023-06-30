
import { CreateStudentDto } from './student/dto/create-student.dto';
import { UpdateStudentDto } from './student/dto/update-student.dto';
import { StudentServiceImpl } from './student/services/studentImpl.service';
import { CreateVoteDto } from './vote/dto/create-vote.dto';
import { UpdateVoteDto } from './vote/dto/update-vote.dto';
import { VoteServiceImpl } from './vote/services/voteImpl.service';
import { Web3ServiceImpl } from './web3/web3Impl.service';
export{
    CreateStudentDto,
    UpdateStudentDto,
    CreateVoteDto,
    UpdateVoteDto,
    StudentServiceImpl,
    VoteServiceImpl,
    Web3ServiceImpl
}