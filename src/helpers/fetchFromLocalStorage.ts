import {MessageType} from "@/store/types";

export const fetchFromLocalStorage: () => Promise<MessageType[]> = () => {
    return new Promise((res, rej) => {
        try {
            const data = localStorage.getItem('networks')
            if (data) {
                const parsedData = JSON.parse(data);
                res(parsedData);
            } else {
                rej()
            }
        } catch (e: any) {
            console.log('Непредвиденная ошибка' + e.message)
        }
    })
}