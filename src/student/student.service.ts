import { Injectable } from '@nestjs/common';
import { students } from '../db';
import { v4 as uuid } from 'uuid';
import { CreateStudentDto, FindStudentReponseDto, StudentReponseDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
    private students = students

    getStudents(name? : string): FindStudentReponseDto[]{
        if (name) {
            return this.students.filter(student => student.name === name)
        }
        return this.students
    }



    getStudentById(studentId: string): FindStudentReponseDto{
        return this.students.find(student => 
            student.id === studentId
        )
    }

    createStudent(payload: CreateStudentDto): StudentReponseDto {
        let newStudent = {
            id: uuid(),
            ...payload
        }

        this.students.push(newStudent)

        return newStudent
    }

    updateStudentById(payload: UpdateStudentDto, studentId: string): StudentReponseDto{
        let updatedStudent: StudentReponseDto;

        const updatedStudentList = this.students.map( student => {
            if(student.id === studentId){
                updatedStudent = {
                    id: studentId,
                    ...payload
                }
                return updatedStudent
            } else return student
        })

        this.students = updatedStudentList;

        return updatedStudent
    }

    getStudentByTeacherId(teacherId: string): FindStudentReponseDto[]{
        return this.students.filter(student => {
            return student.teacher === teacherId
        })
    }

    updateStudentTeacher(teacherId: string, studentId : string): StudentReponseDto{
        let updatedStudent: StudentReponseDto;

        const updatedStudentList = this.students.map( student => {
            if(student.id === studentId){
                updatedStudent = {
                    ...student,
                    teacher: teacherId
                }
                return updatedStudent
            } else return student
        })

        this.students = updatedStudentList;

        return updatedStudent
    }
}
