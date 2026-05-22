from fastapi import (
    Header,
    HTTPException
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

    username = verify_token(token)

    if not username:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return username