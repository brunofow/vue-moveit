import { OAuthCredential, User as UserType } from 'firebase/auth'

export interface User {
  name: string
  avatar_url: string
  login: string
  completedChallenges: number,
  currentExperience: number,
  level: number,
}

export interface SuccessLogin {
  token: string | undefined;
  user: UserType
}

export interface FailedLogin {
  errorCode: any;
  errorMessage: any;
  email: any;
  credential: OAuthCredential | null;
}