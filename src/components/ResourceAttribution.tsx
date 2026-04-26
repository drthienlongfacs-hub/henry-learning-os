'use client';

// ========================================
// ResourceAttribution — displays source info
// Shows source name, license badge, link, date
// ========================================

import type { ResourceAttribution as Attribution } from '@/types/resource-types';

interface Props {
    attribution: Attribution;
    compact?: boolean;
}

export function ResourceAttribution({ attribution, compact = false }: Props) {
    if (compact) {
        return (
            <span className="text-xs text-gray-500 dark:text-gray-400">
                Source:{' '}
                <a
                    href={attribution.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-500"
                >
                    {attribution.sourceName}
                </a>
                {attribution.license && (
                    <span className="ml-1 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium">
                        {attribution.license}
                    </span>
                )}
            </span>
        );
    }

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                    {attribution.title}
                </span>
                {attribution.license && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                        {attribution.license}
                    </span>
                )}
            </div>

            <div className="text-gray-500 dark:text-gray-400 text-xs space-y-0.5">
                {attribution.author && (
                    <div>Author: {attribution.author}</div>
                )}
                <div>
                    Source:{' '}
                    <a
                        href={attribution.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-500"
                    >
                        {attribution.sourceName}
                    </a>
                </div>
                {attribution.licenseUrl && (
                    <div>
                        License:{' '}
                        <a
                            href={attribution.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-500"
                        >
                            View terms
                        </a>
                    </div>
                )}
                <div className="text-[10px] text-gray-400">
                    Retrieved: {new Date(attribution.retrievedAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
