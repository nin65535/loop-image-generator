import { PrimitiveAtom } from "jotai"
import React from "react"

export type ItemPosition = { x: number, y: number } | undefined

const context = React.createContext<PrimitiveAtom<ItemPosition> | undefined>(undefined)

export const ItemPositionAtomProvider = context.Provider

export const useItemPositionAtom = () => React.useContext(context)!