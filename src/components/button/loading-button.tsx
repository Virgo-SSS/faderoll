import { Button, buttonVariants } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { type VariantProps } from 'class-variance-authority'

export interface LoadingButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

export default function LoadingButton({
  isLoading = false,
  disabled,
  children,
  className,
  variant,
  size,
  asChild = false,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading || disabled}
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    >
      {isLoading && <Spinner className="mr-2" />}
      {children}
    </Button>
  )
}
