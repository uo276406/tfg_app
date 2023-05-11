from fastapi import APIRouter, status, HTTPException
from repository.studentsrepository import get_student_by_id_and_test, insert_student, find_student_by_id
from pydantic import BaseModel

router = APIRouter()

# Modelos: Request --------------------------------------------------

class StudentAdd(BaseModel):
    id: str

@router.get("/add/{student_id}/test/{test_id}", status_code=status.HTTP_201_CREATED, description="Add new student in test", response_description="Add new student in test")
async def add_student(student_id: str, test_id: str):
    if await find_student_by_id(student_id) == None:
        await insert_student(student_id, test_id)
        return {"message": "Student added"}
    else:
        return {"message": "Student already exists"}

@router.get("/{student_id}/test/{test_id}", status_code=status.HTTP_200_OK, description="Get specific user in test")
async def get_user_in_test(student_id:str, test_id: str):
    student_in_test = await get_student_by_id_and_test(student_id, test_id)
    print(student_in_test)
    if student_in_test != None:
        raise HTTPException(status_code=200, detail="User registered in test")
    else:
        return {"message": "User not registered in test"}
