import { focusAtom } from "jotai-optics"
import { Form } from "react-bootstrap"
import { paramsAtom } from "../atoms/pageDataAtom"
import { useAtom } from "jotai"
import React from "react"


const STYLES = [
    { label: "anime01", value: 0 },
    { label: "anime02", value: 1 },
    { label: "photograph", value: 2 },
]
const styleAtom = focusAtom(paramsAtom, optic => optic.prop('style'))

export const Styles: React.FC = () => {
    const options = STYLES.map(({ label, value }) => <option value={value} key={value}>{label}</option>)
    const style: React.CSSProperties = {
        width: 180
    }
    const [value, setValue] = useAtom(styleAtom)
    const onChange = React.useCallback<React.ChangeEventHandler<HTMLSelectElement>>(ev => {
        setValue(Number(ev.currentTarget.value))
    }, [setValue])
    return <Form.Select style={style} value={value} onChange={onChange}>
        {options}
    </Form.Select>
}