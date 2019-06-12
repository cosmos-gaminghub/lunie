![Lunie logo — spaceship blasting off](/src/assets/images/png/128x128.png)

# Welcome to [Lunie.io](https://lunie.io)!

[![CircleCI](https://circleci.com/gh/luniehq/lunie/tree/develop.svg?style=svg)](https://circleci.com/gh/luniehq/lunie/tree/develop)

👋 Welcome to Lunie, the official wallet and UI for the [Cosmos Hub](https://cosmos.network/).

⚠️ This is beta software. **DO NOT** enter your Cosmos fundraiser seed into Lunie. We will not ask for it and this is considered highly unsafe.

## Development Dependencies

Install the following dependencies if you wish to run lunie on developer mode or [contribute](https://github.com/luniehq/lunie/blob/develop/CONTRIBUTING.md).

### Node

Lunie requires Node.js `>=10.13.0`. If you have a different version of Node.js installed, you can use `n` to install the correct version. The following command will use `n` to install it alongside your current version of Node.js.

```bash
npm i -g n && n 10.13.0
```

### Yarn

Yarn is a JS package manager we use to manage Lunie's dependencies. Download it [here](https://yarnpkg.com/lang/en/docs/install).

### Docker

To run a local tesnet for Lunie you will need [Docker](https://www.docker.com/) installed. You can download it [here](https://www.docker.com/get-docker).

### Ledger Cosmos App

> **IMPORTANT:** Only use Ledger devices that you **bought factory new** or **trust fully**.

Lunie supports sending transactions through the `Cøsmos` app for [Ledger Nano S](https://www.ledger.com/products/ledger-nano-s) hardware wallet. To install the `Cøsmos` app on your device you'll have to:

1. Download the Ledger Live app [here](https://www.ledger.com/pages/ledger-live)
2. Connect your Ledger via USB and update to the latest firmware
3. Go to the Ledger Live App Store, and download the `Cøsmos` application (this can take a while). **Note:** You may have to enable `Dev Mode` in the Ledger Live Settings to be able to download the `Cøsmos` application
4. Navigate to the `Cøsmos` app on your Ledger device

### Check out Lunie

With Node, Yarn and Docker installed, you're ready to check out the source code:

```bash
git clone https://github.com/luniehq/lunie.git
cd lunie
yarn install
```

---

## Lunie Development

### Generate SSL certificates

First generate some SSL certificates and add them to your trusted certificates.

```bash
yarn certificates
```

### Run local testnet

You can simply start a docker based testnet and the frontend.

```bash
yarn start
```

This will create a rich account. You need to import that account into Lunie:
- Sign In
- Import Account
- Use mnemonic: `release endorse scale across absurd trouble climb unaware actor elite fantasy chair license word rare length business kiss smoke tackle report february bid ginger`

You should now have a bunch of stake to play with.

### Deploy

Create the bundle to deploy Lunie you can run:

```bash
yarn build
```

If you want to set a particular `Stargate` (Cosmos SDK REST API) or Tendermint's `RPC` endpoints:

```bash
STARGATE=<https://StargateAddress:port> RPC=<https://RPCAddress:port> yarn build:ui
```

### Mobile

#### Android

Dependencies: 
- Android Studio
- Gradle updated to 5.1.1 (Android Studio > File > Project Structure)

You will probably also want a virtual Android device which you can create from inside the Android Studio.

To run the Android version of Lunie in development:

```bash
$ yarn build
$ npx @capacitor/cli sync android
$ npx @capacitor/cli open android
```

#### iOS

Dependencies:
- [Xcode 10](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- [Cocoapods](https://guides.cocoapods.org/using/getting-started.html#installation)

To open Lunie in Xcode: 
1. Build Lunie
```bash
$ yarn build
```

2. This step may take up to 20 minutes to complete if you've never used Cocoapods before.
```bash
$ npx @capacitor/cli sync ios
```

3. This will open Xcode with Lunie loaded
```bash
$ npx @capacitor/cli open ios
```

Once Xcode is open, just click the Play button to run Lunie on your preferred Simulator or Device.

## Release

Lunie has a automated release process. Every night the CI creates a new release PR. To release manually, run

```bash
yarn release
```

### Mobile

First prepare the mobile packages by running:

```bash
$ yarn build
$ npx @capacitor/cli sync android|ios
```

Then use fastlane to release:

### Prerequesits

- [install fastlane}(https://docs.fastlane.tools/getting-started/android/setup/)

#### Android

- add keystore.jks and json_key.json to android/fastlane
- add android/.env with all necessary environment variables

#### Release

```bash
$ cd android
$ bundle exec fastlande android_set_version_code
$ bundle exec fastlane android internal
```

Finally checking the version increment to git

## Testing

If you would like to run all the tests you can run:

```bash
yarn test
```

### Unit tests

Lunie uses [Jest](https://facebook.github.io/jest) to run unit tests. You can run _all_ the unit tests with the following command:

```bash
yarn test:unit
```

For a single test file (e.g. `PageValidator.spec.js`) run the unit tests like this to watch the tests whenever there are changes:

```bash
yarn watch PageValidator
```

### End to end tests

End to end testing will be soon restored thanks to: [Browserstack](https://www.browserstack.com/)

If you want to run them locally first start a testnet:

```bash
MAX_NODES=4 yarn testnet:start
```

Then serve Lunie in it's production format:

```bash
yarn test:e2e:live-serve
```

Then run the actual tests:

```bash
yarn test:e2e
```

Finally stop the testnet when you are done:

```bash
yarn testnet:stop
```

### Code coverage

To check test coverage locally run following. It will spin up a webserver and provide you with a link to the coverage report web page.

```bash
yarn test:coverage
```

## Flags

A list of all environment variables and their purpose:

| Variable        | Values                      | default | Purpose                                                                                                                                                           |
|-----------------|-----------------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `NODE_ENV`      | `production`, `development` |         |                                                                                                                                                                   |
| `CI`            | `true`, `false`             | `false` | Adds better structured output, makes a screenshot and adds logs to files (used on CircleCI).                                                                      |
| `ALLOW_CONSOLE` | `true`, `false`             | `false` | Unit tests fail if they use `console.error` or `console.warn`. To see the initial use/occurences of those callings, you can escape this behavior using this flag. |

## Thanks

[![Browserstack](/test/browserstack-logo-600x315.png)](https://www.browserstack.com)
