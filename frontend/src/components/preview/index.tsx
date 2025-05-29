import React from "react"
import config from "../../../app.config"
import { useAtomValue } from "jotai";
import { timestampAtom } from "./atoms/timestampAtom";

export const Preview: React.FC<React.HTMLProps<HTMLImageElement> & { file: string, }> = ({ file, ...props }) => {
    const timestamp = useAtomValue(timestampAtom)
    const path = config.imageBase + '/' + file + '?' + timestamp
    const style: React.CSSProperties = {
        maxWidth: 240,
        ...props.style,
    }

    return <img
        {...props}
        src={path}
        style={style}
    />
} 
