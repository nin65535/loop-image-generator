import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useStore } from "jotai"
import React from "react"
import { Button } from "react-bootstrap"
import { timestampAtom } from "~/components/preview/atoms/timestampAtom"
import { useScreen } from "~/components/screen/hooks/useScreen"
import { useIndex } from "~/hooks/images/useIndex"
import { useUpload } from "~/hooks/images/useUpload"
import { getTimestamp } from "~/utilities/getTimestamp"

export const UploadButton: React.FC = () => {
    const refFile = React.useRef<HTMLInputElement>(null)

    const { mutate } = useIndex()
    const upload = useUpload()
    const screen = useScreen()
    const store = useStore()

    const onClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
        refFile.current?.click()
    }, [refFile])

    const onChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(ev => {
        const files = ev.currentTarget.files;
        if (files && files.length > 0) {
            const file = files[0]

            screen(upload({ file }))
                .finally(() => {
                    mutate()
                    if (refFile.current) {
                        refFile.current.value = ''
                    }
                    store.set(timestampAtom, getTimestamp())
                })
        }

    }, [refFile, mutate, screen, store, upload])
    return <>
        <input type='file' className="d-none" ref={refFile} accept=".png" onChange={onChange} />
        <Button onClick={onClick}>
            <FontAwesomeIcon icon={faUpload} fixedWidth className="me-1" />
            Upload
        </Button>
    </>
}