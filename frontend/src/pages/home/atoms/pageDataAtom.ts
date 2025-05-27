import { z } from "zod";
import { atom } from 'jotai'
import { paramsSchema } from "../../../hooks/images/useGenerate";
import { focusAtom } from "jotai-optics";

export const pageDataShcema = z.object({
    params: paramsSchema,
    prompt_sources: z.array(z.string()),
})

type PageData = z.infer<typeof pageDataShcema>

export const pageDataAtom = atom<PageData>({
    params: {
        prompt: '',
        width: 1024,
        height: 1024,
    },
    prompt_sources: [],
})


export const promptSourcesAtom = focusAtom(pageDataAtom, optic => optic.prop('prompt_sources'))
export const promptAtom = focusAtom(pageDataAtom, optic => optic.prop('params').prop('prompt'))
export const paramsAtom = focusAtom(pageDataAtom, optic => optic.prop('params'))