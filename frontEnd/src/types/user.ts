export interface RegisterUser {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string,
  fullName: string,
  email: string,
  profilePic: string,
}