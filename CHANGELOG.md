# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-17

### 🚨 Breaking Changes

#### Props Reorganization

The component has been refactored to group related props into configuration objects for better organization and developer experience. All v1 flat props have been replaced with grouped objects.

**Before (v1.x):**
```tsx
<Selector
  options={options}
  selectedValue={value}
  onValueChange={handleChange}
  searchable={true}
  searchPlaceholder="Type to search..."
  noResultsText="Nothing found"
  modalPosition="bottom"
  primaryColor="#FF5722"
  style={{ borderRadius: 12 }}
  containerStyle={{ marginVertical: 10 }}
  dropdownStyle={{ maxHeight: 400 }}
  optionStyle={{ padding: 20 }}
  selectedOptionStyle={{ backgroundColor: '#f0f0f0' }}
  textStyle={{ fontSize: 18 }}
  placeholderTextStyle={{ color: '#aaa' }}
  searchInputStyle={{ borderRadius: 8 }}
/>
```

**After (v2.0):**
```tsx
<Selector
  options={options}
  selectedValue={value}
  onValueChange={handleChange}
  searchConfig={{
    searchable: true,
    placeholder: "Type to search...",
    noResultsText: "Nothing found"
  }}
  modalConfig={{
    position: "bottom"
  }}
  theme={{
    primaryColor: "#FF5722"
  }}
  styles={{
    button: { borderRadius: 12 },
    container: { marginVertical: 10 },
    dropdown: { maxHeight: 400 },
    optionItem: { padding: 20 },
    selectedOptionItem: { backgroundColor: '#f0f0f0' },
    text: { fontSize: 18 },
    placeholderText: { color: '#aaa' },
    searchInput: { borderRadius: 8 }
  }}
/>
```

#### Removed Props (v1 → v2 Migration)

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

#### Props Unchanged (Still at Root Level)

These props remain at the root level and work the same way:
- `options`
- `selectedValue`
- `onValueChange`
- `placeholder`
- `disabled`
- `multiple`
- `renderOption`
- `renderSelectedOption`

### ✨ Added

#### Create Element Feature

New `createConfig` prop allows users to create new options when search returns no results.

```tsx
<Selector
  options={fruits}
  selectedValue={selectedFruit}
  onValueChange={setSelectedFruit}
  searchConfig={{ searchable: true }}
  createConfig={{
    enabled: true,
    text: "➕ Add new fruit",
    onPress: (searchTerm) => {
      const newFruit = {
        label: searchTerm,
        value: searchTerm.toLowerCase()
      };
      setFruits([...fruits, newFruit]);
      setSelectedFruit(newFruit.value);
    }
  }}
/>
```

**CreateConfig Interface:**
- `enabled: boolean` - Enable/disable the feature
- `text: string` - Button text (e.g., "Add new item", "Create custom option")
- `onPress: (searchTerm: string) => void` - Callback with current search term
- `style?: ViewStyle` - Optional custom button style
- `textStyle?: TextStyle` - Optional custom button text style

**Behavior:**
- Only appears when `searchConfig.searchable` is true
- Only shows when there's a search term and no matching results
- Automatically closes modal after `onPress` is called
- Parent component is responsible for adding the new option to the list

#### TypeScript Utilities

New type utilities for better developer experience:

- `DeepPartial<T>` - Makes all nested properties optional
- Complete JSDoc documentation on all interfaces
- Better IntelliSense support for nested config objects

**Example:**
```tsx
const customStyles: DeepPartial<StylesConfig> = {
  button: { borderRadius: 16 },
  text: { fontSize: 18 }
  // All other properties are optional
};
```

### 🔄 Changed

- **Expo SDK**: Updated to `~54.0.0` (from `~53.0.17`)
- **Default Values**: All config objects now have intelligent defaults that are merged with user-provided values
- **API Structure**: More organized, scalable prop structure for future enhancements

### 📚 Migration Guide

#### Step-by-Step Migration from v1 to v2

**1. Update Dependencies**
```bash
npm install rn-selector@2.0.0
# or
yarn add rn-selector@2.0.0
```

**2. Group Style Props**

Find all style-related props and move them into `styles` object:

```tsx
// Before
<Selector
  style={{ borderRadius: 12 }}
  containerStyle={{ margin: 10 }}
  textStyle={{ fontSize: 16 }}
/>

// After
<Selector
  styles={{
    button: { borderRadius: 12 },
    container: { margin: 10 },
    text: { fontSize: 16 }
  }}
/>
```

**3. Group Search Props**

Move search-related props into `searchConfig`:

```tsx
// Before
<Selector
  searchable={true}
  searchPlaceholder="Search items..."
  noResultsText="No items found"
/>

// After
<Selector
  searchConfig={{
    searchable: true,
    placeholder: "Search items...",
    noResultsText: "No items found"
  }}
/>
```

**4. Group Modal Props**

Move modal-related props into `modalConfig`:

```tsx
// Before
<Selector
  modalPosition="bottom"
  modalBackgroundColor="rgba(0,0,0,0.7)"
  maxHeight={500}
  doneButtonText="Apply"
/>

// After
<Selector
  modalConfig={{
    position: "bottom",
    overlayColor: "rgba(0,0,0,0.7)",
    maxDropdownHeight: 500,
    confirmText: "Apply"
  }}
/>
```

**5. Group Theme Props**

Move visual customization props into `theme`:

```tsx
// Before
<Selector
  primaryColor="#FF5722"
  iconCheck={<CustomCheckIcon />}
  customArrow={<ChevronDown />}
/>

// After
<Selector
  theme={{
    primaryColor: "#FF5722",
    checkIcon: <CustomCheckIcon />,
    arrowIcon: <ChevronDown />
  }}
/>
```

**6. Complete Example**

```tsx
// v1.x Complete Example
<Selector
  options={options}
  selectedValue={selected}
  onValueChange={setSelected}
  placeholder="Choose an option"
  searchable={true}
  searchPlaceholder="Filter..."
  modalPosition="bottom"
  primaryColor="#1976d2"
  style={{ borderRadius: 8 }}
  containerStyle={{ marginBottom: 20 }}
  textStyle={{ fontSize: 16 }}
/>

// v2.0 Complete Example
<Selector
  options={options}
  selectedValue={selected}
  onValueChange={setSelected}
  placeholder="Choose an option"
  searchConfig={{
    searchable: true,
    placeholder: "Filter..."
  }}
  modalConfig={{
    position: "bottom"
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

### 💡 Benefits of v2

1. **Cleaner Code**: Related props are grouped logically
2. **Better IntelliSense**: TypeScript autocomplete shows only relevant options
3. **Easier Customization**: Clear separation of concerns (styles, search, modal, theme)
4. **Future-Proof**: Easier to add new features within existing groups
5. **Partial Config**: Only specify what you need; defaults handle the rest

```tsx
// Only enable search with defaults for everything else
<Selector
  options={options}
  selectedValue={value}
  onValueChange={setValue}
  searchConfig={{ searchable: true }}
/>
```

---

## [0.1.3] - Previous Version

Earlier releases (v0.1.x) documentation can be found in git history.
