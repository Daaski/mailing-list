import { create } from 'zustand';
import {ButtonsProps} from "@/store/types";


export const useButtons = create<ButtonsProps>((set) => ({
    buttons: [],
    setButtons: (message) => set({buttons: message})
}));
