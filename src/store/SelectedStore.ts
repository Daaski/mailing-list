import { create } from 'zustand';
import {ChannelsProps} from "@/store/types";


export const useSelectedStore = create<ChannelsProps>((set) => ({
    selectedChannels: [],
    setSelectedChannels: (selectedChannel) => set({selectedChannels: selectedChannel})
}));
