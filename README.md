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
- 🎯 **Multiple Selection**: Support for single and multiple selection modes
- 📍 **Modal Positioning**: Choose between center or bottom modal positioning
- 🎨 **Custom Arrow Icon**: Support for custom arrows

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
  { label: 'Orange', value: 'orange', disabled: true }, // Disabled option
];

export default function App() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Selector
      options={options}
      selectedValue={selectedValue}
      onValueChange={(value, option) => {
        console.log('Selected:', value, option);
        setSelectedValue(value);
      }}
      placeholder="Select a fruit"
      searchable={true}
      primaryColor="#1976d2"
    />
  );
}
```

## Props

### Core Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `SelectorOption[]` | ✅ | - | Array of options to display. Each option should have `{label: string, value: any, disabled?: boolean}` |
| `selectedValue` | `any` | ❌ | - | Currently selected value(s). For multiple selection, pass an array |
| `onValueChange` | `(value: any, option: SelectorOption \| SelectorOption[]) => void` | ✅ | - | Callback function called when selection changes |
| `placeholder` | `string` | ❌ | `"Select an option"` | Placeholder text when no option is selected |
| `disabled` | `boolean` | ❌ | `false` | Disable the entire selector |
| `multiple` | `boolean` | ❌ | `false` | Allow multiple selection |

### Search Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `searchable` | `boolean` | ❌ | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | ❌ | `"Search..."` | Placeholder text for search input |
| `placeholderSearchTextColor` | `string` | ❌ | `"#a2a2a2"` | Color for search input placeholder text |
| `noResultsText` | `string` | ❌ | `"No matches found"` | Text to show when search returns no results |

### Modal & UI Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `modalPosition` | `'center' \| 'bottom'` | ❌ | `'center'` | Position of the modal dropdown |
| `modalBackgroundColor` | `string` | ❌ | `'rgba(0, 0, 0, 0.5)'` | Background color of modal overlay |
| `maxHeight` | `number` | ❌ | `screenHeight * 0.5` | Maximum height of the dropdown list |
| `primaryColor` | `string` | ❌ | `'#1976d2'` | Primary color used for selected items and buttons |
| `doneButtonText` | `string` | ❌ | `'Done'` | Text for done button (shown in multiple selection mode) |

### Custom Icons Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `iconCheck` | `ReactNode` | ❌ | `✓` | Custom checkmark icon for selected items in multiple mode |
| `customArrow` | `ReactNode` | ❌ | `▼` | Custom dropdown arrow icon |

### Custom Render Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `renderOption` | `(option: SelectorOption, isSelected: boolean, onClose?: () => void) => ReactNode` | ❌ | - | Custom render function for options. The `onClose` parameter allows you to close the modal programmatically |
| `renderSelectedOption` | `(option: SelectorOption \| null, selectedOptions?: SelectorOption[]) => ReactNode` | ❌ | - | Custom render function for the selected value display |

### Styling Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `style` | `ViewStyle` | ❌ | - | Custom style for the selector button |
| `containerStyle` | `ViewStyle` | ❌ | - | Custom style for the main container |
| `dropdownStyle` | `ViewStyle` | ❌ | - | Custom style for the dropdown container |
| `optionStyle` | `ViewStyle` | ❌ | - | Custom style for each option item |
| `selectedOptionStyle` | `ViewStyle` | ❌ | - | Custom style for selected option items |
| `textStyle` | `TextStyle` | ❌ | - | Custom style for option text and selected text |
| `placeholderTextStyle` | `TextStyle` | ❌ | - | Custom style for placeholder text |
| `searchInputStyle` | `TextStyle` | ❌ | - | Custom style for search input field |

## Examples

### Basic Usage
```jsx
<Selector
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
  placeholder="Choose an option"
/>
```

### Multiple Selection
```jsx
<Selector
  options={options}
  selectedValue={selectedValues} // Array of values
  onValueChange={(values, selectedOptions) => {
    setSelectedValues(values);
    console.log('Selected options:', selectedOptions);
  }}
  multiple={true}
  placeholder="Select multiple options"
/>
```

### Searchable with Custom Styling
```jsx
<Selector
  options={options}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
  searchable={true}
  searchPlaceholder="Type to search..."
  primaryColor="#ff6b6b"
  style={{
    borderColor: '#ff6b6b',
    borderRadius: 12,
  }}
  dropdownStyle={{
    borderRadius: 12,
  }}
/>
```

### Custom Option Rendering
```jsx
<Selector
  options={options}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
  renderOption={(option, isSelected, onClose) => (
    <TouchableOpacity
      style={{
        padding: 15,
        backgroundColor: isSelected ? '#e3f2fd' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        // Handle selection
        handleSelection(option);
        // Close modal if needed
        onClose?.();
      }}
    >
      <Image source={{ uri: option.icon }} style={{ width: 24, height: 24, marginRight: 10 }} />
      <Text style={{ color: isSelected ? '#1976d2' : '#333' }}>
        {option.label}
      </Text>
    </TouchableOpacity>
  )}
/>
```

### Bottom Modal with Custom Selected Display
```jsx
<Selector
  options={options}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
  modalPosition="bottom"
  multiple={true}
  renderSelectedOption={(option, selectedOptions) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>
        {selectedOptions?.length > 0 
          ? `${selectedOptions.length} selected` 
          : 'Select items'}
      </Text>
      <Badge count={selectedOptions?.length || 0} />
    </View>
  )}
/>
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
