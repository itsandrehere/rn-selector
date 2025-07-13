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

export interface SelectorOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface SelectorProps {
  options: SelectorOption[];
  selectedValue?: any;
  onValueChange: (
    value: any,
    option: SelectorOption | SelectorOption[]
  ) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  doneButtonText?: string;
  noResultsText?: string;
  disabled?: boolean;
  multiple?: boolean;
  modalPosition?: 'center' | 'bottom';
  primaryColor?: string;
  iconCheck?: React.ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  selectedOptionStyle?: ViewStyle;
  textStyle?: TextStyle;
  placeholderTextStyle?: TextStyle;
  searchInputStyle?: TextStyle;
  modalBackgroundColor?: string;
  maxHeight?: number;
  renderOption?: (
    option: SelectorOption,
    isSelected: boolean
  ) => React.ReactNode;
  renderSelectedOption?: (
    option: SelectorOption | null,
    selectedOptions?: SelectorOption[]
  ) => React.ReactNode;
}

const { height: screenHeight } = Dimensions.get('window');

export const Selector: React.FC<SelectorProps> = ({
  options = [],
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  searchable = false,
  searchPlaceholder = 'Search...',
  doneButtonText = 'Done',
  noResultsText = 'No matches found',
  disabled = false,
  multiple = false,
  modalPosition = 'center',
  primaryColor = '#1976d2',
  iconCheck,
  style,
  containerStyle,
  dropdownStyle,
  optionStyle,
  selectedOptionStyle,
  textStyle,
  placeholderTextStyle,
  searchInputStyle,
  modalBackgroundColor = 'rgba(0, 0, 0, 0.5)',
  maxHeight = screenHeight * 0.5,
  renderOption,
  renderSelectedOption,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectorRef = useRef(null);
  const containerRef = useRef<View>(null);

  useEffect(() => {
    if (searchable && searchText) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchText, options, searchable]);

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
        optionStyle,
        isSelected && {
          ...styles.selectedOption,
          backgroundColor: `${primaryColor}10`,
        },
        isSelected && selectedOptionStyle,
        option.disabled && styles.disabledOption,
      ]}
      onPress={() => handleOptionPress(option)}
      disabled={option.disabled}
    >
      <Text
        style={[
          styles.optionText,
          textStyle,
          isSelected && { ...styles.selectedOptionText, color: primaryColor },
          option.disabled && styles.disabledOptionText,
        ]}
      >
        {option.label}
      </Text>
      {multiple &&
        isSelected &&
        (iconCheck || (
          <Text style={[styles.checkmark, { color: primaryColor }]}>✓</Text>
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
          ? selectedOpts[0].label
          : `${selectedOpts.length} items selected`;

      return (
        <Text style={[styles.selectorText, textStyle]}>{displayText}</Text>
      );
    }

    return (
      <Text
        style={[
          styles.selectorText,
          option ? textStyle : [styles.placeholderText, placeholderTextStyle],
        ]}
      >
        {option ? option.label : placeholder}
      </Text>
    );
  };

  const renderDropdownContent = () => (
    <View
      style={[
        modalPosition === 'bottom' ? styles.bottomDropdown : styles.dropdown,
        dropdownStyle,
        { maxHeight },
      ]}
    >
      {searchable && (
        <TextInput
          style={[styles.searchInput, searchInputStyle]}
          placeholder={searchPlaceholder}
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
            <Text style={styles.noResultsText}>{noResultsText}</Text>
          </View>
        ) : (
          filteredOptions.map((item, index) => {
            const isSelected = isOptionSelected(item);
            const renderedItem = renderOption
              ? renderOption(item, isSelected)
              : defaultRenderOption(item, isSelected);

            return <View key={`${item.value}_${index}`}>{renderedItem}</View>;
          })
        )}
      </ScrollView>
      {multiple && (
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: primaryColor }]}
          onPress={handleClose}
        >
          <Text style={styles.doneButtonText}>{doneButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View ref={containerRef} style={[styles.container, containerStyle]}>
      <TouchableOpacity
        ref={selectorRef}
        style={[styles.selector, style, disabled && styles.disabledSelector]}
        onPress={handleSelectorPress}
        disabled={disabled}
      >
        {renderSelectedOption
          ? renderSelectedOption(selectedOption || null, selectedOptions)
          : defaultRenderSelectedOption(
              selectedOption || null,
              selectedOptions
            )}
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType={modalPosition === 'bottom' ? 'slide' : 'fade'}
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={[
            modalPosition === 'bottom'
              ? styles.bottomModalOverlay
              : styles.modalOverlay,
            { backgroundColor: modalBackgroundColor },
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
    borderBottomColor: '#e0e0e0',
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    // backgroundColor will be set dynamically
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
});
