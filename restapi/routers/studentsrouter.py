from fastapi import APIRouter, status, HTTPException
from repository.studentsrepository import get_student_by_id_and_test
from pydantic import BaseModel

router = APIRouter()

# Modelos: Request --------------------------------------------------


class StudentCheck(BaseModel):
    id: str


class StudentAdd(BaseModel):
    id: str
    mark: float
    test_id: str


@router.get("/{student_id}/test/{test_id}", status_code=status.HTTP_200_OK, description="Get specific ")
async def get_user_in_test(student_id:str, test_id: str):
    student_found = await get_student_by_id_and_test(student_id, test_id)
    print(student_found)
    if student_found != None:
        raise HTTPException(status_code=200, detail="User registered in test")
    else:
        return {"message": "User not registered in test"}
