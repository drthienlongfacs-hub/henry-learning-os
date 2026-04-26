// ========================================
// Resource Registry — register and lookup adapters
// ========================================

import type { ExternalResourceAdapter, ResourceQuery, NormalizedLearningResource } from '@/types/resource-types';

const adapters = new Map<string, ExternalResourceAdapter>();

export function registerAdapter(adapter: ExternalResourceAdapter): void {
    adapters.set(adapter.id, adapter);
}

export function getAdapter(id: string): ExternalResourceAdapter | undefined {
    return adapters.get(id);
}

export function listAdapters(): ExternalResourceAdapter[] {
    return Array.from(adapters.values());
}

/**
 * Search across all registered adapters.
 * Returns a flat array of normalized resources with their provider tagged.
 */
export async function searchAll(
    query: ResourceQuery,
    adapterIds?: string[],
): Promise<NormalizedLearningResource[]> {
    const targets = adapterIds
        ? adapterIds.map(id => adapters.get(id)).filter(Boolean) as ExternalResourceAdapter[]
        : Array.from(adapters.values());

    const results = await Promise.allSettled(
        targets.map(adapter => adapter.fetchMetadata(query)),
    );

    return results
        .filter((r): r is PromiseFulfilledResult<NormalizedLearningResource[]> =>
            r.status === 'fulfilled'
        )
        .flatMap(r => r.value);
}
