import { useFieldContext } from '@/hooks/app.form'
import { useStore } from '@tanstack/react-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type TextFieldProps = {
    label: string
    placeholder?: string
    testId?: string
}

export function TextField({ label, placeholder, testId }: TextFieldProps) {
    const field = useFieldContext<string>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
        <div>
            <Label
                htmlFor={label}
                className='mb-1 font-bold'
                data-testid={`${testId}-label`}
            >
                {label}
            </Label>
            <Input
                placeholder={placeholder}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                data-testid={`${testId}-input`}
                className={errors.length > 0 ? 'border-destructive' : ''}
            />
            {/*field.state.meta.isTouched && <ErrorMessages errors={errors} />*/}
        </div>
    )
}
