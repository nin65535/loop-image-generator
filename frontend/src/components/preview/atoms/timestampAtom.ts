import { atom } from "jotai";
import { getTimestamp } from "~/utilities/getTimestamp";

export const timestampAtom = atom<string>(getTimestamp())