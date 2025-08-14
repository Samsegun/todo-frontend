import type { ReactNode } from "react";

function PageHeader({ children }: { children: ReactNode }) {
    return <h1 className='text-2xl font-bold md:text-3xl'>{children}</h1>;
}

export default PageHeader;
