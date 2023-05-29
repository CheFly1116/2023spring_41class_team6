from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserSchema(BaseModel):
    id: Optional[int]
    name: str
    password: str
    
    class Config:
        orm_mode = True