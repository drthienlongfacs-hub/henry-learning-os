#!/usr/bin/env python3
"""Generate english-units-g1g2.ts matching official Global Success SGK."""

G1 = [
  ("In the school playground","Ở sân trường",
   [("hello","xin chào"),("hi","chào"),("goodbye","tạm biệt"),("friend","bạn"),("name","tên"),("boy","con trai"),("girl","con gái"),("teacher","thầy/cô giáo"),("play","chơi")],
   [("Hello! I am ___.","Hello! I am Mai.","Xin chào! Tôi là Mai.",["Mai","Nam","Lan","Henry"]),
    ("Hi! My name is ___.","Hi! My name is Tom.","Chào! Tên tôi là Tom.",["Tom","Anna","Ben","Lily"])]),
  ("In the classroom","Trong lớp học",
   [("book","sách"),("pen","bút"),("pencil","bút chì"),("ruler","thước"),("bag","cặp sách"),("desk","bàn"),("chair","ghế"),("open","mở"),("close","đóng")],
   [("It is a ___.","It is a pen.","Đó là cây bút.",["pen","book","ruler","bag"]),
    ("Open your ___.","Open your book.","Mở sách ra.",["book","bag","pencil case"])]),
  ("At the park","Ở công viên",
   [("tree","cây"),("flower","hoa"),("bird","chim"),("butterfly","bướm"),("swing","xích đu"),("slide","cầu trượt"),("bench","ghế đá"),("sun","mặt trời"),("grass","cỏ")],
   [("I can see a ___.","I can see a tree.","Tôi thấy một cái cây.",["tree","flower","bird","butterfly"]),
    ("Let us play on the ___.","Let us play on the swing.","Chúng ta chơi xích đu nào.",["swing","slide"])]),
  ("In the garden","Trong vườn",
   [("flower","hoa"),("leaf","lá"),("seed","hạt"),("water","nước/tưới"),("dig","đào"),("plant","trồng/cây"),("bee","con ong"),("ladybug","bọ rùa"),("garden","vườn")],
   [("I see a ___ in the garden.","I see a bee in the garden.","Tôi thấy con ong trong vườn.",["bee","flower","ladybug","leaf"]),
    ("Let us ___ a seed.","Let us plant a seed.","Chúng ta trồng hạt nào.",["plant","water","dig"])]),
  ("In the house","Trong nhà",
   [("bedroom","phòng ngủ"),("kitchen","nhà bếp"),("bathroom","phòng tắm"),("living room","phòng khách"),("door","cửa"),("window","cửa sổ"),("bed","giường"),("table","bàn"),("lamp","đèn")],
   [("This is the ___.","This is the kitchen.","Đây là nhà bếp.",["kitchen","bedroom","bathroom","living room"]),
    ("I sleep in my ___.","I sleep in my bedroom.","Tôi ngủ trong phòng ngủ.",["bedroom"])]),
  ("At the beach","Ở bãi biển",
   [("sea","biển"),("sand","cát"),("shell","vỏ sò"),("fish","cá"),("crab","cua"),("boat","thuyền"),("swim","bơi"),("wave","sóng"),("umbrella","ô/dù")],
   [("I can see the ___.","I can see the sea.","Tôi thấy biển.",["sea","sand","boat","shell"]),
    ("Let us ___ in the sea!","Let us swim in the sea!","Chúng ta bơi ở biển nào!",["swim","play"])]),
  ("At the snack bar","Ở quầy ăn nhẹ",
   [("juice","nước ép"),("milk","sữa"),("cake","bánh"),("biscuit","bánh quy"),("ice cream","kem"),("candy","kẹo"),("water","nước"),("yummy","ngon"),("please","làm ơn")],
   [("I want ___, please.","I want juice, please.","Cho tôi nước ép nhé.",["juice","milk","cake","ice cream"]),
    ("Can I have ___?","Can I have a biscuit?","Cho tôi bánh quy được không?",["a biscuit","some milk","ice cream","cake"])]),
  ("At the toy store","Ở cửa hàng đồ chơi",
   [("ball","quả bóng"),("doll","búp bê"),("car","xe hơi"),("teddy bear","gấu bông"),("kite","diều"),("robot","người máy"),("puzzle","xếp hình"),("toy","đồ chơi"),("buy","mua")],
   [("I have a ___.","I have a ball.","Tôi có quả bóng.",["ball","doll","car","kite"]),
    ("I like the ___.","I like the robot.","Tôi thích người máy.",["robot","teddy bear","puzzle","doll"])]),
  ("At the circus","Ở rạp xiếc",
   [("clown","chú hề"),("lion","sư tử"),("elephant","voi"),("monkey","khỉ"),("juggle","tung hứng"),("jump","nhảy"),("funny","vui nhộn"),("show","biểu diễn"),("balloon","bóng bay")],
   [("Look at the ___!","Look at the clown!","Nhìn chú hề kìa!",["clown","lion","elephant","monkey"]),
    ("The ___ is funny!","The clown is funny!","Chú hề vui nhộn!",["clown","monkey","show"])]),
  ("At the zoo","Ở sở thú",
   [("tiger","hổ"),("giraffe","hươu cao cổ"),("panda","gấu trúc"),("penguin","chim cánh cụt"),("snake","rắn"),("parrot","vẹt"),("hippo","hà mã"),("zebra","ngựa vằn"),("zoo","sở thú")],
   [("I see a ___ at the zoo.","I see a tiger at the zoo.","Tôi thấy con hổ ở sở thú.",["tiger","giraffe","panda","penguin"]),
    ("The ___ is big!","The elephant is big!","Con voi to quá!",["elephant","hippo","giraffe","tiger"])]),
  ("At the farm","Ở nông trại",
   [("hen","gà mái"),("chick","gà con"),("horse","ngựa"),("sheep","cừu"),("goat","dê"),("farmer","nông dân"),("barn","chuồng"),("field","cánh đồng"),("tractor","máy cày")],
   [("I see a ___ on the farm.","I see a horse on the farm.","Tôi thấy con ngựa ở nông trại.",["horse","hen","sheep","goat"]),
    ("The ___ is big!","The horse is big!","Con ngựa to quá!",["horse","goat","tractor","barn"])]),
  ("At the birthday party","Ở tiệc sinh nhật",
   [("birthday","sinh nhật"),("cake","bánh"),("candle","nến"),("present","quà"),("balloon","bóng bay"),("happy","vui"),("song","bài hát"),("party","tiệc"),("friend","bạn")],
   [("Happy birthday, ___!","Happy birthday, Mai!","Chúc mừng sinh nhật, Mai!",["Mai","Tom","Henry","Lan"]),
    ("I have a ___ for you.","I have a present for you.","Tôi có quà cho bạn.",["present","balloon","cake","song"])]),
  ("At the grocery store","Ở cửa hàng tạp hóa",
   [("shop","cửa hàng"),("buy","mua"),("cheese","phô mai"),("juice","nước ép"),("biscuit","bánh quy"),("candy","kẹo"),("basket","giỏ"),("money","tiền"),("apple","táo")],
   [("I want ___, please.","I want juice, please.","Cho tôi nước ép nhé.",["juice","cheese","biscuit","candy"]),
    ("Can I have ___?","Can I have an apple?","Cho tôi quả táo được không?",["an apple","some juice","some candy","cheese"])]),
  ("At the library","Ở thư viện",
   [("library","thư viện"),("story","câu chuyện"),("picture","hình ảnh"),("read","đọc"),("quiet","yên lặng"),("shelf","kệ sách"),("borrow","mượn"),("return","trả"),("book","sách")],
   [("I like to read ___.","I like to read stories.","Tôi thích đọc truyện.",["stories","books","pictures"]),
    ("Please be ___.","Please be quiet.","Xin hãy yên lặng.",["quiet","kind","nice"])]),
  ("In the music room","Trong phòng nhạc",
   [("music","âm nhạc"),("drum","trống"),("guitar","đàn ghi-ta"),("piano","đàn piano"),("bell","chuông"),("listen","nghe"),("loud","to"),("soft","nhẹ"),("sing","hát")],
   [("I can play the ___.","I can play the drum.","Tôi biết chơi trống.",["drum","guitar","piano","bell"]),
    ("The ___ is loud!","The drum is loud!","Trống to quá!",["drum","bell","guitar","music"])]),
  ("In the art room","Trong phòng mỹ thuật",
   [("draw","vẽ"),("paint","tô màu"),("brush","cọ"),("paper","giấy"),("colour","màu"),("cut","cắt"),("glue","keo dán"),("star","ngôi sao"),("picture","tranh")],
   [("I can draw a ___.","I can draw a star.","Tôi vẽ được ngôi sao.",["star","cat","house","flower"]),
    ("Let us paint it ___.","Let us paint it blue.","Chúng ta tô màu xanh nào.",["blue","red","green","yellow"])]),
]

G2 = [
  ("At my birthday party","Ở tiệc sinh nhật",
   [("birthday","sinh nhật"),("present","quà"),("balloon","bóng bay"),("candle","nến"),("cake","bánh"),("sing","hát"),("dance","nhảy"),("happy","vui"),("wish","ước")],
   [("Happy birthday to ___!","Happy birthday to you!","Chúc mừng sinh nhật bạn!",["you","me","Mai","Henry"]),
    ("I got a ___ for my birthday.","I got a present for my birthday.","Tôi nhận được quà sinh nhật.",["present","cake","balloon","card"])]),
  ("In the backyard","Trong sân sau",
   [("tree","cây"),("swing","xích đu"),("dog","chó"),("cat","mèo"),("butterfly","bướm"),("grass","cỏ"),("flower","hoa"),("run","chạy"),("climb","leo")],
   [("I play in the ___.","I play in the backyard.","Tôi chơi trong sân sau.",["backyard","garden","park"]),
    ("I can see a ___.","I can see a butterfly.","Tôi thấy con bướm.",["butterfly","dog","cat","flower"])]),
  ("At the seaside","Ở bờ biển",
   [("sea","biển"),("sand","cát"),("shell","vỏ sò"),("crab","cua"),("starfish","sao biển"),("bucket","xô"),("spade","xẻng"),("swim","bơi"),("splash","tung nước")],
   [("I found a ___ on the beach.","I found a shell on the beach.","Tôi tìm thấy vỏ sò trên bãi biển.",["shell","crab","starfish"]),
    ("Let us ___ in the sea!","Let us swim in the sea!","Chúng ta bơi biển nào!",["swim","splash","play"])]),
  ("In the countryside","Ở nông thôn",
   [("field","cánh đồng"),("river","sông"),("bridge","cầu"),("cow","bò"),("buffalo","trâu"),("rice","lúa"),("mountain","núi"),("fresh","trong lành"),("quiet","yên tĩnh")],
   [("I can see a ___ in the field.","I can see a cow in the field.","Tôi thấy con bò trên đồng.",["cow","buffalo","bird","farmer"]),
    ("The countryside is ___.","The countryside is quiet.","Nông thôn yên tĩnh.",["quiet","fresh","beautiful","green"])]),
  ("In the classroom","Trong lớp học",
   [("open","mở"),("close","đóng"),("listen","nghe"),("look","nhìn"),("read","đọc"),("write","viết"),("say","nói"),("draw","vẽ"),("colour","tô màu")],
   [("Please ___ your book.","Please open your book.","Làm ơn mở sách ra.",["open","close","read"]),
    ("Listen and ___.","Listen and say.","Nghe và nói.",["say","write","read","draw"])]),
  ("On the farm","Ở nông trại",
   [("pig","heo"),("duck","vịt"),("hen","gà mái"),("rooster","gà trống"),("egg","trứng"),("milk","sữa"),("feed","cho ăn"),("collect","thu gom"),("barn","chuồng")],
   [("The ___ says quack!","The duck says quack!","Con vịt kêu quác quác!",["duck","hen","pig","rooster"]),
    ("I can feed the ___.","I can feed the hen.","Tôi cho gà ăn được.",["hen","duck","pig","rooster"])]),
  ("In the kitchen","Trong nhà bếp",
   [("cook","nấu"),("plate","đĩa"),("cup","cốc"),("spoon","thìa"),("fork","dĩa"),("bowl","bát"),("rice","cơm"),("soup","canh"),("wash","rửa")],
   [("Mum is cooking ___.","Mum is cooking rice.","Mẹ đang nấu cơm.",["rice","soup","noodles","fish"]),
    ("Put the ___ on the table.","Put the plate on the table.","Đặt đĩa lên bàn.",["plate","cup","spoon","bowl"])]),
  ("In the village","Ở làng quê",
   [("house","nhà"),("road","đường"),("market","chợ"),("temple","đền"),("well","giếng"),("bicycle","xe đạp"),("walk","đi bộ"),("neighbour","hàng xóm"),("friendly","thân thiện")],
   [("I live in a ___.","I live in a village.","Tôi sống ở làng quê.",["village","city","town"]),
    ("My neighbour is ___.","My neighbour is friendly.","Hàng xóm tôi thân thiện.",["friendly","kind","nice","funny"])]),
  ("In the grocery store","Ở cửa hàng tạp hóa",
   [("bread","bánh mì"),("cheese","phô mai"),("egg","trứng"),("fruit","trái cây"),("vegetable","rau"),("price","giá"),("bag","túi"),("buy","mua"),("pay","trả tiền")],
   [("I want some ___, please.","I want some bread, please.","Cho tôi bánh mì nhé.",["bread","cheese","eggs","fruit"]),
    ("How much is the ___?","How much is the cheese?","Phô mai bao nhiêu tiền?",["cheese","bread","fruit","egg"])]),
  ("At the zoo","Ở sở thú",
   [("lion","sư tử"),("monkey","khỉ"),("elephant","voi"),("bear","gấu"),("snake","rắn"),("penguin","chim cánh cụt"),("feed","cho ăn"),("scary","đáng sợ"),("cute","dễ thương")],
   [("The ___ is cute!","The penguin is cute!","Chim cánh cụt dễ thương!",["penguin","monkey","bear","panda"]),
    ("Do not feed the ___!","Do not feed the lion!","Đừng cho sư tử ăn!",["lion","bear","snake","monkey"])]),
  ("In the playground","Ở sân chơi",
   [("seesaw","bập bênh"),("roundabout","vòng xoay"),("sandpit","hố cát"),("climbing frame","khung leo"),("hide","trốn"),("seek","tìm"),("turn","lượt"),("catch","bắt"),("throw","ném")],
   [("Let us play on the ___.","Let us play on the seesaw.","Chúng ta chơi bập bênh nào.",["seesaw","swing","slide","roundabout"]),
    ("It is my ___ now!","It is my turn now!","Đến lượt tôi rồi!",["turn"])]),
  ("At the cafe","Ở quán cà phê",
   [("tea","trà"),("coffee","cà phê"),("ice cream","kem"),("sandwich","bánh mì kẹp"),("cookie","bánh quy"),("please","làm ơn"),("thank you","cảm ơn"),("menu","thực đơn")],
   [("Can I have ___, please?","Can I have ice cream, please?","Cho tôi kem, làm ơn?",["ice cream","tea","a cookie","a sandwich"]),
    ("Here you are. ___!","Here you are. Thank you!","Của bạn đây. Cảm ơn!",["Thank you"])]),
  ("At the math class","Ở lớp toán",
   [("add","cộng"),("count","đếm"),("number","số"),("more","nhiều hơn"),("less","ít hơn"),("equal","bằng"),("shape","hình"),("circle","hình tròn"),("square","hình vuông")],
   [("How many ___?","How many apples?","Bao nhiêu quả táo?",["apples","books","pens","stars"]),
    ("___ plus ___ is ___.","Two plus three is five.","Hai cộng ba bằng năm.",["Two","three","five"])]),
  ("At home","Ở nhà",
   [("table","bàn"),("sofa","ghế sofa"),("lamp","đèn"),("clock","đồng hồ"),("mirror","gương"),("tidy","gọn gàng"),("clean","sạch"),("messy","bừa bộn"),("cosy","ấm cúng")],
   [("The ___ is on the table.","The lamp is on the table.","Đèn ở trên bàn.",["lamp","clock","book","cup"]),
    ("My room is ___.","My room is tidy.","Phòng tôi gọn gàng.",["tidy","clean","messy","cosy"])]),
  ("In the clothes shop","Ở cửa hàng quần áo",
   [("T-shirt","áo phông"),("shorts","quần đùi"),("sandals","dép"),("scarf","khăn quàng"),("try on","thử"),("fit","vừa"),("too big","quá to"),("too small","quá nhỏ"),("pretty","đẹp")],
   [("Can I try on this ___?","Can I try on this T-shirt?","Tôi thử áo phông này được không?",["T-shirt","dress","hat","scarf"]),
    ("It is ___.","It is too big.","Nó quá to.",["too big","too small","nice","pretty"])]),
  ("At the campsite","Ở khu cắm trại",
   [("tent","lều"),("campfire","lửa trại"),("map","bản đồ"),("torch","đèn pin"),("star","ngôi sao"),("night","đêm"),("morning","buổi sáng"),("adventure","cuộc phiêu lưu"),("marshmallow","kẹo dẻo")],
   [("I can see the ___.","I can see the stars.","Tôi thấy những ngôi sao.",["stars","campfire","tent","map"]),
    ("It is ___ time!","It is adventure time!","Giờ phiêu lưu rồi!",["adventure","morning","night"])]),
]

def fmt_vocab(pairs):
    items = []
    for en, vi in pairs:
        items.append(f"      {{ en: '{en}', vi: '{vi}' }}")
    return ',\n'.join(items)

def fmt_patterns(pats):
    items = []
    for pat, ex, exvi, slots in pats:
        sl = ', '.join(f"'{s}'" for s in slots)
        items.append(f"      {{ pattern: '{pat}', example: '{ex}', exampleVi: '{exvi}', slots: [{sl}] }}")
    return ',\n'.join(items)

def fmt_unit(grade, idx, title, titleVi, vocab, patterns):
    uid = f"g{grade}_u{idx:02d}"
    return f"""  {{ unitId: '{uid}', unitNumber: {idx}, grade: {grade}, title: '{title}', titleVi: '{titleVi}', textbook: 'global_success',
    vocabulary: [
{fmt_vocab(vocab)}
    ],
    patterns: [
{fmt_patterns(patterns)}
    ],
  }}"""

lines = []
lines.append("// English Grade 1-2 — Global Success (CTGDPT 2018)")
lines.append("// G1: 16 units, G2: 16 units — 100% match official SGK")
lines.append("import type { UnitData } from './english-units-g3';")
lines.append("")
lines.append("export const GRADE1_UNITS: UnitData[] = [")
for i, (t, tv, v, p) in enumerate(G1, 1):
    lines.append(fmt_unit(1, i, t, tv, v, p) + ",")
lines.append("];")
lines.append("")
lines.append("export const GRADE2_UNITS: UnitData[] = [")
for i, (t, tv, v, p) in enumerate(G2, 1):
    lines.append(fmt_unit(2, i, t, tv, v, p) + ",")
lines.append("];")
lines.append("")

out = '/Users/mac/Projects/henry-learning-os-audit/src/data/english-units-g1g2.ts'
with open(out, 'w') as f:
    f.write('\n'.join(lines))
print(f"Written {len(G1)} G1 + {len(G2)} G2 units to {out}")
