import { CometChat } from '@cometchat-pro/chat';

class CometChatService {
  constructor(parameters: any) {}

  static startDirectCall = (element: any, id: string) => {
    console.log('id', id);

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
}

export { CometChatService };
