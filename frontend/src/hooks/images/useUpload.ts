import { z } from "zod"
import { useAxios } from "../useAxios"
import React from "react"


export type Params = {
    file: File
}

export const resultSchema = z.object({
    success: z.boolean(),
    filename: z.string().optional(),
}).partial()

export type Result = z.infer<typeof resultSchema>

type UploadFunc = (params: Params) => Promise<Result>

const url = 'images/upload'
export const useUpload = (): UploadFunc => {

    const axios = useAxios()
    return React.useCallback<UploadFunc>(({ file }) => {
        const formData = new FormData()
        formData.append('file', file)
        return axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => resultSchema.parse(res.data))
    }, [axios])

}