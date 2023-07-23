import {SelectedChannels} from "@/components/SelectedChannels";
import {SelectChannels} from "@/components/SelectChannels";

import scss from "@/styles/Home.module.scss";



export default function Home() {

    return (
        <div className={scss.main_layout}>
            <SelectChannels/>
            <SelectedChannels/>
        </div>
    )
}
