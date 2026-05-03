// ========================================
// Resource Registry Initialization
// Registers all MVP adapters on import
// ========================================

import { registerAdapter } from '@/lib/resources/resource-registry';
import { internalAdapter } from '@/lib/resources/adapters/internal-adapter';
import { openLibraryAdapter } from '@/lib/resources/adapters/open-library-adapter';
import { gutendexAdapter } from '@/lib/resources/adapters/gutendex-adapter';
import { storyWeaverAdapter } from '@/lib/resources/adapters/storyweaver-adapter';

let initialized = false;

export function initResourceAdapters() {
    if (initialized) return;
    registerAdapter(internalAdapter);
    registerAdapter(openLibraryAdapter);
    registerAdapter(gutendexAdapter);
    registerAdapter(storyWeaverAdapter);
    initialized = true;
}
