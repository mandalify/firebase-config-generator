import {FirebaseConfig} from './firebaseConfig'

export * from './firebaseConfig'
export * from './generator'

export type SingleConfig = FirebaseConfig
export type MultiConfig = {default: FirebaseConfig} & {[key: string]: FirebaseConfig}


