import { Model } from "./Model";
import axios, { Axios } from "axios";
import { isEmpty, setUpErrorHandling } from "./helpers";
import { Record } from "./Record";
import { Report } from "./Report";
import { InteractiveReport } from "./InteractiveReport";
import { Wizard } from "./Wizard";

export class Client {
  private readonly host: string;

  public readonly session: Axios;
  public context: object;

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
    this.session.defaults.headers.common["User-Agent"] = userAgent;
    this.session.defaults.headers.common["X-API-KEY"] = apiKey;
    setUpErrorHandling(this.session);
    if (isEmpty(this.context)) {
      this._refreshContext().then((ctx) => this.context = ctx);
    }
  }

  public interactiveReport (name: string) {
    return new InteractiveReport(this, name);
  }

  public model (name: string) {
    return new Model(this, name);
  }

  public record (name: string, id: number) {
    return new Record(this, name, id);
  }

  public report (name: string) {
    return new Report(this, name);
  }

  public today () {
    const DATE = this.model("ir.date");
    return DATE.method({ name: "today", params: [] });
  }

  public wizard (name: string) {
    return new Wizard(this, name);
  }

  // TODO: Figure out how to get this to work properly
  public async _refreshContext () {
    const User = this.model("res.user");
    this.context = await User.method({ name: "get_preferences", params: [true] });
    return this.context;
  }
}