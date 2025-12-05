import React from 'react';
import { FormFieldType } from '@/lib/Type';
import { Input } from './ui/input';
import { Control, Controller } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: React.ReactNode;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  className?: string;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-slate-200 bg-white">
          {props.iconSrc && (
            <div className="flex items-center pl-3">
              {props.iconSrc}
            </div>
          )}
          <Input
            placeholder={props.placeholder}
            {...field}
            className={cn("border-0 focus-visible:ring-0", props.iconSrc && "pl-2")}
          />
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <textarea
          {...field}
          placeholder={props.placeholder}
          className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      );
    case FormFieldType.SELECT:
      return (
        <div className="relative">
          <select
            {...field}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>{props.placeholder}</option>
            {props.children}
          </select>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
         <div className="flex rounded-md border border-slate-200 bg-white items-center">
            <Calendar className="ml-3 h-4 w-4 text-slate-500" />
            <Input
              type="date"
              {...field}
              className="border-0 focus-visible:ring-0 pl-2"
              min={new Date().toISOString().split('T')[0]}
            />
         </div>
      );
    case FormFieldType.SKELETON:
        return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("space-y-2", props.className)}>
          {label && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700">
              {label}
            </label>
          )}
          <RenderInput field={field} props={props} />
          {error && <p className="text-sm font-medium text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default CustomFormField;