from fastapi import (
    Header,
    HTTPException,
    Depends
)

from .auth import verify_token

def get_current_user(
    authorization: str = Header(None)
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Missing token"
        )

    try:

        scheme, token = (
            authorization.split()
        )

        if scheme.lower() != "bearer":

            raise HTTPException(
                status_code=401,
                detail="Invalid auth scheme"
            )

    except:

        raise HTTPException(
            status_code=401,
            detail="Invalid authorization"
        )

    payload = verify_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload

def require_admin(
    current_user = Depends(get_current_user),
):

    if not current_user.get("is_admin"):

        raise HTTPException(
            status_code=403,
            detail="Admin only"
        )

    return current_user