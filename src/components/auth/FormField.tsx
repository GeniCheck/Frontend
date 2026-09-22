import React from "react";

export const inputClass =
  "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm transition-all duration-300 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none";

interface FormFieldProps {
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  errorMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  errorMessage,
}) => (
  <div className="space-y-1.5">
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
    {value.length > 0 && errorMessage && (
      <p className="text-2xs px-1 font-bold text-red-500">{errorMessage}</p>
    )}
  </div>
);

export default FormField;
