"use server";
import ContactFormEmail from "@/email/email";
import { getErrorMessage, validateString } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const getImageArrayBuffer = async (file: File) => {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
};

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const images = formData.getAll("images") as unknown as File[];
  console.log("Sender email", senderEmail);
  console.log("Message", message);

  if (!validateString(senderEmail, 500)) {
    return { error: "Invalid sender email" };
  }

  if (!validateString(message, 5000)) {
    return { error: "Invalid message" };
  }

  if (images.length > 5) {
    return { error: "Too many images, max of 5 allowed" };
  }

  let imageBuffers = [];
  for (const file of images) {
    if (!file.type.startsWith("image/")) {
      return { error: "Only image files are allowed" };
    }
    const buffer = await getImageArrayBuffer(file as File);
    imageBuffers.push(buffer);
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "nickatz5@yahoo.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
      attachments: imageBuffers.map((buffer, index) => ({
        filename: `image${index + 1}.png`,
        content: buffer,
        type: "image/png",
        disposition: "attachment",
      })),
    });
  } catch (error: unknown) {
    console.log(error);
    return { error: getErrorMessage(error) };
  }

  return { data, success: "Message sent successfully" };
};
