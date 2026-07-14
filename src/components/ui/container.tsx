import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Every section wraps its content in <Container> instead of repeating
 * max-width/padding utilities inline — the single place to change the
 * page's horizontal rhythm.
 */
function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--container-max) px-6 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    />
  );
}

export { Container };
