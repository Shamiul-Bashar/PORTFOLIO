"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  };

  const validate = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.subject.trim()) {
      setError("Please enter a subject.");
      return false;
    }

    if (!formData.message.trim()) {
      setError("Please write your message.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await emailjs.send(
        "service_5pdvxyq",
        "template_5j7g5cf",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "pgJsj6YimszKufj5x"
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 5000);

      setFormData(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "glass-surface w-full rounded-lg border border-border px-4 py-3 outline-none transition-all duration-300 hover:border-accent-cyan/40 focus:border-accent-cyan focus:shadow-[var(--glow-cyan-soft)]";

  return (
    <Card
      className="
        border
        border-accent-cyan/20
        p-8
        transition-all
        duration-500
        hover:border-accent-cyan/40
        hover:shadow-[var(--glow-cyan-soft)]
      "
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Internship Opportunity"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary">
            Message
          </label>

          <textarea
            rows={7}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className={`${inputClass} min-h-[180px] resize-none`}
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
            <p className="font-medium text-green-400">
              ✅ Thank you!
            </p>

            <p className="mt-1 text-sm text-green-300">
              Your message has been sent successfully.
              I'll get back to you as soon as possible.
            </p>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="
            w-full
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-95
          "
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Card>
  );
}