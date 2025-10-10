import { TextField } from "@/components/form/input";
import { PasswordField } from "@/components/form/password";
import { SuscribeButton } from "@/components/form/suscribe-button";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
    createFormHookContexts();

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: { TextField, PasswordField },
    formComponents: { SuscribeButton },
});
