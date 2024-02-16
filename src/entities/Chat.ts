import Message from "./Message";
import User from "./User";

export default interface Chat {
  id: string;
  name: string;
  icon: string;
  membersQuantity: number;
  members: User[];
  messages: Message[];
}