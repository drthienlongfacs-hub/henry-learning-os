/**
 * pronunciationCoach.ts — Pronunciation Analysis & Coaching Engine
 * 
 * Benchmark: ELSA Speak + Lora English + LinguaKids
 * 
 * Features:
 * 1. Phoneme-level error detection (which sounds were wrong)
 * 2. Vietnamese-specific coaching tips (common L1 interference errors)
 * 3. Mouth position & articulation guidance
 * 4. IPA breakdown with color-coded feedback (green=correct, red=wrong)
 * 5. Practice drills for common error patterns
 * 
 * Architecture: Rule-based phoneme analysis (no ML dependency)
 * Uses Web Speech API transcript + target word + IPA database
 */

import { getOfflineIPA } from '@/data/ipaDatabase';

// ================================================================
// TYPES
// ================================================================
export interface PronunciationAnalysis {
  score: number;
  heard: string;
  target: string;
  targetIPA: string | null;
  // Phoneme-level feedback
  phonemeBreakdown: PhonemeResult[];
  // Vietnamese-specific coaching
  coachingTips: CoachingTip[];
  // Overall feedback
  overallFeedback: OverallFeedback;
  // Practice suggestion
  practiceDrill: PracticeDrill | null;
}

export interface PhonemeResult {
  phoneme: string;       // IPA symbol
  status: 'correct' | 'wrong' | 'missing' | 'extra';
  heardAs?: string;      // What it sounded like
  tip?: string;          // How to fix
}

export interface CoachingTip {
  icon: string;
  title: string;
  description: string;
  mouthPosition?: string;  // Mouth/tongue guidance
}

export interface OverallFeedback {
  emoji: string;
  label: string;
  color: string;
  encouragement: string;
}

export interface PracticeDrill {
  type: 'minimal_pair' | 'syllable_focus' | 'slow_repeat';
  words: string[];
  instruction: string;
}

// ================================================================
// VIETNAMESE L1 INTERFERENCE MAP
// Common pronunciation errors for Vietnamese speakers learning English
// Source: ELSA research + VN phonology studies
// ================================================================
const VN_ERROR_PATTERNS: Record<string, {
  confused_with: string[];
  tip: string;
  mouthPosition: string;
  icon: string;
}> = {
  // Final consonants (Vietnamese lacks most final consonants)
  '/d/': {
    confused_with: ['t', 'đ', 'silent'],
    tip: 'Âm /d/ cuối từ: Đặt đầu lưỡi chạm lợi trên, rung dây thanh nhẹ rồi thả ra. Khác với "đ" tiếng Việt!',
    mouthPosition: '👅 Đầu lưỡi chạm lợi → rung → thả',
    icon: '👅',
  },
  '/r/': {
    confused_with: ['silent', 'z', 'ɹ'],
    tip: 'Âm /r/: Cuộn đầu lưỡi hơi cong lên NHƯNG không chạm đâu cả. Khác hoàn toàn với "r" tiếng Việt!',
    mouthPosition: '👅 Cuộn lưỡi lên, không chạm lợi',
    icon: '🔄',
  },
  '/θ/': {
    confused_with: ['t', 's', 'f'],
    tip: 'Âm /θ/ (th): Đặt đầu lưỡi giữa 2 hàm răng, thổi hơi ra. Ví dụ: "thin", "three", "tooth".',
    mouthPosition: '👅 Lưỡi thò ra giữa 2 hàm răng → thổi',
    icon: '😛',
  },
  '/ð/': {
    confused_with: ['d', 'z', 'đ'],
    tip: 'Âm /ð/ (th rung): Giống /θ/ nhưng có rung dây thanh. Ví dụ: "the", "this", "that".',
    mouthPosition: '👅 Lưỡi giữa răng + rung thanh quản',
    icon: '😛',
  },
  '/ʃ/': {
    confused_with: ['s', 'x'],
    tip: 'Âm /ʃ/ (sh): Tròn môi, lưỡi nâng lên gần vòm miệng, thổi hơi mạnh. Ví dụ: "shoe", "ship".',
    mouthPosition: '👄 Tròn môi + lưỡi nâng cao',
    icon: '🫧',
  },
  '/tʃ/': {
    confused_with: ['t', 'ch', 'tr'],
    tip: 'Âm /tʃ/ (ch): Đầu lưỡi chạm lợi rồi thả ra nhanh, tròn môi. Ví dụ: "chair", "cheese".',
    mouthPosition: '👅 Chạm lợi → thả nhanh + tròn môi',
    icon: '💨',
  },
  '/dʒ/': {
    confused_with: ['d', 'gi', 'j'],
    tip: 'Âm /dʒ/ (j): Giống /tʃ/ nhưng có rung dây thanh. Ví dụ: "jump", "giraffe", "bridge".',
    mouthPosition: '👅 Chạm lợi → thả + rung thanh',
    icon: '💨',
  },
  '/ŋ/': {
    confused_with: ['n', 'ng'],
    tip: 'Âm /ŋ/ (ng): Giống "ng" cuối từ tiếng Việt, nhưng phải kéo dài. Cuối lưỡi chạm vòm mềm.',
    mouthPosition: '👅 Cuối lưỡi đẩy lên vòm mềm',
    icon: '🔔',
  },
  // Vowels
  '/æ/': {
    confused_with: ['e', 'a'],
    tip: 'Âm /æ/ (a mở): Há miệng rộng, lưỡi thấp phía trước. Khác với "e" và "a" tiếng Việt! Ví dụ: "cat", "bag".',
    mouthPosition: '😮 Há rộng hơn "e" nhưng ít hơn "a"',
    icon: '😮',
  },
  '/ɪ/': {
    confused_with: ['i', 'e'],
    tip: 'Âm /ɪ/ (i ngắn): NGẮN và nhẹ, không căng môi. Khác với "i" tiếng Việt (dài hơn). Ví dụ: "sit", "big".',
    mouthPosition: '😊 Lưỡi cao giữa, miệng hé',
    icon: '⏱️',
  },
  '/ʌ/': {
    confused_with: ['a', 'ă', 'ơ'],
    tip: 'Âm /ʌ/ (ơ ngắn): Miệng mở vừa, lưỡi ở giữa. Gần giống "ơ" tiếng Việt nhưng ngắn hơn. Ví dụ: "cup", "bus".',
    mouthPosition: '😐 Miệng mở vừa, lưỡi giữa',
    icon: '😐',
  },
  '/ɔː/': {
    confused_with: ['o', 'ô'],
    tip: 'Âm /ɔː/ (o dài): Tròn môi, kéo dài. Giống "ô" tiếng Việt nhưng dài hơn. Ví dụ: "door", "ball".',
    mouthPosition: '👄 Tròn môi rộng + kéo dài',
    icon: '⏳',
  },
  // Consonant clusters (Vietnamese has no clusters)
  'cluster': {
    confused_with: [],
    tip: 'Cụm phụ âm: Tiếng Việt không có cụm phụ âm. Tập nói từng phụ âm riêng rồi ghép lại nhanh dần. Ví dụ: s-t-r → str (street).',
    mouthPosition: '🎯 Tập chậm: s...t...r → st...r → str',
    icon: '🎯',
  },
};

// ================================================================
// WORD-LEVEL COACHING DATABASE
// Specific tips for commonly mispronounced Year 1 words
// ================================================================
const WORD_COACHING: Record<string, CoachingTip[]> = {
  'door': [{
    icon: '👅', title: 'Âm /d/ đầu từ',
    description: 'Đặt đầu lưỡi chạm lợi trên, rung nhẹ rồi thả. Không phải "đo" tiếng Việt!',
    mouthPosition: '👅→lợi, rung, thả → "dɔːr"',
  }, {
    icon: '⏳', title: 'Âm /ɔːr/ cuối từ', 
    description: 'Kéo dài nguyên âm "oo", tròn môi, rồi nhẹ cuộn lưỡi (r). Không tắt đột ngột!',
    mouthPosition: '👄 Tròn môi + kéo dài + cuộn lưỡi nhẹ',
  }],
  'three': [{
    icon: '😛', title: 'Âm /θr/ — cụm khó nhất!',
    description: 'Lưỡi thò giữa răng (th) rồi nhanh chóng cuộn lưỡi (r). Tập chậm: th...r...ee',
    mouthPosition: '😛 Lưỡi giữa răng → cuộn lưỡi → "ee"',
  }],
  'this': [{
    icon: '😛', title: 'Âm /ð/ — "th" rung',
    description: 'Đặt đầu lưỡi giữa 2 hàm răng, RỒI rung dây thanh. Khác "d" tiếng Việt!',
    mouthPosition: '😛 Lưỡi giữa răng + rung thanh quản',
  }],
  'fish': [{
    icon: '🫧', title: 'Âm /ʃ/ cuối từ',
    description: 'Tròn môi, lưỡi nâng lên, thổi hơi ra. Không phải "phít" hay "fis"!',
    mouthPosition: '👄 Tròn môi + thổi mạnh cuối',
  }],
  'chair': [{
    icon: '💨', title: 'Âm /tʃ/ đầu từ',
    description: 'Đầu lưỡi chạm lợi rồi thả nhanh kèm luồng hơi mạnh. Giống "ch" nhưng mạnh hơn.',
    mouthPosition: '👅 Chạm lợi → thả → hơi bật ra mạnh',
  }],
  'giraffe': [{
    icon: '💨', title: 'Âm /dʒ/ đầu từ',
    description: 'Phát âm "juh" — lưỡi chạm lợi rồi thả, rung dây thanh. Không phải "gi" tiếng Việt!',
    mouthPosition: '👅 Chạm lợi → thả + rung thanh → /dʒɪˈræf/',
  }],
  'short': [{
    icon: '🫧', title: 'Âm /ʃ/ đầu từ',
    description: 'Tròn môi nhẹ, lưỡi nâng. Không phải "s" hay "x"! Phân biệt: "ship" vs "sip".',
    mouthPosition: '👄 Tròn môi → "sh" + "ort"',
  }],
  'circle': [{
    icon: '🔄', title: 'Hai âm /s/ và /k/',
    description: 'Bắt đầu bằng "s" nhẹ, rồi "er" (cuộn lưỡi), rồi "kl". Tập: "sir" + "kl".',
    mouthPosition: '🎯 s→ɜːr→k→l',
  }],
  'square': [{
    icon: '🎯', title: 'Cụm /skw/ — 3 phụ âm liền!',
    description: 'Tập chậm: s...k...w...air. Nối dần: sk...w → skw. Môi tròn ở "w".',
    mouthPosition: '🎯 s→k→w(tròn môi)→air',
  }],
};

// ================================================================
// MINIMAL PAIRS for practice drills
// ================================================================
const MINIMAL_PAIRS: Record<string, string[]> = {
  '/θ/': ['thin/tin', 'three/tree', 'think/sink', 'bath/bat'],
  '/ð/': ['the/duh', 'this/dis', 'they/day', 'breathe/breed'],
  '/ʃ/': ['ship/sip', 'shop/sop', 'she/see', 'shoe/sue'],
  '/tʃ/': ['chair/share', 'cheap/sheep', 'chin/shin'],
  '/dʒ/': ['jam/yam', 'jet/yet', 'jeer/year'],
  '/r/': ['right/light', 'red/led', 'road/load', 'rain/lane'],
  '/æ/': ['cat/cut', 'bat/but', 'bag/bug', 'hat/hut'],
  '/ɪ/': ['sit/set', 'bit/bet', 'live/leave', 'ship/sheep'],
  '/ʌ/': ['cup/cap', 'cut/cat', 'bus/boss', 'hut/hot'],
};

// ================================================================
// CORE ANALYSIS FUNCTION
// ================================================================
export function analyzePronunciation(
  targetWord: string,
  heardText: string,
  score: number
): PronunciationAnalysis {
  const target = targetWord.toLowerCase().trim();
  const heard = heardText.toLowerCase().trim();
  const targetIPA = getOfflineIPA(target);

  // Get phoneme breakdown
  const phonemeBreakdown = analyzePhonemes(target, heard, targetIPA);

  // Get coaching tips
  const coachingTips = getCoachingTips(target, heard, score, targetIPA);

  // Get overall feedback
  const overallFeedback = getOverallFeedback(score, target, heard);

  // Get practice drill
  const practiceDrill = getPracticeDrill(target, heard, targetIPA);

  return {
    score,
    heard,
    target,
    targetIPA,
    phonemeBreakdown,
    coachingTips,
    overallFeedback,
    practiceDrill,
  };
}

// ================================================================
// PHONEME ANALYSIS
// ================================================================
function analyzePhonemes(target: string, heard: string, ipa: string | null): PhonemeResult[] {
  const results: PhonemeResult[] = [];
  if (!ipa) return results;

  // Extract IPA symbols (remove slashes)
  const ipaClean = ipa.replace(/\//g, '').replace(/ˈ|ˌ/g, '');
  
  // Simple character-level comparison
  const targetChars = target.split('');
  const heardChars = heard.split('');

  // Check if heard is completely different
  if (heard === '' || heard === target) {
    // Perfect or empty — return simple result
    for (const ch of ipaClean) {
      results.push({
        phoneme: ch,
        status: heard === target ? 'correct' : 'missing',
      });
    }
    return results;
  }

  // Find common prefix
  let commonPrefix = 0;
  while (commonPrefix < targetChars.length && commonPrefix < heardChars.length 
    && targetChars[commonPrefix] === heardChars[commonPrefix]) {
    commonPrefix++;
  }

  // Find common suffix
  let commonSuffix = 0;
  while (commonSuffix < targetChars.length - commonPrefix 
    && commonSuffix < heardChars.length - commonPrefix
    && targetChars[targetChars.length - 1 - commonSuffix] === heardChars[heardChars.length - 1 - commonSuffix]) {
    commonSuffix++;
  }

  // Map IPA phonemes to approximate positions
  const ipaSymbols = ipaClean.split('');
  const ratio = ipaSymbols.length / Math.max(targetChars.length, 1);

  for (let i = 0; i < ipaSymbols.length; i++) {
    const charIdx = Math.floor(i / ratio);
    const isInCorrectZone = charIdx < commonPrefix || charIdx >= targetChars.length - commonSuffix;
    
    results.push({
      phoneme: ipaSymbols[i],
      status: isInCorrectZone ? 'correct' : 'wrong',
      heardAs: !isInCorrectZone && heardChars[charIdx] ? heardChars[charIdx] : undefined,
      tip: !isInCorrectZone ? VN_ERROR_PATTERNS[`/${ipaSymbols[i]}/`]?.tip : undefined,
    });
  }

  return results;
}

// ================================================================
// COACHING TIPS — Vietnamese-specific
// ================================================================
function getCoachingTips(
  target: string, heard: string, score: number, ipa: string | null
): CoachingTip[] {
  const tips: CoachingTip[] = [];

  // 1. Word-specific coaching (highest priority)
  if (WORD_COACHING[target]) {
    tips.push(...WORD_COACHING[target]);
  }

  // 2. IPA-based error detection
  if (ipa && score < 80) {
    const ipaClean = ipa.replace(/\//g, '').replace(/ˈ|ˌ/g, '');
    
    // Check for known Vietnamese error patterns
    for (const [phoneme, info] of Object.entries(VN_ERROR_PATTERNS)) {
      const symbol = phoneme.replace(/\//g, '');
      if (ipaClean.includes(symbol) && !tips.some(t => t.title.includes(symbol))) {
        // Check if this phoneme is likely the error source
        const isLikelyError = score < 60 || heard.length < target.length * 0.7;
        if (isLikelyError || tips.length < 2) {
          tips.push({
            icon: info.icon,
            title: `Âm ${phoneme}`,
            description: info.tip,
            mouthPosition: info.mouthPosition,
          });
        }
      }
    }
  }

  // 3. Consonant cluster detection
  if (score < 70 && /^[bcdfghjklmnpqrstvwxyz]{2,}/i.test(target)) {
    const cluster = target.match(/^[bcdfghjklmnpqrstvwxyz]{2,}/i);
    if (cluster && !tips.some(t => t.title.includes('cụm'))) {
      tips.push({
        icon: '🎯',
        title: 'Cụm phụ âm đầu',
        description: `Tiếng Việt không có cụm "${cluster[0]}". Tập chậm: ${cluster[0].split('').join('...')} rồi nhanh dần.`,
        mouthPosition: VN_ERROR_PATTERNS['cluster']?.mouthPosition,
      });
    }
  }

  // 4. Final consonant detection
  if (score < 70 && /[bdgkptsz]$/i.test(target) && heard && !(/[bdgkptsz]$/i.test(heard))) {
    tips.push({
      icon: '🛑',
      title: 'Phụ âm cuối bị nuốt',
      description: `Trong tiếng Việt thường không phát âm rõ phụ âm cuối. Cần nhấn rõ âm "${target.slice(-1)}" ở cuối từ "${target}".`,
      mouthPosition: '🎯 Phát âm rõ phụ âm cuối, không ngắt đột ngột',
    });
  }

  // 5. Generic encouragement if no specific tips
  if (tips.length === 0 && score < 90) {
    tips.push({
      icon: '🎧',
      title: 'Nghe và bắt chước',
      description: `Bấm "🐢 Chậm" để nghe phát âm chậm, rồi bắt chước theo từng âm. Tập 3-5 lần!`,
    });
  }

  return tips.slice(0, 3); // Max 3 tips to not overwhelm
}

// ================================================================
// OVERALL FEEDBACK
// ================================================================
function getOverallFeedback(score: number, target: string, heard: string): OverallFeedback {
  if (score >= 90) return {
    emoji: '🌟', label: 'Tuyệt vời!', color: '#22c55e',
    encouragement: 'Phát âm rất chuẩn! Con giỏi lắm! 🎉',
  };
  if (score >= 70) return {
    emoji: '👍', label: 'Khá tốt!', color: '#f59e0b',
    encouragement: 'Gần đúng rồi! Thử lại 1-2 lần nữa sẽ hoàn hảo!',
  };
  if (score >= 40) return {
    emoji: '💪', label: 'Cố gắng thêm!', color: '#f97316',
    encouragement: `Máy nghe được "${heard}" — hãy nghe mẫu rồi nói lại chậm hơn.`,
  };
  return {
    emoji: '🔄', label: 'Thử lại nhé!', color: '#ef4444',
    encouragement: `Máy chưa nghe rõ. Bấm "🐢 Chậm" để nghe mẫu, rồi nói to và rõ ràng từ "${target}".`,
  };
}

// ================================================================
// PRACTICE DRILLS
// ================================================================
function getPracticeDrill(target: string, heard: string, ipa: string | null): PracticeDrill | null {
  if (!ipa) return null;
  const ipaClean = ipa.replace(/\//g, '').replace(/ˈ|ˌ/g, '');

  // Find matching minimal pairs
  for (const [phoneme, pairs] of Object.entries(MINIMAL_PAIRS)) {
    const symbol = phoneme.replace(/\//g, '');
    if (ipaClean.includes(symbol)) {
      return {
        type: 'minimal_pair',
        words: pairs.slice(0, 3),
        instruction: `Luyện phân biệt âm ${phoneme}: nghe và lặp lại từng cặp từ.`,
      };
    }
  }

  // Syllable focus for long words
  if (target.length > 5) {
    return {
      type: 'syllable_focus',
      words: [target],
      instruction: `Tách từ thành từng phần rồi ghép lại: ${target.match(/.{1,3}/g)?.join(' - ') || target}`,
    };
  }

  return {
    type: 'slow_repeat',
    words: [target],
    instruction: `Nghe chậm 3 lần, rồi nói theo: "${target}"`,
  };
}
