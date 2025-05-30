import _ from 'lodash'
import { useStore } from "jotai"
import React from "react"
import { Button } from "react-bootstrap"
import { pageDataAtom, promptSourcesAtom, } from "../atoms/pageDataAtom"
import { useGenerate } from "../../../hooks/images/useGenerate"
import { useWait } from '~/hooks/images/useWait'
import { useIndex } from '~/hooks/images/useIndex'
import { useScreen } from '~/components/screen/hooks/useScreen'



export const GenerateButton: React.FC = () => {
    const store = useStore()
    const generate = useGenerate()
    const wait = useWait()
    const screen = useScreen()
    const { mutate } = useIndex()
    const onClick = React.useCallback(async () => {
        const pageData = store.get(pageDataAtom)
        const params = _.get(pageData, 'params')
        const result = await generate(params)
        const prompt_id = _.get(result, 'response.prompt_id')
        if (!prompt_id) {
            throw new Error
        }

        await screen(
            wait({ prompt_id })
        )

        mutate()
        store.set(promptSourcesAtom, [])
    }, [store, generate, mutate, screen, wait])
    return <Button onClick={onClick}>
        Generate
    </Button>
}