import {Reorder} from "framer-motion";

import {useSelectedStore} from "@/store/SelectedStore";
import {SelectedChannel} from "@/components/SelectedChannels/SelectedChannel";
import {Order} from "@/components/Order";

import scss from './SelectedChannels.module.scss'
import {Button} from "primereact/button";
import {useMessageStore} from "@/store/MessageStore";


export const SelectedChannels = () => {
    const [selectedChannels] = useSelectedStore(state => [state.selectedChannels])
    const [setSelectedChannels] = useSelectedStore(state => [state.setSelectedChannels])

    const [messages] = useMessageStore(state => [state.messages])


    const handleSubmitSpam = () => {
        if (selectedChannels?.length === 0) {
            alert('Не выбраны каналы')
            return
        }
        const empty = messages.find(m => m.text === '')
        if (empty || messages.length === 0) {
            if (messages.length === 0) {
                alert('Заполните сообщения')
            } else {
                alert('Исправьте, в ' + empty?.code + ' пустое сообщение')
            }
        } else {
            selectedChannels?.forEach(ch => {
                const channel = messages.find(m => m.code === ch.code)
                alert('Отправлено сообщение в ' + channel?.code)
            })
        }
    }

    return (
        <main className={scss.channels_layout}>
            <div className={scss.channels_wrapper}>
                <Reorder.Group axis="y"
                               values={selectedChannels ?? []}
                               onReorder={setSelectedChannels}
                               className={scss.channels}>
                    <h2 className={scss.title}>Каналы отправки</h2>
                    {selectedChannels?.map((ch, i) => (
                        <SelectedChannel
                            key={JSON.stringify(ch)}
                            channel={ch}
                        />
                    ))}
                </Reorder.Group>
                <div className={scss.order}>
                    <h2 className={scss.title}>Порядок</h2>
                    {selectedChannels?.map((ch, index) =>
                        <Order
                            key={index}
                            index={index}
                        />
                    )}
                </div>
            </div>
            <div className={scss.send_spam_wrapper}>
                <Button onClick={handleSubmitSpam}>Отправить рассылку</Button>
            </div>
        </main>
    )
}