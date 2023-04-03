export interface Conversation {
  _id: string,
  users: {
    user1: string,
    user2: string
  },
  messages: string[],
  __v: number,
  backgroundImg?: string,
  backgroundColor?: string,
  error?: string
}
