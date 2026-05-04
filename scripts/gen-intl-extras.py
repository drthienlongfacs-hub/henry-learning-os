#!/usr/bin/env python3
"""Add Writing, Listening, Speaking, Vocabulary, and Country-Specific topics."""

WRITING = [
  ("wr_g1_01",1,"Simple Sentences","Viết câu đơn giản","common_core"),
  ("wr_g1_02",1,"Labels & Lists","Nhãn và danh sách","cambridge"),
  ("wr_g2_01",2,"Short Descriptions","Viết mô tả ngắn","common_core"),
  ("wr_g2_02",2,"Opinion Writing","Viết ý kiến","australian"),
  ("wr_g3_01",3,"Narrative Writing","Viết kể chuyện","cambridge"),
  ("wr_g3_02",3,"Letter Writing","Viết thư","common_core"),
  ("wr_g3_03",3,"Instructions Writing","Viết hướng dẫn","finnish"),
  ("wr_g4_01",4,"Informative Writing","Viết thông tin","common_core"),
  ("wr_g4_02",4,"Diary Entry","Viết nhật ký","cambridge"),
  ("wr_g4_03",4,"Book Review","Viết bình sách","singapore"),
  ("wr_g5_01",5,"Persuasive Writing","Viết thuyết phục","australian"),
  ("wr_g5_02",5,"Report Writing","Viết báo cáo","cambridge"),
  ("wr_g5_03",5,"Creative Poetry","Viết thơ sáng tạo","common_core"),
  ("wr_g5_04",5,"Email & Digital Writing","Viết email","singapore"),
]

LISTENING = [
  ("ls_g1_01",1,"Follow Instructions","Nghe làm theo","cambridge"),
  ("ls_g1_02",1,"Songs & Rhymes","Bài hát và vần","finnish"),
  ("ls_g2_01",2,"Listen & Identify","Nghe nhận biết","common_core"),
  ("ls_g2_02",2,"Show & Tell","Kể và trình bày","singapore"),
  ("ls_g3_01",3,"Dialogue Practice","Luyện hội thoại","australian"),
  ("ls_g3_02",3,"Role Play","Đóng vai","finnish"),
  ("ls_g4_01",4,"Listen & Retell","Nghe kể lại","cambridge"),
  ("ls_g4_02",4,"Group Discussion","Thảo luận nhóm","canadian"),
  ("ls_g5_01",5,"Presentation Skills","Kỹ năng thuyết trình","common_core"),
  ("ls_g5_02",5,"Debate Basics","Tranh luận cơ bản","singapore"),
]

VOCAB = [
  ("vt_g1_01",1,"Classroom Objects","Đồ dùng lớp học","cambridge",
   "book,pen,pencil,ruler,eraser,bag,desk,chair,board,crayon",
   "sách,bút,bút chì,thước,tẩy,cặp,bàn,ghế,bảng,bút sáp"),
  ("vt_g1_02",1,"Toys & Games","Đồ chơi","australian",
   "ball,doll,car,kite,puzzle,teddy bear,blocks,jump rope,balloon,robot",
   "bóng,búp bê,xe hơi,diều,xếp hình,gấu bông,khối xếp,nhảy dây,bóng bay,người máy"),
  ("vt_g1_03",1,"Feelings","Cảm xúc","finnish",
   "happy,sad,angry,scared,tired,hungry,thirsty,excited,surprised,brave",
   "vui,buồn,giận,sợ,mệt,đói,khát,phấn khích,ngạc nhiên,dũng cảm"),
  ("vt_g2_01",2,"Clothes","Quần áo","cambridge",
   "shirt,trousers,dress,shoes,hat,socks,jacket,scarf,skirt,boots",
   "áo,quần,váy,giày,mũ,tất,áo khoác,khăn,chân váy,ủng"),
  ("vt_g2_02",2,"Transport","Phương tiện","common_core",
   "car,bus,bicycle,train,plane,boat,motorbike,taxi,helicopter,ship",
   "xe hơi,xe buýt,xe đạp,tàu hỏa,máy bay,thuyền,xe máy,taxi,trực thăng,tàu"),
  ("vt_g2_03",2,"Nature & Seasons","Thiên nhiên","finnish",
   "spring,summer,autumn,winter,snow,rain,leaf,flower,sunshine,frost",
   "xuân,hè,thu,đông,tuyết,mưa,lá,hoa,nắng,sương giá"),
  ("vt_g3_01",3,"Jobs & Occupations","Nghề nghiệp","cambridge",
   "doctor,teacher,farmer,pilot,police officer,nurse,firefighter,chef,artist,engineer",
   "bác sĩ,giáo viên,nông dân,phi công,cảnh sát,y tá,lính cứu hỏa,đầu bếp,họa sĩ,kỹ sư"),
  ("vt_g3_02",3,"Places in Town","Địa điểm","australian",
   "hospital,school,park,library,market,cinema,museum,bank,post office,restaurant",
   "bệnh viện,trường,công viên,thư viện,chợ,rạp phim,bảo tàng,ngân hàng,bưu điện,nhà hàng"),
  ("vt_g3_03",3,"Musical Instruments","Nhạc cụ","finnish",
   "piano,guitar,drum,flute,violin,trumpet,recorder,bell,tambourine,xylophone",
   "đàn piano,đàn ghi-ta,trống,sáo,vĩ cầm,kèn trumpet,sáo dọc,chuông,trống lắc,đàn phím gỗ"),
  ("vt_g4_01",4,"Sports & Hobbies","Thể thao & Sở thích","common_core",
   "swimming,football,basketball,badminton,cycling,painting,reading,cooking,singing,dancing",
   "bơi,bóng đá,bóng rổ,cầu lông,đạp xe,vẽ,đọc,nấu ăn,hát,nhảy"),
  ("vt_g4_02",4,"Health & Body","Sức khỏe","cambridge",
   "headache,stomachache,fever,cough,medicine,exercise,healthy,vitamin,rest,hospital",
   "nhức đầu,đau bụng,sốt,ho,thuốc,tập thể dục,khỏe mạnh,vitamin,nghỉ ngơi,bệnh viện"),
  ("vt_g4_03",4,"Countries & Cultures","Quốc gia & Văn hóa","singapore",
   "Vietnam,Singapore,Japan,America,England,Australia,France,China,India,Korea",
   "Việt Nam,Singapore,Nhật Bản,Mỹ,Anh,Úc,Pháp,Trung Quốc,Ấn Độ,Hàn Quốc"),
  ("vt_g5_01",5,"Environment","Môi trường","australian",
   "pollution,recycle,forest,ocean,endangered,climate,renewable,conservation,ecosystem,habitat",
   "ô nhiễm,tái chế,rừng,đại dương,có nguy cơ,khí hậu,tái tạo,bảo tồn,hệ sinh thái,môi trường sống"),
  ("vt_g5_02",5,"Technology","Công nghệ","common_core",
   "computer,internet,keyboard,screen,email,website,download,password,tablet,software",
   "máy tính,internet,bàn phím,màn hình,email,trang web,tải về,mật khẩu,máy tính bảng,phần mềm"),
  ("vt_g5_03",5,"Space & Science","Không gian & Khoa học","canadian",
   "planet,star,moon,astronaut,gravity,telescope,rocket,orbit,solar system,satellite",
   "hành tinh,ngôi sao,mặt trăng,phi hành gia,trọng lực,kính viễn vọng,tên lửa,quỹ đạo,hệ mặt trời,vệ tinh"),
]

# Country-specific cultural content
COUNTRY_CONTENT = [
  # UK
  ("cc_uk_01",3,"British School Life","Cuộc sống trường học ở Anh","cambridge"),
  ("cc_uk_02",4,"UK Traditions","Truyền thống nước Anh","cambridge"),
  ("cc_uk_03",5,"British Literature","Văn học Anh","cambridge"),
  # US
  ("cc_us_01",3,"American Holidays","Ngày lễ Mỹ","common_core"),
  ("cc_us_02",4,"US Geography","Địa lý nước Mỹ","common_core"),
  ("cc_us_03",5,"American Heroes","Anh hùng Mỹ","common_core"),
  # Australia
  ("cc_au_01",3,"Australian Animals","Động vật Úc","australian"),
  ("cc_au_02",4,"Aboriginal Culture","Văn hóa Thổ dân Úc","australian"),
  ("cc_au_03",5,"Australian Environment","Môi trường Úc","australian"),
  # Finland
  ("cc_fi_01",3,"Finnish Nature","Thiên nhiên Phần Lan","finnish"),
  ("cc_fi_02",4,"Scandinavian Seasons","Mùa ở Bắc Âu","finnish"),
  ("cc_fi_03",5,"Finnish Innovation","Sáng tạo Phần Lan","finnish"),
  # Singapore
  ("cc_sg_01",3,"Singapore Festivals","Lễ hội Singapore","singapore"),
  ("cc_sg_02",4,"Multicultural Singapore","Đa văn hóa Singapore","singapore"),
  ("cc_sg_03",5,"ASEAN Connections","Kết nối ASEAN","singapore"),
  # Canada
  ("cc_ca_01",3,"Canadian Wildlife","Động vật hoang dã Canada","canadian"),
  ("cc_ca_02",4,"Canadian Seasons","Mùa ở Canada","canadian"),
  ("cc_ca_03",5,"French-English Canada","Song ngữ Pháp-Anh","canadian"),
]

target = '/Users/mac/Projects/henry-learning-os-audit/src/data/english-international.ts'
with open(target, 'r') as f:
    content = f.read()

new_lines = []

# Framework info update
new_lines.append("")
new_lines.append("// ── Extended Framework Info (6 countries) ──")
new_lines.append("export const EXTENDED_FRAMEWORKS = {")
new_lines.append("  finnish: { name: 'Finnish National Core Curriculum', flag: '🇫🇮', country: 'Finland', color: '#003580' },")
new_lines.append("  singapore: { name: 'Singapore STELLAR Programme', flag: '🇸🇬', country: 'Singapore', color: '#EF3340' },")
new_lines.append("  canadian: { name: 'Canadian Common Framework', flag: '🇨🇦', country: 'Canada', color: '#FF0000' },")
new_lines.append("} as const;")

# Writing
new_lines.append("")
new_lines.append("// ── Writing Skills (CCSS W.1-5 + Cambridge + Finnish + Singapore) ──")
new_lines.append("export interface WritingTopic { topicId: string; grade: number; title: string; titleVi: string; framework: string; }")
new_lines.append("export const WRITING_TOPICS: WritingTopic[] = [")
for tid, g, t, tv, fw in WRITING:
    new_lines.append(f"  {{ topicId: '{tid}', grade: {g}, title: '{t}', titleVi: '{tv}', framework: '{fw}' }},")
new_lines.append("];")

# Listening & Speaking
new_lines.append("")
new_lines.append("// ── Listening & Speaking (Cambridge SL + CCSS SL + Finnish + Singapore) ──")
new_lines.append("export interface ListeningSpeakingTopic { topicId: string; grade: number; title: string; titleVi: string; framework: string; }")
new_lines.append("export const LISTENING_SPEAKING_TOPICS: ListeningSpeakingTopic[] = [")
for tid, g, t, tv, fw in LISTENING:
    new_lines.append(f"  {{ topicId: '{tid}', grade: {g}, title: '{t}', titleVi: '{tv}', framework: '{fw}' }},")
new_lines.append("];")

# Vocabulary Themes
new_lines.append("")
new_lines.append("// ── Vocabulary Themes (6 countries) ──")
new_lines.append("export interface VocabTheme { themeId: string; grade: number; title: string; titleVi: string; framework: string; words: string[]; wordsVi: string[]; }")
new_lines.append("export const VOCAB_THEMES: VocabTheme[] = [")
for tid, g, t, tv, fw, w, wv in VOCAB:
    ws = ', '.join(f"'{x}'" for x in w.split(','))
    wvs = ', '.join(f"'{x}'" for x in wv.split(','))
    new_lines.append(f"  {{ themeId: '{tid}', grade: {g}, title: '{t}', titleVi: '{tv}', framework: '{fw}', words: [{ws}], wordsVi: [{wvs}] }},")
new_lines.append("];")

# Country-specific content
new_lines.append("")
new_lines.append("// ── Country-Specific Cultural Content (UK/US/AU/FI/SG/CA) ──")
new_lines.append("export interface CountryContent { contentId: string; grade: number; title: string; titleVi: string; framework: string; }")
new_lines.append("export const COUNTRY_CONTENT: CountryContent[] = [")
for cid, g, t, tv, fw in COUNTRY_CONTENT:
    new_lines.append(f"  {{ contentId: '{cid}', grade: {g}, title: '{t}', titleVi: '{tv}', framework: '{fw}' }},")
new_lines.append("];")

with open(target, 'a') as f:
    f.write('\n'.join(new_lines) + '\n')

print(f"✅ Added:")
print(f"  Writing: {len(WRITING)} topics (G1-G5)")
print(f"  Listening/Speaking: {len(LISTENING)} topics (G1-G5)")
print(f"  Vocabulary Themes: {len(VOCAB)} themes (G1-G5)")
print(f"  Country Content: {len(COUNTRY_CONTENT)} items (UK/US/AU/FI/SG/CA)")
print(f"  Total new: {len(WRITING)+len(LISTENING)+len(VOCAB)+len(COUNTRY_CONTENT)} topics")
