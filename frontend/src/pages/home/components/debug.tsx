import { useAtomValue } from "jotai"
import { pageDataAtom } from "../atoms/pageDataAtom"

export const Debug: React.FC = () => {
    const pageData = useAtomValue(pageDataAtom)
    return <pre>
        {JSON.stringify(pageData, null, 4)}
    </pre>
}