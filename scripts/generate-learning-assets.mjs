import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function svg(title, accent, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff7ed"/>
      <stop offset="0.55" stop-color="#eef2ff"/>
      <stop offset="1" stop-color="#ecfeff"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="960" height="600" fill="url(#bg)"/>
  <circle cx="116" cy="106" r="64" fill="${accent}" opacity="0.12"/>
  <circle cx="833" cy="505" r="88" fill="#10b981" opacity="0.10"/>
  <rect x="78" y="70" width="804" height="460" rx="34" fill="#ffffff" opacity="0.88" filter="url(#shadow)"/>
  <text x="112" y="124" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="#0f172a">${title}</text>
  ${body}
</svg>`;
}

function writeAsset(relative, content) {
  const target = join(root, relative);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, 'utf8');
}

const mathAssets = {
  'addition_within_10.svg': ['Cộng trừ trong 10', '#3b82f6', `
    <g transform="translate(150 185)">
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${i * 58}" y="0" width="44" height="44" rx="10" fill="#60a5fa"/>`).join('')}
      <text x="384" y="36" font-size="46" font-weight="800" fill="#334155">+</text>
      ${Array.from({ length: 4 }, (_, i) => `<rect x="${454 + i * 58}" y="0" width="44" height="44" rx="10" fill="#f59e0b"/>`).join('')}
      <text x="0" y="128" font-size="30" font-weight="700" fill="#475569">Đếm thêm, rồi kiểm tra bằng phép ngược.</text>
    </g>`],
  'add_sub_20.svg': ['Qua 10 không sợ', '#6366f1', `
    <g transform="translate(150 180)">
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 52}" y="0" width="42" height="42" rx="8" fill="${i < 8 ? '#818cf8' : '#e0e7ff'}" stroke="#6366f1"/>`).join('')}
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 52}" y="62" width="42" height="42" rx="8" fill="${i < 5 ? '#fbbf24' : '#fef3c7'}" stroke="#f59e0b"/>`).join('')}
      <path d="M414 42 C438 82 438 82 414 124" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
      <text x="0" y="170" font-size="30" font-weight="700" fill="#475569">Tách số để đủ 10, phần còn lại cộng tiếp.</text>
    </g>`],
  'number_bonds.svg': ['Tách - ghép số', '#10b981', `
    <g transform="translate(240 165)" font-family="Inter, Arial, sans-serif">
      <circle cx="240" cy="50" r="56" fill="#10b981"/><text x="222" y="62" font-size="38" font-weight="900" fill="#fff">10</text>
      <line x1="214" y1="103" x2="104" y2="230" stroke="#94a3b8" stroke-width="7" stroke-linecap="round"/>
      <line x1="266" y1="103" x2="376" y2="230" stroke="#94a3b8" stroke-width="7" stroke-linecap="round"/>
      <circle cx="92" cy="252" r="52" fill="#60a5fa"/><text x="78" y="264" font-size="34" font-weight="900" fill="#fff">6</text>
      <circle cx="388" cy="252" r="52" fill="#f59e0b"/><text x="374" y="264" font-size="34" font-weight="900" fill="#fff">4</text>
      <text x="-58" y="372" font-size="30" font-weight="700" fill="#475569">Một số lớn có thể tách thành hai phần nhỏ.</text>
    </g>`],
  'place_value.svg': ['Chục và đơn vị', '#0ea5e9', `
    <g transform="translate(160 170)">
      ${Array.from({ length: 3 }, (_, i) => `<rect x="${i * 70}" y="0" width="46" height="240" rx="18" fill="#0ea5e9"/>`).join('')}
      ${Array.from({ length: 7 }, (_, i) => `<rect x="${280 + (i % 4) * 56}" y="${Math.floor(i / 4) * 58}" width="42" height="42" rx="10" fill="#f97316"/>`).join('')}
      <text x="0" y="306" font-size="30" font-weight="700" fill="#475569">3 chục và 7 đơn vị tạo thành 37.</text>
    </g>`],
  'shapes_2d.svg': ['Hình phẳng 2D', '#8b5cf6', `
    <g transform="translate(160 178)" stroke="#1e293b" stroke-width="6">
      <circle cx="66" cy="80" r="58" fill="#fbbf24"/>
      <rect x="180" y="24" width="116" height="116" rx="8" fill="#60a5fa"/>
      <polygon points="420,20 494,142 346,142" fill="#34d399"/>
      <rect x="580" y="40" width="150" height="90" rx="8" fill="#f472b6"/>
      <text x="0" y="236" font-size="30" font-weight="700" stroke="none" fill="#475569">Đếm cạnh, góc và tìm đồ vật giống hình.</text>
    </g>`],
  'shapes_3d.svg': ['Khối hình 3D', '#14b8a6', `
    <g transform="translate(145 170)" stroke="#1e293b" stroke-width="5">
      <rect x="16" y="76" width="120" height="120" fill="#60a5fa"/>
      <path d="M16 76 L58 30 H178 L136 76 Z M136 76 L178 30 V150 L136 196 Z" fill="#93c5fd"/>
      <ellipse cx="332" cy="76" rx="70" ry="28" fill="#fbbf24"/>
      <rect x="262" y="76" width="140" height="130" fill="#fde68a"/>
      <ellipse cx="332" cy="206" rx="70" ry="28" fill="#fbbf24"/>
      <circle cx="560" cy="142" r="74" fill="#34d399"/>
      <text x="0" y="300" font-size="30" font-weight="700" stroke="none" fill="#475569">Mặt phẳng, mặt cong, lăn được hay không?</text>
    </g>`],
  'compare_numbers.svg': ['So sánh số', '#f97316', `
    <g transform="translate(168 172)">
      <text x="0" y="125" font-size="118" font-weight="900" fill="#2563eb">14</text>
      <text x="270" y="125" font-size="118" font-weight="900" fill="#ef4444">&gt;</text>
      <text x="470" y="125" font-size="118" font-weight="900" fill="#10b981">9</text>
      <text x="0" y="240" font-size="30" font-weight="700" fill="#475569">So sánh hàng chục trước, rồi đến đơn vị.</text>
    </g>`],
  'ordinal_positions.svg': ['Thứ tự và vị trí', '#ec4899', `
    <g transform="translate(135 190)">
      ${['1','2','3','4','5'].map((n, i) => `<circle cx="${70 + i * 135}" cy="70" r="48" fill="${i === 2 ? '#ec4899' : '#e0e7ff'}"/><text x="${56 + i * 135}" y="84" font-size="38" font-weight="900" fill="${i === 2 ? '#fff' : '#475569'}">${n}</text>`).join('')}
      <text x="0" y="205" font-size="30" font-weight="700" fill="#475569">Đếm từ trái sang phải, nói rõ vị trí.</text>
    </g>`],
  'even_odd.svg': ['Chẵn và lẻ', '#64748b', `
    <g transform="translate(150 170)">
      ${Array.from({ length: 8 }, (_, i) => `<circle cx="${80 + (i % 4) * 80}" cy="${60 + Math.floor(i / 4) * 82}" r="26" fill="#60a5fa"/>`).join('')}
      ${Array.from({ length: 7 }, (_, i) => `<circle cx="${500 + (i % 4) * 80}" cy="${60 + Math.floor(i / 4) * 82}" r="26" fill="#f97316"/>`).join('')}
      <text x="36" y="230" font-size="28" font-weight="800" fill="#2563eb">8 ghép cặp hết</text>
      <text x="470" y="230" font-size="28" font-weight="800" fill="#c2410c">7 còn dư 1</text>
    </g>`],
  'intro_multiplication.svg': ['Nhân là nhóm bằng nhau', '#ef4444', `
    <g transform="translate(150 170)">
      ${[0,1,2].map((g) => `<rect x="${g * 210}" y="0" width="150" height="150" rx="28" fill="#fee2e2" stroke="#ef4444" stroke-width="4"/>${Array.from({ length: 4 }, (_, i) => `<circle cx="${38 + g * 210 + (i % 2) * 72}" cy="${45 + Math.floor(i / 2) * 62}" r="18" fill="#ef4444"/>`).join('')}`).join('')}
      <text x="0" y="232" font-size="30" font-weight="700" fill="#475569">3 nhóm, mỗi nhóm 4: cộng lặp hoặc nhân.</text>
    </g>`],
  'intro_fractions.svg': ['Phân số trực quan', '#f59e0b', `
    <g transform="translate(200 164)">
      <circle cx="140" cy="130" r="104" fill="#fde68a" stroke="#f59e0b" stroke-width="6"/>
      <path d="M140 130 L140 26 A104 104 0 0 1 244 130 Z" fill="#f59e0b"/>
      <rect x="400" y="32" width="208" height="208" rx="18" fill="#dbeafe" stroke="#2563eb" stroke-width="6"/>
      <path d="M504 32 V240 M400 136 H608" stroke="#2563eb" stroke-width="6"/>
      <text x="-40" y="310" font-size="30" font-weight="700" fill="#475569">Chia bằng nhau mới là một phần hai, một phần tư.</text>
    </g>`],
  'clock_reading.svg': ['Xem đồng hồ', '#0f766e', `
    <g transform="translate(340 152)">
      <circle cx="140" cy="140" r="126" fill="#ecfeff" stroke="#0f766e" stroke-width="8"/>
      <text x="126" y="38" font-size="26" font-weight="800" fill="#0f766e">12</text><text x="238" y="150" font-size="26" font-weight="800" fill="#0f766e">3</text><text x="134" y="258" font-size="26" font-weight="800" fill="#0f766e">6</text><text x="28" y="150" font-size="26" font-weight="800" fill="#0f766e">9</text>
      <line x1="140" y1="140" x2="140" y2="58" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
      <line x1="140" y1="140" x2="205" y2="140" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
      <circle cx="140" cy="140" r="10" fill="#0f172a"/>
    </g>`],
  'column_addition.svg': ['Đặt tính dọc', '#6366f1', `
    <g transform="translate(304 160)" font-family="Inter, Arial, sans-serif">
      <text x="100" y="68" font-size="64" font-weight="900" fill="#334155">47</text>
      <text x="56" y="142" font-size="64" font-weight="900" fill="#334155">+ 28</text>
      <line x1="54" y1="170" x2="260" y2="170" stroke="#6366f1" stroke-width="7"/>
      <text x="102" y="245" font-size="64" font-weight="900" fill="#10b981">75</text>
      <text x="-84" y="338" font-size="30" font-weight="700" fill="#475569">Tính từ hàng đơn vị, nhớ sang hàng chục.</text>
    </g>`],
  'ruler_measurement.svg': ['Đo độ dài', '#ca8a04', `
    <g transform="translate(150 220)">
      <rect x="0" y="0" width="650" height="92" rx="18" fill="#fef3c7" stroke="#ca8a04" stroke-width="5"/>
      ${Array.from({ length: 14 }, (_, i) => `<line x1="${35 + i * 45}" y1="0" x2="${35 + i * 45}" y2="${i % 2 === 0 ? 60 : 36}" stroke="#92400e" stroke-width="4"/>`).join('')}
      <text x="0" y="172" font-size="30" font-weight="700" fill="#475569">Đặt đầu vật ở vạch 0 rồi đọc vạch cuối.</text>
    </g>`],
  'word_problem.svg': ['Toán có lời văn', '#22c55e', `
    <g transform="translate(176 170)">
      <rect x="0" y="0" width="606" height="230" rx="26" fill="#f0fdf4" stroke="#22c55e" stroke-width="5"/>
      <text x="42" y="70" font-size="34" font-weight="800" fill="#166534">Đọc đề</text>
      <text x="42" y="125" font-size="34" font-weight="800" fill="#166534">Gạch từ khóa</text>
      <text x="42" y="180" font-size="34" font-weight="800" fill="#166534">Chọn phép tính</text>
      <path d="M360 58 h110 m-36 -36 l36 36 -36 36" fill="none" stroke="#16a34a" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`],
};

const coreAssets = {
  'bar_chart.svg': ['Biểu đồ cột', '#3b82f6', `<g transform="translate(190 175)"><rect x="0" y="150" width="95" height="90" fill="#60a5fa"/><rect x="145" y="80" width="95" height="160" fill="#34d399"/><rect x="290" y="30" width="95" height="210" fill="#f59e0b"/><rect x="435" y="120" width="95" height="120" fill="#f472b6"/><line x1="-20" y1="240" x2="575" y2="240" stroke="#334155" stroke-width="6"/><text x="0" y="310" font-size="30" font-weight="700" fill="#475569">Đọc cao thấp, so sánh và tính tổng.</text></g>`],
  'books_hd.svg': ['Đọc hiểu có bằng chứng', '#8b5cf6', `<g transform="translate(190 175)"><path d="M0 40 q120 -44 240 20 v230 q-120 -64 -240 -20z" fill="#ede9fe" stroke="#8b5cf6" stroke-width="6"/><path d="M240 60 q120 -64 240 -20 v230 q-120 -44 -240 20z" fill="#dbeafe" stroke="#2563eb" stroke-width="6"/><circle cx="640" cy="130" r="68" fill="none" stroke="#10b981" stroke-width="16"/><line x1="688" y1="178" x2="760" y2="250" stroke="#10b981" stroke-width="18" stroke-linecap="round"/><text x="0" y="346" font-size="30" font-weight="700" fill="#475569">Tìm chi tiết trong câu rồi trả lời.</text></g>`],
  'computing.svg': ['Tin học an toàn', '#14b8a6', `<g transform="translate(180 170)"><rect x="0" y="0" width="520" height="300" rx="26" fill="#ecfeff" stroke="#14b8a6" stroke-width="7"/><rect x="50" y="54" width="420" height="180" rx="16" fill="#0f172a"/><path d="M220 300 h80 v56 h-80z M150 356 h220" stroke="#334155" stroke-width="12" stroke-linecap="round"/><text x="92" y="164" font-size="42" font-weight="900" fill="#67e8f9">&lt;/&gt;</text><text x="0" y="390" font-size="30" font-weight="700" fill="#475569">Tạo, thử, sai và debug từng bước.</text></g>`],
  'dice_10_20.svg': ['Số và xác suất', '#ef4444', `<g transform="translate(230 178)"><rect x="0" y="0" width="170" height="170" rx="28" fill="#fee2e2" stroke="#ef4444" stroke-width="7"/><rect x="250" y="0" width="170" height="170" rx="28" fill="#dbeafe" stroke="#2563eb" stroke-width="7"/><circle cx="52" cy="52" r="16" fill="#ef4444"/><circle cx="118" cy="118" r="16" fill="#ef4444"/><circle cx="302" cy="52" r="16" fill="#2563eb"/><circle cx="368" cy="52" r="16" fill="#2563eb"/><circle cx="302" cy="118" r="16" fill="#2563eb"/><circle cx="368" cy="118" r="16" fill="#2563eb"/><text x="-60" y="260" font-size="30" font-weight="700" fill="#475569">Đếm kết quả, so sánh khả năng xảy ra.</text></g>`],
  'division.svg': ['Chia đều', '#0ea5e9', `<g transform="translate(160 180)">${Array.from({ length: 12 }, (_, i) => `<circle cx="${42 + (i % 6) * 74}" cy="${42 + Math.floor(i / 6) * 74}" r="24" fill="#0ea5e9"/>`).join('')}<line x1="250" y1="-20" x2="250" y2="170" stroke="#64748b" stroke-width="5" stroke-dasharray="12 10"/><text x="0" y="250" font-size="30" font-weight="700" fill="#475569">Chia thành các nhóm bằng nhau.</text></g>`],
  'fibonacci.svg': ['Quy luật dãy số', '#f59e0b', `<g transform="translate(170 172)"><path d="M0 220 C120 0 240 0 360 220 S600 440 720 220" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round"/><text x="18" y="58" font-size="40" font-weight="900" fill="#334155">2, 4, 6, 8, ?</text><text x="0" y="314" font-size="30" font-weight="700" fill="#475569">Tìm điều thay đổi giữa hai số liên tiếp.</text></g>`],
  'fraction_1_4.svg': ['Một phần tư', '#f59e0b', `<g transform="translate(304 152)"><circle cx="160" cy="160" r="132" fill="#fde68a" stroke="#f59e0b" stroke-width="8"/><path d="M160 160 L160 28 A132 132 0 0 1 292 160 Z" fill="#f59e0b"/><line x1="160" y1="28" x2="160" y2="292" stroke="#92400e" stroke-width="6"/><line x1="28" y1="160" x2="292" y2="160" stroke="#92400e" stroke-width="6"/></g>`],
  'girl_thinking.svg': ['Giải thích cách nghĩ', '#8b5cf6', `<g transform="translate(260 152)"><circle cx="170" cy="116" r="76" fill="#fcd34d"/><path d="M92 286 q78 -112 156 0" fill="#c4b5fd"/><circle cx="142" cy="112" r="10" fill="#334155"/><circle cx="198" cy="112" r="10" fill="#334155"/><path d="M144 156 q28 20 56 0" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round"/><circle cx="350" cy="62" r="28" fill="#e0e7ff"/><circle cx="404" cy="22" r="42" fill="#e0e7ff"/><text x="315" y="38" font-size="38" font-weight="900" fill="#6366f1">?</text><text x="-80" y="365" font-size="30" font-weight="700" fill="#475569">Nói ra chiến lược giúp hiểu sâu hơn.</text></g>`],
  'history.svg': ['Lịch sử có mốc', '#92400e', `<g transform="translate(170 170)"><line x1="0" y1="140" x2="620" y2="140" stroke="#92400e" stroke-width="8"/><circle cx="80" cy="140" r="26" fill="#f59e0b"/><circle cx="290" cy="140" r="26" fill="#f59e0b"/><circle cx="500" cy="140" r="26" fill="#f59e0b"/><text x="32" y="74" font-size="32" font-weight="800" fill="#334155">938</text><text x="230" y="218" font-size="32" font-weight="800" fill="#334155">1010</text><text x="440" y="74" font-size="32" font-weight="800" fill="#334155">1945</text><text x="0" y="315" font-size="30" font-weight="700" fill="#475569">Gắn nhân vật, nơi chốn và hệ quả.</text></g>`],
  'letters_vn.svg': ['Chữ cái tiếng Việt', '#8b5cf6', `<g transform="translate(175 175)"><text x="0" y="120" font-size="82" font-weight="900" fill="#7c3aed">a ă â</text><text x="0" y="220" font-size="82" font-weight="900" fill="#2563eb">b c d đ</text><text x="0" y="320" font-size="30" font-weight="700" fill="#475569">Nhìn chữ, đọc âm, ghép vần.</text></g>`],
  'multiplication.svg': ['Phép nhân', '#ef4444', `<g transform="translate(190 170)">${[0,1,2,3].map((g) => `<rect x="${g * 140}" y="0" width="96" height="96" rx="20" fill="#fee2e2" stroke="#ef4444" stroke-width="4"/><text x="${26 + g * 140}" y="62" font-size="40" font-weight="900" fill="#ef4444">3</text>`).join('')}<text x="0" y="205" font-size="42" font-weight="900" fill="#334155">3 + 3 + 3 + 3 = 12</text><text x="0" y="285" font-size="30" font-weight="700" fill="#475569">Cộng lặp là bước đệm để hiểu phép nhân.</text></g>`],
  'musical_notes.svg': ['Dấu thanh tiếng Việt', '#ec4899', `<g transform="translate(195 170)"><text x="0" y="100" font-size="76" font-weight="900" fill="#be185d">ma má mà mả mã mạ</text><path d="M120 190 q140 -80 280 0 t280 0" fill="none" stroke="#ec4899" stroke-width="10" stroke-linecap="round"/><text x="0" y="300" font-size="30" font-weight="700" fill="#475569">Dấu thanh đổi âm và đổi nghĩa.</text></g>`],
  'number_line.svg': ['Tia số', '#2563eb', `<g transform="translate(130 240)"><line x1="0" y1="0" x2="700" y2="0" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/><path d="M700 0 l-28 -22 m28 22 l-28 22" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/><g font-size="28" font-weight="800" fill="#334155">${Array.from({ length: 8 }, (_, i) => `<line x1="${i * 90}" y1="-28" x2="${i * 90}" y2="28" stroke="#64748b" stroke-width="4"/><text x="${i * 90 - 8}" y="72">${i}</text>`).join('')}</g><text x="0" y="150" font-size="30" font-weight="700" fill="#475569">Số bên phải lớn hơn, nhảy từng bước.</text></g>`],
  'open_book.svg': ['Từ vựng theo chủ đề', '#10b981', `<g transform="translate(180 176)"><path d="M0 20 q160 -50 320 20 v230 q-160 -70 -320 -20z" fill="#dcfce7" stroke="#10b981" stroke-width="6"/><path d="M320 40 q160 -70 320 -20 v230 q-160 -50 -320 20z" fill="#dbeafe" stroke="#2563eb" stroke-width="6"/><text x="60" y="120" font-size="40" font-weight="900" fill="#166534">từ</text><text x="390" y="120" font-size="40" font-weight="900" fill="#1d4ed8">word</text><text x="0" y="340" font-size="30" font-weight="700" fill="#475569">Nghĩa, ví dụ, rồi dùng trong câu.</text></g>`],
  'pencil_icon.svg': ['Viết câu', '#f97316', `<g transform="translate(190 170)"><rect x="80" y="58" width="500" height="76" rx="22" fill="#fed7aa" transform="rotate(-18 330 96)"/><polygon points="590,5 686,44 608,110" fill="#fdba74"/><path d="M60 246 h650" stroke="#94a3b8" stroke-width="5"/><path d="M60 310 h470" stroke="#cbd5e1" stroke-width="5"/><text x="0" y="392" font-size="30" font-weight="700" fill="#475569">Viết ngắn, rõ chủ ngữ và hành động.</text></g>`],
  'percent.svg': ['Phần trăm', '#ef4444', `<g transform="translate(260 165)"><text x="0" y="200" font-size="190" font-weight="900" fill="#ef4444">%</text><text x="220" y="86" font-size="48" font-weight="900" fill="#334155">25 / 100</text><text x="220" y="164" font-size="48" font-weight="900" fill="#334155">= 25%</text><text x="-90" y="320" font-size="30" font-weight="700" fill="#475569">Phần trăm là số phần trong 100 phần.</text></g>`],
  'ratio.svg': ['Tỉ số', '#14b8a6', `<g transform="translate(190 180)">${Array.from({ length: 3 }, (_, i) => `<circle cx="${60 + i * 70}" cy="70" r="28" fill="#14b8a6"/>`).join('')}${Array.from({ length: 5 }, (_, i) => `<circle cx="${340 + i * 70}" cy="70" r="28" fill="#f59e0b"/>`).join('')}<text x="80" y="178" font-size="56" font-weight="900" fill="#0f766e">3 : 5</text><text x="0" y="270" font-size="30" font-weight="700" fill="#475569">So sánh theo phần, không chỉ theo số lượng rời.</text></g>`],
  'science.svg': ['Khoa học quan sát', '#22c55e', `<g transform="translate(190 160)"><circle cx="120" cy="120" r="82" fill="#bbf7d0" stroke="#16a34a" stroke-width="6"/><path d="M120 196 C80 260 32 288 0 320" stroke="#16a34a" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M120 82 C174 38 248 72 250 144 C196 150 152 132 120 82Z" fill="#22c55e"/><rect x="420" y="40" width="120" height="220" rx="34" fill="#dbeafe" stroke="#2563eb" stroke-width="6"/><path d="M420 188 h120" stroke="#2563eb" stroke-width="6"/><text x="0" y="392" font-size="30" font-weight="700" fill="#475569">Quan sát, dự đoán, kiểm tra, giải thích.</text></g>`],
  'square.svg': ['Hình vuông', '#2563eb', `<g transform="translate(320 152)"><rect x="0" y="0" width="280" height="280" rx="18" fill="#dbeafe" stroke="#2563eb" stroke-width="10"/><text x="-128" y="365" font-size="30" font-weight="700" fill="#475569">Bốn cạnh bằng nhau, bốn góc vuông.</text></g>`],
  'triangle.svg': ['Hình tam giác', '#f59e0b', `<g transform="translate(320 150)"><polygon points="140,0 290,260 -10,260" fill="#fef3c7" stroke="#f59e0b" stroke-width="10"/><text x="-130" y="360" font-size="30" font-weight="700" fill="#475569">Ba cạnh tạo thành một tam giác.</text></g>`],
  'weight.svg': ['Khối lượng', '#64748b', `<g transform="translate(265 165)"><path d="M100 260 h320 l-46 -180 h-228z" fill="#e2e8f0" stroke="#475569" stroke-width="8"/><path d="M185 80 a75 75 0 0 1 150 0" fill="none" stroke="#475569" stroke-width="10"/><text x="176" y="204" font-size="58" font-weight="900" fill="#334155">kg</text><text x="-70" y="350" font-size="30" font-weight="700" fill="#475569">Chọn đơn vị đo phù hợp rồi tính.</text></g>`],
};

for (const [name, [title, accent, body]] of Object.entries(mathAssets)) {
  writeAsset(`public/images/math/${name}`, svg(title, accent, body));
}

for (const [name, [title, accent, body]] of Object.entries(coreAssets)) {
  writeAsset(`public/images/core/${name}`, svg(title, accent, body));
}

console.log(`Generated ${Object.keys(mathAssets).length + Object.keys(coreAssets).length} learning SVG assets.`);
