import { CometChat } from '@cometchat-pro/chat';
import { IMessage } from '../interfaces/message';
import { ChatUtility } from '../util/chatUtility';
import { useNavigate } from 'react-router-dom';

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

  login = async (userID: string, name: string) => {
    try {
      const newUser = new CometChat.User(userID);
      newUser.setName(name);
      await CometChat.createUser(newUser, process.env.REACT_APP_AUTH_KEY ?? '');
      const user = await CometChat.login(
        userID,
        process.env.REACT_APP_AUTH_KEY
      );
      console.log('User logged in:', user);
      return user;
    } catch (e) {
      console.log('Failed to login:', e);
      throw e;
    }
  };

  static startDirectCall = (element: any, id: any) => {
    let sessionID = id;
    let audioOnly = false;
    let defaultLayout = true;

    let callSettings = new CometChat.CallSettingsBuilder()
      .enableDefaultLayout(defaultLayout)
      .setSessionID(sessionID)
      .setIsAudioOnlyCall(audioOnly)
      .build();
    if (typeof element !== null && element !== 'undefined') {
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
          onUserLeft: (user: CometChat.User) => {
            console.log('User left call:', user);
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
    }
  };
  static startDefaultCall = (element: any, id: any, isaudioOnly: boolean) => {
    let audioOnly = isaudioOnly;
    let defaultLayout = true;
    // const navigate = useNavigate();
    let callSettings = new CometChat.CallSettingsBuilder()
      .enableDefaultLayout(defaultLayout)
      .setSessionID(id)
      .setIsAudioOnlyCall(audioOnly)
      .build();
    CometChat.startCall(
      callSettings,
      element,
      new CometChat.OngoingCallListener({
        onUserJoined: (user: CometChat.User) => {
          console.log('User joined call:', user);
        },
        onUserLeft: (user: CometChat.User) => {
          console.log('User left call:', user);
        },
        onUserListUpdated: (userList: CometChat.User[]) => {
          console.log('user list:', userList);
        },
        onCallEnded: (call: CometChat.Call) => {
          console.log('Call ended:', call);
          // navigate(-1);
        },
        onError: (error: CometChat.CometChatException) => {
          console.log('Error :', error);
        },
        onMediaDeviceListUpdated: (deviceList: Object) => {
          console.log('Device List:', deviceList);
        },
        onUserMuted: (
          userMuted: CometChat.User,
          userMutedBy: CometChat.User
        ) => {
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
