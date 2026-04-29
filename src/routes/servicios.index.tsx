import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/servicios/")({
  beforeLoad: () => {
    throw redirect({
      to: "/servicios/$slug",
      params: { slug: "diseno-civil-hidraulico" },
      replace: true,
    });
  },
});
