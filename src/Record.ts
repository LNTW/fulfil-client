import { Model } from "./Model";
import { Client } from "./Client";
import { MethodArgs } from "./interfaces/model.interface";

export class Record {
  private model: Model;

  constructor (
      private client: Client,
      private name: string,
      private id: number) {
    this.model = new Model(client, name);
  }

  public async method (args: MethodArgs) {
    const {
      name,
      params,
      context,
    } = args;
    return this.model.method({ name, params, context });
  }

  public async update (data: object) {
    return this.model.method({ name: "write", params: [[this.id], data] });
  }
}