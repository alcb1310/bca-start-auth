import { useFormContext } from "@/hooks/app.form";
import { Button } from "../ui/button";

type SuscribeButtonProps = {
    label: string;
    className?: string;
    testId?: string;
};

export function SuscribeButton({
    label,
    className,
    testId,
}: SuscribeButtonProps) {
    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            <Button type="submit" className={className} data-testid={testId}>
                {label}
            </Button>
        </form.Subscribe>
    );
}
