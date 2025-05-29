import React from "react"
import { useAxios } from "../useAxios"
import { z } from "zod"

export const paramsSchema = z.object({
    prompt: z.string(),
    width: z.number(),
    height: z.number(),
    count: z.number(),
    style: z.number(),
})

export type Params = z.infer<typeof paramsSchema>

export const resultSchema = z.object({
    success: z.boolean(),
    response: z.object({
        prompt_id: z.string(),
    }).optional(),
}).partial()

export type Result = z.infer<typeof resultSchema>

type GenerateFunc = (params: Params) => Promise<Result>

export const useGenerate = (): GenerateFunc => {
    const axios = useAxios()

    return React.useCallback<GenerateFunc>((params: Params) => {
        return axios.post('images/generate', params)
            .then(res => resultSchema.parse(res.data))
    }, [axios])
}