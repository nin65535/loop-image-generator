import useSWR from "swr"
import { useAxios } from "../useAxios"
import React from "react"
import { z } from "zod"

const resultSchema = z.object({
    files: z.array(z.string()),
})

export const useIndex = () => {
    const axios = useAxios()
    const fetcher = React.useCallback((url: string) => {
        return axios.get(url)
            .then(res => resultSchema.parse(res.data))
    }, [axios])
    return useSWR('images/index', fetcher, { suspense: true })
}