import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaFileLines, FaArrowUpRightFromSquare, FaFolderClosed } from "react-icons/fa6";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  onOpen(project: Project): void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in progress":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      default:
        return "bg-surface text-text-secondary border-border";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass-surface border border-border transition-shadow duration-300 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface transition-transform duration-500 group-hover:scale-110">
            <FaFolderClosed className="h-12 w-12 text-text-secondary opacity-50" />
          </div>
        )}

        {/* Status Badge */}
        <div
          className={cn(
            "absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
            getStatusColor(project.status)
          )}
        >
          {project.status}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-grow flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
            {project.category}
          </span>
          <span className="text-xs text-text-secondary">{project.year}</span>
        </div>

        <h3 className="text-xl font-bold text-text-primary transition-colors group-hover:text-accent-cyan">
          {project.title}
        </h3>

        <p className="line-clamp-2 text-sm text-text-secondary">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="mt-auto flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface border border-border px-2.5 py-1 text-[10px] font-medium text-text-secondary transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-full bg-surface border border-border px-2.5 py-1 text-[10px] font-medium text-text-secondary">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
          <Button
            onClick={() => onOpen(project)}
            variant="outline"
            className="w-full transition-all group-hover:border-accent-cyan group-hover:text-accent-cyan"
          >
            View Details
          </Button>

          <div className="flex flex-wrap gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source Code"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <FaGithub className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </a>
            )}
            {project.reportUrl && (
              <a
                href={project.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Project Report"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <FaFileLines className="mr-2 h-4 w-4" />
                  Report
                </Button>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Live Demo"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <FaArrowUpRightFromSquare className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}