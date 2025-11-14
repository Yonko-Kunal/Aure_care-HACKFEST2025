"use client";

import Avatar from "@/components/Avatar/Avatar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Avatar expression="listening" />
    </ProtectedRoute>
  );
}
