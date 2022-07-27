import { FC } from 'react';

interface IInput {
  name: string;
  labelName?: string;
  placeholder?: string;
  value?: string;
  type: string;
  onChange?: (event: any) => any;
  onBlur?: (event: any) => any;
}

const Input: FC<IInput> = ({ name, labelName, type, value, placeholder, onChange, onBlur }) => {
  return (
    <>
      <label className="block text-sm font-bold" htmlFor={name}>
        {labelName}
      </label>
      <input
        className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
    </>
  );
};

export default Input;
