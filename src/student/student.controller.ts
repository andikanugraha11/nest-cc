import {Controller, Get, Post, Put, Param, Body, ParseUUIDPipe, Query, NotFoundException} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import {CreateStudentDto, UpdateStudentDto, FindStudentReponseDto, StudentReponseDto} from './dto/student.dto'
import { StudentService } from './student.service';

@ApiTags('students')
@Controller('students')
export class StudentController {

    constructor(private readonly studentService: StudentService){}

    @ApiOkResponse({type: FindStudentReponseDto, isArray: true})
    @ApiQuery({name: 'name', required: false})
    @Get()
    getStudents(
        @Query('name') name?: string
    ): FindStudentReponseDto[]{
        return this.studentService.getStudents(name)
    }


    @ApiOkResponse({type: FindStudentReponseDto})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Get('/:studentId')
    getStudentById(
        @Param('studentId', new ParseUUIDPipe) studentId: string
    ): FindStudentReponseDto{
        const student = this.studentService.getStudentById(studentId)
        if(!student){
            throw new NotFoundException();
        }

        return student
    }


    @ApiCreatedResponse({type: StudentReponseDto})
    @Post()
    createStudent(
        @Body() body: CreateStudentDto
    ): StudentReponseDto{
        return this.studentService.createStudent(body)
    }

    @Put('/:studentId')
    updateStudentById(
        @Param('studentId', new ParseUUIDPipe) studentId: string,
        @Body() Body: UpdateStudentDto
    ): StudentReponseDto{
        return this.studentService.updateStudentById(Body, studentId)
    }

}