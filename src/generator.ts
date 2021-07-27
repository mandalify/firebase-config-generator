import {writeFileSync} from 'fs'
import {MultiConfig, SingleConfig} from './index'

function configFilename(variant?: string): string {
    if (variant && variant !== 'default') {
        return `firebase.${variant}.json`
    } else {
        return 'firebase.json'
    }
}

export function generateFirebaseConfig(config: SingleConfig | MultiConfig) {
    if ('default' in config) {
        const multiConfig = config as MultiConfig
        for (const variant in multiConfig) {
            const filename = configFilename(variant)
            const variantConfig = multiConfig[variant]
            console.log(`writing ${filename}`)
            writeFileSync(filename, JSON.stringify(variantConfig, null, 2))
        }
    } else {
        const filename = configFilename()
        console.log(`writing ${filename}`)
        writeFileSync(filename, JSON.stringify(config, null, 2))
    }
}
