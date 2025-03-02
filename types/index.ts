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

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  login(inputs: Credentials): Promise<GCResponse<User>>;
  logout(): void;
  currentUser: User | null;
}

export type { GCResponse, User, AuthContextType, Credentials };
