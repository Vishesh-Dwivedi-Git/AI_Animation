from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .db import find_user_by_email, insert_user
from .models import UserCreate, UserLogin
import hashlib

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
    return {"token": user.email}

def get_current_user(token: str = Depends(oauth2_scheme)):
    user = find_user_by_email(token)
    if not user:
        print("❌ Invalid or expired token:", token)
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user
