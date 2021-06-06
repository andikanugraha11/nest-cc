import { ApiProperty } from "@nestjs/swagger";
import {MinLength} from 'class-validator'

export class FindStudentReponseDto{
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    teacher: string;
}

export class StudentReponseDto{
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    teacher: string;
}

export class CreateStudentDto{
    @ApiProperty()
    @MinLength(5)
    name: string;

    @ApiProperty()
    teacher: string;
}

export class UpdateStudentDto{
    name: string;
    teacher: string;
}