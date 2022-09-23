import {gql} from '@apollo/client';

export const GetMessagesQuery = gql`
  query Messages($input: GetMessageInput!) {
    getMessage(getMessageInput: $input) {
      senderName
      message
      date
    }
  }
`;

export const SendMessageMutation = gql`
  mutation saveMessage($input: SaveMessageInput!) {
    saveMessage(saveMessageData: $input) {
      senderName
      message
      date
    }
  }
`;

export const MessageSubscription = gql`
  subscription Message {
    messageAdded {
      senderName
      message
      date
    }
  }
`;