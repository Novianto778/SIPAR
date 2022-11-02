import React from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface TextFieldProps {
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  textarea?: boolean;
  type?: string;
  label?: string;
  text?: 'xs' | 'sm' | 'base' | 'lg';
  spacing?: number;
  error?: string;
  width?: 'full' | '2/3' | '1/2' | '1/3' | '1/4';
  disabled?: boolean;
}

const TextField = React.forwardRef<InputElement, TextFieldProps>(
  (
    {
      error,
      width = 'full',
      text = 'base',
      spacing,
      label,
      disabled = false,
      textarea = false,
      ...rest
    },
    ref
  ) => {
    const InputElement = textarea ? 'textarea' : 'input';
    const widthClass = {
      full: 'md:w-full',
      '2/3': 'md:w-2/3',
      '1/2': 'md:w-1/2',
      '1/3': 'md:w-1/3',
      '1/4': 'md:w-1/4',
    };
    return (
      <div className={`form-container${spacing ? ' mb-' + spacing : ''}`}>
        {label && (
          <label className="mb-2 block font-medium" htmlFor={label}>
            {label}
          </label>
        )}
        <InputElement
          ref={ref as any}
          className={`rounded-md w-full ${
            widthClass[width]
          } border border-gray-400 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none px-4 py-2 ${
            textarea ? 'h-32' : ''
          } text-${text}`}
          {...rest}
          disabled={disabled}
        />
        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      </div>
    );
  }
);

export default TextField;
