import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

interface AppShellProps {
    children: React.ReactNode;
    title?: string;
    showBottomNav?: boolean;
    fullWidth?: boolean;
}

export function AppShell({ children, title, showBottomNav = true, fullWidth = false }: AppShellProps) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">
            <TopBar title={title} />
            <main className={`pt-32 px-4 md:px-8 mx-auto h-full min-h-[calc(100vh-128px)] ${fullWidth ? 'max-w-7xl' : 'max-w-md md:max-w-2xl lg:max-w-4xl'}`}>
                {children}
            </main>
            {showBottomNav && <BottomNav />}
        </div>
    );
}
