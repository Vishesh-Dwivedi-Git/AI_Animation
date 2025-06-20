from fastapi import Request, HTTPException, Depends
from jose import jwt
import requests
import os

PRIVY_PUBLIC_JWKS = "https://auth.privy.io/.well-known/jwks.json"
PRIVY_AUDIENCE = os.getenv("PRIVY_APP_ID")  # your Privy app ID

def get_jwk_kid(header):
    jwks = requests.get(PRIVY_PUBLIC_JWKS).json()
    for key in jwks["keys"]:
        if key["kid"] == header["kid"]:
            return key
    raise HTTPException(status_code=401, detail="Invalid JWT Key ID")

async def verify_privy_token(request: Request):
    
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")

    token = auth_header.split(" ")[1]
    header = jwt.get_unverified_header(token)
    key = get_jwk_kid(header)

    payload = jwt.decode(token, key, algorithms=["RS256"], audience=PRIVY_AUDIENCE)
    return payload  # will include email, sub (privy_id), etc.
