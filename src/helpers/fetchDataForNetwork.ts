import {ButtonType, MessageType} from "@/store/types";
import {NextRouter} from "next/router";

export const FetchDataForNetwork = (messages: MessageType[], router: NextRouter) => {
    return new Promise<MessageType>((res, rej) => {
        if (router.isReady) {
            const data = messages.find(m => {
                if (m?.code === router.query.network) {
                    return m
                }
            })
            res(data as MessageType)
        }
    })
}