import {ListBox} from "primereact/listbox";

import {channels, ChannelType} from "@/components/SelectChannels/data";
import {useSelectedStore} from "@/store/SelectedStore";

import scss from './Channels.module.scss'




export const SelectChannels = () => {
    const [selectedChannels] = useSelectedStore(state => [state.selectedChannels])
    const [setSelectedChannels] = useSelectedStore(state => [state.setSelectedChannels])


    const filteredChannels = channels.filter(
        (channel) => !selectedChannels?.includes(channel)
    );

    const listBoxValue = filteredChannels.length ? filteredChannels : [{name: 'Пусто'}]

    const handleChange = (ch: ChannelType) => {
        if (selectedChannels?.length === channels.length) {
            return
        }
        if (!selectedChannels?.includes(ch)) {
            setSelectedChannels([...(selectedChannels ?? []), ch]);
        }
    };

    return (
        <aside>
            <ListBox
                options={listBoxValue}
                onChange={(e) => handleChange(e.target.value)}
                optionLabel="name"
            ></ListBox>
        </aside>
    );
};