import { Client } from "./Client";
import { ExecuteArgs } from "./interfaces/report.interface";

export class Report {
  private readonly path: string;

  constructor (
      private client: Client,
      private name: string) {
    this.path = `report/${ name }`;
  }

  public async execute (args: ExecuteArgs) {
    const { records, params, context } = args;
    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const { data } = await this.client.session.put(this.path,
        {
          objects: records || [],
          data: params || {},
        },
        {
          params: {
            context: JSON.stringify(ctx),
          },
        });

    return data;
  }
}