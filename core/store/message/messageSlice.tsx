/* eslint-disable @typescript-eslint/no-unused-vars */

import {create} from 'zustand';
import {createSelectors} from '../utils';
import {MessageType} from './utils';
interface MessageState {
  message: MessageType | null;
  setMessage: (data: MessageType) => void;
  reset: () => void;
}
const _useMessage = create<MessageState>((set, get) => ({
  message: null,
  setMessage: async message => {
    set({
      message: {
        ...message,
        color:
          message.type == 'error'
            ? '#E23E3E'
            : message.type == 'success'
            ? '#31B057'
            : '#FF9C00',
        icon:message.type == 'error'
        ? 'alert-circle-outline'
        : message.type == 'success'
        ? 'check'
        : 'alpha-i-circle-outline'
      },
    });
  },
  reset: () => {
    set({message: null});
  },
}));

export const useMessage = createSelectors(_useMessage);

export const setMessage = (message: MessageType) =>
  _useMessage.getState().setMessage(message);
export const reset = () => _useMessage.getState().reset();
