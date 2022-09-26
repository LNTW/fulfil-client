import { Client } from "./Client";
import { ExecuteArgs } from "./interfaces/interactive-report.interface";

export class InteractiveReport {
  private readonly path: string;

  constructor (
      private client: Client,
      private name: string) {
    this.path = `model/${ name }/execute`;
  }

  public async execute (args: ExecuteArgs) {
    const { params, context } = args;

    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const { data } = await this.client.session.put(
        this.path,
        [params],
        {
          params: {
            context: JSON.stringify(ctx),
          },
        },
    );

    return data;
  }
}