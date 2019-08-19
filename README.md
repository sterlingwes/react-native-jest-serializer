## react-native-jest-serializer

A jest snapshot serializer tailored for react-native.

### Features

**Hex color highlighting**

<img width="269" alt="Screen Shot 2019-08-18 at 10 22 03 PM" src="https://user-images.githubusercontent.com/1047502/63235235-a8da9380-c206-11e9-888f-8a5f99dab5a6.png">

**Style array merging**

<img width="413" alt="Screen Shot 2019-08-18 at 10 09 48 PM" src="https://user-images.githubusercontent.com/1047502/63235115-3ff31b80-c206-11e9-8c87-09665063bb91.png">

**Non-presentational prop omitting**

<img width="385" alt="Screen Shot 2019-08-18 at 10 10 03 PM" src="https://user-images.githubusercontent.com/1047502/63235118-44b7cf80-c206-11e9-9814-fc756ffbd957.png">

### Setup

`yarn add -D react-native-jest-serializer`

Then *either*:

Declare in your package.json / jest config:

```
"jest": {
  "snapshotSerializers": ["react-native-jest-serializer"]
}
```

OR

Add in your test setup file:

`expect.addSnapshotSerializer(require('react-native-jest-serializer'));`
