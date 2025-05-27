import React from "react"
import { useAxios } from "../useAxios"
import { z } from "zod"
import { useWait } from "./useWait"

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

type ReadFunc = (params: Params) => Promise<void>

export const useRead = (): ReadFunc => {
    const axios = useAxios()
    const wait = useWait()

    return React.useCallback<ReadFunc>((params: Params) => {
        return axios.post('images/read', params)
            .then(res => resultSchema.parse(res.data))
            .then(async res => {
                const prompt_id = res.response?.prompt_id
                if(!prompt_id){
                    throw new Error('なんかへん')
                }
                return wait({prompt_id})
            })
    }, [axios])
}