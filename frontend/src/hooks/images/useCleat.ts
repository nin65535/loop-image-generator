import React from "react"
import { z } from "zod"
import { useAxios } from "../useAxios"

const resultSchema = z.object({
    success: z.boolean()
})

type Result = z.infer<typeof resultSchema>
type ClearFunc = () => Promise<Result>

export const useClear = (): ClearFunc => {
    const axios = useAxios()
    return React.useCallback<ClearFunc>(
        () => axios.get('images/clear')
            .then(res => resultSchema.parse(res.data)),
        [axios])
}