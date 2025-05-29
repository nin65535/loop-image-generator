import useSWR, { SWRResponse } from "swr";
import axios from 'axios'
import React from "react";
import { replaceExtension } from "~/utilities/replaceExtension";
import { useRead } from "./useRead";
import { getTimestamp } from "~/utilities/getTimestamp";
import config from "../../../app.config";
import { useWait } from "./useWait";
import _ from "lodash";

/** 
 * txt が存在すればそれを返す
 * 存在しない場合は作成させて返す
 */
export const usePrompt = (image: string): SWRResponse<string> => {
    const read = useRead()
    const wait = useWait()

    const fetcher = React.useCallback((url: string) => {
        return axios.get(url)
            .then(res => res.data)
            .catch(async e => {
                const res = await read({ image })
                const prompt_id = _.get(res, 'response.prompt_id')

                if (!_.isString(prompt_id)) {
                    throw new Error('なんかへん')
                }

                await wait({ prompt_id })
                const timestamp = getTimestamp()
                return axios.get(url + `?${timestamp}`)
                    .then(res => res.data)
            })

    }, [read])

    const url = replaceExtension(config.imageBase + '/' + image, '.txt')

    return useSWR(url, fetcher, { suspense: true })
}