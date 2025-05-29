import { Form } from "react-bootstrap"
import { paramsAtom } from "../atoms/pageDataAtom"
import { useAtom } from "jotai"
import { focusAtom } from "jotai-optics"
import React from "react"

const COUNT_OPTIONS = [4, 8, 10, 12, 16]
const countAtom = focusAtom(paramsAtom, optic => optic.prop('count'))
export const ImageCount: React.FC = () => {
    const options = COUNT_OPTIONS.map(c => <option value={c} key={c}>{`${c} images`}</option>)
    const [count, setCount] = useAtom(countAtom)
    const onChange = React.useCallback<React.ChangeEventHandler<HTMLSelectElement>>(ev => {
        setCount(Number(ev.currentTarget.value))
    }, [setCount])
    const style: React.CSSProperties = {
        width: 180
    }

    return <Form.Select value={count} onChange={onChange} style={style}>
        {options}
    </Form.Select>
}