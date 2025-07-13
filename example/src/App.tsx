import { useState } from 'react';
import { Selector } from 'rn-selector';
import type { SelectorOption } from 'rn-selector';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const fruits: SelectorOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Mango', value: 'mango' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Watermelon', value: 'watermelon' },
];

const countries: SelectorOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
  { label: 'Brazil', value: 'br' },
  { label: 'India', value: 'in' },
  { label: 'China', value: 'cn' },
];

const colors: SelectorOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pink', value: 'pink' },
  { label: 'Black', value: 'black', disabled: true },
];

export default function App() {
  const [selectedFruit, setSelectedFruit] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedMultipleCountries, setSelectedMultipleCountries] = useState<
    string[]
  >([]);

  const handleFruitChange = (value: string[]) => {
    setSelectedFruit(value);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContent}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>React Native Selector Demo</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Single Selection Selector</Text>
            <Text style={styles.description}>
              Choose one country (single selection):
            </Text>
            <Selector
              options={countries}
              selectedValue={selectedMultipleCountries[0] || ''}
              onValueChange={(value) => setSelectedMultipleCountries([value])}
              placeholder="Select a single country"
            />
            {selectedMultipleCountries.length > 0 ? (
              <Text style={styles.result}>
                Selected: {selectedMultipleCountries[0]}
              </Text>
            ) : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Multiple Selection Selector</Text>
            <Text style={styles.description}>
              Choose your favorite fruits (multiple):
            </Text>
            <Selector
              options={fruits}
              selectedValue={selectedFruit}
              multiple
              onValueChange={handleFruitChange}
              placeholder="Select fruits"
            />
            {selectedFruit.length > 0 ? (
              <Text style={styles.result}>
                Selected: {selectedFruit.join(', ')}
              </Text>
            ) : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Multiple Bottom Selection Selector
            </Text>
            <Selector
              options={fruits}
              selectedValue={selectedFruit}
              multiple
              onValueChange={handleFruitChange}
              searchable
              modalPosition="bottom"
              placeholder="Select sfruits"
            />
            {selectedFruit.length > 0 ? (
              <Text style={styles.result}>
                Selected: {selectedFruit.join(', ')}
              </Text>
            ) : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Searchable Selector</Text>
            <Text style={styles.description}>Search and select a country:</Text>
            <Selector
              options={countries}
              selectedValue={selectedCountry}
              onValueChange={handleCountryChange}
              placeholder="Select a country"
              searchable
              searchPlaceholder="Type to search countries..."
            />
            {selectedCountry ? (
              <Text style={styles.result}>Selected: {selectedCountry}</Text>
            ) : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Styled Selector</Text>
            <Text style={styles.description}>
              Choose a color (with disabled option):
            </Text>
            <Selector
              options={colors}
              selectedValue={selectedColor}
              onValueChange={handleColorChange}
              placeholder="Pick a color"
              style={styles.customSelector}
              dropdownStyle={styles.customDropdown}
              textStyle={styles.customText}
              placeholderTextStyle={styles.customPlaceholder}
              selectedOptionStyle={styles.customSelectedOption}
            />
            {selectedColor ? (
              <View style={styles.colorPreview}>
                <View
                  style={[styles.colorBox, { backgroundColor: selectedColor }]}
                />
                <Text style={styles.result}>Selected: {selectedColor}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disabled Selector</Text>
            <Text style={styles.description}>This selector is disabled:</Text>
            <Selector
              options={fruits}
              selectedValue=""
              onValueChange={() => {}}
              placeholder="This is disabled"
              disabled
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 30,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  result: {
    marginTop: 10,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  customSelector: {
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#f8f9ff',
  },
  customDropdown: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  customText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  customPlaceholder: {
    color: '#99c5ff',
    fontStyle: 'italic',
  },
  customSelectedOption: {
    backgroundColor: '#007AFF',
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
