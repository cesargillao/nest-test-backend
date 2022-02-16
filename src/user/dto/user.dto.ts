export class CreateUserDTO {
  name: string;
  lastName: string;
  phone: string;
  username: string;
  password: string;
  token: string;
}

export class LoginUserDTO {
  username: string;
  password: string;
}

export class VerifyUserDTO {
  token: string;
}
