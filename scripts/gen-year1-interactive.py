#!/usr/bin/env python3
"""Generate interactive content for Year 1 curriculum topics."""
import json

# Vocab + quiz data for each topic
DATA = {
  # ═══ ENGLISH ═══
  "en1_1": {
    "vocab": [
      ("family", "gia đình", "This is my family.", "👨‍👩‍👧‍👦"),
      ("mother", "mẹ", "My mother is kind.", "👩"),
      ("father", "bố", "My father is tall.", "👨"),
      ("sister", "chị/em gái", "I have a sister.", "👧"),
      ("brother", "anh/em trai", "My brother is funny.", "👦"),
    ],
    "quiz": [
      ("Who is your mother's husband?", ["father","brother","sister","uncle"], "father", "Mother's husband = father (bố)."),
      ("Complete: I have one ___ and two sisters.", ["brother","mother","family","father"], "brother", "One brother = một anh/em trai."),
    ]
  },
  "en1_2": {
    "vocab": [
      ("name", "tên", "My name is Henry.", "📛"),
      ("age", "tuổi", "I am six years old.", "🎂"),
      ("live", "sống", "I live in a house.", "🏠"),
    ],
    "quiz": [
      ("How do you introduce yourself?", ["I am Henry.","Henry am I.","Am I Henry.","Henry I am."], "I am Henry.", "Cấu trúc: I am + tên."),
      ("'I am 6 years old' tells us about your ___.", ["age","name","family","school"], "age", "Years old = tuổi."),
    ]
  },
  "en1_4": {
    "vocab": [
      ("apple", "quả táo", "A is for apple.", "🍎"),
      ("ball", "quả bóng", "B is for ball.", "⚽"),
      ("cat", "con mèo", "C is for cat.", "🐱"),
      ("dog", "con chó", "D is for dog.", "🐕"),
      ("egg", "quả trứng", "E is for egg.", "🥚"),
      ("fish", "con cá", "F is for fish.", "🐟"),
    ],
    "quiz": [
      ("Which letter does 'cat' start with?", ["A","B","C","D"], "C", "Cat bắt đầu bằng chữ C."),
      ("Which word starts with 'F'?", ["dog","fish","egg","ball"], "fish", "Fish bắt đầu bằng chữ F."),
    ]
  },
  "en2_1": {
    "vocab": [
      ("house", "ngôi nhà", "This is my house.", "🏠"),
      ("room", "phòng", "My room is big.", "🚪"),
      ("door", "cửa ra vào", "Open the door.", "🚪"),
      ("window", "cửa sổ", "Look out the window.", "🪟"),
      ("bed", "giường", "I sleep in my bed.", "🛏️"),
      ("table", "bàn", "The book is on the table.", "🪑"),
    ],
    "quiz": [
      ("Where do you sleep?", ["table","bed","door","window"], "bed", "Sleep in bed = ngủ trên giường."),
      ("You look outside through the ___.", ["door","bed","window","table"], "window", "Window = cửa sổ, nhìn ra ngoài."),
    ]
  },
  "en2_2": {
    "vocab": [
      ("in", "ở trong", "The cat is in the box.", "📦"),
      ("on", "ở trên", "The book is on the table.", "📚"),
      ("under", "ở dưới", "The dog is under the bed.", "🛏️"),
    ],
    "quiz": [
      ("The ball is ___ the table. (underneath)", ["in","on","under","next to"], "under", "Under = ở bên dưới."),
      ("There ___ three books on the shelf.", ["is","are","am","be"], "are", "Three books (số nhiều) → There are."),
    ]
  },
  "en3_1": {
    "vocab": [
      ("moon", "mặt trăng", "The moon is bright.", "🌙"),
      ("star", "ngôi sao", "I can see a star.", "⭐"),
      ("sky", "bầu trời", "The sky is blue.", "🌌"),
      ("night", "đêm", "Stars come out at night.", "🌃"),
      ("dark", "tối", "It is dark outside.", "🌑"),
      ("light", "ánh sáng", "The moon gives light.", "💡"),
    ],
    "quiz": [
      ("What shines in the sky at night?", ["sun","moon","cloud","rain"], "moon", "Moon = mặt trăng, sáng về đêm."),
      ("Stars are in the ___.", ["sea","ground","sky","house"], "sky", "Stars are in the sky = sao trên bầu trời."),
    ]
  },
  "en4_1": {
    "vocab": [
      ("garden", "khu vườn", "We play in the garden.", "🌳"),
      ("flower", "bông hoa", "The flower is red.", "🌹"),
      ("tree", "cái cây", "A big tree.", "🌲"),
      ("grass", "cỏ", "Green grass.", "🌿"),
      ("butterfly", "con bướm", "A butterfly flies.", "🦋"),
      ("bee", "con ong", "The bee makes honey.", "🐝"),
    ],
    "quiz": [
      ("A butterfly can ___.", ["swim","fly","run","dig"], "fly", "Butterflies fly = bướm bay."),
      ("Bees make ___.", ["milk","honey","water","bread"], "honey", "Bees make honey = ong làm mật."),
    ]
  },
  # ═══ MATH ═══
  "ma1_1": {
    "vocab": [
      ("count", "đếm", "Count to 10.", "🔢"),
      ("number", "số", "What number is this?", "🔟"),
      ("zero", "không", "Zero means nothing.", "0️⃣"),
    ],
    "quiz": [
      ("What comes after 7?", ["6","8","9","5"], "8", "7 → 8 → 9."),
      ("Count backwards: 5, 4, 3, ___", ["1","2","6","0"], "2", "Đếm ngược: 5,4,3,2."),
      ("How many fingers on one hand?", ["4","5","6","10"], "5", "Một bàn tay có 5 ngón."),
    ]
  },
  "ma2_1": {
    "vocab": [
      ("add", "cộng", "Add 3 and 2.", "➕"),
      ("plus", "cộng", "3 plus 2 is 5.", "➕"),
      ("equals", "bằng", "3 + 2 equals 5.", "🟰"),
    ],
    "quiz": [
      ("3 + 4 = ?", ["6","7","8","5"], "7", "3 + 4 = 7."),
      ("2 + 5 = ?", ["6","7","8","9"], "7", "2 + 5 = 7."),
      ("What is 1 + 9?", ["8","9","10","11"], "10", "1 + 9 = 10."),
    ]
  },
  "ma2_3": {
    "vocab": [],
    "quiz": [
      ("Which two numbers make 10? 3 + ___", ["5","6","7","8"], "7", "3 + 7 = 10."),
      ("8 + ___ = 10", ["1","2","3","4"], "2", "8 + 2 = 10."),
      ("5 + 5 = ?", ["9","10","11","12"], "10", "5 + 5 = 10."),
    ]
  },
  "ma3_1": {
    "vocab": [
      ("subtract", "trừ", "Subtract 3 from 7.", "➖"),
      ("minus", "trừ", "7 minus 3 is 4.", "➖"),
      ("take away", "bớt đi", "Take away 2.", "➖"),
    ],
    "quiz": [
      ("8 - 3 = ?", ["4","5","6","7"], "5", "8 - 3 = 5."),
      ("10 - 6 = ?", ["3","4","5","6"], "4", "10 - 6 = 4."),
    ]
  },
  "ma4_1": {
    "vocab": [
      ("circle", "hình tròn", "A ball is a circle.", "⭕"),
      ("square", "hình vuông", "A window is a square.", "🔲"),
      ("triangle", "hình tam giác", "A triangle has 3 sides.", "🔺"),
      ("rectangle", "hình chữ nhật", "A door is a rectangle.", "▬"),
    ],
    "quiz": [
      ("How many sides does a triangle have?", ["2","3","4","5"], "3", "Triangle = tam giác = 3 cạnh."),
      ("Which shape is round?", ["square","triangle","circle","rectangle"], "circle", "Circle = hình tròn."),
    ]
  },
  # ═══ SCIENCE ═══
  "sc1_1": {
    "vocab": [
      ("plant", "cây", "A plant needs water.", "🌱"),
      ("leaf", "lá", "The leaf is green.", "🍃"),
      ("stem", "thân cây", "Water goes up the stem.", "🌿"),
      ("root", "rễ", "Roots are underground.", "🌳"),
      ("flower", "hoa", "The flower is pretty.", "🌸"),
      ("petal", "cánh hoa", "Petals are soft.", "🌺"),
    ],
    "quiz": [
      ("Which part of a plant is underground?", ["leaf","stem","root","flower"], "root", "Root = rễ, ở dưới đất."),
      ("Plants need ___ to grow.", ["chocolate","water","paper","plastic"], "water", "Plants need water = cây cần nước."),
    ]
  },
  "sc1_2": {
    "vocab": [],
    "quiz": [
      ("Which part holds the plant up?", ["root","stem","leaf","petal"], "stem", "Stem = thân cây, giữ cây đứng."),
      ("Flowers have colourful ___.", ["roots","stems","petals","branches"], "petals", "Petals = cánh hoa, nhiều màu."),
    ]
  },
  "sc2_1": {
    "vocab": [
      ("fish", "cá", "Fish live in water.", "🐟"),
      ("bird", "chim", "Birds can fly.", "🐦"),
      ("mammal", "động vật có vú", "Cats are mammals.", "🐱"),
      ("reptile", "bò sát", "Snakes are reptiles.", "🐍"),
      ("amphibian", "lưỡng cư", "Frogs are amphibians.", "🐸"),
    ],
    "quiz": [
      ("Which animal group can fly?", ["fish","birds","reptiles","amphibians"], "birds", "Birds = chim, biết bay."),
      ("A frog is an ___.", ["mammal","bird","amphibian","reptile"], "amphibian", "Frog = ếch = lưỡng cư."),
    ]
  },
  "sc2_4": {
    "vocab": [
      ("see", "nhìn", "I see with my eyes.", "👀"),
      ("hear", "nghe", "I hear with my ears.", "👂"),
      ("smell", "ngửi", "I smell with my nose.", "👃"),
      ("taste", "nếm", "I taste with my tongue.", "👅"),
      ("touch", "chạm", "I touch with my hands.", "🤚"),
    ],
    "quiz": [
      ("Which sense do you use to listen to music?", ["see","hear","smell","taste"], "hear", "Hear = nghe, dùng tai."),
      ("You taste food with your ___.", ["nose","ears","tongue","eyes"], "tongue", "Taste with tongue = nếm bằng lưỡi."),
    ]
  },
  "sc3_1": {
    "vocab": [
      ("wood", "gỗ", "The table is made of wood.", "🪵"),
      ("plastic", "nhựa", "The toy is plastic.", "🧸"),
      ("glass", "thủy tinh", "The window is glass.", "🪟"),
      ("metal", "kim loại", "The spoon is metal.", "🥄"),
      ("fabric", "vải", "My shirt is fabric.", "👕"),
      ("paper", "giấy", "I write on paper.", "📄"),
    ],
    "quiz": [
      ("What is a window usually made of?", ["wood","plastic","glass","metal"], "glass", "Window = cửa sổ, làm từ thủy tinh."),
      ("What material is a t-shirt made of?", ["metal","glass","fabric","wood"], "fabric", "T-shirt = vải (fabric)."),
    ]
  },
  "sc4_1": {
    "vocab": [
      ("spring", "mùa xuân", "Flowers bloom in spring.", "🌸"),
      ("summer", "mùa hè", "Summer is hot.", "☀️"),
      ("autumn", "mùa thu", "Leaves fall in autumn.", "🍂"),
      ("winter", "mùa đông", "Winter is cold.", "❄️"),
    ],
    "quiz": [
      ("When do leaves fall from trees?", ["spring","summer","autumn","winter"], "autumn", "Autumn = mùa thu, lá rụng."),
      ("Which season is the coldest?", ["spring","summer","autumn","winter"], "winter", "Winter = mùa đông, lạnh nhất."),
    ]
  },
}

# Generate TypeScript
lines = [
  '// Year 1 Interactive Content — auto-generated',
  '// Vocab flashcards + quizzes for each curriculum topic',
  '',
  'import type { InteractiveContent } from "./year1-integrated-curriculum";',
  '',
  'export const YEAR1_INTERACTIVE: Record<string, InteractiveContent> = {',
]

for tid, d in DATA.items():
    lines.append(f'  "{tid}": {{')
    if d["vocab"]:
        lines.append('    vocabCards: [')
        for w, m, ex, em in d["vocab"]:
            lines.append(f'      {{ word: "{w}", meaning: "{m}", example: "{ex}", imageEmoji: "{em}" }},')
        lines.append('    ],')
    if d["quiz"]:
        lines.append('    quizzes: [')
        for q, opts, ans, exp in d["quiz"]:
            opts_str = json.dumps(opts)
            lines.append(f'      {{ question: "{q}", options: {opts_str}, answer: "{ans}", explanationVi: "{exp}" }},')
        lines.append('    ],')
    lines.append('  },')

lines.append('};')
lines.append('')

with open('src/data/year1-interactive-content.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))


print(f'GENERATED {len(DATA)} topics with interactive content')
