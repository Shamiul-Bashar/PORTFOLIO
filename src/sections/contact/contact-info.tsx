import {
  MdEmail,
  MdLocationOn,
} from "react-icons/md";

import {
  FaWhatsapp,
  FaFileDownload,
} from "react-icons/fa";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

import { ContactSocial } from "./contact-social";

export function ContactInfo() {
  return (
    <Card className="flex h-full flex-col justify-between border border-accent-purple/20 p-8">

      <div>

        <div className="mb-8">

          <h3 className="font-heading text-text-primary text-3xl font-semibold">
            Let's Connect
          </h3>

          <p className="text-text-secondary mt-4 leading-7">
            I'm always open to discussing internship opportunities,
            software projects, research collaborations, or simply
            connecting with fellow developers.
          </p>

        </div>

        <div className="space-y-6">

          <div className="flex items-start gap-4">

            <div className="bg-accent-cyan/10 text-accent-cyan flex h-12 w-12 items-center justify-center rounded-full">
              <MdEmail size={22} />
            </div>

            <div>
              <p className="text-text-secondary text-sm">
                Email
              </p>

              <a
                href="mailto:siam2407118@stud.kuet.ac.bd"
                className="text-text-primary transition hover:text-accent-cyan"
              >
                siambashar@gmail.com
              </a>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="bg-accent-purple/10 text-accent-purple flex h-12 w-12 items-center justify-center rounded-full">
              <FaWhatsapp size={20} />
            </div>

            <div>

              <p className="text-text-secondary text-sm">
                WhatsApp
              </p>

              <a
                href="https://wa.me/8801521729325"
                target="_blank"
                rel="noreferrer"
                className="text-text-primary transition hover:text-accent-cyan"
              >
                +880 1521-729325
              </a>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="bg-accent-cyan/10 text-accent-cyan flex h-12 w-12 items-center justify-center rounded-full">
              <MdLocationOn size={22} />
            </div>

            <div>

              <p className="text-text-secondary text-sm">
                Location
              </p>

              <p className="text-text-primary">
                {profile.location.present}
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-10">

        <Button
          asChild
          className="mb-8 w-full"
        >
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFileDownload />

            Download Resume

          </a>
        </Button>

        <ContactSocial />

      </div>

    </Card>
  );
}