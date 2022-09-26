import { Client } from "./Client";
import { CreateArgs, DeleteArgs, ExecuteArgs } from "./interfaces/wizard.interface";

export class Wizard {
  private readonly path: string;

  constructor (
      private client: Client,
      private name: string) {
    this.path = `wizard/${ name }`;
  }

  public async create (args: CreateArgs) {
    const { context } = args;
    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }
    const { data } = await this.client.session.put(
        `${ this.path }/create`,
        [],
        {
          params: {
            context: ctx,
          },
        },
    );
    return data;
  }

  public async delete (args: DeleteArgs) {
    const { sessionID, context } = args;
    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const { data } = await this.client.session.put(
        `${ this.path }/delete`,
        [sessionID],
        {
          params: {
            context: ctx,
          },
        },
    );

    return data;
  }

  public async execute (args: ExecuteArgs) {
    const { sessionID, params, state, context } = args;
    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const { data } = await this.client.session.put(
        `${ this.path }/execute`,
        [sessionID, params, state],
        {
          params: {
            context: ctx,
          },
        },
    );

    return data;
  }
}