export class SignIn {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
}
