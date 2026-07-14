import { motion } from "framer-motion";
import Image from "next/image";

export interface ProjectGalleryProps {
  gallery: string[];
  title: string;
}

export function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      <h4 className="text-lg font-semibold text-text-primary">Gallery</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {gallery.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface glass-surface transition-shadow duration-300 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]"
          >
            <Image
              src={src}
              alt={`${title} gallery image ${index + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}