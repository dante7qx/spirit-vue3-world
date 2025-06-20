# SpiritApp (front-quasar-ts)

Spirit Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### 使用 Capacitor 打包移动 App
```bash
quasar mode add capacitor
# 构建生产代码
quasar build -m capacitor -T ios
quasar build -m capacitor -T android
# 打开原生项目
quasar capacitor open android
quasar capacitor open ios
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
