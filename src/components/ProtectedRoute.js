"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
            } else {
                setIsChecking(false);
            }
        }
    }, [user, loading, router]);

    // Show loading state while checking auth or if not authenticated
    if (loading || isChecking || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
