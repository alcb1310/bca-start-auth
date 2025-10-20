import { useFieldContext } from '@/hooks/app.form'
import type * as SwitchPrimitive from '@radix-ui/react-switch'
import { useStore } from '@tanstack/react-form'
import type { ComponentProps } from 'react'
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field'
import { Switch } from '../ui/switch'

interface SwitchProps extends ComponentProps<typeof SwitchPrimitive.Root> {
    label: string
    description?: string
    testId?: string
}

export function SwitchField({
    label,
    description,
    testId,
    ...props
}: SwitchProps) {
    const field = useFieldContext<boolean>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
        <Field className='mt-2'>
            <div className='flex  gap-2'>
                <Switch
                    checked={field.state.value}
                    onCheckedChange={(value) => field.handleChange(value)}
                    data-testid={`${testId}-switch`}
                    {...props}
                />
                <FieldLabel htmlFor={label}>{label}</FieldLabel>
            </div>
            {description && <FieldDescription>{description}</FieldDescription>}
            {field.state.meta.isTouched && <FieldError>{errors}</FieldError>}
        </Field>
    )
}
