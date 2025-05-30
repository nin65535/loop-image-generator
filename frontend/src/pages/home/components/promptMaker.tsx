import { atom, useAtomValue, useStore } from "jotai"
import { promptAtom, } from "../atoms/pageDataAtom"
import React from "react"
import _ from "lodash"

export type Prompt = {
    image: string,
    prompt: string,
}
export const promptsAtom = atom<Prompt[]>([])

export const PromptMaker: React.FC = () => {
    const prompts = useAtomValue(promptsAtom)
    const store = useStore()

    React.useEffect(() => {
        const source_size = prompts.length
        const words: string[] = _.flatten(prompts.map(prompt => prompt.prompt.split(',')))
            .map(word => word.trimStart())

        const countWords = getCountWords(words)
        const waitedPrompts = Object.entries(countWords)
            .sort((a, b) => {
                const [wa, ca] = a
                const [wb, cb] = b
                if (ca == cb) {
                    return wa < wb ? -1 : 1
                }

                return cb - ca
            })
            .map(([word, count]) => {
                const rate = Math.floor(count / source_size * 100) / 100

                if (rate == 1) {
                    return word
                } else {
                    return `(${word} : ${rate})`
                }
            }).join(',')

        store.set(promptAtom, waitedPrompts)
    }, [prompts, store])
    return null

}

const getCountWords = (words: string[]): Record<string, number> => {
    const result: Record<string, number> = {}
    for (const word of words) {
        result[word] = (result[word] ?? 0) + 1
    }
    return result
}
