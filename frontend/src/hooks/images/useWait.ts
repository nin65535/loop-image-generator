import React from "react"
import { useHistory } from "./useHistory"
import _ from "lodash"
import { sleep } from "~/utilities/sleep"

type WaitFunc = (params: { prompt_id: string }) => Promise<void>
export const useWait = (): WaitFunc => {
    const history = useHistory()

    return React.useCallback<WaitFunc>(async ({ prompt_id }) => {
        for (let _i of _.range(0, 600)) {
            const h = await history({ prompt_id })
            if (h.success) {
                const h2 = _.get(h, `response.${prompt_id}`)
                if (h2) {
                    return
                }
            }
            await sleep(1000)
        }
        throw new Error('時間切れ')
    }, [history])

}