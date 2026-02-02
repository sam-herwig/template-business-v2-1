'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface BrutalInputProps {
  label: string
  error?: string
  id?: string
  name?: string
  type?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

interface BrutalTextareaProps {
  label: string
  error?: string
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  rows?: number
  value?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
}

interface BrutalSelectProps {
  label: string
  error?: string
  id?: string
  name?: string
  required?: boolean
  value?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  options: { value: string; label: string }[]
}

interface BrutalRadioGroupProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  value?: string
  onChange?: (value: string) => void
  error?: string
}

export const BrutalInput = forwardRef<HTMLInputElement, BrutalInputProps>(
  ({ label, error, id, name, type = 'text', placeholder, required, value, onChange, onBlur }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className="mb-6">
        <label 
          htmlFor={inputId}
          className="block font-display font-bold text-sm uppercase tracking-wide mb-2 text-brutal-black dark:text-brutal-bg"
        >
          {label}
          {required && <span className="text-brutal-pink ml-1">*</span>}
        </label>
        <motion.input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full p-4 font-body text-base border-[3px] border-brutal-black dark:border-brutal-bg bg-brutal-bg dark:bg-brutal-black text-brutal-black dark:text-brutal-bg placeholder:text-brutal-black/40 dark:placeholder:text-brutal-bg/40 focus:outline-none transition-all"
          style={{ boxShadow: '4px 4px 0 #1a1a1a' }}
          whileFocus={{
            x: -2,
            y: -2,
            boxShadow: '6px 6px 0 #1a1a1a',
            borderColor: '#FF5CAA',
          }}
        />
        {error && (
          <p className="mt-2 font-body text-sm text-brutal-pink">{error}</p>
        )}
      </div>
    )
  }
)
BrutalInput.displayName = 'BrutalInput'

export const BrutalTextarea = forwardRef<HTMLTextAreaElement, BrutalTextareaProps>(
  ({ label, error, id, name, placeholder, required, rows, value, onChange, onBlur }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className="mb-6">
        <label 
          htmlFor={inputId}
          className="block font-display font-bold text-sm uppercase tracking-wide mb-2 text-brutal-black dark:text-brutal-bg"
        >
          {label}
          {required && <span className="text-brutal-pink ml-1">*</span>}
        </label>
        <motion.textarea
          ref={ref}
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full p-4 font-body text-base border-[3px] border-brutal-black dark:border-brutal-bg bg-brutal-bg dark:bg-brutal-black text-brutal-black dark:text-brutal-bg placeholder:text-brutal-black/40 dark:placeholder:text-brutal-bg/40 focus:outline-none transition-all resize-none min-h-[160px]"
          style={{ boxShadow: '4px 4px 0 #1a1a1a' }}
          whileFocus={{
            x: -2,
            y: -2,
            boxShadow: '6px 6px 0 #1a1a1a',
            borderColor: '#FF5CAA',
          }}
        />
        {error && (
          <p className="mt-2 font-body text-sm text-brutal-pink">{error}</p>
        )}
      </div>
    )
  }
)
BrutalTextarea.displayName = 'BrutalTextarea'

export const BrutalSelect = forwardRef<HTMLSelectElement, BrutalSelectProps>(
  ({ label, error, id, name, required, value, onChange, options }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className="mb-6">
        <label 
          htmlFor={inputId}
          className="block font-display font-bold text-sm uppercase tracking-wide mb-2 text-brutal-black dark:text-brutal-bg"
        >
          {label}
          {required && <span className="text-brutal-pink ml-1">*</span>}
        </label>
        <motion.select
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full p-4 font-body text-base border-[3px] border-brutal-black dark:border-brutal-bg bg-brutal-bg dark:bg-brutal-black text-brutal-black dark:text-brutal-bg focus:outline-none transition-all cursor-pointer appearance-none"
          style={{ 
            boxShadow: '4px 4px 0 #1a1a1a',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231a1a1a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.5rem',
          }}
          whileFocus={{
            x: -2,
            y: -2,
            boxShadow: '6px 6px 0 #1a1a1a',
            borderColor: '#FF5CAA',
          }}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
        {error && (
          <p className="mt-2 font-body text-sm text-brutal-pink">{error}</p>
        )}
      </div>
    )
  }
)
BrutalSelect.displayName = 'BrutalSelect'

export function BrutalRadioGroup({ 
  label, 
  name, 
  options, 
  value, 
  onChange, 
  error 
}: BrutalRadioGroupProps): JSX.Element {
  return (
    <fieldset className="mb-6">
      <legend className="block font-display font-bold text-sm uppercase tracking-wide mb-4 text-brutal-black dark:text-brutal-bg">
        {label}
      </legend>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <motion.div
              className={`w-5 h-5 border-[3px] border-brutal-black dark:border-brutal-bg flex items-center justify-center transition-colors ${
                value === option.value ? 'bg-brutal-pink' : 'bg-brutal-bg dark:bg-brutal-black'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {value === option.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-brutal-black"
                />
              )}
            </motion.div>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="sr-only"
            />
            <span className="font-body text-brutal-black dark:text-brutal-bg group-hover:text-brutal-pink transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-2 font-body text-sm text-brutal-pink">{error}</p>
      )}
    </fieldset>
  )
}
