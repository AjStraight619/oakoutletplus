"use client";
import { useFormStatus } from "react-dom";
import { BsSend } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import { Button } from "./ui/button";
export default function SendEmailButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="group flex items-center justify-center gap-2 h-[3rem] w-[7rem]  text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110  active:scale-105  dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65 mt-1"
    >
      Send
      {pending ? (
        <VscLoading className="animate-spin" />
      ) : (
        <BsSend className="text-lg opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
      )}
    </Button>
  );
}
