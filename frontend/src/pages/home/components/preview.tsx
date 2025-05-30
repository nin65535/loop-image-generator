import { useAtom, useAtomValue, useStore, } from "jotai"
import { Preview as PreviewBase } from "~/components/preview"
import { previewWidthAtom, promptSourcesAtom } from "../atoms/pageDataAtom"
import React from "react"
import _ from "lodash"
import { PromptReader } from "./promptReader"
import { screenAtom } from "~/components/screen/atoms/screenAtom"

export { PreviewWraped as Preview }

const PreviewWraped: React.FC<{ file: string }> = ({ file, }) => {
    const maxWidth = useAtomValue(previewWidthAtom)
    return <Frame file={file}>
        <PreviewBase file={file} style={{ maxWidth }} />
    </Frame>
}

const Frame: React.FC<React.PropsWithChildren<{ file: string }>> = ({ file, children }) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const style: React.CSSProperties = {
        position: "relative"
    }

    const [promptSources, setPromptSources] = useAtom(promptSourcesAtom)
    const checked = promptSources.includes(file)

    const onClick = React.useCallback(() => {
        const newSources = checked ?
            (promptSources.filter(f => f != file)) :
            (promptSources.concat(file))
        setPromptSources(newSources)
    }, [promptSources, setPromptSources, checked, file,])


    return <div
        ref={ref}
        style={style}
        onClick={onClick}
    >
        <Cover file={file} parent={ref} />
        {children}
    </div>
}

const Cover: React.FC<{ file: string, parent: React.RefObject<HTMLDivElement> }> = ({ file, parent }) => {
    const promptSources = useAtomValue(promptSourcesAtom)
    const checked = promptSources.includes(file)

    if (!checked) {
        return null
    }
    return <React.Suspense fallback={<CoverColor parent={parent} file={file} />}>
        <PromptReader file={file} />
        <CoverBorder parent={parent} />
    </React.Suspense>
}

const COLOR_BLACK = "rgba(0,0,0,0.4)"

const CoverBorder: React.FC<{ parent: React.RefObject<HTMLDivElement> }> = ({ parent }) => {
    const rect = parent.current?.getBoundingClientRect()
    if (!rect) {
        return null
    }
    const style1: React.CSSProperties = {
        width: rect.width,
        height: rect.height,
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex"
    }
    const style2: React.CSSProperties = {
        borderWidth: "10px",
        borderColor: "rgba(255,255,255,0.75)",
        borderStyle: "solid",
        width: "100%",
        padding: "10px",
        margin: 10,
    }
    return <div style={style1}>
        <div style={style2} />
    </div>
}

const CoverColor: React.FC<{ parent: React.RefObject<HTMLDivElement>, file: string }> = ({ parent, file }) => {
    const rect = parent.current!.getBoundingClientRect()!

    const style: React.CSSProperties = {
        width: rect.width,
        height: rect.height,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: COLOR_BLACK
    }

    const store = useStore()
    React.useEffect(() => {
        store.set(screenAtom, store.get(screenAtom) + 1)
        return () => {
            store.set(screenAtom, store.get(screenAtom) - 1)
        }
    }, [store, file])
    return <div style={style} />
}