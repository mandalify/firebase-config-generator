# firebase-config-generator

Generate 'firebase.json' configuration files using TypeScript

## Installation

### NPM
```bash
npm install --save-dev @mandalify/firebase-config-generator
```

### Yarn
```bash
yarn add --dev @mandalify/firebase-config-generator
```

## Basic Usage

### 1. Create config file at **`./firebase.config.ts`**

```typescript
import {generateFirebaseConfig} from '@mandalify/firebase-config-generator'

generateFirebaseConfig({
    firestore: {
        rules: 'firestore.rules',
        indexes: 'firestore.indexes.json',
    },
    functions: {
        source: 'functions',
    },
    storage: {
        rules: 'storage.rules',
    }
})
```

### 2. Add `generate:config` script to `package.json`

```
    ...
    "scripts": {
      "generate:config": "ts-node firebase.config.ts"
    }
    ...
}
```

### 3. Run

#### NPM
```bash
npm run generate:config

> generate:config
> ts-node firebase.config.ts

writing firebase.json
```

#### Yarn
```bash
yarn generate:config

> generate:config
> ts-node firebase.config.ts

writing firebase.json
```

## Advanced

```typescript
// firebase.config.ts
import {
    EmulatorsConfig,
    FirebaseConfig, 
    FirestoreConfig,
    FunctionsConfig,
    StorageConfig,
    generateFirebaseConfig,
} from '@mandalify/firebase-config-generator'

const AUTH_EMULATOR_PORT = 9099
const FIRESTORE_EMULATOR_PORT = 8080
const FUNCTIONS_EMULATOR_PORT = 5001

function emulatorsConfig(host: string, uiEnabled: boolean): EmulatorsConfig {
    return {
        auth: {host, port: AUTH_EMULATOR_PORT},
        functions: {host, port: FUNCTIONS_EMULATOR_PORT},
        firestore: {host, port: FIRESTORE_EMULATOR_PORT},
        ui: {enabled: uiEnabled}
    }
}

const firestore: FirestoreConfig = {
    rules: 'firestore.rules',
    indexes: 'firestore.indexes.json',
}

const functions: FunctionsConfig = {
    source: 'functions',
}

const storage: StorageConfig = {
    rules: 'storage.rules',
}

const baseConfig: FirebaseConfig = {
    firestore,
    functions,
    storage,
}

generateFirebaseConfig({
    // 'default' writes to firebase.json
    default: {
        ...baseConfig,
        functions: {
            ...functions,
            predeploy: [
                "npm --prefix functions install",
                "npm --prefix functions run lint",
                "npm --prefix functions run build"
            ]
        },
        emulators: emulatorsConfig('0.0.0.0', true),
    },
    
    // arbitrary keys write to firebase.{key}.json
    githhub: {
        ...baseConfig,
        emulators: emulatorsConfig('localhost', false),
    }
})
```

**Output**
```bash
npm run generate:config

> generate:config
> ts-node firebase.config.ts

writing firebase.json
writing firebase.github.json
```
