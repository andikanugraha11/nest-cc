import {Controller, Get, Put, Param, ParseUUIDPipe} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindStudentReponseDto, StudentReponseDto } from  '../student/dto/student.dto';
import { StudentService } from '../student/student.service';


@ApiTags('student-teacher')
@Controller('teachers/:teacherId/students')
export class StudentTeacherController {

    constructor(private readonly studentService: StudentService){}

    @Get()
    getStudents(
        @Param('teacherId', new ParseUUIDPipe) teacherId: string
    ): FindStudentReponseDto[]{
        return this.studentService.getStudentByTeacherId(teacherId)
    }

    @Put('/:studentId')
    updateStudentTeacher(
        @Param('teacherId', new ParseUUIDPipe) teacherId: string,
        @Param('studentId', new ParseUUIDPipe) studentId: string
    ): StudentReponseDto{
        return this.studentService.updateStudentTeacher(teacherId, studentId)
    }

}