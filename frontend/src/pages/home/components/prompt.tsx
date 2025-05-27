import { Form } from "react-bootstrap"
import { promptAtom } from "../atoms/pageDataAtom"
import { useAtom, useAtomValue, } from "jotai"
import React from "react"
import { promptReadingAtom } from "./preview"

export const Prompt: React.FC = () => {
    const [prompt, setPrompt] = useAtom(promptAtom)
    const promptReading = useAtomValue(promptReadingAtom)
    const disabled = promptReading.length > 0

    const onChange = React.useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((ev) => {
        setPrompt(ev.currentTarget.value ?? '')
    }, [setPrompt])
    return <Form.Control
        as='textarea'
        style={{ height: "12em" }}
        onChange={onChange}
        value={prompt ?? ''}
        disabled={disabled}
    />
}