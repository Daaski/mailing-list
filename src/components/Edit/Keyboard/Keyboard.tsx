import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {InputTextarea} from 'primereact/inputtextarea';


import {useButtons} from "@/store/ButtonsStore";
import {useMessageStore} from "@/store/MessageStore";
import {KeyboardButtons} from "@/components/Edit/Keyboard/KeyboardButtons";
import {ButtonType, MessageType} from "@/store/types";
import {FetchDataForNetwork} from "@/helpers/fetchDataForNetwork";

import scss from './Keyboard.module.scss'



export const Keyboard = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter()

    const currentCode = router.query.network

    const [messages] = useMessageStore(state => [state.messages])
    const [setMessages] = useMessageStore(state => [state.setMessages])

    const [buttons] = useButtons(state => [state.buttons])
    const [setButtons] = useButtons(state => [state.setButtons])

    const [message, setMessage] = useState<string>('')

    const maxLength = 1096


    useEffect(() => {
        setLoading(true)
        FetchDataForNetwork(messages, router).then(r => {
            setButtons(r?.buttons ?? [])
            setMessage(r?.text ?? '')
            setLoading(false)
        })
    }, [messages, router, router.query.network, setButtons])


    const handleSaveClick = () => {
        if (messages.find(m => m?.code === currentCode)) {
            const editedMessage = messages.map(m => {
                if (m.code === currentCode) {
                    return {...m, text: message, buttons: buttons}
                }
                return m
            })
            setMessages(editedMessage as MessageType[])
            localStorage.setItem('networks', JSON.stringify(editedMessage))
        } else {
            const newMessage = [...messages, {
                buttons: buttons as ButtonType[],
                code: currentCode as string,
                text: message
            }]
            setMessages(newMessage)
            localStorage.setItem('networks', JSON.stringify(newMessage))
        }
        router.replace('/')
    }

    const handleChangeMessage = (value: string) => {
        setMessage(value)

    }

    console.log(messages)

    if (loading) {
        return null
    }

    return (
        <div className={scss.keyboard_layout}>
            <div className={scss.keyboard_wrapper}>
                <div className={scss.keyboard_field_wrapper}>
                    <InputTextarea value={message} onChange={(e) => handleChangeMessage(e.target.value)} maxLength={maxLength}
                                   className={scss.keyboard}/>
                    <i onClick={handleSaveClick} className={`pi pi-check ${scss.keyboard_ok}`}
                       style={{color: 'slateblue'}}></i>
                    <span className={scss.maxlength}>{message?.length ?? '0'} / {maxLength}</span>
                </div>
            </div>
            <KeyboardButtons
                buttons={buttons?.length ? buttons : null}
                setButtons={setButtons}
                setMessage={setMessage}
            />
        </div>
    )
}