import { HTMLInputTypeAttribute } from "react";
import { FiXCircle } from "react-icons/fi";

interface Props {
  setValue: (e: string) => void;
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  error?: boolean;
}

export function Input({ setValue, type = "text", name, label, error }: Props) {
  return (
    <>
      <label htmlFor={name} className="relative flex flex-col pb-1">
        {label}
        <input
          type={type}
          id={name}
          name={name}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          className="mb-2 border-b border-zinc-700 bg-transparent pb-4 text-white caret-orange hover:border-white focus:outline-none"
        />
        {error ? (
          <span className="absolute inset-y-7 right-0">
            <FiXCircle size={20} className="stroke-red" />
          </span>
        ) : null}
      </label>
    </>
  );
}
