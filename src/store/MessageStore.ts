import { create } from 'zustand';
import { MessagesStoreProps} from "@/store/types";


export const useMessageStore = create<MessagesStoreProps>((set) => ({
    messages: [],
    setMessages: (message) => set({messages: message})
}));
