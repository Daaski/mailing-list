import {ChannelType} from "@/components/SelectChannels/data";

export type ButtonType = {id: string, message: string}

export type MessageType = {
    code: string,
    text: string,
    buttons: ButtonType[]
}

export interface ChannelsProps {
    selectedChannels?: ChannelType[]
    setSelectedChannels: (arr: ChannelType[]) => void
}

export interface ButtonsProps {
    buttons?: ButtonType[]
    setButtons: (text: ButtonType[]) => void
}

export interface MessagesStoreProps {
    messages: MessageType[],
    setMessages: (arr: MessageType[]) => void
}