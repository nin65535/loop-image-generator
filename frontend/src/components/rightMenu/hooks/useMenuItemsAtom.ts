import { PrimitiveAtom } from "jotai";
import React from "react";

const context = React.createContext<PrimitiveAtom<React.ReactNode[]> | undefined>(undefined)

export const MenuItemsAtomProvider = context.Provider
export const useMenuItemsAtom = () => React.useContext(context)!