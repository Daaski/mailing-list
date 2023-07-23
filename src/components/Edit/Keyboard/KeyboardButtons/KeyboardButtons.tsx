import {Dispatch, SetStateAction, useState} from "react";
import {v4 as uuidv4} from "uuid";

import {KeyboardButton} from "@/components/Edit/Keyboard/KeyboardButtons/KeyboardButton";
import {colors} from "@/components/Edit/Keyboard/colors";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ButtonType} from "@/store/types";
import Gear from 'public/svg/gear-settings-svgrepo-com.svg'
import Plus from 'public/svg/plus-svgrepo-com.svg'

import scss from "@/components/Edit/Keyboard/Keyboard.module.scss";


interface KeyboardButtonsProps {
    setMessage:  Dispatch<SetStateAction<string>>
    buttons: ButtonType[] | null,
    setButtons: (arr: ButtonType[]) => void
}

export const KeyboardButtons = ({setButtons, buttons, setMessage}:KeyboardButtonsProps) => {
    const [button, setButton] = useState<ButtonType>({id: '', message: ''})

    const [inputVisible, setInputVisible] = useState<boolean>(false)

    const [buttonsMode, setButtonsMode] = useState<'edit' | 'send'>('send')

    const handleEditButtonClick = (button: ButtonType) => {
        setInputVisible(true)
        setButton(button)
    }

    const handleButtonClick = (button: ButtonType) => {
        setMessage(message => message + ' ' + button.message)
    }

    const changeButtonTextHandler = (text: string) => {
        setButton({...button, message: text})
    }

    const addButtonHandler = () => {
        if (button?.id) {
            setButtons(buttons?.map(b => {
                if (b.id === button.id) {
                    return {...b, message: button.message}
                } else return b
            }) as ButtonType[])
            setButton({id: '', message: ''})
        } else {
            if (button.message) {
                setButtons([...buttons ?? [], {id: uuidv4(), message: button?.message}])
                setButton({id: '', message: ''})
            }
        }
        setInputVisible(false)
    }

    const deleteButtonHandler = (id: string) => {
        setButtons(buttons?.filter(b => b.id !== id) as ButtonType[])
    }


    return (
        <>
            <div className={scss.keyboard_menu}>
                <div className={scss.keyboard_menu_settings}>
                    <Gear onClick={() => setButtonsMode(buttonsMode === "edit" ? 'send' : 'edit')}
                          className={scss.key_gear}/>
                    {buttonsMode === 'edit' &&
                        <Plus onClick={() => setInputVisible(!inputVisible)} className={scss.plus}/>}
                </div>
            </div>
            <div className={scss.buttons_wrapper}>
                {buttons?.length && buttons?.map((button, index) =>
                    <KeyboardButton
                        handleButtonClick={handleButtonClick}
                        handleEditButtonClick={handleEditButtonClick}
                        deleteButtonHandler={deleteButtonHandler}
                        key={index}
                        mode={buttonsMode}
                        button={button}
                        severity={colors[index % 10]}
                    />
                )}
            </div>
            {inputVisible &&
                <div className={scss.handleButtons}>
                    <InputText
                        style={{width: '100%'}}
                        value={button?.message}
                        onChange={(e) => changeButtonTextHandler(e.target.value)}
                    />
                    <Button onClick={addButtonHandler} style={{marginLeft: '10px'}} label="Save" icon="pi pi-check"/>
                </div>
            }
        </>
    )
}