import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components//ui/field'
import { Input } from '@/components/ui/input'
import { useFieldContext } from '@/hooks/app.form'
import { useStore } from '@tanstack/react-form'
import type { ComponentProps } from 'react'

interface TextFieldProps extends ComponentProps<'input'> {
    label: string
    placeholder?: string
    description?: string
    testId?: string
}

export function TextField({
    label,
    placeholder,
    testId,
    description,
    ...props
}: TextFieldProps) {
    const field = useFieldContext<string>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
        <Field>
            <FieldLabel htmlFor={label}>{label}</FieldLabel>
            <Input
                placeholder={placeholder}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                data-testid={`${testId}-input`}
                className={errors.length > 0 ? 'border-destructive' : ''}
                {...props}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError>{errors[0].message}</FieldError>
            )}
        </Field>
    )
}
