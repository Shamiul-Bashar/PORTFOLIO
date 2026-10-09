"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { resolveCertificateThumbnail } from "@/lib/certificates";
import type { Certificate } from "@/types/certificate";

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const isClickable = Boolean(certificate.fileUrl);
  const thumbnail = resolveCertificateThumbnail(certificate);
  const content = (
    <article className="group h-full overflow-hidden rounded-[9px] border border-white/10 bg-[#171717] transition-colors duration-300 hover:border-accent-cyan/40">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-[#202020]">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={certificate.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <Award size={39} strokeWidth={1.2} className="text-accent-cyan/55" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-text-secondary">
              {isClickable ? certificate.category : "Coming Soon"}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-cyan">{certificate.category}</span>
          {isClickable && <ArrowUpRight size={16} className="text-text-secondary transition-colors group-hover:text-accent-cyan" aria-hidden="true" />}
        </div>
        <h3 className="mt-4 font-heading text-[17px] font-bold leading-[1.45] tracking-[-0.035em] text-text-primary">
          {certificate.title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{certificate.issuer}</p>
        <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] text-text-secondary">{certificate.date}</p>
      </div>
    </article>
  );
  return (
    <motion.div whileHover={isClickable ? { y: -2 } : undefined} transition={{ duration: 0.2 }} className="h-full">
      {isClickable ? (
        <a href={certificate.fileUrl ?? undefined} target="_blank" rel="noopener noreferrer" className="block h-full" aria-label={`Open certificate: ${certificate.title}`}>
          {content}
        </a>
      ) : <div className="h-full">{content}</div>}
    </motion.div>
  );
}
