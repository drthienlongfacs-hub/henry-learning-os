'use client';
import React, { useState, useMemo } from 'react';
import { WIKI_ENTRIES, WIKI_CATEGORIES, WIKI_STATS, searchWiki, getByCategory, getRelated, type WikiEntry, type WikiCategory } from '@/data/wiki-knowledge-base';
import {
  EVIDENCE_SOURCE_LEDGER_STATS,
  evidenceStatusLabel,
  getInternetEvidenceSource,
  getWikiEvidenceRecord,
} from '@/data/evidence-source-ledger';
import { Search, BookOpen, Link2, Tag, ArrowLeft, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

function EntryCard({ entry, vi, onSelect }: { entry: WikiEntry; vi: boolean; onSelect: (e: WikiEntry) => void }) {
  const cat = WIKI_CATEGORIES.find(c => c.key === entry.category);
  const evidence = getWikiEvidenceRecord(entry.id);
  return (
    <div onClick={() => onSelect(entry)} style={{
      padding: '0.8rem 1rem', borderRadius: '12px', background: '#fff',
      border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'all 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.9rem' }}>{cat?.icon}</span>
        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{entry.term}</span>
        <span style={{ fontSize: '0.65rem', color: cat?.color, fontWeight: 600 }}>
          {vi ? entry.termVi : ''}
        </span>
      </div>
      <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
        {vi ? entry.definitionVi : entry.definition}
      </div>
      {entry.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.2rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
          {evidence && (
            <span style={{
              padding: '1px 5px',
              borderRadius: '4px',
              background: evidence.status.includes('needs') ? '#fef3c7' : '#dcfce7',
              fontSize: '0.5rem',
              color: evidence.status.includes('needs') ? '#92400e' : '#166534',
              fontWeight: 700,
            }}>
              {vi ? evidenceStatusLabel(evidence.status) : evidence.status}
            </span>
          )}
          {entry.tags.slice(0, 3).map(t => (
            <span key={t} style={{ padding: '1px 5px', borderRadius: '4px', background: '#f1f5f9', fontSize: '0.5rem', color: '#64748b', fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function EntryDetail({ entry, vi, onBack, onSelect }: { entry: WikiEntry; vi: boolean; onBack: () => void; onSelect: (e: WikiEntry) => void }) {
  const cat = WIKI_CATEGORIES.find(c => c.key === entry.category);
  const related = getRelated(entry);
  const evidence = getWikiEvidenceRecord(entry.id);

  return (
    <div>
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'none',
        cursor: 'pointer', fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginBottom: '0.5rem', padding: 0,
      }}>
        <ArrowLeft size={14} /> {vi ? 'Quay lại' : 'Back'}
      </button>

      <div style={{
        background: `linear-gradient(135deg, ${cat?.color}11, ${cat?.color}08)`,
        borderRadius: '16px', border: `1px solid ${cat?.color}22`, padding: '1.25rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{cat?.icon}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b' }}>{entry.term}</div>
            <div style={{ fontSize: '0.75rem', color: cat?.color, fontWeight: 600 }}>{entry.termVi}</div>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.7, marginBottom: '0.5rem' }}>
          {vi ? entry.definitionVi : entry.definition}
        </div>

        {!vi && entry.definitionVi && (
          <div style={{ fontSize: '0.78rem', color: '#059669', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '0.5rem',
            borderLeft: '3px solid #10b981', paddingLeft: '0.6rem' }}>
            🇻🇳 {entry.definitionVi}
          </div>
        )}

        {entry.examples && entry.examples.length > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
              {vi ? '📌 Ví dụ:' : '📌 Examples:'}
            </div>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {entry.examples.map(ex => (
                <span key={ex} style={{
                  padding: '3px 8px', borderRadius: '6px', background: '#fff',
                  border: '1px solid #e2e8f0', fontSize: '0.72rem', color: '#334155', fontWeight: 600,
                }}>{ex}</span>
              ))}
            </div>
          </div>
        )}

        {entry.source && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.6rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ExternalLink size={10} /> {entry.source}
          </div>
        )}

        {evidence && (
          <div style={{ marginTop: '0.6rem', padding: '0.6rem', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.66rem', fontWeight: 800, color: evidence.status.includes('needs') ? '#92400e' : '#166534', marginBottom: '0.25rem' }}>
              {vi ? 'Evidence gate' : 'Evidence gate'}: {vi ? evidenceStatusLabel(evidence.status) : evidence.status} · {evidence.confidence}
            </div>
            <div style={{ fontSize: '0.62rem', color: '#475569', lineHeight: 1.5 }}>
              {evidence.operationalRule}
            </div>
            <div style={{ fontSize: '0.56rem', color: '#94a3b8', lineHeight: 1.45, marginTop: '0.25rem' }}>
              {evidence.caveat}
            </div>
            {evidence.internetSourceIds.length > 0 && (
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {evidence.internetSourceIds.map(sourceId => {
                  const source = getInternetEvidenceSource(sourceId);
                  return source ? (
                    <a key={sourceId} href={source.url} target="_blank" rel="noopener noreferrer" style={{
                      padding: '2px 6px', borderRadius: '5px', background: '#eff6ff', color: '#1d4ed8',
                      fontSize: '0.52rem', fontWeight: 700, textDecoration: 'none',
                    }}>
                      {source.provider}
                    </a>
                  ) : null;
                })}
              </div>
            )}
            {evidence.localEvidence.length > 0 && (
              <div style={{ marginTop: '0.35rem', fontSize: '0.54rem', color: '#64748b', lineHeight: 1.45 }}>
                {vi ? 'Evidence nội bộ' : 'Local evidence'}: {evidence.localEvidence.slice(0, 2).map(ref => ref.path).join(' · ')}
              </div>
            )}
          </div>
        )}

        {entry.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {entry.tags.map(t => (
              <span key={t} style={{
                padding: '2px 6px', borderRadius: '5px',
                background: t === 'evidence-based' ? '#dcfce7' : '#f1f5f9',
                color: t === 'evidence-based' ? '#16a34a' : '#64748b',
                fontSize: '0.55rem', fontWeight: 600,
              }}>
                <Tag size={8} style={{ display: 'inline', verticalAlign: 'middle' }} /> {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link2 size={12} /> {vi ? 'Liên kết:' : 'Related:'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {related.map(r => (
              <div key={r.id} onClick={() => onSelect(r)} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.6rem',
                borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', cursor: 'pointer',
              }}>
                <span style={{ fontSize: '0.8rem' }}>{WIKI_CATEGORIES.find(c => c.key === r.category)?.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b', flex: 1 }}>{r.term}</span>
                <ChevronRight size={12} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WikiExplorer({ lang }: { lang: string }) {
  const vi = lang === 'vi';
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<WikiCategory | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<WikiEntry | null>(null);

  const results = useMemo(() => {
    if (query) return searchWiki(query);
    if (selectedCat) return getByCategory(selectedCat);
    return WIKI_ENTRIES;
  }, [query, selectedCat]);

  return (
    <div style={{
      marginBottom: '1.5rem', background: '#fff', borderRadius: '20px',
      border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
        padding: '1rem 1.25rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <BookOpen size={18} color="#fff" />
            <h2 style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: '#fff' }}>
              {vi ? '📚 Wiki Tri Thức Học Tập' : '📚 Learning Knowledge Wiki'}
            </h2>
          </div>
          <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            {vi
              ? `${WIKI_STATS.totalEntries} mục • ${EVIDENCE_SOURCE_LEDGER_STATS.sourceBackedCount} source-backed • ${EVIDENCE_SOURCE_LEDGER_STATS.localEvidenceRefCount} evidence nội bộ`
              : `${WIKI_STATS.totalEntries} entries • ${EVIDENCE_SOURCE_LEDGER_STATS.sourceBackedCount} source-backed • ${EVIDENCE_SOURCE_LEDGER_STATS.localEvidenceRefCount} local evidence refs`}
          </p>
        </div>
      </div>

      <div style={{ padding: '0.75rem 1.25rem' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text" value={query}
            onChange={e => { setQuery(e.target.value); setSelectedEntry(null); setSelectedCat(null); }}
            placeholder={vi ? 'Tìm kiếm: phonics, grammar, spaced repetition...' : 'Search: phonics, grammar, spaced repetition...'}
            style={{
              width: '100%', minHeight: 34, boxSizing: 'border-box', padding: '8px 12px 8px 30px', borderRadius: '10px',
              border: '1px solid #e2e8f0', fontSize: '0.75rem', outline: 'none',
              background: '#f8fafc',
            }}
          />
        </div>

        {/* Category pills */}
        {!selectedEntry && (
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <button onClick={() => { setSelectedCat(null); setQuery(''); }} style={{
              minHeight: 28, padding: '5px 10px', borderRadius: '7px', border: 'none', cursor: 'pointer',
              fontSize: '0.58rem', fontWeight: !selectedCat ? 700 : 500,
              background: !selectedCat ? '#0f766e' : '#f1f5f9',
              color: !selectedCat ? '#fff' : '#64748b',
            }}>{vi ? 'Tất cả' : 'All'}</button>
            {WIKI_CATEGORIES.map(c => (
              <button key={c.key} onClick={() => { setSelectedCat(c.key); setQuery(''); setSelectedEntry(null); }} style={{
                minHeight: 28, padding: '5px 10px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                fontSize: '0.58rem', fontWeight: selectedCat === c.key ? 700 : 500,
                background: selectedCat === c.key ? c.color : '#f8fafc',
                color: selectedCat === c.key ? '#fff' : '#64748b',
              }}>{c.icon} {vi ? c.labelVi : c.label}</button>
            ))}
          </div>
        )}

        {/* Detail view */}
        {selectedEntry ? (
          <EntryDetail entry={selectedEntry} vi={vi} onBack={() => setSelectedEntry(null)} onSelect={setSelectedEntry} />
        ) : (
          /* List view */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '400px', overflowY: 'auto' }}>
            {results.length === 0 && (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.78rem' }}>
                {vi ? 'Không tìm thấy kết quả' : 'No results found'}
              </div>
            )}
            {results.map(e => <EntryCard key={e.id} entry={e} vi={vi} onSelect={setSelectedEntry} />)}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '0.5rem', fontSize: '0.5rem', color: '#94a3b8', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={8} />
          {vi ? `Tri thức có ledger: ${EVIDENCE_SOURCE_LEDGER_STATS.internetSourceCount} nguồn internet đã kiểm, ${EVIDENCE_SOURCE_LEDGER_STATS.needsReviewCount} mục chưa được claim mạnh.`
            : `Knowledge with ledger: ${EVIDENCE_SOURCE_LEDGER_STATS.internetSourceCount} verified internet sources, ${EVIDENCE_SOURCE_LEDGER_STATS.needsReviewCount} items held for review.`}
        </div>
      </div>
    </div>
  );
}
