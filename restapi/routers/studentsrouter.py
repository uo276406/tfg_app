from fastapi import APIRouter, status
from repository.studentsrepository import insert_student, find_student_by_id
from repository.teststudentrepository import insert_test_student, get_student_by_id_and_test
from pydantic import BaseModel

router = APIRouter()

# Modelos: Request --------------------------------------------------

class StudentAdd(BaseModel):
    id: str

@router.get("/add/{student_id}/test/{test_id}", status_code=status.HTTP_201_CREATED, description="Add new student in test", response_description="Add new student in test")
async def add_student_to_test(student_id: str, test_id: str):
    if await find_student_by_id(student_id) == None:
        await insert_student(student_id)
    student_in_test = await get_student_by_id_and_test(student_id, test_id)
    print(student_in_test)
    if student_in_test == None:
        await insert_test_student(student_id, test_id)
        return {"message": "Student added to test"}
    if student_in_test[3] == True:
        return {"message": "Student already finished test"}
    else:
        return {"message": "Student already exists in test"}
