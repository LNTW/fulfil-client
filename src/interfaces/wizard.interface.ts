export interface CreateArgs {
  context?: object;
}

export interface DeleteArgs {
  sessionID: number;
  context?: object;
}

export interface ExecuteArgs {
  sessionID: number;
  params: object;
  state: string;
  context?: object;
}