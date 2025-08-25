"use client";
import { IoReload } from "react-icons/io5";

import { Button } from "@/components/ui/button";

export default function GlobalError() {
  return (
    <html>
      <body>
        <main className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.reload();
              }}
              className="cursor-pointer"
            >
              <IoReload className="size-4" />
              Try again
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
