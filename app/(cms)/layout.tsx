import React from "react";

export default function CMSLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return(
        <>
            {/* TODO : SIDE BAR */}
            <div>

            </div>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {/* TODO: HEADER */}
                <div>

                </div>
                {children}
            </main>
        </>
    );
}