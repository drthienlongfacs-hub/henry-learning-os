'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText, Upload, Trash2, BookOpen, ShieldCheck, HardDrive, AlertCircle } from 'lucide-react';
import {
    detectLocalTextbookFileType,
    formatFileSize,
    LOCAL_TEXTBOOK_DB_NAME,
    LOCAL_TEXTBOOK_DB_VERSION,
    LOCAL_TEXTBOOK_MAX_FILE_SIZE_BYTES,
    LOCAL_TEXTBOOK_STORE_NAME,
    normalizeLocalTextbookTitle,
    TEXTBOOK_EMBEDDING_AUDIT,
    type LocalTextbookRecord,
} from '@/lib/textbook/local-textbook';

interface LocalTextbookVaultProps {
    lang: 'vi' | 'en';
    onOpenTextbook: (book: LocalTextbookRecord) => void;
}

function openLocalTextbookDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(LOCAL_TEXTBOOK_DB_NAME, LOCAL_TEXTBOOK_DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(LOCAL_TEXTBOOK_STORE_NAME)) {
                const store = db.createObjectStore(LOCAL_TEXTBOOK_STORE_NAME, { keyPath: 'id' });
                store.createIndex('importedAt', 'importedAt');
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function readAllLocalTextbooks(): Promise<LocalTextbookRecord[]> {
    const db = await openLocalTextbookDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(LOCAL_TEXTBOOK_STORE_NAME, 'readonly');
        const store = tx.objectStore(LOCAL_TEXTBOOK_STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            db.close();
            resolve((request.result as LocalTextbookRecord[]).sort((a, b) => b.importedAt.localeCompare(a.importedAt)));
        };
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

async function saveLocalTextbook(record: LocalTextbookRecord): Promise<void> {
    const db = await openLocalTextbookDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(LOCAL_TEXTBOOK_STORE_NAME, 'readwrite');
        const store = tx.objectStore(LOCAL_TEXTBOOK_STORE_NAME);
        store.put(record);
        tx.oncomplete = () => {
            db.close();
            resolve();
        };
        tx.onerror = () => {
            db.close();
            reject(tx.error);
        };
    });
}

async function deleteLocalTextbook(id: string): Promise<void> {
    const db = await openLocalTextbookDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(LOCAL_TEXTBOOK_STORE_NAME, 'readwrite');
        tx.objectStore(LOCAL_TEXTBOOK_STORE_NAME).delete(id);
        tx.oncomplete = () => {
            db.close();
            resolve();
        };
        tx.onerror = () => {
            db.close();
            reject(tx.error);
        };
    });
}

function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? ''));
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? ''));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

function createRecordId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `local-textbook-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}

export function LocalTextbookVault({ lang, onOpenTextbook }: LocalTextbookVaultProps) {
    const [books, setBooks] = useState<LocalTextbookRecord[]>([]);
    const [status, setStatus] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [busy, setBusy] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const refreshBooks = async () => {
        if (typeof indexedDB === 'undefined') return;
        setBooks(await readAllLocalTextbooks());
    };

    useEffect(() => {
        let active = true;

        readAllLocalTextbooks()
            .then(records => {
                if (active) setBooks(records);
            })
            .catch(() => {
                if (active) {
                    setError(lang === 'vi'
                        ? 'Trình duyệt này chưa cho phép lưu sách cục bộ.'
                        : 'This browser does not allow local textbook storage.');
                }
            });

        return () => {
            active = false;
        };
    }, [lang]);

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setBusy(true);
        setError('');
        setStatus('');

        try {
            for (const file of Array.from(files)) {
                const fileType = detectLocalTextbookFileType(file.name, file.type);
                if (!fileType) {
                    throw new Error(lang === 'vi'
                        ? `Chưa hỗ trợ định dạng: ${file.name}`
                        : `Unsupported file type: ${file.name}`);
                }
                if (file.size > LOCAL_TEXTBOOK_MAX_FILE_SIZE_BYTES) {
                    throw new Error(lang === 'vi'
                        ? `${file.name} vượt giới hạn ${formatFileSize(LOCAL_TEXTBOOK_MAX_FILE_SIZE_BYTES)}.`
                        : `${file.name} is larger than ${formatFileSize(LOCAL_TEXTBOOK_MAX_FILE_SIZE_BYTES)}.`);
                }

                const textContent = fileType === 'text' || fileType === 'markdown'
                    ? await readFileAsText(file)
                    : undefined;
                const dataUrl = fileType === 'pdf' || fileType === 'epub'
                    ? await readFileAsDataUrl(file)
                    : undefined;

                await saveLocalTextbook({
                    id: createRecordId(),
                    title: normalizeLocalTextbookTitle(file.name) || file.name,
                    fileName: file.name,
                    fileType,
                    mimeType: file.type || 'application/octet-stream',
                    sizeBytes: file.size,
                    importedAt: new Date().toISOString(),
                    sourceLabel: lang === 'vi' ? 'File gia đình đã chọn trên thiết bị này' : 'Family-selected file on this device',
                    rightsNote: lang === 'vi'
                        ? 'Chỉ lưu trong trình duyệt của gia đình; không đưa file vào GitHub/public web.'
                        : 'Stored only in this family browser; not committed to GitHub or the public web.',
                    textContent,
                    dataUrl,
                });
            }

            await refreshBooks();
            setStatus(lang === 'vi'
                ? 'Đã nhúng sách trực tiếp vào app trên thiết bị này.'
                : 'Textbook embedded directly into this app on this device.');
        } catch (err) {
            setError(err instanceof Error ? err.message : (lang === 'vi' ? 'Không nhập được sách.' : 'Could not import textbook.'));
        } finally {
            setBusy(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleDelete = async (id: string) => {
        await deleteLocalTextbook(id);
        await refreshBooks();
        setStatus(lang === 'vi' ? 'Đã gỡ sách khỏi thiết bị này.' : 'Removed from this device.');
    };

    return (
        <div className="card" style={{
            marginBottom: '1rem',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(22,163,74,0.2)',
        }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: 'rgba(22,163,74,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                }}>
                    <HardDrive size={21} />
                </div>
                <div style={{ flex: 1, minWidth: 230 }}>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>
                        {lang === 'vi' ? 'Nhúng sách trực tiếp vào app' : 'Embed textbooks directly in the app'}
                    </div>
                    <p style={{ marginTop: '0.25rem', color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                        {lang === 'vi'
                            ? 'Chọn PDF/TXT/MD/EPUB từ thiết bị gia đình. App lưu vào IndexedDB của trình duyệt và mở sách ngay trong thư viện, không chỉ dẫn link.'
                            : 'Choose PDF/TXT/MD/EPUB from the family device. The app stores it in browser IndexedDB and opens it inside the library, not as a link-only entry.'}
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.epub,.txt,.md,.markdown,text/plain,application/pdf,application/epub+zip"
                    multiple
                    onChange={(event) => handleFiles(event.target.files)}
                    style={{ display: 'none' }}
                />
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => inputRef.current?.click()}
                    disabled={busy}
                    style={{ minHeight: 38 }}
                >
                    <Upload size={15} />
                    {busy
                        ? (lang === 'vi' ? 'Đang nhúng...' : 'Embedding...')
                        : (lang === 'vi' ? 'Chọn file sách' : 'Choose textbook file')}
                </button>
                <span className="badge" style={{ background: 'rgba(22,163,74,0.08)', color: '#16a34a', fontSize: '0.72rem' }}>
                    <ShieldCheck size={13} />
                    {lang === 'vi' ? `${books.length} sách đã nhúng` : `${books.length} embedded books`}
                </span>
                <span className="badge" style={{ background: 'rgba(15,23,42,0.05)', color: 'var(--color-text-secondary)', fontSize: '0.72rem' }}>
                    {lang === 'vi' ? 'PDF mở trực tiếp • TXT/MD có tra từ song ngữ' : 'PDF opens in-app • TXT/MD gets bilingual lookup'}
                </span>
            </div>

            {status && (
                <div style={{ marginTop: '0.65rem', color: '#16a34a', fontWeight: 800, fontSize: '0.76rem' }}>
                    {status}
                </div>
            )}
            {error && (
                <div style={{ marginTop: '0.65rem', color: '#dc2626', fontWeight: 800, fontSize: '0.76rem', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                    <AlertCircle size={14} /> {error}
                </div>
            )}

            {books.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.8rem' }}>
                    {books.map(book => (
                        <div key={book.id} style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto auto',
                            gap: '0.5rem',
                            alignItems: 'center',
                            border: '1px solid rgba(15,23,42,0.08)',
                            borderRadius: 10,
                            padding: '0.6rem',
                            background: 'rgba(15,23,42,0.02)',
                        }}>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 850, fontSize: '0.82rem' }}>
                                    <FileText size={15} color="var(--color-primary, #6366f1)" />
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</span>
                                </div>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.68rem', marginTop: '0.2rem' }}>
                                    {book.fileType.toUpperCase()} • {formatFileSize(book.sizeBytes)} • {new Date(book.importedAt).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US')}
                                </div>
                            </div>
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => onOpenTextbook(book)}
                                style={{ minHeight: 34, padding: '0.3rem 0.65rem', fontSize: '0.72rem' }}
                            >
                                <BookOpen size={14} /> {lang === 'vi' ? 'Đọc' : 'Read'}
                            </button>
                            <button
                                aria-label={lang === 'vi' ? `Gỡ ${book.title}` : `Remove ${book.title}`}
                                className="btn btn-sm btn-ghost"
                                onClick={() => handleDelete(book.id)}
                                style={{ minHeight: 34, padding: '0.3rem 0.45rem', color: '#dc2626' }}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div style={{
                marginTop: '0.75rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.68rem',
                lineHeight: 1.45,
            }}>
                {lang === 'vi'
                    ? `Audit: ${TEXTBOOK_EMBEDDING_AUDIT.storage}`
                    : `Audit: ${TEXTBOOK_EMBEDDING_AUDIT.storage}`}
            </div>
        </div>
    );
}
