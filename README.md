# React Native Selector

A customizable and feature-rich selector component for React Native with Expo support.

[![npm version](https://img.shields.io/npm/v/rn-selector)](https://www.npmjs.com/package/rn-selector)


## 📲 Examples

![demo-ios](https://github.com/user-attachments/assets/74e520a8-1a26-4d6b-a971-682b6be54a29)

![demo-android](https://github.com/user-attachments/assets/05d5527f-4767-46fa-b870-111418d8026d)



## Features

- 🔍 **Searchable**: Optional search functionality to filter options
- 🎨 **Highly Customizable**: Custom styles for all parts of the component
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- ♿ **Accessible**: Built with accessibility in mind
- 🚀 **TypeScript Support**: Full TypeScript support with type definitions
- 🎯 **Expo Compatible**: Works seamlessly with Expo projects
- 🔧 **Flexible**: Custom render functions for options and selected values

## Installation

```sh
npm install rn-selector
```

## Usage

```js
import React, { useState } from 'react';
import { Selector } from 'rn-selector';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

export default function App() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Selector
      options={options}
      selectedValue={selectedValue}
      onValueChange={(value) => setSelectedValue(value)}
      placeholder="Select a fruit"
    />
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
