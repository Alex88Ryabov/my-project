export class User {
  constructor(
    public email: string,
    public id: string,
    public _token: string,
    public _tokenExpiration: Date,
  ) {}

  public get token(): string {
    if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
      return null;
    }
    return this._token;
  }
}
