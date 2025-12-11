import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/app.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("conversation", "routes/conversation.tsx"),
] satisfies RouteConfig;
