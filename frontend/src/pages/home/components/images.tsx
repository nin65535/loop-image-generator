import { useIndex } from "~/hooks/images/useIndex"
import { Preview } from "./preview"
import React from "react"

export const Images: React.FC = () => {
    const { files } = useIndex().data!
    if (files.length == 0) {
        return <div>no image</div>
    }
    const previews = files.map(image => <Preview file={image} key={image} />)
    return <div className="d-flex flex-wrap gap-1 mt-1">
        {previews}
    </div>

}