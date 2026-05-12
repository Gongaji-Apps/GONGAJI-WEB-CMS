'use client';

import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '@/components/layout/context/layoutcontext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';

interface ProvidersProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export default function Providers({ children }: ProvidersProps) {
    return (
        <PrimeReactProvider>
            <QueryClientProvider client={queryClient}>
                <LayoutProvider>{children}</LayoutProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </PrimeReactProvider>
    );
}
