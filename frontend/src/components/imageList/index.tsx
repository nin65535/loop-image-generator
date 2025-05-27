import React from "react"
import { Card } from "react-bootstrap"
import config from "~/app.config"
import { useIndex } from "~/hooks/images/useIndex"
import { Preview } from "../preview"

export const ImageList: React.FC = () => <React.Suspense><ListMain /></React.Suspense>

const ListMain: React.FC = () => {
    const { files } = useIndex().data!
    const previews = files.map(file => <Preview key={file} file={file} />)
    return <Card>
        <Card.Body className='d-flex gap-2 flex-wrap'>
            {previews}
        </Card.Body>
    </Card>
}
 