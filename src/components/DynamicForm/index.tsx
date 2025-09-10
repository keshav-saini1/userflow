import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
   TextInput,
   TextareaInput,
   NumberInput,
   EmailInput,
   PasswordInput,
   DateInput,
   SelectInput,
   RadioInput,
   CheckboxInput,
   FileInput,
} from "./fields";

export interface FieldConfig {
   name: string;
   type:
      | "text"
      | "textarea"
      | "number"
      | "email"
      | "password"
      | "date"
      | "select"
      | "radio"
      | "checkbox"
      | "file";
   label?: string;
   placeholder?: string;
   required?: boolean;
   icon?: string | React.ComponentType;
   validation?: {
      min?: number;
      max?: number;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      custom?: (value: any) => boolean | string;
   };
   options?: Array<{ value: string; label: string }>;
   multiple?: boolean;
   accept?: string;
   disabled?: boolean;
   defaultValue?: any;
}

export interface FormSchema {
   [sectionName: string]: FieldConfig[];
}

export interface DynamicFormProps {
   schema: FormSchema | FieldConfig[];
   onSubmit: SubmitHandler<any>;
   submitButtonText?: string;
   className?: string;
   defaultValues?: Record<string, any>;
   expandAllByDefault?: boolean;
   onFieldBlur?: (fieldName: string, value: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
   schema,
   onSubmit,
   submitButtonText = "Submit",
   className = "",
   defaultValues = {},
   expandAllByDefault = false,
   onFieldBlur,
}) => {
   const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
      if (expandAllByDefault && !Array.isArray(schema)) {
         return new Set(Object.keys(schema));
      }
      return new Set();
   });

   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm({
      defaultValues,
   });

   const renderField = (field: FieldConfig) => {
      const { name, type, validation, ...fieldProps } = field;

      const handleFieldBlur = (value: any) => {
         if (onFieldBlur) {
            onFieldBlur(name, value);
         }
      };

      const rules: any = {};

      if (field.required) {
         rules.required = `${field.label || name} is required`;
      }

      if (validation) {
         if (validation.minLength) {
            rules.minLength = {
               value: validation.minLength,
               message: `${field.label || name} must be at least ${
                  validation.minLength
               } characters`,
            };
         }
         if (validation.maxLength) {
            rules.maxLength = {
               value: validation.maxLength,
               message: `${field.label || name} must be at most ${
                  validation.maxLength
               } characters`,
            };
         }
         if (validation.min) {
            rules.min = {
               value: validation.min,
               message: `${field.label || name} must be at least ${
                  validation.min
               }`,
            };
         }
         if (validation.max) {
            rules.max = {
               value: validation.max,
               message: `${field.label || name} must be at most ${
                  validation.max
               }`,
            };
         }
         if (validation.pattern) {
            rules.pattern = {
               value: validation.pattern,
               message: `${field.label || name} format is invalid`,
            };
         }
         if (validation.custom) {
            rules.validate = validation.custom;
         }
      }

      const error = errors[name]?.message as any;

      switch (type) {
         case "text":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <TextInput 
                        {...field} 
                        {...fieldProps} 
                        error={error}
                        onBlur={() => {
                           field.onBlur();
                           handleFieldBlur(field.value);
                        }}
                     />
                  )}
               />
            );

         case "textarea":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <TextareaInput 
                        {...field} 
                        {...fieldProps} 
                        error={error}
                        onBlur={() => {
                           field.onBlur();
                           handleFieldBlur(field.value);
                        }}
                     />
                  )}
               />
            );

         case "number":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <NumberInput 
                        {...field} 
                        {...fieldProps} 
                        error={error}
                        onBlur={() => {
                           field.onBlur();
                           handleFieldBlur(field.value);
                        }}
                     />
                  )}
               />
            );

         case "email":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={{
                     ...rules,
                     pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                     },
                  }}
                  render={({ field }) => (
                     <EmailInput 
                        {...field} 
                        {...fieldProps} 
                        error={error}
                        onBlur={() => {
                           field.onBlur();
                           handleFieldBlur(field.value);
                        }}
                     />
                  )}
               />
            );

         case "password":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <PasswordInput 
                        {...field} 
                        {...fieldProps} 
                        error={error}
                        onBlur={() => {
                           field.onBlur();
                           handleFieldBlur(field.value);
                        }}
                     />
                  )}
               />
            );

         case "date":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <DateInput
                        {...field}
                        {...fieldProps}
                        error={error?.message}
                        onBlur={() => {
                           field.onBlur();
                           handleFieldBlur(field.value);
                        }}
                     />
                  )}
               />
            );

         case "select":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <SelectInput
                        {...field}
                        {...fieldProps}
                        error={error?.message}
                        onBlur={() => {
                           field.onBlur();
                           handleFieldBlur(field.value);
                        }}
                     />
                  )}
               />
            );

         case "radio":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <RadioInput
                        {...field}
                        {...fieldProps}
                        error={error?.message}
                     />
                  )}
               />
            );

         case "checkbox":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <CheckboxInput
                        {...field}
                        {...fieldProps}
                        error={error?.message}
                     />
                  )}
               />
            );

         case "file":
            return (
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                     <FileInput
                        {...field}
                        {...fieldProps}
                        error={error?.message}
                     />
                  )}
               />
            );

         default:
            return <div>Unsupported field type: {type}</div>;
      }
   };

   const toggleSection = (sectionName: string) => {
      const newExpandedSections = new Set(expandedSections);
      if (newExpandedSections.has(sectionName)) {
         newExpandedSections.delete(sectionName);
      } else {
         newExpandedSections.add(sectionName);
      }
      setExpandedSections(newExpandedSections);
   };

   const renderSection = (sectionName: string, fields: FieldConfig[]) => {
      const isExpanded = expandedSections.has(sectionName);

      return (
         <div
            key={sectionName}
            className="mb-6 p-4 bg-white shadow-md rounded-2xl"
         >
            <button
               type="button"
               onClick={() => toggleSection(sectionName)}
               className="w-full mb-4 py-3 text-left  rounded-t-lg transition-colors"
            >
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                     {sectionName}
                  </h3>
                  <svg
                     className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        isExpanded ? "rotate-180" : ""
                     }`}
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                     />
                  </svg>
               </div>
            </button>
            {isExpanded && (
               <div className="space-y-4">
                  {fields.map((field) => (
                     <div key={field.name}>{renderField(field)}</div>
                  ))}
               </div>
            )}
         </div>
      );
   };

   const renderFields = (fields: FieldConfig[]) => (
      <div className="space-y-4">
         {fields.map((field) => (
            <div key={field.name}>{renderField(field)}</div>
         ))}
      </div>
   );

   const isSectioned = Array.isArray(schema) ? false : true;
   const fields = isSectioned ? schema : (schema as FieldConfig[]);

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
         {isSectioned
            ? Object.entries(fields).map(([sectionName, sectionFields]) =>
                 renderSection(sectionName, sectionFields)
              )
            : renderFields(fields as FieldConfig[])}

         <div className="mt-6">
            <button
               type="submit"
               disabled={isSubmitting}
               className="w-full bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
               {isSubmitting ? "Submitting..." : submitButtonText}
               <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M9 5l7 7-7 7"
                  />
               </svg>
            </button>
         </div>
      </form>
   );
};

export default DynamicForm;
