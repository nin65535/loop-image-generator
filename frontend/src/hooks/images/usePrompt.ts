import useSWR, { SWRResponse } from "swr";
import axios from 'axios'
import React from "react";
import config from "~/app.config";
import { replaceExtension } from "~/utilities/replaceExtension";
import { useRead } from "./useRead";
import { getTimestamp } from "~/utilities/getTimestamp";



export const usePrompt = (image: string): SWRResponse<string> => {
    const read = useRead()

    const fetcher = React.useCallback((url: string) => {
        return axios.get(url)
            .then(res => res.data)
            .catch(async e => {
                await read({ image })
                const timestamp = getTimestamp()
                return axios.get(url + `?${timestamp}`)
                    .then(res => res.data)
            })

    }, [read])

    const url = replaceExtension(config.imageBase + '/' + image, '.txt')

    return useSWR(url, fetcher, { suspense: true })
}