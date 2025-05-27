import { format } from "date-fns";

export const getTimestamp = (): string => {
    const now = new Date()
    return format(now, 'yyyyMMddHHmmss')
}
