import { CometChat } from '@cometchat-pro/chat';

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

  getUsers = async () => {
    const userRequest = this.userRequestBuilder.setLimit(30).build();
    return await userRequest.fetchNext();
  };
}

export { CometChatService };
