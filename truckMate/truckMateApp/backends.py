from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed


class TokenAuthenticationBackend(object):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '').split()
        if not auth_header or auth_header[0].lower() != 'token':
            return None

        if len(auth_header) == 1:
            msg = 'Invalid token header. No credentials provided'
            raise AuthenticationFailed(msg)

        elif len(auth_header) > 2:
            msg = 'Invalid token header. Token string should not contain spaces.'
            raise AuthenticationFailed(msg)

        try:
            token = auth_header[1]
            user = Token.objects.get(key=token).user
            if not user.is_active:
                return None
            return user
        except Token.DoesNotExist:
            return None
