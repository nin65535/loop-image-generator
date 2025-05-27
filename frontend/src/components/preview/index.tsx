import React from "react"
import config from "~/app.config"
import { format } from "date-fns";
import { getTimestamp } from "~/utilities/getTimestamp";

export const Preview: React.FC<React.HTMLProps<HTMLImageElement> & { file: string }> = ({ file, ...props }) => {
    const timestamp = React.useMemo(getTimestamp, [])
    const path = config.imageBase + '/' + file + '?' + timestamp
    const style: React.CSSProperties = {
        ...props.style,
        maxWidth: 240,
    }

    return <img
        {...props}
        src={path}
        style={style}
    />
} 
