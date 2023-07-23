import {Button} from "primereact/button";
import Xmark from 'public/svg/plus-svgrepo-com.svg'
import {ButtonType} from "@/store/types";

import scss from './KeyboardButton.module.scss'



interface KeyboardButtonProps {
    handleButtonClick: (button: ButtonType) => void
    handleEditButtonClick: (button: ButtonType) => void
    deleteButtonHandler: (id: string) => void
    button: ButtonType
    mode: 'edit' | 'send'
    severity: any
}

export const KeyboardButton = ({button, deleteButtonHandler, mode, severity, handleButtonClick, handleEditButtonClick}: KeyboardButtonProps) => {

    if (!button) {
        return null
    }

    return (
        mode === 'send' ? <Button onClick={() => handleButtonClick(button)} severity={severity}>{button?.message}</Button>
        :
        <div className={scss.button_editable_wrapper}>
            <Button onClick={() => handleEditButtonClick(button)} outlined  severity={severity}>{button?.message}</Button>
            <Xmark onClick={() => deleteButtonHandler(button.id)} className={scss.xmark}/>
        </div>
    )
}