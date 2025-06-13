import React, { useState } from 'react';

const SearchBox = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const allOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // replace with your options

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const filteredOptions = allOptions.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isFocused && (
                <div style={{ position: 'absolute', backgroundColor: 'white', zIndex: 1 }}>
                    {filteredOptions.map((option, index) => (
                        <div key={index}>{option}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
