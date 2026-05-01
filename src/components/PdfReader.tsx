'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { lookupWord } from '@/lib/resources/adapters/dictionary-adapter';
import { X, Volume2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

// Set worker from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfReaderProps {
    fileUrl: string;
    onClose: () => void;
    title?: string;
}

export function PdfReader({ fileUrl, onClose, title }: PdfReaderProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Dictionary State
    const [selectedText, setSelectedText] = useState<string>('');
    const [definition, setDefinition] = useState<any>(null);
    const [dictLoading, setDictLoading] = useState(false);
    const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const handleTextSelection = async () => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
            setPopupPos(null);
            return;
        }

        const text = selection.toString().trim();
        // Only trigger if it's a single word or short phrase (max 3 words)
        const words = text.split(/\s+/);
        if (text && words.length <= 3 && /^[a-zA-Z\s'-]+$/.test(text)) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // Adjust position relative to container
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                setPopupPos({
                    x: rect.left - containerRect.left + (rect.width / 2),
                    y: rect.bottom - containerRect.top + 10, // Below the selection
                });
            }

            setSelectedText(text);
            setDictLoading(true);
            try {
                // Check if it's an English word to translate
                const defs = await lookupWord(text);
                setDefinition(defs ? defs : { error: 'Not found' });
            } catch {
                setDefinition({ error: 'Error fetching' });
            } finally {
                setDictLoading(false);
            }
        } else {
            setPopupPos(null);
        }
    };

    const playAudio = (url: string) => {
        new Audio(url).play();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f3f4f6', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: 600 }}>{title || 'PDF Reader'}</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setScale(s => Math.max(0.5, s - 0.2))}>A-</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setScale(s => Math.min(3, s + 0.2))}>A+</button>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={20} /></button>
                </div>
            </div>

            {/* Viewer */}
            <div 
                ref={containerRef}
                style={{ flex: 1, overflow: 'auto', position: 'relative', display: 'flex', justifyContent: 'center', padding: '20px' }}
                onMouseUp={handleTextSelection}
                onTouchEnd={handleTextSelection}
            >
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div style={{ padding: '2rem' }}><Loader2 className="animate-spin" /></div>}
                >
                    <Page 
                        pageNumber={pageNumber} 
                        scale={scale} 
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                    />
                </Document>

                {/* Dictionary Popup */}
                {popupPos && (
                    <div 
                        style={{
                            position: 'absolute',
                            top: popupPos.y,
                            left: popupPos.x,
                            transform: 'translateX(-50%)',
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                            padding: '12px',
                            width: '250px',
                            zIndex: 1000,
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>
                                {selectedText}
                            </div>
                            <button className="btn btn-ghost btn-sm" style={{ padding: '2px', minHeight: 0, height: 'auto' }} onClick={() => setPopupPos(null)}>
                                <X size={16} />
                            </button>
                        </div>
                        
                        {dictLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}><Loader2 size={16} className="animate-spin" /></div>
                        ) : definition && !definition.error ? (
                            <div>
                                {definition.phonetics && definition.phonetics[0]?.text && (
                                    <div style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>{definition.phonetics[0].text}</span>
                                        {definition.phonetics[0]?.audio && (
                                            <button onClick={() => playAudio(definition.phonetics[0].audio)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                <Volume2 size={14} color="#6366f1" />
                                            </button>
                                        )}
                                    </div>
                                )}
                                <div style={{ fontSize: '0.85rem', color: '#374151', maxHeight: '100px', overflowY: 'auto' }}>
                                    {definition.meanings?.[0]?.definitions?.[0]?.definition || 'No definition found.'}
                                </div>
                            </div>
                        ) : (
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                {definition?.error || 'Could not find definition.'}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {numPages > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '10px', background: '#fff', borderTop: '1px solid #e5e7eb' }}>
                    <button 
                        className="btn btn-primary btn-sm" 
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(p => p - 1)}
                    >
                        <ChevronLeft size={16} /> Prev
                    </button>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        Page {pageNumber} of {numPages}
                    </span>
                    <button 
                        className="btn btn-primary btn-sm" 
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber(p => p + 1)}
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
