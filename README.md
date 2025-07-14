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

## Props

### Functional Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `Array<{label: string, value: any}>` | ✅ | - | Array of options to display in the selector |
| `selectedValue` | `any` | ✅ | - | Currently selected value |
| `placeholder` | `string` | ❌ | `"Select an option"` | Placeholder text when no option is selected |
| `searchable` | `boolean` | ❌ | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | ❌ | `"Search..."` | Placeholder text for search input |
| `disabled` | `boolean` | ❌ | `false` | Disable the selector |
| `multiple` | `boolean` | ❌ | `false` | Allow multiple selection |
| `maxHeight` | `number` | ❌ | `200` | Maximum height of the dropdown list |
| `showDropdownIcon` | `boolean` | ❌ | `true` | Show/hide dropdown arrow icon |
| `dropdownIcon` | `ReactNode` | ❌ | - | Custom dropdown arrow icon |
| `closeOnSelect` | `boolean` | ❌ | `true` | Close dropdown after selection (ignored when multiple=true) |
| `animationType` | `'none' \| 'slide' \| 'fade'` | ❌ | `'slide'` | Animation type for dropdown |
| `testID` | `string` | ❌ | - | Test identifier for testing purposes |

### Methods & Callbacks

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onValueChange` | `(value: any) => void` | ✅ | - | Callback function called when selection changes |
| `renderOption` | `(option: Option, isSelected: boolean) => ReactNode` | ❌ | - | Custom render function for options |
| `renderSelectedValue` | `(value: any, options: Option[]) => ReactNode` | ❌ | - | Custom render function for selected value display |

### Styling Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `style` | `ViewStyle` | ❌ | - | Custom style for the main container |
| `buttonStyle` | `ViewStyle` | ❌ | - | Custom style for the selector button |
| `buttonTextStyle` | `TextStyle` | ❌ | - | Custom style for the button text |
| `dropdownStyle` | `ViewStyle` | ❌ | - | Custom style for the dropdown container |
| `optionStyle` | `ViewStyle` | ❌ | - | Custom style for each option item |
| `optionTextStyle` | `TextStyle` | ❌ | - | Custom style for option text |
| `selectedOptionStyle` | `ViewStyle` | ❌ | - | Custom style for selected option |
| `searchInputStyle` | `TextStyle` | ❌ | - | Custom style for search input |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
