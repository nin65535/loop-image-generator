import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAtomValue } from "jotai"
import { Modal } from "react-bootstrap"
import { screenAtom } from "./atoms/screenAtom"
import React from "react"

export const Screen: React.FC = () => {
    const screen = useAtomValue(screenAtom)
    return <Modal show={screen > 0} centered contentClassName="bg-transparent border-0">
        <FontAwesomeIcon icon={faCircleNotch} size="10x" spin />
    </Modal>
}