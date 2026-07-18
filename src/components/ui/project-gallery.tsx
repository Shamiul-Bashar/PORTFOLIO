import { motion } from "framer-motion";
import Image from "next/image";

import { ProjectGalleryItem } from "@/types/project";

export interface ProjectGalleryProps {
  gallery: ProjectGalleryItem[];
  title: string;
}

export function ProjectGallery({
  gallery,
  title,
}: ProjectGalleryProps) {
  if (!gallery.length) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col gap-5">
      <h4 className="text-lg font-semibold text-text-primary">
        Project Gallery
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {gallery.map((item, index) => (
          <motion.div
            key={item.image}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl border border-border bg-surface glass-surface"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={item.image}
                alt={`${title} - ${item.title}`}
                fill
                loading="lazy"
                sizes="(max-width:768px)100vw,50vw"
                className="object-contain bg-black transition duration-500"
              />
            </div>

            <div className="space-y-2 p-4">
              <h5 className="font-semibold text-text-primary">
                {item.title}
              </h5>

              <p className="text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}