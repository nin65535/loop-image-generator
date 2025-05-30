import { Form } from "react-bootstrap"
import { promptAtom } from "../atoms/pageDataAtom"
import { useAtom, } from "jotai"
import React from "react"

export const Prompt: React.FC = () => {
    const [prompt, setPrompt] = useAtom(promptAtom)

    const onChange = React.useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((ev) => {
        setPrompt(ev.currentTarget.value ?? '')
    }, [setPrompt])
    return <Form.Control
        as='textarea'
        style={{ height: "12em" }}
        onChange={onChange}
        value={prompt ?? ''}
    />
}