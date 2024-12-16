"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useEffect, useState } from "react";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

    // doing this because of hydration error with next-themes if rendered on server
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <> {children} </>;
    }


    return (
        <NextThemesProvider
            {...props}
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </NextThemesProvider>
    );
}