export const ApiPath = {
  Auth: {
    NAVER_LOGIN: 'oauth2/authorization/naver',
    NAVER_CALLBACK: 'login/oauth2/code/naver',
    LOGOUT: '/v1/auth/logout',
  },
  Member: {
    MY: '/v1/members/me',
  },
  Problem: {
    SUBMIT: '/v1/problems',
  },
} as const;
