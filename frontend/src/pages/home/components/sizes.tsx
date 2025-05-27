import { Form } from "react-bootstrap"
import { paramsAtom } from "../atoms/pageDataAtom"
import { useAtom } from "jotai"
import React from "react"
import _ from "lodash"
import { produce } from "immer"

const SIZE_OPTIONS = [
    { width: 1024, height: 1024 },
    { width: 768, height: 1344 },
    { width: 1344, height: 768 },
]

export const Sizes: React.FC = () => {
    const options = SIZE_OPTIONS.map((so, i) => <option value={i} key={i}>{`${so.width} x ${so.height}`}</option>)
    const [params, setParams] = useAtom(paramsAtom)
    const value = SIZE_OPTIONS.findIndex(so => so.width == params.width && so.height == params.height)

    const onChange = React.useCallback<React.ChangeEventHandler<HTMLSelectElement>>(ev => {
        const so = _.get(SIZE_OPTIONS, ev.currentTarget.value)
        setParams(params => produce(params, draft => {
            draft.width = so.width
            draft.height = so.height
        }))

    }, [setParams])

    const style: React.CSSProperties = {
        width: 240
    }
    return <Form.Select value={value} onChange={onChange} style={style}>
        {options}
    </Form.Select>
}
