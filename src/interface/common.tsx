import { CallActionType } from '../enums/callActionType';
import { CallType } from '../enums/callType';
export interface IModalHandle {
  open: () => void;
  close: () => void;
}

export interface IConversation {
  id: string;
  lastMessage: IMessage;
  otherUserID: string;
  otherUserName: string;
  otherUserAvatar: string;
}
export interface IMessage {
  id: string;
  conversationID: string;
  text: string;
  initiatorName: string;
  receiverName: string;
  isSentByMe: boolean;
  isTextMessage: boolean;
  isCallMessage: boolean;
  isMediaMessage: boolean;
  callType?: CallType;
  callActionType?: CallActionType;
  time: string;
  date: string;
}
