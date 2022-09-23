export interface GetArgs {
  id: number;
  fields: Array<string>;
  context?: object;
}

export interface FindArgs {
  fields: Array<string>;
  filter?: Array<Array<string | number | boolean | null>>;
  page?: number;
  per_page?: number;
  order?: object;
  context?: object;
}

export interface MethodArgs {
  name: string;
  params: Array<any>;
  context?: object
}

export interface SearchReadAllArgs {
  filter: Array<Array<string | number | boolean | null>>;
  fields: Array<string>;
  order?: object;
  batch_size?: number;
  context?: object;
  offset?: number;
  limit?: number;
}

export interface WriteArgs {
  modelIDs: number[];
  changes: object;
}
