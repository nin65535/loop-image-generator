import React from "react"
import { useAxios } from "../useAxios"
import { z } from "zod"

export const paramsSchema = z.object({
    image: z.string()
})

export type Params = z.infer<typeof paramsSchema>

export const resultSchema = z.object({
    success: z.boolean(),
    response: z.object({
        prompt_id: z.string(),
    }).optional(),
}).partial()

export type Result = z.infer<typeof resultSchema>

type ReadFunc = (params: Params) => Promise<Result>

export const useRead = (): ReadFunc => {
    const axios = useAxios()

    return React.useCallback<ReadFunc>((params: Params) => {
        return axios.post('images/read', params)
            .then(res => resultSchema.parse(res.data))
    }, [axios])
}