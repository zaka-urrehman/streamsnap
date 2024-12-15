import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default PageWrapper