'use client';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

import React from 'react';

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
