import { ReactNode } from 'react';
import { Button } from './button';
import { useFormStatus } from 'react-dom';
import { ButtonLoading } from './button-loading';

type SubmitButtonProps = {
  children: ReactNode;
};

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? <ButtonLoading /> : <Button type="submit">{children}</Button>}
    </>
  );
}
