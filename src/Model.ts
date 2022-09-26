import { Client } from "./Client";
import type { AttachArgs, FindArgs, GetArgs, MethodArgs, SearchReadAllArgs } from "./interfaces/model.interface";
import { chunk } from "./utils/helpers";

export class Model {
  public readonly path: string;

  constructor (
      public client: Client,
      private name: string) {
    this.path = `model/${ this.name }`;
  }

  public async method (args: MethodArgs) {
    const {
      name,
      params,
      context,
    } = args;

    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const { data } = await this.client.session.put(
        `${ this.path }/${ name }`,
        params,
        {
          params: {
            context: JSON.stringify(ctx),
          },
        },
    );
    return data;
  }

  public async find (args: FindArgs) {
    let {
      fields,
      filter,
      page,
      per_page,
      order,
      context,
    } = args;

    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const params = new URLSearchParams();
    params.append("filter", JSON.stringify(filter || []));
    params.append("page", String(page || 1));
    params.append("per_page", String(per_page || 10));
    params.append("order", JSON.stringify(order || {}));
    params.append("context", JSON.stringify(ctx));

    for (const field of fields) {
      params.append("field", field);
    }

    const { data } = await this.client.session.get(this.path, { params });
    return data;
  }

  public async get (args: GetArgs) {
    let {
      id,
      fields,
      context,
    } = args;

    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const params = new URLSearchParams();
    params.append("context", JSON.stringify(ctx));

    for (const field of fields) {
      params.append("field", field);
    }

    const { data } = await this.client.session.get(`${ this.path }/${ id }`, { params });
    return data;
  }

  public async attach (args: AttachArgs) {
    const Attachment = this.client.model("ir.attachment");
    return Attachment.method({
      name: "add_attachment_from_url",
      params: [args.filename, args.url, `${ this.name },${ args.id }`],
    });
  }

  public async* searchReadAll (args: SearchReadAllArgs) {
    const {
      filter,
      fields,
      order,
      batch_size,
      context,
      offset,
      limit,
    } = args;

    let ctx = { ...this.client.context };
    if (context) {
      ctx = { ...ctx, ...context };
    }

    const ids = await this.method({
      name: "search",
      params: [filter, offset, limit, order],
      context: ctx,
    });

    for (const records of chunk(ids, batch_size || 500)) {
      for (const record of records) {
        yield await this.method({ name: "read", params: [[record], fields], context: ctx });
      }
    }
  }
}