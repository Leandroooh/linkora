import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="mb-3 h-9 rounded-md border-0 bg-white px-2 outline-0"
      placeholder=""
      type="text"
      {...props}
    />
  );
}
