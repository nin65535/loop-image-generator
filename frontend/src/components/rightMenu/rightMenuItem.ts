import React from "react";
import { useMenuItemsAtom } from "./hooks/useMenuItemsAtom";
import { useStore } from "jotai";

export const RightMenuItem: React.FC<React.PropsWithChildren> = ({ children }) => {
    const atom = useMenuItemsAtom()
    const store = useStore()
    React.useEffect(() => {
        const items = store.get(atom)
        if (!items.includes(children)) {
            store.set(atom, [...items, children])

            return () => {
                store.set(atom, store.get(atom).filter(i => i != children))
            }
        }
    }, [children, atom, store])


    return null
}