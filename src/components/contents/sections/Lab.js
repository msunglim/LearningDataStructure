import { Divider } from "antd"
import { algorithms } from "../algorithmsManager"

function Lab(props) {

    const index = props.index
    return (
        <div>

                <Divider />

                {algorithms[index].component}


        </div>
    )
}
export default Lab