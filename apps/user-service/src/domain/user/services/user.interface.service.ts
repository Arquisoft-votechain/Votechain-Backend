import { CreateUserDto, UpdateUserDto } from "src/application/index.application";

export interface UserService{
    create(createUserDto: CreateUserDto);
    verifyUser(email: string, password: string);
    findAll();
    findOne(id: any);
    update(id: any, updateUserDto: Partial<UpdateUserDto>);
    remove(id: any);
}