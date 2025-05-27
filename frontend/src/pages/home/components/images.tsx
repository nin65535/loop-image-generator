import { Card } from "react-bootstrap"
import { useIndex } from "~/hooks/images/useIndex"
import { Preview } from "./preview"

export const Images: React.FC = () => {
    const { files } = useIndex().data!
    if (files.length == 0) {
        return null
    }
    const previews = files.map(image => <Preview file={image} key={image} />)
    return <Card>
        <Card.Body className="d-flex flex-wrap gap-1">
            {previews}
        </Card.Body>
    </Card>
}