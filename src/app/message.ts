export interface Message {
  _id: string,
  content: string,
  date: Date,
  author: string,
  conversation: string,
  status: 'sent' | 'recieved' | 'deleted',
  __v: number
}
