import { atom, useAtomValue, useStore } from "jotai";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { MenuItemsAtomProvider, useMenuItemsAtom } from "./hooks/useMenuItemsAtom";
import { ItemPosition, ItemPositionAtomProvider, useItemPositionAtom } from "./hooks/useItemPositionAtom";

export const RightMenu: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, ...props }) => {
    const style: React.CSSProperties = { ...props.style, position: "relative" }
    const itemPositionAtom = React.useMemo(() => atom<ItemPosition>(undefined), [])
    const store = useStore()

    const refDiv = React.useRef<HTMLDivElement>(null)

    const menuItemsAtom = React.useMemo(() => atom<React.ReactNode[]>([]), [])

    const onContextMenu = React.useCallback<React.MouseEventHandler<HTMLDivElement>>((ev) => {
        const div = refDiv.current
        const rect = div!.getBoundingClientRect()
        const x = ev.clientX - rect.x
        const y = ev.clientY - rect.y

        store.set(itemPositionAtom, { x, y })

        ev.preventDefault()
    }, [store, itemPositionAtom, refDiv])
    const onMouseLeave = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
        store.set(itemPositionAtom, undefined)
    }, [store, itemPositionAtom])

    return <MenuItemsAtomProvider value={menuItemsAtom}>
        <ItemPositionAtomProvider value={itemPositionAtom}>
            <div
                role='button'
                ref={refDiv}
                {...props}
                style={style}
                onContextMenu={onContextMenu}
                onMouseLeave={onMouseLeave}
                onClick={onMouseLeave}>
                <MenuItems />
                {children}
            </div>
        </ItemPositionAtomProvider>
    </MenuItemsAtomProvider>

}

const MenuItems: React.FC = () => {
    const menuItemsAtom = useMenuItemsAtom()
    const itemPositionAtom = useItemPositionAtom()

    const items = useAtomValue(menuItemsAtom)
    const position = useAtomValue(itemPositionAtom)

    if (items.length == 0) {
        return null
    }
    return <Dropdown style={{ position: "absolute", top: position?.y, left: position?.x }} show={position != undefined}>
        <Dropdown.Menu>
            {items}
        </Dropdown.Menu>
    </Dropdown>

}