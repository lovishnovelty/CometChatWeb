import { CometChat } from '@cometchat-pro/chat';

export const getUsers = async () => {
  const userRequestBuilder = new CometChat.UsersRequestBuilder();
  const userRequest = userRequestBuilder.setLimit(30).build();
  return await userRequest.fetchNext();
};
