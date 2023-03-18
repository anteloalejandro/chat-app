export interface User {
  _id: string,
  email: string,
  username: string,
  password: string | null | undefined,
  __v: 2,
  conversations: string[],
  error?: string
}
