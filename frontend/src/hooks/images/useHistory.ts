import { z } from "zod"
import { useAxios } from "../useAxios"
import React from "react"

export type Params = {
    prompt_id: string
}

export const resultSchema = z.object({
    success: z.boolean(),
    response: z.any().optional(),
}).partial()

export type Result = z.infer<typeof resultSchema>

type HistoryFunc = (params: Params) => Promise<Result>

export const useHistory = (): HistoryFunc => {
    const axios = useAxios()
    return React.useCallback<HistoryFunc>(
        (params: Params) =>
            axios.get('images/history/' + params.prompt_id)
                .then(res => resultSchema.parse(res.data)),
        [axios])
}
