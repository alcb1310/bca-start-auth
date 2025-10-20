import { TextField } from '@/components/form/input'
import { SuscribeButton } from '@/components/form/suscribe-button'
import { SwitchField } from '@/components/form/switch'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
    createFormHookContexts()

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: { TextField, SwitchField },
    formComponents: { SuscribeButton },
})
