import _ from 'lodash'
import { atom, useAtomValue, useStore } from "jotai"
import React from "react"
import { Button } from "react-bootstrap"
import { pageDataAtom, promptSourcesAtom } from "../atoms/pageDataAtom"
import { useGenerate } from "../../../hooks/images/useGenerate"
import { useWait } from '~/hooks/images/useWait'
import { useIndex } from '~/hooks/images/useIndex'
import { promptReadingAtom } from './preview'

const generatingAtom = atom<boolean>(false)


export const GenerateButton: React.FC = () => {
    const generating = useAtomValue(generatingAtom)
    return generating ?
        <ButtonGenerating /> : <ButtonMain />
}
const ButtonGenerating: React.FC = () => <Button disabled>Generating...</Button>

const ButtonMain: React.FC = () => {
    const store = useStore()
    const generate = useGenerate()
    const wait = useWait()
    const promptReading = useAtomValue(promptReadingAtom)
    const disabled = promptReading.length > 0

    const { mutate } = useIndex()
    const onClick = React.useCallback(async () => {
        const pageData = store.get(pageDataAtom)
        const params = _.get(pageData, 'params')
        const result = await generate(params)
        const prompt_id = _.get(result, 'response.prompt_id')
        if (!prompt_id) {
            throw new Error
        }
        store.set(generatingAtom, true)
        await wait({ prompt_id })
        store.set(generatingAtom, false)
        mutate()
        store.set(promptSourcesAtom, [])
    }, [store])
    return <Button onClick={onClick} disabled={disabled}>
        Generate
    </Button>
}