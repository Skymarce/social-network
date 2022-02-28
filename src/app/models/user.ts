export class User {

  private static userInstance: User;
  private _email: string;
  private _token: string;

  private constructor() {}

  public static getInstance(): User {
    if (!User.userInstance) {
      User.userInstance = new User();
    }
    return User.userInstance;
  }

  set email(email: string) {
      this._email = email;
      localStorage.setItem('userEmail', this._email);
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem('userToken', this._token);
  }

  get token(): string  {
    if (localStorage.getItem('userToken')) {
      this._token = localStorage.getItem('userToken');
    }
    return this._token;
  }

  get email(): string  {
    if (localStorage.getItem('userEmail')) {
      this._email = localStorage.getItem('userEmail');
    }
    return this._email;
  }

  public logOut(): void {
    User.userInstance = null;
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userToken');
  }
  
}