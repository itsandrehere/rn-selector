import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

// ==================== Type Utilities ====================

/**
 * Makes all properties in T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P];
};

// ==================== Core Interfaces ====================

/**
 * Represents a single selectable option
 */
export interface SelectorOption {
  label: string;
  value: any;
  disabled?: boolean;
}

// ==================== Configuration Interfaces ====================

/**
 * Styling configuration for all visual elements of the Selector
 * @example
 * ```tsx
 * <Selector
 *   styles={{
 *     container: { marginVertical: 10 },
 *     button: { borderRadius: 12 },
 *     dropdown: { maxHeight: 400 }
 *   }}
 * />
 * ```
 */
export interface StylesConfig {
  /** Main wrapper container style */
  container?: ViewStyle;
  /** Selector button container style */
  button?: ViewStyle;
  /** Modal dropdown container style */
  dropdown?: ViewStyle;
  /** Individual option item style */
  optionItem?: ViewStyle;
  /** Selected option item style */
  selectedOptionItem?: ViewStyle;
  /** Option text style */
  text?: TextStyle;
  /** Placeholder text style */
  placeholderText?: TextStyle;
  /** Search input field style */
  searchInput?: TextStyle;
}

/**
 * Search functionality configuration
 * @example
 * ```tsx
 * <Selector
 *   searchConfig={{
 *     searchable: true,
 *     placeholder: "Type to filter...",
 *     noResultsText: "No items found"
 *   }}
 * />
 * ```
 */
export interface SearchConfig {
  /** Enable search functionality */
  searchable: boolean;
  /** Search input placeholder text */
  placeholder?: string;
  /** Search input placeholder text color */
  placeholderTextColor?: string;
  /** Text displayed when search returns no results */
  noResultsText?: string;
}

/**
 * Modal behavior and appearance configuration
 * @example
 * ```tsx
 * <Selector
 *   modalConfig={{
 *     position: "bottom",
 *     overlayColor: "rgba(0, 0, 0, 0.7)",
 *     maxDropdownHeight: 500,
 *     confirmText: "Apply"
 *   }}
 * />
 * ```
 */
export interface ModalConfig {
  /** Modal position on screen */
  position?: 'center' | 'bottom';
  /** Modal overlay background color */
  overlayColor?: string;
  /** Maximum dropdown height in pixels */
  maxDropdownHeight?: number;
  /** Done button text (shown in multiple selection mode) */
  confirmText?: string;
}

/**
 * Theme and visual customization configuration
 * @example
 * ```tsx
 * <Selector
 *   theme={{
 *     primaryColor: "#FF5722",
 *     checkIcon: <Icon name="check" />,
 *     arrowIcon: <Icon name="chevron-down" />
 *   }}
 * />
 * ```
 */
export interface ThemeConfig {
  /** Primary color for selected items, checkmarks, and buttons */
  primaryColor?: string;
  /** Custom checkmark icon for multiple selection */
  checkIcon?: React.ReactNode;
  /** Custom dropdown arrow icon */
  arrowIcon?: React.ReactNode;
}

/**
 * Create new element configuration
 * Allows users to create new options when search returns no results
 * @example
 * ```tsx
 * <Selector
 *   createConfig={{
 *     enabled: true,
 *     text: "Add new item",
 *     onPress: (searchTerm) => {
 *       const newOption = { label: searchTerm, value: searchTerm };
 *       setOptions([...options, newOption]);
 *       setSelectedValue(searchTerm);
 *     }
 *   }}
 * />
 * ```
 */
export interface CreateConfig {
  /** Enable create element functionality */
  enabled: boolean;
  /** Button text (can use searchTerm in parent) */
  text: string;
  /** Callback when create button is pressed. Receives current search term */
  onPress: (searchTerm: string) => void;
  /** Custom button style */
  style?: ViewStyle;
  /** Custom button text style */
  textStyle?: TextStyle;
}

// ==================== Main Component Props ====================

/**
 * Props for the Selector component (v2.0)
 * @example
 * ```tsx
 * <Selector
 *   options={[
 *     { label: 'Apple', value: 'apple' },
 *     { label: 'Banana', value: 'banana' }
 *   ]}
 *   selectedValue="apple"
 *   onValueChange={(value) => setSelected(value)}
 *   placeholder="Select a fruit"
 *   searchConfig={{ searchable: true }}
 * />
 * ```
 */
export interface SelectorProps {
  // Core Props
  /** Array of selectable options */
  options: SelectorOption[];
  /** Currently selected value(s). For multiple selection, pass an array */
  selectedValue?: any;
  /** Callback when selection changes */
  onValueChange: (
    value: any,
    option: SelectorOption | SelectorOption[]
  ) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Disable the entire selector */
  disabled?: boolean;
  /** Enable multiple selection mode */
  multiple?: boolean;

  // Configuration Objects (v2)
  /** Styling configuration for all visual elements */
  styles?: DeepPartial<StylesConfig>;
  /** Search functionality configuration */
  searchConfig?: Partial<SearchConfig>;
  /** Modal behavior and appearance configuration */
  modalConfig?: Partial<ModalConfig>;
  /** Theme and visual customization */
  theme?: Partial<ThemeConfig>;
  /** Create new element configuration */
  createConfig?: CreateConfig;

  // Custom Render Functions
  /** Custom render function for options */
  renderOption?: (
    option: SelectorOption,
    isSelected: boolean,
    onClose?: () => void
  ) => React.ReactNode;
  /** Custom render function for selected value display */
  renderSelectedOption?: (
    option: SelectorOption | null,
    selectedOptions?: SelectorOption[]
  ) => React.ReactNode;
}

const { height: screenHeight } = Dimensions.get('window');

// ==================== Default Config Helpers ====================

const getSearchConfig = (config?: Partial<SearchConfig>): SearchConfig => ({
  searchable: config?.searchable ?? false,
  placeholder: config?.placeholder ?? 'Search...',
  placeholderTextColor: config?.placeholderTextColor ?? '#a2a2a2',
  noResultsText: config?.noResultsText ?? 'No matches found',
});

const getModalConfig = (config?: Partial<ModalConfig>): ModalConfig => ({
  position: config?.position ?? 'center',
  overlayColor: config?.overlayColor ?? 'rgba(0, 0, 0, 0.5)',
  maxDropdownHeight: config?.maxDropdownHeight ?? screenHeight * 0.5,
  confirmText: config?.confirmText ?? 'Done',
});

const getThemeConfig = (config?: Partial<ThemeConfig>): ThemeConfig => ({
  primaryColor: config?.primaryColor ?? '#1976d2',
  checkIcon: config?.checkIcon,
  arrowIcon: config?.arrowIcon,
});

// ==================== Component ====================

export const Selector: React.FC<SelectorProps> = ({
  options = [],
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  multiple = false,
  styles: customStyles,
  searchConfig: searchConfigProp,
  modalConfig: modalConfigProp,
  theme: themeProp,
  createConfig,
  renderOption,
  renderSelectedOption,
}) => {
  // Merge configs with defaults
  const searchConfig = getSearchConfig(searchConfigProp);
  const modalConfig = getModalConfig(modalConfigProp);
  const theme = getThemeConfig(themeProp);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectorRef = useRef(null);
  const containerRef = useRef<View>(null);

  useEffect(() => {
    if (searchConfig.searchable && searchText) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchText, options, searchConfig.searchable]);

  const selectedOptions = multiple
    ? options.filter((option) =>
        Array.isArray(selectedValue)
          ? selectedValue.includes(option.value)
          : false
      )
    : options.filter((option) => option.value === selectedValue);

  const selectedOption = multiple
    ? null
    : options.find((option) => option.value === selectedValue);

  const handleOptionPress = (option: SelectorOption) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      let newValues;

      if (currentValues.includes(option.value)) {
        newValues = currentValues.filter((val) => val !== option.value);
      } else {
        newValues = [...currentValues, option.value];
      }

      const selectedOpts = options.filter((opt) =>
        newValues.includes(opt.value)
      );
      onValueChange(newValues, selectedOpts);
    } else {
      onValueChange(option.value, option);
      handleClose();
    }
  };

  const handleSelectorPress = () => {
    if (disabled) return;

    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSearchText('');
  };

  const isOptionSelected = (option: SelectorOption): boolean => {
    if (multiple) {
      return Array.isArray(selectedValue)
        ? selectedValue.includes(option.value)
        : false;
    }
    return option.value === selectedValue;
  };

  const defaultRenderOption = (
    option: SelectorOption,
    isSelected: boolean
  ): React.ReactElement => (
    <TouchableOpacity
      style={[
        styles.option,
        customStyles?.optionItem,
        isSelected && {
          backgroundColor: `${theme.primaryColor}10`,
        },
        isSelected && customStyles?.selectedOptionItem,
        option.disabled && styles.disabledOption,
      ]}
      onPress={() => handleOptionPress(option)}
      disabled={option.disabled}
    >
      <Text
        style={[
          styles.optionText,
          customStyles?.text,
          isSelected && {
            ...styles.selectedOptionText,
            color: theme.primaryColor,
          },
          option.disabled && styles.disabledOptionText,
        ]}
      >
        {option.label}
      </Text>
      {multiple &&
        isSelected &&
        (theme.checkIcon || (
          <Text style={[styles.checkmark, { color: theme.primaryColor }]}>
            ✓
          </Text>
        ))}
    </TouchableOpacity>
  );

  const defaultRenderSelectedOption = (
    option: SelectorOption | null,
    selectedOpts?: SelectorOption[]
  ): React.ReactElement => {
    if (multiple && selectedOpts && selectedOpts.length > 0) {
      const displayText =
        selectedOpts.length === 1
          ? selectedOpts[0]?.label
          : `${selectedOpts.length} items selected`;

      return (
        <Text style={[styles.selectorText, customStyles?.text]}>
          {displayText}
        </Text>
      );
    }

    return (
      <Text
        style={[
          styles.selectorText,
          option
            ? customStyles?.text
            : [styles.placeholderText, customStyles?.placeholderText],
        ]}
      >
        {option ? option.label : placeholder}
      </Text>
    );
  };

  const renderDropdownContent = () => (
    <View
      style={[
        modalConfig.position === 'bottom'
          ? styles.bottomDropdown
          : styles.dropdown,
        customStyles?.dropdown,
        { maxHeight: modalConfig.maxDropdownHeight },
      ]}
    >
      {searchConfig.searchable && (
        <TextInput
          style={[styles.searchInput, customStyles?.searchInput]}
          placeholderTextColor={searchConfig.placeholderTextColor}
          placeholder={searchConfig.placeholder}
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        nestedScrollEnabled={true}
      >
        {filteredOptions.length === 0 ? (
          <View style={styles.noResultsContainer}>
            {createConfig?.enabled && searchConfig.searchable && searchText ? (
              <TouchableOpacity
                style={[
                  styles.createButton,
                  { backgroundColor: theme.primaryColor },
                  createConfig.style,
                ]}
                onPress={() => {
                  createConfig.onPress(searchText);
                  handleClose();
                }}
              >
                <Text style={[styles.createButtonText, createConfig.textStyle]}>
                  {createConfig.text}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noResultsText}>
                {searchConfig.noResultsText}
              </Text>
            )}
          </View>
        ) : (
          filteredOptions.map((item, index) => {
            const isSelected = isOptionSelected(item);
            const isLastItem = index === filteredOptions.length - 1;

            const renderedItem = renderOption
              ? renderOption(item, isSelected, handleClose)
              : defaultRenderOption(item, isSelected);

            // return <View key={`${item.value}_${index}`}>{renderedItem}</View>;

            if (renderOption) {
              return <View key={`${item.value}_${index}`}>{renderedItem}</View>;
            }

            return (
              <TouchableOpacity
                key={`${item.value}_${index}`}
                style={[
                  styles.option,
                  !isLastItem && styles.optionBorder,
                  customStyles?.optionItem,
                  isSelected && {
                    backgroundColor: `${theme.primaryColor}10`,
                  },
                  isSelected && customStyles?.selectedOptionItem,
                  item.disabled && styles.disabledOption,
                ]}
                onPress={() => handleOptionPress(item)}
                disabled={item.disabled}
              >
                <Text
                  style={[
                    styles.optionText,
                    customStyles?.text,
                    isSelected && {
                      ...styles.selectedOptionText,
                      color: theme.primaryColor,
                    },
                    item.disabled && styles.disabledOptionText,
                  ]}
                >
                  {item.label}
                </Text>
                {multiple &&
                  isSelected &&
                  (theme.checkIcon || (
                    <Text
                      style={[styles.checkmark, { color: theme.primaryColor }]}
                    >
                      ✓
                    </Text>
                  ))}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      {multiple && (
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: theme.primaryColor }]}
          onPress={handleClose}
        >
          <Text style={styles.doneButtonText}>{modalConfig.confirmText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View
      ref={containerRef}
      style={[styles.container, customStyles?.container]}
    >
      <TouchableOpacity
        ref={selectorRef}
        style={[
          styles.selector,
          customStyles?.button,
          disabled && styles.disabledSelector,
        ]}
        onPress={handleSelectorPress}
        disabled={disabled}
      >
        {renderSelectedOption
          ? renderSelectedOption(selectedOption || null, selectedOptions)
          : defaultRenderSelectedOption(
              selectedOption || null,
              selectedOptions
            )}
        {theme.arrowIcon || <Text style={styles.arrow}>▼</Text>}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType={modalConfig.position === 'bottom' ? 'slide' : 'fade'}
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={[
            modalConfig.position === 'bottom'
              ? styles.bottomModalOverlay
              : styles.modalOverlay,
            { backgroundColor: modalConfig.overlayColor },
          ]}
          activeOpacity={1}
          onPress={multiple ? undefined : handleClose}
        >
          {renderDropdownContent()}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    minHeight: 48,
  },
  disabledSelector: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  bottomDropdown: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingVertical: 16,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  searchInput: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    fontSize: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  disabledOptionText: {
    color: '#999',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  doneButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  createButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  createButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
