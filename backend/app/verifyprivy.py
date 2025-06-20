from fastapi import Request, HTTPException, Depends
from jose import jwt
import requests
import os

PRIVY_PUBLIC_JWKS = os.getenv("PRIVY_PUBLIC_JWKS") or "https://auth.privy.io/.well-known/jwks.json"
PRIVY_AUDIENCE = os.getenv("PRIVY_APP_ID")

def get_jwk_kid(header):
    print("🔍 Getting JWKS from:", PRIVY_PUBLIC_JWKS)
    response = requests.get(PRIVY_PUBLIC_JWKS)
    print("🟢 JWKS Status Code:", response.status_code)
    print("📄 JWKS Raw Response:", response.text[:200])  # Avoid logging full content if large

    try:
        jwks = response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"JWKS parse error: {str(e)}")

    for key in jwks.get("keys", []):
        if key.get("kid") == header["kid"]:
            print("✅ Found matching JWK")
            return key

    print("❌ No matching key ID found in JWKS")
    raise HTTPException(status_code=401, detail="Invalid JWT Key ID")

async def verify_privy_token(request: Request):
    print("🔐 Verifying Privy token...")

    auth_header = request.headers.get("Authorization")
    print("📦 Auth Header:", auth_header)

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")

    token = auth_header.split(" ")[1]
    print("🔑 JWT Token:", token[:20], "...")  # Print first few characters only

    header = jwt.get_unverified_header(token)
    print("🧾 JWT Header:", header)

    key = get_jwk_kid(header)
    print("🔐 Decoding JWT with key:", key["kid"])

    try:
        payload = jwt.decode(
    token,
    key=key,
    algorithms=["ES256"],      # ✅ matches 'alg' in header
    audience=PRIVY_AUDIENCE    # see Fix 2
)

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"JWT decode failed: {str(e)}")

    print("✅ JWT Verified. Payload:", payload)
    return payload
