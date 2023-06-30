import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleRequest, RoleServiceImpl, RoleResponse, RoleBasicResponse } from 'src/application/index.application';
import { Role } from 'src/domain/index.domain';


import { Repository } from 'typeorm';

describe('RoleService', () => {
  let service: RoleServiceImpl;
  let repository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleServiceImpl,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoleServiceImpl>(RoleServiceImpl);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });


    it('should return an error response if an error occurs', async () => {
      const roleRequest: RoleRequest = { name: 'Alcalde' };
      const role: Role = { id: 1, name: 'Alcale'};
      const error = new Error('Test error');

      jest.spyOn(repository, 'create').mockReturnValue(role);
      jest.spyOn(repository, 'save').mockRejectedValue(error);

      const result = await service.createRole(roleRequest);

      expect(repository.create).toHaveBeenCalledWith(roleRequest);
      expect(repository.save).toHaveBeenCalledWith(role);
      expect(result).toEqual(new RoleResponse(`An error ocurred while saving role: ${error.message}`));
    });

  describe('getAllRoles', () => {
    it('should return all roles', async () => {
      const roles: Role[] = [/* Provide role objects for testing */];
      const mappedRoles: RoleBasicResponse[] = [/* Provide expected mapped roles for testing */];

      jest.spyOn(repository, 'find').mockResolvedValue(roles);

      const result = await service.getAllRoles();

      expect(repository.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mappedRoles);
    });
  });

});