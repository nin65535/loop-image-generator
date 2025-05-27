import React from "react"
import { Button } from "react-bootstrap"
import { useClear } from "~/hooks/images/useCleat"
import { useIndex } from "~/hooks/images/useIndex"

export const ClearButton: React.FC = () => {


    const { mutate } = useIndex()
    const clear = useClear()

    const onClick = React.useCallback(
        () => clear()
            .then(() => mutate()),
        [clear, mutate])

    return <Button onClick={onClick}>
        Clear
    </Button>
}