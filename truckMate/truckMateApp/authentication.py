from rest_framework.authentication import TokenAuthentication
from .backends import TokenAuthenticationBackend, Token


class CustomTokenAuthentication(TokenAuthentication):
    def get_model(self):
        return Token

    def authenticate(self, request):
        return TokenAuthenticationBackend().authenticate(request)
