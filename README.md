# React Native Selector

A customizable and feature-rich selector component for React Native with Expo support.

[![npm version](https://img.shields.io/npm/v/rn-selector)](https://www.npmjs.com/package/rn-selector)

---

## 📖 Documentation
| **V2.0 Docs** | [Old V1 Docs](README_v1.md) |

---

## 📚 Table of Contents

- [🚨 Version 2.0 - Breaking Changes](#-version-20---breaking-changes)
- [📦 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
- [📲 Examples](#-examples)
- [✨ Features](#-features)
- [🧩 API Reference](#-api-reference)
  - [Core Props](#core-props)
  - [`styles` configuration](#styles-deeppartialstylesconfig)
  - [`searchConfig`](#searchconfig-partialsearchconfig)
  - [`modalConfig`](#modalconfig-partialmodalconfig)
  - [`theme`](#theme-partialthemeconfig)
  - [`createConfig` (new)](#createconfig-createconfig-)
  - [Custom render props](#custom-render-props)
- [📦 Usage Examples](#-usage-examples)
- [📋 Migration from v1.x to v2.0](#-migration-from-v1x-to-v20)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚨 Version 2.0 - Breaking Changes

**If you're upgrading from v1.x, please read the [Migration Guide](#-migration-from-v1x-to-v20) below.**

Version 2.0 introduces a cleaner, more organized API with grouped configuration objects. See [CHANGELOG.md](CHANGELOG.md) for complete details.

> **📚 Looking for v1 docs?** If you're still using v1.x and need the old documentation, check out [README_v1.md](README_v1.md)

---

> ⚠️ **Version 2.0 is a breaking release.**  
> This README documents **v2.x**. If you're still using **v1.x**, see the legacy docs:
>
> - **v2.x (current)** – You are here  
> - **[v1.x Documentation](README_v1.md)** – For users still on version 1.x

---

## Installation

```sh
npm install rn-selector@2.0.0
# or
yarn add rn-selector@2.0.0
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { Selector } from 'rn-selector';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange', disabled: true },
];

export default function App() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Selector
      options={options}
      selectedValue={selectedValue}
      onValueChange={(value) => setSelectedValue(value)}
      placeholder="Select a fruit"
      searchConfig={{ searchable: true }}
      theme={{ primaryColor: '#1976d2' }}
    />
  );
}
```

## Demo


[LINK DEMO](https://snack.expo.dev/@itsandrehere/react-native-selector-demo)


## 📲 Examples


![demo-ios](https://github.com/user-attachments/assets/74e520a8-1a26-4d6b-a971-682b6be54a29)

![demo-android](https://github.com/user-attachments/assets/05d5527f-4767-46fa-b870-111418d8026d)

## Features

- 🔍 **Searchable**: Optional search functionality to filter options
- ➕ **Create Elements**: **(v2.0)** - Create new options when search returns no results
- 🎨 **Highly Customizable**: Grouped configuration objects for cleaner code
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- ♿ **Accessible**: Built with accessibility in mind
- 🚀 **TypeScript Support**: Full TypeScript support with enhanced IntelliSense
- 🎯 **Expo Compatible**: Works seamlessly with Expo SDK 54+
- 🔧 **Flexible**: Custom render functions for options and selected values
- 🎯 **Multiple Selection**: Support for single and multiple selection modes
- 📍 **Modal Positioning**: Choose between center or bottom modal positioning


## API Reference

### Core Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `SelectorOption[]` | ✅ | - | Array of options. Each: `{label: string, value: any, disabled?: boolean}` |
| `selectedValue` | `any` | ❌ | - | Selected value(s). For multiple selection, pass an array |
| `onValueChange` | `(value: any, option: SelectorOption \| SelectorOption[]) => void` | ✅ | - | Callback when selection changes |
| `placeholder` | `string` | ❌ | `"Select an option"` | Placeholder text when nothing is selected |
| `disabled` | `boolean` | ❌ | `false` | Disable the entire selector |
| `multiple` | `boolean` | ❌ | `false` | Enable multiple selection mode |

### Configuration Objects

#### `styles?: DeepPartial<StylesConfig>`

Group all styling customizations in one object.

| Property | Type | Description |
|----------|------|-------------|
| `container` | `ViewStyle` | Main wrapper container style |
| `button` | `ViewStyle` | Selector button style (replaces v1 `style`) |
| `dropdown` | `ViewStyle` | Dropdown modal container style |
| `optionItem` | `ViewStyle` | Individual option item style |
| `selectedOptionItem` | `ViewStyle` | Selected option item style |
| `text` | `TextStyle` | Option and selected text style |
| `placeholderText` | `TextStyle` | Placeholder text style |
| `searchInput` | `TextStyle` | Search input field style |

**Example:**
```tsx
<Selector
  styles={{
    container: { marginVertical: 10 },
    button: { borderRadius: 12, borderColor: '#1976d2' },
    dropdown: { maxHeight: 400 },
    text: { fontSize: 16, fontWeight: '500' }
  }}
/>
```

#### `searchConfig?: Partial<SearchConfig>`

Configure search functionality.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `searchable` | `boolean` | `false` | Enable search functionality |
| `placeholder` | `string` | `"Search..."` | Search input placeholder |
| `placeholderTextColor` | `string` | `"#a2a2a2"` | Search placeholder color |
| `noResultsText` | `string` | `"No matches found"` | Text when no results |

**Example:**
```tsx
<Selector
  searchConfig={{
    searchable: true,
    placeholder: "Type to filter...",
    noResultsText: "No items found"
  }}
/>
```

#### `modalConfig?: Partial<ModalConfig>`

Configure modal behavior and appearance.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `'center' \| 'bottom'` | `'center'` | Modal position |
| `overlayColor` | `string` | `'rgba(0,0,0,0.5)'` | Overlay background |
| `maxDropdownHeight` | `number` | `screenHeight * 0.5` | Max dropdown height |
| `confirmText` | `string` | `'Done'` | Done button text (multiple mode) |

**Example:**
```tsx
<Selector
  modalConfig={{
    position: "bottom",
    overlayColor: "rgba(0, 0, 0, 0.7)",
    maxDropdownHeight: 500,
    confirmText: "Apply Selection"
  }}
/>
```

#### `theme?: Partial<ThemeConfig>`

Visual theme customization.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `primaryColor` | `string` | `'#1976d2'` | Primary color for selections |
| `checkIcon` | `ReactNode` | `✓` | Custom checkmark icon |
| `arrowIcon` | `ReactNode` | `▼` | Custom dropdown arrow |

**Example:**
```tsx
<Selector
  theme={{
    primaryColor: "#FF5722",
    checkIcon: <Icon name="check" size={16} />,
    arrowIcon: <Icon name="chevron-down" size={12} />
  }}
/>
```

#### `createConfig?: CreateConfig` 🆕

Enable creating new options when search returns no results.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `enabled` | `boolean` | ✅ | Enable the feature |
| `text` | `string` | ✅ | Button text |
| `onPress` | `(searchTerm: string) => void` | ✅ | Callback with search term |
| `style` | `ViewStyle` | ❌ | Custom button style |
| `textStyle` | `TextStyle` | ❌ | Custom button text style |

**Example:**
```tsx
const [fruits, setFruits] = useState([
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' }
]);

<Selector
  options={fruits}
  selectedValue={selected}
  onValueChange={setSelected}
  searchConfig={{ searchable: true }}
  createConfig={{
    enabled: true,
    text: "➕ Add new fruit",
    onPress: (searchTerm) => {
      const newFruit = {
        label: searchTerm,
        value: searchTerm.toLowerCase().replace(/\s+/g, '-')
      };
      setFruits([...fruits, newFruit]);
      setSelected(newFruit.value);
    }
  }}
/>
```

**Behavior:**
- Only appears when `searchConfig.searchable` is `true`
- Only shows when there's a search term and no matching results
- Modal closes automatically after `onPress` is called

### Custom Render Props

| Prop | Type | Description |
|------|------|-------------|
| `renderOption` | `(option, isSelected, onClose?) => ReactNode` | Custom option renderer |
| `renderSelectedOption` | `(option, selectedOptions?) => ReactNode` | Custom selected value display |

## Usage Examples

### Basic Usage
```tsx
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

### With Search
```tsx
<Selector
  options={countries}
  selectedValue={selectedCountry}
  onValueChange={setSelectedCountry}
  searchConfig={{
    searchable: true,
    placeholder: "Search countries...",
    noResultsText: "No countries found"
  }}
/>
```

### Multiple Selection with Bottom Modal
```tsx
<Selector
  options={options}
  selectedValue={selectedValues} // Array
  onValueChange={setSelectedValues}
  multiple={true}
  modalConfig={{
    position: "bottom",
    confirmText: "Apply"
  }}
  theme={{
    primaryColor: "#FF5722"
  }}
/>
```

### Custom Styling
```tsx
<Selector
  options={options}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
  styles={{
    container: { marginBottom: 20 },
    button: {
      borderRadius: 12,
      borderColor: '#1976d2',
      borderWidth: 2,
      paddingVertical: 16
    },
    dropdown: {
      borderRadius: 12,
      maxHeight: 400
    },
    text: {
      fontSize: 16,
      fontWeight: '500'
    },
    placeholderText: {
      color: '#aaa',
      fontStyle: 'italic'
    }
  }}
  theme={{
    primaryColor: '#1976d2'
  }}
/>
```

### Create New Elements 🆕
```tsx
const [fruits, setFruits] = useState([
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' }
]);
const [selected, setSelected] = useState('');

<Selector
  options={fruits}
  selectedValue={selected}
  onValueChange={setSelected}
  placeholder="Select or create a fruit"
  searchConfig={{
    searchable: true,
    placeholder: "Search or type new fruit..."
  }}
  createConfig={{
    enabled: true,
    text: "➕ Add new fruit",
    onPress: (searchTerm) => {
      const newFruit = {
        label: searchTerm,
        value: searchTerm.toLowerCase().replace(/\s+/g, '-')
      };
      setFruits([...fruits, newFruit]);
      setSelected(newFruit.value);
      console.log('Created:', newFruit);
    },
    style: { backgroundColor: '#4CAF50' }
  }}
/>
```

### Custom Option Rendering
```tsx
<Selector
  options={users}
  selectedValue={selectedUser}
  onValueChange={setSelectedUser}
  renderOption={(option, isSelected, onClose) => (
    <TouchableOpacity
      style={{
        padding: 15,
        backgroundColor: isSelected ? '#e3f2fd' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        setSelectedUser(option.value);
        onClose?.();
      }}
    >
      <Image 
        source={{ uri: option.avatar }} 
        style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }} 
      />
      <View>
        <Text style={{ fontWeight: '600' }}>{option.label}</Text>
        <Text style={{ fontSize: 12, color: '#666' }}>{option.email}</Text>
      </View>
      {isSelected && <Icon name="check" size={20} color="#1976d2" />}
    </TouchableOpacity>
  )}
/>
```

### Custom Selected Value Display
```tsx
<Selector
  options={options}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
  multiple={true}
  renderSelectedOption={(option, selectedOptions) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {selectedOptions?.length > 0 ? (
        <>
          <Text style={{ flex: 1 }}>
            {selectedOptions.map(opt => opt.label).join(', ')}
          </Text>
          <Badge count={selectedOptions.length} />
        </>
      ) : (
        <Text style={{ color: '#999' }}>Select items</Text>
      )}
    </View>
  )}
/>
```

## 📋 Migration from v1.x to v2.0

### Step-by-Step Guide

**1. Update the package:**
```bash
npm install rn-selector@2.0.0
# or
yarn add rn-selector@2.0.0
```

**2. Refactor style props into `styles` object:**

```tsx
// ❌ Before (v1.x)
<Selector
  style={{ borderRadius: 12 }}
  containerStyle={{ margin: 10 }}
  dropdownStyle={{ maxHeight: 400 }}
  optionStyle={{ padding: 20 }}
  selectedOptionStyle={{ backgroundColor: '#f0f0f0' }}
  textStyle={{ fontSize: 16 }}
  placeholderTextStyle={{ color: '#aaa' }}
  searchInputStyle={{ borderRadius: 8 }}
/>

// ✅ After (v2.0)
<Selector
  styles={{
    button: { borderRadius: 12 },
    container: { margin: 10 },
    dropdown: { maxHeight: 400 },
    optionItem: { padding: 20 },
    selectedOptionItem: { backgroundColor: '#f0f0f0' },
    text: { fontSize: 16 },
    placeholderText: { color: '#aaa' },
    searchInput: { borderRadius: 8 }
  }}
/>
```

**3. Group search props into `searchConfig`:**

```tsx
// ❌ Before (v1.x)
<Selector
  searchable={true}
  searchPlaceholder="Search..."
  placeholderSearchTextColor="#a2a2a2"
  noResultsText="Nothing found"
/>

// ✅ After (v2.0)
<Selector
  searchConfig={{
    searchable: true,
    placeholder: "Search...",
    placeholderTextColor: "#a2a2a2",
    noResultsText: "Nothing found"
  }}
/>
```

**4. Group modal props into `modalConfig`:**

```tsx
// ❌ Before (v1.x)
<Selector
  modalPosition="bottom"
  modalBackgroundColor="rgba(0, 0, 0, 0.7)"
  maxHeight={500}
  doneButtonText="Apply"
/>

// ✅ After (v2.0)
<Selector
  modalConfig={{
    position: "bottom",
    overlayColor: "rgba(0, 0, 0, 0.7)",
    maxDropdownHeight: 500,
    confirmText: "Apply"
  }}
/>
```

**5. Group theme props into `theme`:**

```tsx
// ❌ Before (v1.x)
<Selector
  primaryColor="#FF5722"
  iconCheck={<CheckIcon />}
  customArrow={<ArrowIcon />}
/>

// ✅ After (v2.0)
<Selector
  theme={{
    primaryColor: "#FF5722",
    checkIcon: <CheckIcon />,
    arrowIcon: <ArrowIcon />
  }}
/>
```

**6. Complete migration example:**

```tsx
// ❌ Before (v1.x)
<Selector
  options={options}
  selectedValue={selected}
  onValueChange={setSelected}
  placeholder="Choose"
  searchable={true}
  searchPlaceholder="Filter..."
  modalPosition="bottom"
  primaryColor="#1976d2"
  style={{ borderRadius: 8 }}
  containerStyle={{ marginBottom: 20 }}
  textStyle={{ fontSize: 16 }}
  doneButtonText="Done"
/>

// ✅ After (v2.0)
<Selector
  options={options}
  selectedValue={selected}
  onValueChange={setSelected}
  placeholder="Choose"
  searchConfig={{
    searchable: true,
    placeholder: "Filter..."
  }}
  modalConfig={{
    position: "bottom",
    confirmText: "Done"
  }}
  theme={{
    primaryColor: "#1976d2"
  }}
  styles={{
    button: { borderRadius: 8 },
    container: { marginBottom: 20 },
    text: { fontSize: 16 }
  }}
/>
```

### Quick Reference: v1 → v2 Prop Mapping

| v1 Prop | v2 Equivalent |
|---------|---------------|
| `searchable` | `searchConfig.searchable` |
| `searchPlaceholder` | `searchConfig.placeholder` |
| `placeholderSearchTextColor` | `searchConfig.placeholderTextColor` |
| `noResultsText` | `searchConfig.noResultsText` |
| `modalPosition` | `modalConfig.position` |
| `modalBackgroundColor` | `modalConfig.overlayColor` |
| `maxHeight` | `modalConfig.maxDropdownHeight` |
| `doneButtonText` | `modalConfig.confirmText` |
| `primaryColor` | `theme.primaryColor` |
| `iconCheck` | `theme.checkIcon` |
| `customArrow` | `theme.arrowIcon` |
| `style` | `styles.button` |
| `containerStyle` | `styles.container` |
| `dropdownStyle` | `styles.dropdown` |
| `optionStyle` | `styles.optionItem` |
| `selectedOptionStyle` | `styles.selectedOptionItem` |
| `textStyle` | `styles.text` |
| `placeholderTextStyle` | `styles.placeholderText` |
| `searchInputStyle` | `styles.searchInput` |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

## 💡 Why `rn-selector`?

- **Built for real apps** – Handles single and multiple selection, search, custom rendering and theming without getting in your way.
- **Clean, grouped API** – Configuration lives in `styles`, `theme`, `modalConfig`, `searchConfig`, and `createConfig`, not in a long list of flat props.
- **Expo & RN friendly** – Works out of the box with React Native CLI and Expo projects (including SDK 54+).
- **TypeScript-first** – Strong types and IntelliSense make it obvious what each prop does.
- **Highly customizable** – Override layout, colors, icons, and option rendering to match any design system.
- **Create-as-you-type** – Let users add new options when search returns no results, with full control over the creation logic.
- **Small but powerful** – Focused on one job (selection) and does it well, without pulling in heavy native dependencies.
