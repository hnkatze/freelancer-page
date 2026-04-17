"use client";

import { useState, useId } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EASE_EXPO_OUT } from "@/lib/motion";

/* ─── Types ──────────────────────────────────────────────────────────── */

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  message: string;
}

/* ─── Motion variants ────────────────────────────────────────────────── */

const formRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_EXPO_OUT,
    },
  },
};

/* ─── ContactForm ────────────────────────────────────────────────────── */

function ContactForm() {
  const t = useTranslations("contact");
  const prefersReducedMotion = useReducedMotion();

  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  // Stable unique IDs for label ↔ input association
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const statusId = useId();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (status === "submitting") return;

    setStatus("submitting");

    // TODO: Wire to a real backend route (e.g. POST /api/contact or a
    //       third-party service like Resend / EmailJS / Formspree).
    //       Current implementation simulates success after 900 ms.
    setTimeout(() => {
      // Simulate occasional error for resilience testing.
      // In production: call the API and branch on the response.
      setStatus("success");
    }, 900);
  }

  const isSubmitting = status === "submitting";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-12 space-y-6"
      aria-describedby={
        status === "success" || status === "error" ? statusId : undefined
      }
      noValidate
      variants={formRevealVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* ── Name ── */}
      <div className="space-y-1.5">
        <Label htmlFor={nameId}>
          {t("form.name")}
          {/* Required indicator — paired with aria-required on input */}
          <span className="text-danger-400 ml-0.5" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t("form.name_placeholder")}
          value={fields.name}
          onChange={handleChange}
          required
          aria-required="true"
          disabled={isSubmitting}
          className="h-10"
        />
      </div>

      {/* ── Email ── */}
      <div className="space-y-1.5">
        <Label htmlFor={emailId}>
          {t("form.email")}
          <span className="text-danger-400 ml-0.5" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("form.email_placeholder")}
          value={fields.email}
          onChange={handleChange}
          required
          aria-required="true"
          disabled={isSubmitting}
          className="h-10"
        />
      </div>

      {/* ── Message ── */}
      <div className="space-y-1.5">
        <Label htmlFor={messageId}>
          {t("form.message")}
          <span className="text-danger-400 ml-0.5" aria-hidden="true">
            *
          </span>
        </Label>
        <Textarea
          id={messageId}
          name="message"
          rows={6}
          placeholder={t("form.message_placeholder")}
          value={fields.message}
          onChange={handleChange}
          required
          aria-required="true"
          disabled={isSubmitting}
        />
      </div>

      {/* ── Submit ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="
            bg-brand-gradient text-brand-gradient-fg font-semibold
            shadow-glow-brand hover:opacity-90
            transition-[opacity,box-shadow] duration-200 ease-out
            disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
            w-full sm:w-auto
          "
        >
          {isSubmitting ? t("form.submitting") : t("form.submit")}
        </Button>
      </div>

      {/* ── Status feedback ── */}
      {status === "success" && (
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className="text-sm text-success-400"
        >
          {t("form.success")}
        </p>
      )}

      {status === "error" && (
        <p
          id={statusId}
          role="alert"
          aria-live="assertive"
          className="text-sm text-danger-400"
        >
          {t("form.error")}
        </p>
      )}
    </motion.form>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 lg:py-28 border-t border-border"
    >
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p
          className="font-mono text-xs uppercase tracking-widest text-accent-foreground"
          aria-hidden="true"
        >
          {t("eyebrow")}
        </p>

        {/* Heading */}
        <h2
          id="contact-heading"
          className="text-3xl lg:text-4xl font-bold tracking-tight mt-4 text-foreground"
        >
          {t("title")}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mt-4 max-w-[55ch]">
          {t("subtitle")}
        </p>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
}
