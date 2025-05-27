export type Config = {
    appBase: string,
    apiBase: string,
    imageBase: string,
}

const config: Config = (() => {
    const appBase = 'http://127.0.0.1:8000'
    const apiBase = appBase + '/api'
    const imageBase = appBase + '/images'
    return { appBase, apiBase, imageBase }
})()

export default config
