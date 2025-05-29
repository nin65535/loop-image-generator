import { useStore } from "jotai"
import React from "react"
import { screenAtom } from "../atoms/screenAtom"

export type ScreenFunc = <Result>(work: Promise<Result>) => Promise<Result>

export const useScreen = (): ScreenFunc => {
    const store = useStore()

    return React.useCallback<ScreenFunc>(async <Result>(work: Promise<Result>) => {
        store.set(screenAtom, store.get(screenAtom) + 1)
        try {
            return await work
        } finally {
            store.set(screenAtom, store.get(screenAtom) - 1)
        }
    }, [store])
}