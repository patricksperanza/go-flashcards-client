interface GCResponse<T> {
  IsOK: boolean;
  Message: string;
  Payload: T;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export type { GCResponse, User };
