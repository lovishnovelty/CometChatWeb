import { CometChat } from '@cometchat-pro/chat';
import { IMessage } from '../interfaces/message';
import { ChatUtility } from '../util/chatUtility';

class CometChatService {
  conversationRequestBuilder: CometChat.ConversationsRequestBuilder;
  messageRequestBuilder: CometChat.MessagesRequestBuilder;
  callSettingsBuilder: CometChat.CallSettingsBuilder;
  userRequestBuilder: CometChat.UsersRequestBuilder;
  constructor() {
    this.conversationRequestBuilder =
      new CometChat.ConversationsRequestBuilder();
    this.callSettingsBuilder = new CometChat.CallSettingsBuilder();
    this.messageRequestBuilder = new CometChat.MessagesRequestBuilder();
    this.userRequestBuilder = new CometChat.UsersRequestBuilder();
  }

  static startDirectCall = (element: any, id: string) => {
    let sessionID = id;
    let audioOnly = false;
    let defaultLayout = true;

    let callSettings = new CometChat.CallSettingsBuilder()
      .enableDefaultLayout(defaultLayout)
      .setSessionID(sessionID)
      .setIsAudioOnlyCall(audioOnly)
      .build();

    CometChat.startCall(
      callSettings,
      element,
      new CometChat.OngoingCallListener({
        onUserListUpdated: (userList: any) => {
          console.log('user list:', userList);
        },
        onCallEnded: (call: any) => {
          console.log('Call ended:', call);
        },
        onError: (error: any) => {
          console.log('Error :', error);
        },
        onMediaDeviceListUpdated: (deviceList: any) => {
          console.log('Device List:', deviceList);
        },
        onUserMuted: (userMuted: any, userMutedBy: any) => {
          // This event will work in JS SDK v3.0.2-beta1 & later.
          console.log('Listener => onUserMuted:', userMuted, userMutedBy);
        },
        onScreenShareStarted: () => {
          // This event will work in JS SDK v3.0.3 & later.
          console.log('Screen sharing started.');
        },
        onScreenShareStopped: () => {
          // This event will work in JS SDK v3.0.3 & later.
          console.log('Screen sharing stopped.');
        },
        onCallSwitchedToVideo: (
          sessionId: any,
          callSwitchInitiatedBy: any,
          callSwitchAcceptedBy: any
        ) => {
          // This event will work in JS SDK v3.0.8 & later.
          console.log('call switched to video:', {
            sessionId,
            callSwitchInitiatedBy,
            callSwitchAcceptedBy,
          });
        },
      })
    );
  };

  getMessagesByUID = async (userID: string, otherUserID: string) => {
    let limit = 30;
    const messageRequest = this.messageRequestBuilder
      .setLimit(limit)
      .setUID(otherUserID)
      .build();

    const messageList = await messageRequest.fetchPrevious().catch((err) => {
      console.log(err);
      return [];
    });
    return ChatUtility.transformMessages(messageList, userID);
  };

  getUsers = async () => {
    const userRequest = this.userRequestBuilder.setLimit(30).build();
    return await userRequest.fetchNext();
  };

  sendTextMessage = async ({
    userID,
    receiverType = CometChat.RECEIVER_TYPE.USER,
    receiverID,
    message,
  }: {
    userID: string;
    receiverType?: string;
    receiverID: string;
    message: string;
  }): Promise<IMessage> => {
    const textMessage = new CometChat.TextMessage(
      receiverID,
      message,
      receiverType
    );
    try {
      const sentMessage = await CometChat.sendMessage(textMessage);
      return ChatUtility.transformSingleMessage(sentMessage, userID);
    } catch (err) {
      throw 'Failed to send message';
    }
  };

  listenForMessage = async ({
    onTextMessageReceived,
    listenerID,
  }: {
    onTextMessageReceived: (textMessage: CometChat.TextMessage) => void;
    listenerID: string;
  }) => {
    const userId = await localStorage.getItem('userID');

    if (!userId) {
      console.log('Failed to initialize message listener: User not logged in.');
      return;
    }

    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: onTextMessageReceived,
        onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
          console.log('Media message received successfully', mediaMessage);
        },
        onCustomMessageReceived: (customMessage: CometChat.CustomMessage) => {
          console.log('Custom message received successfully', customMessage);
        },
      })
    );
  };
}

export { CometChatService };
