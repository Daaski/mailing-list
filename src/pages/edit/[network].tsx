import {Edit} from "@/components/Edit";
import {SelectEditChannel} from "@/components/SelectEditChannel/SelectEditChannels";

import scss from "@/styles/Home.module.scss";

const Network = () => {
    return (
        <div className={scss.main_layout}>
            <SelectEditChannel/>
            <Edit/>
        </div>
    )
}

export default Network