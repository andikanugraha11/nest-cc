import { Injectable } from '@nestjs/common';
import { teachers } from '../db';
import { v4 as uuid } from 'uuid';
import { FindTeacherResponseDto } from './dto/teacher.dto';

@Injectable()
export class TeacherService {
    private teachers = teachers

    getTeachers(): FindTeacherResponseDto[]{
        return this.teachers
    }

    getTeacherById(teacherId: string): FindTeacherResponseDto{
        return this.teachers.find(teacher => {
            return teacher.id === teacherId
        })
    }
}
