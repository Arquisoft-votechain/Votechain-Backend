import { CreateNotificationDto, UpdateNotificationDto } from "src/application/index.application";

export interface NotificationService{
    create(createNotificationDto: CreateNotificationDto);
    findAll();
    findOne(id: number);
    update(id: number, updateNotificationDto: UpdateNotificationDto); 
    remove(id: number);
}