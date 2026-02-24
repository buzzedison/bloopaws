'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
    LayoutDashboard,
    FileText,
    Mail,
    CheckSquare,
    Users,
    Newspaper,
    FolderOpen,
    LogOut,
    ExternalLink,
} from 'lucide-react';

const navigation = [
    { name: 'Overview',          href: '/admin',                  icon: LayoutDashboard },
    { name: 'Applications',      href: '/admin/applications',     icon: FileText },
    { name: 'Quiz Invitations',  href: '/admin/quiz-invitations', icon: Mail },
    { name: 'Quiz Submissions',  href: '/admin/quiz-submissions', icon: CheckSquare },
    { name: 'Referrals',         href: '/admin/referrals',        icon: Users },
    { name: 'Newsletter',        href: '/admin/newsletter',       icon: Newspaper },
    { name: 'Materials',         href: '/admin/materials',        icon: FolderOpen },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <aside className="h-full w-full bg-[#0F1117] flex flex-col select-none">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-white/[0.06] shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/30 shrink-0">
                        <span className="text-white font-black text-sm">B</span>
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm leading-none">Bloop Console</p>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-0.5">Admin</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                <p className="px-3 text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em] mb-2">
                    Menu
                </p>
                <ul className="space-y-0.5">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                                        isActive
                                            ? 'bg-red-600 text-white'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                                    }`}
                                >
                                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-white/[0.06] space-y-0.5 shrink-0">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                >
                    <ExternalLink className="w-4 h-4 shrink-0 text-slate-500" />
                    View Website
                </Link>
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
