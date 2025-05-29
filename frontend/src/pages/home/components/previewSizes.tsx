import { faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAtom } from "jotai"
import { Button, InputGroup } from "react-bootstrap"
import { previewWidthAtom } from "../atoms/pageDataAtom"
import React from "react"

export const PreviewSizes: React.FC = () => {
    return <InputGroup className='w-auto'>
        <SizeButton size={240}>
            <FontAwesomeIcon icon={faSquare} />
        </SizeButton>
        <SizeButton size={360}>
            <FontAwesomeIcon icon={faSquare} size='xl' />
        </SizeButton>
        <SizeButton size={480}>
            <FontAwesomeIcon icon={faSquare} size='2x' />
        </SizeButton>
    </InputGroup>
}

const SizeButton: React.FC<React.PropsWithChildren<{ size: number }>> = ({ children, size }) => {
    const [value, setValue] = useAtom(previewWidthAtom)

    const variant = (value == size) ? 'primary' : 'outline-primary'
    const onClick = React.useCallback(() => { setValue(size) }, [size, setValue])

    return <Button style={{ width: 48 }} variant={variant} size='sm' onClick={onClick}>
        {children}
    </Button>
}