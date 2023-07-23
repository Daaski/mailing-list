import {Keyboard} from "@/components/Edit/Keyboard/Keyboard";
import {useRouter} from "next/router";
import {Button} from "primereact/button";
import {channels} from "@/components/SelectChannels/data";

import scss from './Edit.module.scss'




export const Edit = () => {
    const router = useRouter()

    const currentSpam = channels.find(ch => ch.code === router.query.network)

    return (
        <main className={scss.edit_layout}>
            <div className={scss.edit_header}>
                <Button onClick={() => router.replace('/')} className={scss.back_button} size={"large"} link>Назад</Button>
                <h1 className={scss.edit_header_text}>Введите сообщение для рассылки в {currentSpam?.name}</h1>
            </div>
            <Keyboard/>
        </main>
    )
}
