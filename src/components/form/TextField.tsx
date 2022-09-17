import React from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface TextFieldProps {
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  type?: 'email' | 'password' | 'text';
  textarea?: boolean;
  label?: string;
  text?: 'xs' | 'sm' | 'base' | 'lg';
  spacing?: number;
  error?: string;
}

const TextField = React.forwardRef<InputElement, TextFieldProps>(
  (
    { error, text = 'base', spacing, label, textarea = false, ...rest },
    ref
  ) => {
    const InputElement = textarea ? 'textarea' : 'input';
    return (
      <div className={`${spacing && 'mb-' + spacing}`}>
        {label && (
          <label className="mb-2 inline-block font-medium" htmlFor={label}>
            {label}
          </label>
        )}
        <InputElement
          ref={ref as any}
          className={`rounded-md w-full border border-gray-400 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none px-4 py-2 ${
            textarea ? 'h-32' : ''
          } text-${text}`}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      </div>
    );
  }
);

export default TextField;
