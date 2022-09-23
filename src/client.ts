import { Model } from "./model";
import axios, { Axios } from "axios";
import { setUpErrorHandling } from "./helpers";

export class Client {
  private readonly host: string;

  public readonly context: object;
  public readonly session: Axios;

  constructor (
      private subDomain: string,
      private apiKey: string,
      private userAgent = "Javascript Client",
      private baseURL = "fulfil.io") {
    this.host = `https://${ subDomain }.${ baseURL }/api/v2/`;
    this.context = {};

    this.session = axios.create({
      baseURL: this.host,
    });
    this.session.defaults.headers.common["X-API-KEY"] = apiKey;
    setUpErrorHandling(this.session);
  }

  public model (name: string) {
    return new Model(this, name);
  }
}