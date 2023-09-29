import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
//   import { getTodos, postTodo } from '../my-api'

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client) client = new QueryClient({});
    return client;
  };
})();

export const fetcher = async (props: FetchType) => {
  try {
    // const res = await fetch(url, fetchOption)
  } catch (error) {
    console.log(error);
  }
};

export type FetchType = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: { [key: string]: any };
  params: { [key: string]: any };
};

export const QueryKeys = {
  POSTS: 'POSTS',
};
