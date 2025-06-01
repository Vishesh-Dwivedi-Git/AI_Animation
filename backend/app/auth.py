from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .db import find_user_by_email, insert_user
from .models import UserCreate, UserLogin
import hashlib
from .jwtHelper import create_access_token
from .jwtHelper import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_user(user: UserCreate):
    if find_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    insert_user({"email": user.email, "password": hash_password(user.password)})
    return {"message": "User created successfully"}

def authenticate_user(user: UserLogin):
    db_user = find_user_by_email(user.email)
    if not db_user or db_user["password"] != hash_password(user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token_data = {"sub": user.email}
    access_token = create_access_token(data=token_data)
    
    return {"access_token": access_token, "token_type": "bearer"}


def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    email = payload.get("sub")
    user = find_user_by_email(email)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

