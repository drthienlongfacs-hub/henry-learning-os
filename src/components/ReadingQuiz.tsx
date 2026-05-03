'use client';
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { TEXTBOOK_LIBRARY, type TextbookPassage } from '@/data/textbook-library';
import { lookupWord, type DictionaryEntry } from '@/lib/resources/adapters/dictionary-adapter';
import {
  buildReadingQuizEvidenceProfile,
  evaluateComprehensionAnswer,
  type ReadingEvidenceDecision,
  type ReadingQuizAttemptEvidence,
} from '@/lib/evidence/reading-quiz-evidence';
import {
  appendReadingQuizAttemptHistory,
  buildReadingQuizHistorySummary,
  getPassageReadingAttempts,
  readReadingQuizHistory,
  writeReadingQuizHistory,
} from '@/lib/evidence/reading-quiz-history';
import { BookOpen, CheckCircle, Sparkles, Brain, ChevronRight, RotateCcw, Volume2, X, Languages, Lightbulb, BookMarked, Loader2 } from 'lucide-react';

import { speak, speakLongPassage, preloadNeuralSpeech, pauseSpeech, resumeSpeech, stopSpeech, getVoiceDebugInfo, type Accent } from '@/lib/voiceEngine';
import { awardXP } from '@/lib/xpEngine';
import CelebrationOverlay from '@/components/gamification/CelebrationOverlay';

// ── Accent UI config (rendering only — voice logic is in voiceEngine.ts) ──
const ACC = [
  { k: 'en-US' as Accent, f: '🇺🇸', l: 'American' },
  { k: 'en-GB' as Accent, f: '🇬🇧', l: 'British' },
  { k: 'en-AU' as Accent, f: '🇦🇺', l: 'Australian' },
];

function WordPopup({word,onClose}:{word:string;onClose:()=>void}){
  const[entry,setEntry]=useState<DictionaryEntry|null>(null);
  const[loading,setLoading]=useState(true);
  React.useEffect(()=>{
    lookupWord(word.replace(/[^a-zA-Z'-]/g,'').toLowerCase()).then(r=>{setEntry(r);setLoading(false);});
  },[word]);
  return(
    <div style={{position:'fixed',inset:0,zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.35)',backdropFilter:'blur(3px)'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:'18px',width:'90%',maxWidth:'380px',padding:'1.2rem',boxShadow:'0 16px 40px rgba(0,0,0,0.15)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
          <span style={{fontWeight:800,fontSize:'1.1rem'}}>{word}</span>
          <button onClick={onClose} style={{border:'none',background:'#f1f5f9',borderRadius:'50%',width:26,height:26,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><X size={12}/></button>
        </div>
        {loading&&<div style={{textAlign:'center',padding:'1rem',color:'#6366f1'}}><Loader2 size={20} style={{animation:'spin 1s linear infinite'}}/></div>}
        {entry&&<>
          {entry.phonetic&&<div style={{fontSize:'0.78rem',color:'#6366f1',marginBottom:'0.3rem'}}>/{entry.phonetic}/</div>}
          <div style={{display:'flex',gap:'0.3rem',marginBottom:'0.5rem',flexWrap:'wrap'}}>
            {ACC.map(a=><button key={a.k} onClick={()=>speak(word,a.k,0.75)} style={{display:'flex',alignItems:'center',gap:'3px',padding:'3px 10px',borderRadius:'8px',border:'1px solid #e2e8f0',background:'#f8fafc',fontSize:'0.62rem',fontWeight:600,cursor:'pointer'}}><Volume2 size={10}/>{a.f}{a.l}</button>)}
          </div>
          {entry.meanings.slice(0,2).map((m,i)=><div key={i} style={{marginBottom:'0.4rem'}}>
            <span style={{padding:'1px 6px',borderRadius:'4px',background:'#eef2ff',color:'#4338ca',fontSize:'0.58rem',fontWeight:700}}>{m.partOfSpeech}</span>
            {m.definitions.slice(0,2).map((d,di)=><div key={di} style={{fontSize:'0.75rem',color:'#334155',margin:'0.2rem 0 0 0.5rem',lineHeight:1.5}}>{di+1}. {d.definition}{d.example&&<div style={{fontStyle:'italic',color:'#64748b',fontSize:'0.68rem'}}>&quot;{d.example}&quot;</div>}</div>)}
          </div>)}
        </>}
        {!loading&&!entry&&<div style={{fontSize:'0.78rem',color:'#94a3b8',padding:'0.5rem'}}>Không tìm thấy</div>}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function getAll():TextbookPassage[]{
  const a:TextbookPassage[]=[];
  for(const e of TEXTBOOK_LIBRARY) for(const p of e.passages) if(p.comprehensionChecks.length>0) a.push(p);
  return a;
}

type Tab='read'|'bilingual'|'hard'|'vocab';

const DECISION_LABELS:Record<ReadingEvidenceDecision,{vi:string;en:string;color:string;bg:string}>={
  collect_evidence:{vi:'Cần thêm dữ liệu',en:'Collect evidence',color:'#2563eb',bg:'#eff6ff'},
  repair:{vi:'Ôn lại ý trong bài',en:'Repair understanding',color:'#dc2626',bg:'#fee2e2'},
  practice:{vi:'Luyện cùng mức',en:'Practice at this level',color:'#d97706',bg:'#fef3c7'},
  stretch:{vi:'Thêm thử thách',en:'Ready to stretch',color:'#059669',bg:'#dcfce7'},
};

export default function ReadingQuiz({lang}:{lang:string}){
  const passages=useMemo(()=>getAll(),[]);
  const[idx,setIdx]=useState(0);
  const[tab,setTab]=useState<Tab>('read');
  const[selWord,setSelWord]=useState<string|null>(null);
  const[accent,setAccent]=useState<Accent>('en-US');
  const[speed,setSpeed]=useState(0.85);
  const[answers,setAnswers]=useState<Record<number,string>>({});
  const[checked,setChecked]=useState<Record<number,'correct'|'hint'>>({});
  const[hints,setHints]=useState<Record<number,boolean>>({});
  const[attempts,setAttempts]=useState<ReadingQuizAttemptEvidence[]>([]);
  const[historyHydrated,setHistoryHydrated]=useState(false);
  const[score,setScore]=useState(0);
  const[done,setDone]=useState(false);
  const[celebration,setCelebration]=useState<{type:'correct'|'perfect'|'streak';xp:number}|null>(null);
  const[speakingIdx,setSpeakingIdx]=useState<number|null>(null);
  const[isPaused,setIsPaused]=useState(false);
  const[isFullPlaying,setIsFullPlaying]=useState(false);
  const speakingRef=useRef(false);

  const p=passages[idx%passages.length]??null;
  const passageText=p?.text??'';
  const vi=lang==='vi';
  const passageQuestionCounts=useMemo<Record<string,number>>(()=>Object.fromEntries(
    passages.map(passage=>[passage.id,passage.comprehensionChecks.length])
  ),[passages]);
  const passageAttempts=useMemo(()=>p?getPassageReadingAttempts(attempts,p.id):[],[attempts,p]);
  const historySummary=useMemo(()=>buildReadingQuizHistorySummary({
    attempts,
    passageQuestionCounts,
  }),[attempts,passageQuestionCounts]);
  const evidenceProfile=p?buildReadingQuizEvidenceProfile({
    passageId:p.id,
    questionCount:p.comprehensionChecks.length,
    attempts:passageAttempts,
  }):null;

  // Split passage text into sentences for sentence-level TTS
  const sentences=useMemo(()=>p?(p.text.match(/[^.!?]+[.!?]+/g)||[p.text]):[],[p]);

  // Sequential reading: highlight each sentence as it's read aloud
  const speakSequential=useCallback((startFrom=0)=>{
    if(speakingRef.current){stopSpeech();speakingRef.current=false;setSpeakingIdx(null);setIsPaused(false);return;}
    speakingRef.current=true;setIsPaused(false);
    const readNext=(i:number)=>{
      if(i>=sentences.length||!speakingRef.current){setSpeakingIdx(null);speakingRef.current=false;return;}
      const sentence=sentences[i];
      if(!sentence){setSpeakingIdx(null);speakingRef.current=false;return;}
      setSpeakingIdx(i);
      speak(sentence.trim(),accent,speed,()=>readNext(i+1));
    };
    readNext(startFrom);
  },[sentences,accent,speed]);

  // Full passage playback with onEnd
  const speakFullPassage=useCallback(()=>{
    if(isFullPlaying){stopSpeech();setIsFullPlaying(false);setIsPaused(false);return;}
    setIsFullPlaying(true);setIsPaused(false);
    if(!p) return;
    speakLongPassage(p.text,accent,speed,()=>{setIsFullPlaying(false);setIsPaused(false);});
  },[p,accent,speed,isFullPlaying]);

  // Toggle pause/resume for any active speech
  const togglePause=useCallback(()=>{
    if(isPaused){resumeSpeech();setIsPaused(false);}
    else{pauseSpeech();setIsPaused(true);}
  },[isPaused]);

  useEffect(()=>{
    const timeout=window.setTimeout(()=>{
      setAttempts(readReadingQuizHistory());
      setHistoryHydrated(true);
    },0);
    return ()=>window.clearTimeout(timeout);
  },[]);

  useEffect(()=>{
    if(!passageText) return undefined;
    const timeout=window.setTimeout(()=>{
      void preloadNeuralSpeech(passageText,accent,speed);
    },3500);
    return ()=>window.clearTimeout(timeout);
  },[passageText,accent,speed]);

  if(!p||!evidenceProfile) return null;

  const handleCheck=(i:number)=>{
    const answer=answers[i]||'';
    const evaluation=evaluateComprehensionAnswer(answer,p.comprehensionChecks[i].answerHint);
    setAttempts(prev=>{
      const next=appendReadingQuizAttemptHistory(prev,{
        id:`${p.id}-${i}-${prev.filter(a=>a.passageId===p.id&&a.questionIndex===i).length+1}-${Date.now()}`,
        passageId:p.id,
        questionIndex:i,
        answer,
        isCorrect:evaluation.isCorrect,
        hintUsedBeforeAttempt:hints[i]===true,
        hintShownAfterAttempt:!evaluation.isCorrect,
        matchedTerms:evaluation.matchedTerms,
        expectedTerms:evaluation.expectedTerms,
        createdAt:new Date().toISOString(),
      });
      writeReadingQuizHistory(next);
      return next;
    });
    if(evaluation.isCorrect){
      setChecked(x=>({...x,[i]:'correct'}));
      if(checked[i]!=='correct'){
        setScore(s=>s+1);
        // Award XP + show celebration
        const xpResult=awardXP('quiz_correct');
        setCelebration({type:'correct',xp:xpResult.earnedXP});
      }
    }
    else{setChecked(x=>({...x,[i]:'hint'}));setHints(x=>({...x,[i]:true}));}
  };

  const next=()=>{setIdx(i=>i+1);setAnswers({});setChecked({});setHints({});setTab('read');if(idx+1>=passages.length)setDone(true);};
  const restart=()=>{setIdx(0);setAnswers({});setChecked({});setHints({});setScore(0);setDone(false);setTab('read');};

  const TABS:{key:Tab;icon:React.ReactNode;label:string}[]=[
    {key:'read',icon:<BookOpen size={13}/>,label:vi?'Đọc':'Read'},
    {key:'bilingual',icon:<Languages size={13}/>,label:vi?'Song ngữ':'Bilingual'},
    {key:'hard',icon:<Lightbulb size={13}/>,label:vi?'Câu khó':'Quiz'},
    {key:'vocab',icon:<BookMarked size={13}/>,label:vi?'Từ vựng':'Vocab'},
  ];

  return(
    <div style={{marginBottom:'1.5rem',background:'#fff',borderRadius:'20px',border:'1px solid rgba(0,0,0,0.06)',overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#059669,#10b981)',padding:'1rem 1.25rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-15,right:-15,width:80,height:80,borderRadius:'50%',background:'rgba(255,255,255,0.1)'}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.2rem'}}>
            <Brain size={18} color="#fff"/>
            <h2 style={{fontWeight:800,fontSize:'0.95rem',margin:0,color:'#fff'}}>{vi?'📖 Luyện Đọc & Phát Âm':'📖 Reading & Pronunciation'}</h2>
          </div>
          <p style={{fontSize:'0.65rem',color:'rgba(255,255,255,0.85)',margin:0}}>
            {vi?`Bài ${idx+1}/${passages.length} • Điểm phiên này: ${score} ⭐ • Real data: ${historySummary.attemptCount} lần thử`:`Passage ${idx+1}/${passages.length} • Session score: ${score} ⭐ • Real data: ${historySummary.attemptCount} attempts`}
          </p>
        </div>
      </div>

      {/* Accent + Speed */}
      <div style={{padding:'0.5rem 1.25rem 0',display:'flex',alignItems:'center',gap:'0.4rem',flexWrap:'wrap'}}>
        <span style={{fontSize:'0.58rem',color:'#64748b',fontWeight:600}}>🔊</span>
        {ACC.map(a=><button key={a.k} onClick={()=>setAccent(a.k)} style={{minHeight:28,padding:'5px 9px',borderRadius:'8px',border:'none',cursor:'pointer',fontSize:'0.58rem',fontWeight:accent===a.k?700:500,background:accent===a.k?'#059669':'#f1f5f9',color:accent===a.k?'#fff':'#475569'}}>{a.f}{a.l}</button>)}
        <span style={{color:'#e2e8f0'}}>|</span>
        {[0.6,0.75,0.85,1.0].map(s=><button key={s} onClick={()=>setSpeed(s)} style={{minWidth:34,minHeight:28,padding:'5px 7px',borderRadius:'7px',border:'none',cursor:'pointer',fontSize:'0.56rem',fontWeight:speed===s?700:400,background:speed===s?'#4f46e5':'transparent',color:speed===s?'#fff':'#94a3b8'}}>{s}x</button>)}
      </div>
      {/* Voice indicator */}
      <div style={{padding:'0 1.25rem',marginTop:'2px'}}>
        <span style={{fontSize:'0.48rem',color:'#94a3b8',fontStyle:'italic'}}>
          {getVoiceDebugInfo(accent)}
        </span>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',padding:'0.4rem 1.25rem 0',borderBottom:'1px solid #f1f5f9'}}>
        {TABS.map(t=><button key={t.key} onClick={()=>setTab(t.key)} style={{display:'flex',alignItems:'center',gap:'4px',flex:1,padding:'7px 0',border:'none',cursor:'pointer',background:'transparent',justifyContent:'center',fontSize:'0.66rem',fontWeight:tab===t.key?700:500,color:tab===t.key?'#059669':'#94a3b8',borderBottom:tab===t.key?'2px solid #059669':'2px solid transparent'}}>{t.icon}{t.label}</button>)}
      </div>

      <div style={{padding:'1rem 1.25rem'}}>
        {done?(
          <div style={{textAlign:'center',padding:'2rem 0'}}>
            <div style={{fontSize:'3rem',marginBottom:'0.5rem'}}>🎉</div>
            <div style={{fontWeight:800,fontSize:'1.1rem',color:'#059669'}}>{vi?'Hoàn thành!':'All Done!'}</div>
            <div style={{fontSize:'0.82rem',color:'#64748b',margin:'0.3rem 0 1rem'}}>Điểm: {score} ⭐</div>
            <button onClick={restart} style={{padding:'10px 24px',borderRadius:'12px',border:'none',background:'linear-gradient(135deg,#059669,#10b981)',color:'#fff',fontWeight:700,fontSize:'0.82rem',cursor:'pointer'}}><RotateCcw size={14}/> {vi?'Làm lại':'Restart'}</button>
          </div>
        ):(
          <>
            {/* ===== TAB: READ — full passage + sentence TTS ===== */}
            {tab==='read'&&<div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.4rem'}}>
                <span style={{fontWeight:700,color:'#059669',fontSize:'0.85rem'}}>📖 {p.title}</span>
                <span style={{padding:'2px 8px',borderRadius:'6px',background:p.difficulty==='easy'?'#dcfce7':p.difficulty==='medium'?'#fef3c7':'#fee2e2',color:p.difficulty==='easy'?'#16a34a':p.difficulty==='medium'?'#d97706':'#dc2626',fontSize:'0.55rem',fontWeight:700,textTransform:'uppercase'}}>{p.difficulty}</span>
              </div>
              <div style={{fontSize:'0.58rem',color:'#64748b',marginBottom:'0.4rem',fontStyle:'italic'}}>
                {vi?'= Từ vựng chính (key word) - chạm để xem nghĩa':'= Key words — tap to see definition'}
              </div>

              {/* Full passage with tappable words */}
              <div style={{padding:'1rem',borderRadius:'14px',background:'#fafbfc',border:'1px solid #f1f5f9',lineHeight:2,fontSize:'0.92rem'}}>
                {p.text.split(/\s+/).map((w,i)=>{
                  const isKey=p.keyVocabulary.some(v=>w.toLowerCase().replace(/[^a-z]/g,'')===v.word.toLowerCase());
                  return <span key={i} onClick={()=>{const c=w.replace(/[^a-zA-Z'-]/g,'');if(c.length>=2)setSelWord(c);}} style={{cursor:'pointer',borderBottom:isKey?'2px solid #059669':'none',fontWeight:isKey?700:400,color:isKey?'#1e293b':'#334155',padding:'1px 0'}}>{w} </span>;
                })}
              </div>

              {/* Read buttons: full passage + sequential + pause/resume */}
              <div style={{display:'flex',gap:'0.35rem',margin:'0.6rem 0 0.3rem',flexWrap:'wrap'}}>
                <button onClick={speakFullPassage} style={{flex:1,minWidth:'120px',padding:'8px 12px',borderRadius:'10px',border:'none',background:isFullPlaying?'linear-gradient(135deg,#dc2626,#ef4444)':'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',fontWeight:600,fontSize:'0.65rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',justifyContent:'center'}}>
                  {isFullPlaying?'⏹':'🔊'} {vi?(isFullPlaying?'Dừng đọc':'Đọc toàn bài'):(isFullPlaying?'Stop':'Full passage')}
                </button>
                <button onClick={()=>speakSequential(0)} style={{flex:1,minWidth:'120px',padding:'8px 12px',borderRadius:'10px',border:'none',background:speakingIdx!==null?'linear-gradient(135deg,#dc2626,#ef4444)':'linear-gradient(135deg,#059669,#10b981)',color:'#fff',fontWeight:600,fontSize:'0.65rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',justifyContent:'center'}}>
                  {speakingIdx!==null?'⏹':'▶️'} {vi?(speakingIdx!==null?'Dừng':'Đọc tuần tự'):(speakingIdx!==null?'Stop':'Sequential')}
                </button>
                {(isFullPlaying||speakingIdx!==null)&&(
                  <button onClick={togglePause} style={{flex:'0 0 auto',padding:'8px 16px',borderRadius:'10px',border:'none',background:isPaused?'linear-gradient(135deg,#059669,#10b981)':'linear-gradient(135deg,#f59e0b,#fbbf24)',color:'#fff',fontWeight:700,fontSize:'0.65rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',justifyContent:'center',animation:isPaused?'pulse-soft 1.5s infinite':'none'}}>
                    {isPaused?'▶️':'⏸️'} {vi?(isPaused?'Tiếp tục':'Tạm dừng'):(isPaused?'Resume':'Pause')}
                  </button>
                )}
              </div>

              {/* Sentence-by-sentence reading with active highlight */}
              <div style={{marginTop:'0.5rem',fontSize:'0.6rem',color:'#64748b',fontWeight:600,marginBottom:'0.3rem'}}>{vi?'📢 Đọc từng câu (chạm ▶ để highlight theo):':'📢 Sentence by sentence (tap ▶ to follow along):'}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.3rem'}}>
                {sentences.map((s,i)=>{
                  const trimmed=s.trim();
                  if(!trimmed)return null;
                  const guide=p.sentenceGuides.find(g=>trimmed.includes(g.en.replace(/[.!?]+$/,'').slice(0,20)));
                  const isActive=speakingIdx===i;
                  return <div key={i} id={`sentence-${i}`} style={{display:'flex',alignItems:'flex-start',gap:'0.4rem',padding:'0.5rem 0.6rem',borderRadius:'10px',background:isActive?'linear-gradient(135deg,#eff6ff,#dbeafe)':i%2===0?'#f8fafc':'#fff',border:isActive?'2px solid #3b82f6':'1px solid #f1f5f9',transition:'all 0.25s ease',transform:isActive?'scale(1.01)':'none',boxShadow:isActive?'0 2px 12px rgba(59,130,246,0.15)':'none'}}>
                    <button onClick={()=>{setSpeakingIdx(i);speak(trimmed,accent,speed,()=>setSpeakingIdx(null));}} style={{flexShrink:0,border:'none',background:isActive?'#3b82f6':'#eef2ff',borderRadius:'50%',width:26,height:26,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'2px'}}><Volume2 size={11} color={isActive?'#fff':'#4f46e5'}/></button>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'0.8rem',color:isActive?'#1e40af':'#1e293b',lineHeight:1.6,fontWeight:isActive?600:400}}>{trimmed}</div>
                      {guide&&<div style={{fontSize:'0.68rem',color:'#059669',fontStyle:'italic',marginTop:'2px'}}>🇻🇳 {guide.vi}</div>}
                    </div>
                    {isActive&&<div style={{fontSize:'0.7rem',animation:'pulse-soft 1s infinite'}}>🔊</div>}
                  </div>;
                })}
              </div>

              {p.viSummary&&<div style={{marginTop:'0.5rem',fontSize:'0.72rem',color:'#64748b',fontStyle:'italic',borderLeft:'3px solid #10b981',paddingLeft:'0.6rem'}}>🇻🇳 {p.viSummary}</div>}
            </div>}

            {/* ===== TAB: BILINGUAL — full sentence-by-sentence EN/VI ===== */}
            {tab==='bilingual'&&<div>
              <div style={{fontWeight:700,color:'#059669',fontSize:'0.85rem',marginBottom:'0.5rem'}}>🌍 {p.title} — {vi?'Song ngữ toàn bài':'Full bilingual'}</div>

              {/* Full sentenceGuides: each sentence EN + VI + focus + keyTerms */}
              {p.sentenceGuides.length>0?(
                <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                  {p.sentenceGuides.map((g,i)=>(
                    <div key={i} style={{padding:'0.8rem',borderRadius:'12px',background:'#fafbfc',border:'1px solid #f1f5f9'}}>
                      <div style={{display:'flex',alignItems:'flex-start',gap:'0.4rem'}}>
                        <button onClick={()=>speak(g.en,accent,speed)} style={{flexShrink:0,border:'none',background:'#eef2ff',borderRadius:'50%',width:26,height:26,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'2px'}}><Volume2 size={11} color="#4f46e5"/></button>
                        <div style={{flex:1}}>
                          <div style={{fontSize:'0.88rem',fontWeight:600,color:'#1e293b',lineHeight:1.6}}>{g.en}</div>
                          <div style={{fontSize:'0.78rem',color:'#059669',fontStyle:'italic',marginTop:'3px'}}>{g.vi}</div>
                          {g.focus&&<div style={{fontSize:'0.62rem',color:'#64748b',marginTop:'4px'}}>📌 <strong>{vi?'Điểm cần hiểu':'Focus'}:</strong> {g.focus}</div>}
                          {g.keyTerms.length>0&&<div style={{display:'flex',gap:'0.2rem',flexWrap:'wrap',marginTop:'4px'}}>
                            {g.keyTerms.map(t=><span key={t} style={{padding:'1px 6px',borderRadius:'5px',background:'#eff6ff',color:'#2563eb',fontSize:'0.55rem',fontWeight:600}}>{t}</span>)}
                          </div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ):(
                /* Fallback: split sentences + viSummary */
                <div style={{display:'grid',gap:'0.6rem'}}>
                  <div style={{padding:'0.8rem',borderRadius:'12px',background:'#f0fdf4',border:'1px solid #bbf7d044'}}>
                    <div style={{fontSize:'0.6rem',fontWeight:700,color:'#059669',marginBottom:'0.3rem'}}>🇬🇧 English</div>
                    {sentences.map((s,i)=><div key={i} style={{fontSize:'0.82rem',lineHeight:1.7,color:'#1e293b',marginBottom:'0.2rem'}}>{s.trim()}</div>)}
                  </div>
                  {p.viSummary&&<div style={{padding:'0.8rem',borderRadius:'12px',background:'#eff6ff',border:'1px solid #bfdbfe44'}}>
                    <div style={{fontSize:'0.6rem',fontWeight:700,color:'#2563eb',marginBottom:'0.3rem'}}>🇻🇳 Tiếng Việt</div>
                    <div style={{fontSize:'0.82rem',lineHeight:1.7,color:'#1e293b'}}>{p.viSummary}</div>
                  </div>}
                </div>
              )}

              {/* Read all + pause */}
              <div style={{display:'flex',gap:'0.35rem',marginTop:'0.6rem'}}>
                <button onClick={speakFullPassage} style={{flex:1,padding:'8px 16px',borderRadius:'10px',border:'none',background:isFullPlaying?'linear-gradient(135deg,#dc2626,#ef4444)':'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',fontWeight:600,fontSize:'0.7rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',justifyContent:'center'}}>
                  {isFullPlaying?'⏹':'🔊'} {ACC.find(a=>a.k===accent)?.f} {vi?(isFullPlaying?'Dừng':'Nghe đọc toàn bài'):(isFullPlaying?'Stop':'Read full passage')}
                </button>
                {isFullPlaying&&(
                  <button onClick={togglePause} style={{flex:'0 0 auto',padding:'8px 14px',borderRadius:'10px',border:'none',background:isPaused?'linear-gradient(135deg,#059669,#10b981)':'linear-gradient(135deg,#f59e0b,#fbbf24)',color:'#fff',fontWeight:700,fontSize:'0.7rem',cursor:'pointer'}}>
                    {isPaused?'▶️':'⏸️'}
                  </button>
                )}
              </div>

              {p.viSummary&&<div style={{marginTop:'0.5rem',padding:'0.5rem',borderRadius:'8px',background:'#f0fdf4'}}>
                <button onClick={()=>{}} style={{border:'none',background:'transparent',cursor:'pointer',fontSize:'0.68rem',color:'#059669',fontWeight:600}}>✨ 🇻🇳 {vi?'Xem tóm tắt tiếng Việt':'Vietnamese summary'}</button>
                <div style={{fontSize:'0.72rem',color:'#334155',marginTop:'0.3rem',lineHeight:1.6}}>{p.viSummary}</div>
              </div>}
            </div>}

            {/* ===== TAB: QUIZ ===== */}
            {tab==='hard'&&<div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              <div style={{padding:'0.75rem 0.9rem',borderRadius:'12px',background:'#f8fafc',border:'1px solid #e2e8f0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'0.5rem',flexWrap:'wrap',marginBottom:'0.45rem'}}>
                  <span style={{fontSize:'0.72rem',fontWeight:800,color:'#1e293b'}}>{vi?'Bằng chứng đọc hiểu':'Reading evidence'}</span>
                  <span style={{padding:'2px 8px',borderRadius:'999px',fontSize:'0.58rem',fontWeight:800,color:DECISION_LABELS[evidenceProfile.decision].color,background:DECISION_LABELS[evidenceProfile.decision].bg}}>
                    {vi?DECISION_LABELS[evidenceProfile.decision].vi:DECISION_LABELS[evidenceProfile.decision].en}
                  </span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:'0.35rem',marginBottom:'0.45rem'}}>
                  {[
                    {k:vi?'Thử':'Attempts',v:evidenceProfile.attemptCount},
                    {k:vi?'Đúng':'Correct',v:`${evidenceProfile.completedQuestionCount}/${evidenceProfile.questionCount}`},
                    {k:vi?'Tự lực':'Independent',v:evidenceProfile.independentAccuracyPct===null?'--':`${evidenceProfile.independentAccuracyPct}%`},
                    {k:vi?'Gợi ý':'Hints',v:evidenceProfile.hintDependencyPct===null?'--':`${evidenceProfile.hintDependencyPct}%`},
                  ].map(item=><div key={item.k} style={{padding:'0.4rem',borderRadius:'8px',background:'#fff',border:'1px solid #eef2f7',minWidth:0}}>
                    <div style={{fontSize:'0.52rem',color:'#64748b',fontWeight:700,whiteSpace:'nowrap'}}>{item.k}</div>
                    <div style={{fontSize:'0.78rem',color:'#0f172a',fontWeight:850}}>{item.v}</div>
                  </div>)}
                </div>
                <div style={{fontSize:'0.64rem',color:'#475569',lineHeight:1.45}}>
                  {evidenceProfile.evidenceSummary} {evidenceProfile.nextLearningMove}
                </div>
                <div style={{fontSize:'0.58rem',color:'#94a3b8',lineHeight:1.4,marginTop:'0.25rem'}}>
                  {evidenceProfile.riskGuardrail}
                </div>
                <div style={{marginTop:'0.45rem',padding:'0.45rem 0.55rem',borderRadius:'8px',background:'#fff',border:'1px dashed #cbd5e1'}}>
                  <div style={{fontSize:'0.56rem',fontWeight:800,color:'#0f766e',marginBottom:'0.2rem'}}>
                    {vi?'Lịch sử đọc local':'Local reading history'} · {historySummary.status}
                  </div>
                  <div style={{fontSize:'0.6rem',color:'#475569',lineHeight:1.45}}>
                    {historyHydrated?(vi?historySummary.summaryVi:historySummary.summaryEn):(vi?'Đang đọc dữ liệu local...':'Loading local evidence...')}
                  </div>
                  <div style={{fontSize:'0.52rem',color:'#94a3b8',lineHeight:1.35,marginTop:'0.2rem'}}>
                    {vi?'Không lưu câu trả lời thô; chỉ lưu metadata đã redacted trên thiết bị này.':'Raw answers are not persisted; only redacted metadata stays on this device.'}
                  </div>
                </div>
              </div>
              {p.comprehensionChecks.map((c,i)=>(
                <div key={i} style={{padding:'0.75rem 1rem',borderRadius:'12px',background:checked[i]==='correct'?'#f0fdf4':checked[i]==='hint'?'#fef3c7':'#f8fafc',border:`1px solid ${checked[i]==='correct'?'#bbf7d0':checked[i]==='hint'?'#fde68a':'#e2e8f0'}`}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.4rem'}}>
                    {checked[i]==='correct'?<CheckCircle size={16} color="#16a34a"/>:checked[i]==='hint'?<Sparkles size={16} color="#d97706"/>:<span style={{fontWeight:700,fontSize:'0.8rem',color:'#6366f1'}}>Q{i+1}</span>}
                    <span style={{fontWeight:600,fontSize:'0.78rem',color:'#1e293b'}}>{c.question}</span>
                  </div>
                  {checked[i]!=='correct'&&<div style={{display:'flex',gap:'0.4rem',alignItems:'center'}}>
                    <input type="text" value={answers[i]||''} onChange={e=>setAnswers(x=>({...x,[i]:e.target.value}))} placeholder={vi?'Nhập câu trả lời...':'Type answer...'} onKeyDown={e=>e.key==='Enter'&&handleCheck(i)} style={{flex:1,padding:'6px 12px',borderRadius:'8px',border:'1px solid #e2e8f0',fontSize:'0.75rem',outline:'none'}}/>
                    <button onClick={()=>handleCheck(i)} style={{padding:'6px 14px',borderRadius:'8px',border:'none',background:'#4f46e5',color:'#fff',fontWeight:600,fontSize:'0.7rem',cursor:'pointer'}}>{vi?'Kiểm tra':'Check'}</button>
                  </div>}
                  {checked[i]==='correct'&&<span style={{fontSize:'0.7rem',color:'#16a34a',fontWeight:600}}>✅ {vi?'Đúng!':'Correct!'} +1 ⭐</span>}
                  {hints[i]&&<div style={{marginTop:'0.3rem',fontSize:'0.68rem',color:'#92400e',fontStyle:'italic'}}>💡 {vi?'Gợi ý':'Hint'}: {c.answerHint}</div>}
                </div>
              ))}
              {p.comprehensionChecks.every((_,i)=>checked[i])&&<button onClick={next} style={{marginTop:'0.5rem',padding:'10px 24px',borderRadius:'12px',border:'none',width:'100%',background:'linear-gradient(135deg,#059669,#10b981)',color:'#fff',fontWeight:700,fontSize:'0.82rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.4rem'}}><ChevronRight size={16}/>{vi?'Bài tiếp':'Next'}</button>}
            </div>}

            {/* ===== TAB: VOCAB with 3-accent ===== */}
            {tab==='vocab'&&<div style={{display:'grid',gap:'0.5rem'}}>
              {p.keyVocabulary.map(v=>(
                <div key={v.word} style={{padding:'0.6rem 0.8rem',borderRadius:'10px',background:'#f8fafc',border:'1px solid #f1f5f9'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.5rem',flexWrap:'wrap'}}>
                    <span style={{fontWeight:700,fontSize:'0.88rem',color:'#1e293b'}}>{v.word}</span>
                    {v.phonetic&&<span style={{fontSize:'0.68rem',color:'#6366f1',fontStyle:'italic'}}>{v.phonetic}</span>}
                    <span style={{fontSize:'0.72rem',color:'#059669'}}>{v.viMeaning}</span>
                  </div>
                  <div style={{display:'flex',gap:'0.25rem',marginTop:'0.3rem'}}>
                    {ACC.map(a=><button key={a.k} onClick={()=>speak(v.word,a.k,0.7)} style={{padding:'2px 7px',borderRadius:'6px',border:'1px solid #e2e8f0',background:'#fff',fontSize:'0.55rem',fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:'2px'}}><Volume2 size={9}/>{a.f}</button>)}
                  </div>
                </div>
              ))}
            </div>}
          </>
        )}

        <div style={{marginTop:'0.75rem',fontSize:'0.52rem',color:'#94a3b8',lineHeight:1.5}}>
          📋 {vi?'Bài đọc tự biên soạn theo CTGDPT 2018. Phát âm: Web Speech API. Từ điển: Free Dictionary API (CC BY-SA 3.0).':'Original content. Pronunciation: Web Speech API. Dictionary: Free Dictionary API (CC BY-SA 3.0).'}
        </div>
      </div>

      {selWord&&<WordPopup word={selWord} onClose={()=>setSelWord(null)}/>}
      {celebration && (
        <CelebrationOverlay
          type={celebration.type}
          xpGained={celebration.xp}
          onDone={() => setCelebration(null)}
        />
      )}
    </div>
  );
}
