import { Axios, AxiosResponse } from "axios";

export const setUpErrorHandling = (session: Axios) => {
  session.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error) => {
        throw error.response.data;
      },
  );
};

export const chunk = (array: Array<any>, chunkSize: number): Array<Array<any>> => {
  const chunks = [];
  const numberOfChunks = Math.ceil(array.length / chunkSize);
  for (const index of range(numberOfChunks)) {
    chunks.push(array.slice(chunkSize * index, chunkSize * (index + 1)));
  }
  return chunks;
};

export const range = (len: number): number[] => {
  return Array.from(Array(len)).map((x, i) => i);
};