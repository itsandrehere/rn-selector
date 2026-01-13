import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Selector } from '../index';
import type { SelectorOption } from '../index';

const mockOptions: SelectorOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Disabled Option', value: 'disabled', disabled: true },
];

describe('Selector', () => {
  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder text', () => {
    const { getByText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        placeholder="Select an option"
      />
    );

    expect(getByText('Select an option')).toBeTruthy();
  });

  it('opens modal when pressed', () => {
    const { getByText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        placeholder="Select an option"
      />
    );

    fireEvent.press(getByText('Select an option'));

    // Check if modal options are visible
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
    expect(getByText('Option 3')).toBeTruthy();
  });

  it('calls onValueChange when option is selected', () => {
    const { getByText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        placeholder="Select an option"
      />
    );

    // Open modal
    fireEvent.press(getByText('Select an option'));

    // Select an option
    fireEvent.press(getByText('Option 1'));

    expect(mockOnValueChange).toHaveBeenCalledWith('option1', mockOptions[0]);
  });

  it('displays selected value', () => {
    const { getByText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        selectedValue="option2"
      />
    );

    expect(getByText('Option 2')).toBeTruthy();
  });

  it('shows search input when searchable is true', () => {
    const { getByText, getByPlaceholderText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        searchConfig={{
          searchable: true,
          placeholder: 'Search options...',
        }}
      />
    );

    // Open modal
    fireEvent.press(getByText('Select an option'));

    // Check if search input is visible
    expect(getByPlaceholderText('Search options...')).toBeTruthy();
  });

  it('filters options when searching', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        searchConfig={{
          searchable: true,
          placeholder: 'Search options...',
        }}
      />
    );

    // Open modal
    fireEvent.press(getByText('Select an option'));

    // Type in search
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Option 1');

    await waitFor(() => {
      expect(getByText('Option 1')).toBeTruthy();
      expect(queryByText('Option 2')).toBeNull();
      expect(queryByText('Option 3')).toBeNull();
    });
  });

  it('shows no results text when search has no matches', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        searchConfig={{
          searchable: true,
          placeholder: 'Search...',
          noResultsText: 'No matches found',
        }}
      />
    );

    // Open modal
    fireEvent.press(getByText('Select an option'));

    // Type in search with no matches
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'NonExistentOption');

    await waitFor(() => {
      expect(getByText('No matches found')).toBeTruthy();
    });
  });

  it('handles multiple selection', () => {
    let currentSelectedValue: any[] = [];

    const handleValueChange = (value: any, options: any) => {
      currentSelectedValue = value;
      mockOnValueChange(value, options);
    };

    const { getByText, rerender } = render(
      <Selector
        options={mockOptions}
        onValueChange={handleValueChange}
        multiple={true}
        modalConfig={{
          confirmText: 'Done',
        }}
        selectedValue={currentSelectedValue}
      />
    );

    // Open modal
    fireEvent.press(getByText('Select an option'));

    // Select first option
    fireEvent.press(getByText('Option 1'));

    // Rerender with updated selectedValue
    rerender(
      <Selector
        options={mockOptions}
        onValueChange={handleValueChange}
        multiple={true}
        modalConfig={{
          confirmText: 'Done',
        }}
        selectedValue={currentSelectedValue}
      />
    );

    // Select second option
    fireEvent.press(getByText('Option 2'));

    // Verify onValueChange was called twice with correct values
    expect(mockOnValueChange).toHaveBeenCalledTimes(2);
    expect(mockOnValueChange).toHaveBeenNthCalledWith(
      1,
      ['option1'],
      [mockOptions[0]]
    );
    expect(mockOnValueChange).toHaveBeenNthCalledWith(
      2,
      ['option1', 'option2'],
      [mockOptions[0], mockOptions[1]]
    );

    // Press done button to close modal
    fireEvent.press(getByText('Done'));
  });

  it('does not allow selection of disabled options', () => {
    const { getByText } = render(
      <Selector options={mockOptions} onValueChange={mockOnValueChange} />
    );

    // Open modal
    fireEvent.press(getByText('Select an option'));

    // Try to select disabled option
    const disabledOption = getByText('Disabled Option');
    fireEvent.press(disabledOption);

    // onValueChange should not be called for disabled option
    expect(mockOnValueChange).not.toHaveBeenCalled();
  });

  it('does not open modal when disabled', () => {
    const { getByText, queryByText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        disabled={true}
        placeholder="Select an option"
      />
    );

    fireEvent.press(getByText('Select an option'));

    // Modal should not open, so options should not be visible
    expect(queryByText('Option 1')).toBeNull();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(
      <Selector
        options={mockOptions}
        onValueChange={mockOnValueChange}
        styles={{ container: customStyle }}
        placeholder="Select an option"
      />
    );

    const selector = getByText('Select an option');
    expect(selector).toBeTruthy();
  });
});
