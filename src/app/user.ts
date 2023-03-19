export interface User {
  _id: string,
  email: string,
  username: string,
  password: string | null | undefined,
  __v: number,
  conversations: string[],
  error?: string
}
