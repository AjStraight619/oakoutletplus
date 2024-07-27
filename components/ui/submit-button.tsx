'use client';
import { ReactNode } from 'react';
import { Button } from './button';
import { useFormStatus } from 'react-dom';
import { ButtonLoading } from './button-loading';

type SubmitButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function SubmitButton({
  children,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <ButtonLoading className={className} />
      ) : (
        <Button className={className} type="submit">
          {children}
        </Button>
      )}
    </>
  );
}
