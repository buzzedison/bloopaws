import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "./AdminSidebar";

export const metadata = {
    title: 'Bloop Console | Admin',
    description: 'Internal management console for Bloop Global.',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect("/login?redirect=/admin");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

    if (!profile || !profile.is_admin) {
        redirect("/");
    }

    return (
        <div className="fixed inset-0 z-[60] flex bg-white font-poppins overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 hidden md:flex flex-col">
                <AdminSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <main className="flex-1 overflow-y-auto focus:outline-none">
                    {children}
                </main>
            </div>
        </div>
    );
}
