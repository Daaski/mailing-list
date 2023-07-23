import {ListBox} from "primereact/listbox";
import {useRouter} from "next/router";

import {channels, ChannelType} from "@/components/SelectChannels/data";


export const SelectEditChannel = () => {
    const router = useRouter()

    const handleChange = (ch: ChannelType) => {
        router.push(`${ch.code}`)
    }

    return (
        <aside>
            <ListBox
                options={channels}
                onChange={(e) => handleChange(e.target.value)}
                optionLabel="name"
            ></ListBox>
        </aside>
    )
}