import { useStore } from "jotai"
import React from "react"
import { usePrompt } from "~/hooks/images/usePrompt"
import { promptsAtom } from "./promptMaker"

export const PromptReader: React.FC<{ file: string }> = ({ file }) => {
    const prompt = usePrompt(file).data!
    const store = useStore()

    React.useEffect(() => {
        store.set(promptsAtom, [...store.get(promptsAtom), { image: file, prompt }])
        return () => {
            store.set(promptsAtom, store.get(promptsAtom).filter(p => p.image != file))
        }
    }, [file, store])
    return null
}