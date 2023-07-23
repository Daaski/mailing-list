import {ChannelType} from "@/components/SelectChannels/data";
import {Reorder} from "framer-motion";
import {useRouter} from "next/router";

import Gear from 'public/svg/gear-settings-svgrepo-com.svg'
import Exit from 'public/svg/plus-svgrepo-com.svg'
import {useSelectedStore} from "@/store/SelectedStore";

import scss from './SelectedChannel.module.scss'




interface SelectedChannel {
    channel: ChannelType
}

export const SelectedChannel = ({channel}: SelectedChannel) => {
    const [selectedChannels] = useSelectedStore(state => [state.selectedChannels])
    const [setSelectedChannels] = useSelectedStore(state => [state.setSelectedChannels])

    const router = useRouter()
    const handleDelete = () => {
        setSelectedChannels(selectedChannels?.filter(ch => ch.code !== channel.code) as ChannelType[])
    }

    return (
        <Reorder.Item id={channel.code} value={channel} className={scss.channel}>
            <p className={scss.channel_name}>{channel.name}</p>
            <div className={scss.icons}>
                <Gear onClick={() => router.push(`/edit/${channel.code}`)} className={scss.gear}/>
                <Exit onClick={() => handleDelete()} className={scss.exit}/>
            </div>
        </Reorder.Item>
    )
}