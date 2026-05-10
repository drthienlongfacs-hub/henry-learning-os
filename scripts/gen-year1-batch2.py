#!/usr/bin/env python3
"""Batch 2: Generate remaining interactive content for Year 1 curriculum."""
import json, re

DATA = {
  # ═══ ENGLISH remaining ═══
  "en1_3": {"vocab":[("write","viết","I can write my name.","✏️"),("draw","vẽ","Draw your family.","🎨"),("picture","bức tranh","This is my picture.","🖼️")],"quiz":[("What do you use to write?","['pen','ball','hat','cup']","pen","Write = viết, dùng bút (pen)."),("'Draw a picture' means...","['vẽ một bức tranh','đọc một câu chuyện','hát một bài hát','chạy thật nhanh']","vẽ một bức tranh","Draw a picture = vẽ tranh.")]},
  "en1_r": {"vocab":[],"quiz":[("Which is a family member?","['table','sister','school','park']","sister","Sister = chị/em gái, thành viên gia đình."),("What sound does 'cat' start with?","['/k/','/s/','/m/','/d/']","/k/","Cat bắt đầu bằng âm /k/.")]},
  "en2_3": {"vocab":[("poem","bài thơ","Read the poem aloud.","📜"),("describe","miêu tả","Describe your room.","💬")],"quiz":[("A poem often has words that ___","['rhyme','count','swim','jump']","rhyme","Poems have rhyming words = từ vần.")]},
  "en2_4": {"vocab":[("girl","cô gái","G is for girl.","👧"),("hat","cái mũ","H is for hat.","🎩"),("ice","đá","I is for ice.","🧊"),("jug","cái bình","J is for jug.","🫗"),("kite","con diều","K is for kite.","🪁"),("lion","sư tử","L is for lion.","🦁")],"quiz":[("Which letter starts 'kite'?","['J','K','L','M']","K","Kite bắt đầu bằng K."),("'Lion' starts with ___","['L','M','N','K']","L","Lion bắt đầu bằng L.")]},
  "en2_r": {"vocab":[],"quiz":[("The cat is ___ the box (inside)","['on','under','in','next to']","in","In = ở trong."),("There ___ a bed in my room.","['is','are','am','be']","is","A bed (số ít) → There is.")]},
  "en3_2": {"vocab":[("rhyme","vần","Moon and spoon rhyme.","🎵"),("poem","bài thơ","Read the poem.","📖")],"quiz":[("Which words rhyme?","['moon-spoon','cat-dog','big-small','red-blue']","moon-spoon","Moon và spoon có cùng âm cuối -oon.")]},
  "en3_3": {"vocab":[("mouse","chuột","M is for mouse.","🐭"),("nose","mũi","N is for nose.","👃"),("orange","cam","O is for orange.","🍊"),("pen","bút","P is for pen.","🖊️"),("queen","nữ hoàng","Q is for queen.","👑"),("rabbit","thỏ","R is for rabbit.","🐰")],"quiz":[("Which starts with 'O'?","['pen','orange','mouse','queen']","orange","Orange bắt đầu bằng O."),("R is for ___","['queen','rabbit','nose','pen']","rabbit","Rabbit bắt đầu bằng R.")]},
  "en3_r": {"vocab":[],"quiz":[("My ___ is kind. (female parent)","['father','brother','mother','sister']","mother","Mother = mẹ."),("The book is ___ the table.","['on','swim','fly','eat']","on","On = ở trên.")]},
  "en4_2": {"vocab":[("colour","màu sắc","What colour is the flower?","🎨"),("red","đỏ","The rose is red.","🔴"),("green","xanh lá","The grass is green.","🟢")],"quiz":[("What colour are most leaves?","['red','blue','green','yellow']","green","Leaves are green = lá màu xanh.")]},
  "en4_3": {"vocab":[("sun","mặt trời","S is for sun.","☀️"),("tiger","hổ","T is for tiger.","🐯"),("umbrella","ô","U is for umbrella.","☂️"),("van","xe tải nhỏ","V is for van.","🚐"),("watch","đồng hồ","W is for watch.","⌚"),("zebra","ngựa vằn","Z is for zebra.","🦓")],"quiz":[("T is for ___","['umbrella','sun','tiger','van']","tiger","Tiger bắt đầu bằng T."),("Which starts with 'Z'?","['watch','van','zebra','sun']","zebra","Zebra bắt đầu bằng Z.")]},
  "en4_r": {"vocab":[],"quiz":[("Bees make ___","['milk','honey','water','juice']","honey","Bees make honey."),("A butterfly can ___","['swim','fly','drive','cook']","fly","Butterflies fly.")]},
  "en5_1": {"vocab":[("island","hòn đảo","The island is beautiful.","🏝️"),("sea","biển","The sea is blue.","🌊"),("sand","cát","Play in the sand.","🏖️"),("shell","vỏ sò","I found a shell.","🐚"),("boat","thuyền","A boat on the sea.","⛵"),("swim","bơi","I can swim.","🏊")],"quiz":[("Where do you find shells?","['mountain','beach','school','shop']","beach","Shells are found on the beach."),("A boat goes on the ___","['road','sky','sea','grass']","sea","Boats go on the sea.")]},
  "en5_2": {"vocab":[("where","ở đâu","Where is my house?","📍")],"quiz":[("'Where is the cat?' asks about ___","['time','place','colour','name']","place","Where = hỏi về nơi chốn.")]},
  "en5_r": {"vocab":[],"quiz":[("The shell is ___ the sand.","['on','swim','fly','eat']","on","On = ở trên.")]},
  "en6_1": {"vocab":[("beach","bãi biển","We go to the beach.","🏖️"),("wave","sóng","Big waves!","🌊"),("crab","cua","A little crab.","🦀"),("seagull","chim hải âu","A seagull flies.","🕊️")],"quiz":[("A crab lives on the ___","['mountain','beach','tree','cloud']","beach","Crabs live on the beach."),("Waves are in the ___","['sky','sea','garden','house']","sea","Waves are in the sea.")]},
  "en6_2": {"vocab":[("story","câu chuyện","Read a story.","📖"),("happy","vui","I am happy.","😊"),("sad","buồn","She is sad.","😢")],"quiz":[("The opposite of happy is ___","['big','sad','fast','hot']","sad","Happy ↔ sad.")]},
  "en6_r": {"vocab":[],"quiz":[("A ___ lives in the sea.","['dog','crab','cat','bird']","crab","Crabs live in the sea.")]},
  "en7_1": {"vocab":[("do","nên làm","Do your homework.","✅"),("dont","không nên","Don't run inside.","🚫"),("rules","quy tắc","Follow the rules.","📋"),("safe","an toàn","Stay safe.","🛡️")],"quiz":[("'Don't run' means you ___","['should run','must not run','can fly','will swim']","must not run","Don't = không được."),("Rules help us stay ___","['hungry','safe','tall','old']","safe","Rules keep us safe.")]},
  "en7_2": {"vocab":[("must","phải","You must listen.","👂"),("careful","cẩn thận","Be careful!","⚠️")],"quiz":[("'Be careful' means ___","['chạy nhanh','cẩn thận','ngủ ngon','ăn nhiều']","cẩn thận","Be careful = cẩn thận.")]},
  "en7_r": {"vocab":[],"quiz":[("Don't ___ in the classroom.","['read','write','run','sit']","run","Don't run = không chạy trong lớp.")]},
  "en8_1": {"vocab":[("monkey","khỉ","Monkeys climb trees.","🐒"),("elephant","voi","An elephant is big.","🐘"),("giraffe","hươu cao cổ","A giraffe is tall.","🦒"),("parrot","vẹt","A parrot can talk.","🦜"),("snake","rắn","A snake has no legs.","🐍")],"quiz":[("Which animal is the tallest?","['monkey','elephant','giraffe','parrot']","giraffe","Giraffe = hươu cao cổ, cao nhất."),("A parrot can ___","['swim','talk','drive','read']","talk","Parrots can talk = vẹt biết nói.")]},
  "en8_2": {"vocab":[("habitat","môi trường sống","The jungle is a habitat.","🌴")],"quiz":[("Where do fish live?","['trees','water','sky','desert']","water","Fish live in water.")]},
  "en8_r": {"vocab":[],"quiz":[("An elephant has a long ___","['tail','trunk','wing','fin']","trunk","Elephant has a trunk = vòi.")]},
  "en9_1": {"vocab":[("cave","hang động","A dark cave.","🕳️"),("dark","tối","It is dark inside.","🌑"),("torch","đèn pin","Use a torch.","🔦"),("explore","khám phá","Let's explore!","🧭"),("treasure","kho báu","Find the treasure!","💎")],"quiz":[("You need a ___ in a dark cave.","['ball','torch','hat','book']","torch","Torch = đèn pin, soi sáng trong hang tối."),("'Explore' means ___","['ngủ','khám phá','ăn','chạy']","khám phá","Explore = khám phá.")]},
  "en9_2": {"vocab":[("big","to","A big ball.","🔴"),("small","nhỏ","A small ant.","🐜"),("beautiful","đẹp","A beautiful flower.","🌺")],"quiz":[("The opposite of big is ___","['tall','small','fast','hot']","small","Big ↔ small.")]},
  "en9_r": {"vocab":[],"quiz":[("A ___ gives light in the dark.","['hat','torch','ball','book']","torch","Torch = đèn pin."),("'Treasure' means ___","['kho báu','con mèo','cái bàn','bầu trời']","kho báu","Treasure = kho báu.")]},
  # ═══ MATH remaining ═══
  "ma1_2": {"vocab":[("write","viết","Write the number.","✏️"),("read","đọc","Read the number.","📖")],"quiz":[("What number comes before 5?","['3','4','6','7']","4","4 comes before 5."),("Write the number: seven","['6','7','8','9']","7","Seven = 7.")]},
  "ma1_3": {"vocab":[("number line","trục số","Use the number line.","📏")],"quiz":[("On a number line, what comes after 3?","['2','4','5','1']","4","3 → 4 trên trục số.")]},
  "ma1_4": {"vocab":[("more","nhiều hơn","5 is more than 3.","📈"),("fewer","ít hơn","2 is fewer than 5.","📉"),("same","bằng nhau","3 is the same as 3.","🟰")],"quiz":[("Which is more: 7 or 4?","['4','7','same','none']","7","7 > 4, seven is more.")]},
  "ma2_2": {"vocab":[],"quiz":[("Tom has 3 apples. He gets 2 more. How many?","['4','5','6','3']","5","3 + 2 = 5.")]},
  "ma3_2": {"vocab":[("difference","hiệu","Find the difference.","➖")],"quiz":[("What is the difference between 8 and 5?","['2','3','4','5']","3","8 - 5 = 3.")]},
  "ma3_3": {"vocab":[],"quiz":[("Lily has 9 sweets. She eats 4. How many left?","['4','5','6','3']","5","9 - 4 = 5.")]},
  "ma4_2": {"vocab":[("cube","khối lập phương","A dice is a cube.","🎲"),("sphere","hình cầu","A ball is a sphere.","⚽"),("cylinder","hình trụ","A can is a cylinder.","🥫"),("cone","hình nón","An ice cream cone.","🍦")],"quiz":[("A ball is shaped like a ___","['cube','sphere','cylinder','cone']","sphere","Ball = sphere = hình cầu."),("A dice is a ___","['sphere','cone','cube','cylinder']","cube","Dice = cube.")]},
  "ma4_3": {"vocab":[],"quiz":[("How many sides does a square have?","['3','4','5','6']","4","Square = hình vuông = 4 cạnh.")]},
  "ma5_1": {"vocab":[("eleven","mười một","11 = eleven","1️⃣"),("twelve","mười hai","12 = twelve","1️⃣"),("twenty","hai mươi","20 = twenty","2️⃣")],"quiz":[("What is 10 + 3?","['12','13','14','11']","13","10 + 3 = 13."),("How do you write 'fifteen'?","['13','14','15','16']","15","Fifteen = 15.")]},
  "ma5_2": {"vocab":[("tens","hàng chục","The tens digit.","🔟"),("ones","hàng đơn vị","The ones digit.","1️⃣")],"quiz":[("In 14, the tens digit is ___","['4','1','14','0']","1","14 = 1 ten + 4 ones.")]},
  "ma5_3": {"vocab":[],"quiz":[("Put in order: 18, 12, 15","['12, 15, 18','18, 15, 12','15, 12, 18','12, 18, 15']","12, 15, 18","Smallest to largest: 12 < 15 < 18.")]},
  "ma6_1": {"vocab":[],"quiz":[("12 + 5 = ?","['16','17','18','15']","17","12 + 5 = 17.")]},
  "ma6_2": {"vocab":[],"quiz":[("18 - 7 = ?","['10','11','12','13']","11","18 - 7 = 11.")]},
  "ma6_3": {"vocab":[],"quiz":[("Sam has 14 stickers. He gives away 6. How many left?","['7','8','9','10']","8","14 - 6 = 8.")]},
  "ma6_4": {"vocab":[],"quiz":[("7 + ___ = 15","['7','8','9','6']","8","7 + 8 = 15.")]},
  "ma7_1": {"vocab":[("long","dài","A long pencil.","📏"),("short","ngắn","A short ruler.","📐"),("tall","cao","A tall tree.","🌲")],"quiz":[("Which is longer: 10cm or 5cm?","['5cm','10cm','same','none']","10cm","10cm > 5cm.")]},
  "ma7_2": {"vocab":[("heavy","nặng","The stone is heavy.","🪨"),("light","nhẹ","The feather is light.","🪶")],"quiz":[("Which is heavier: a stone or a feather?","['feather','stone','same','water']","stone","Stone is heavier than feather.")]},
  "ma7_3": {"vocab":[],"quiz":[("How many pencils long is your book? This measures ___","['weight','length','time','colour']","length","Measuring with pencils = length.")]},
  "ma8_1": {"vocab":[("clock","đồng hồ","Look at the clock.","🕐"),("oclock","giờ đúng","It is 3 o'clock.","🕒")],"quiz":[("When the big hand points to 12, it is ___","[\"o'clock\",\"half past\",\"quarter past\",\"midnight\"]","o'clock","Big hand at 12 = o'clock.")]},
  "ma8_2": {"vocab":[("half past","rưỡi","Half past 2.","🕝")],"quiz":[("Half past 3 means ___","['3:00','3:15','3:30','3:45']","3:30","Half past = :30.")]},
  "ma8_3": {"vocab":[],"quiz":[("What day comes after Monday?","['Wednesday','Sunday','Tuesday','Friday']","Tuesday","Monday → Tuesday.")]},
  "ma9_1": {"vocab":[],"quiz":[("What comes after 29?","['28','30','31','39']","30","29 → 30.")]},
  "ma9_2": {"vocab":[],"quiz":[("Count in 5s: 5, 10, 15, ___","['16','18','20','25']","20","5, 10, 15, 20."),("Count in 2s: 2, 4, 6, ___","['7','8','9','10']","8","2, 4, 6, 8.")]},
  "ma9_3": {"vocab":[],"quiz":[("One more than 34 is ___","['33','35','44','24']","35","34 + 1 = 35."),("One less than 40 is ___","['41','39','30','50']","39","40 - 1 = 39.")]},
  "ma10_1": {"vocab":[("coin","đồng xu","A shiny coin.","🪙"),("pound","bảng Anh","One pound.","💷")],"quiz":[("Which coin is worth the most?","['1p','5p','10p','50p']","50p","50p is the most valuable.")]},
  "ma10_2": {"vocab":[],"quiz":[("5p + 5p = ___","['5p','10p','15p','20p']","10p","5p + 5p = 10p.")]},
  "ma10_3": {"vocab":[],"quiz":[("An apple costs 20p. You pay with 50p. Change = ___","['20p','30p','40p','10p']","30p","50p - 20p = 30p change.")]},
  "ma11_1": {"vocab":[("half","một nửa","Half of the pizza.","🍕"),("quarter","một phần tư","A quarter of the cake.","🍰")],"quiz":[("Half of 8 is ___","['2','3','4','6']","4","8 ÷ 2 = 4.")]},
  "ma11_2": {"vocab":[],"quiz":[("A quarter of 12 is ___","['2','3','4','6']","3","12 ÷ 4 = 3.")]},
  "ma11_3": {"vocab":[],"quiz":[("Half of 10 is ___","['3','4','5','6']","5","10 ÷ 2 = 5."),("A quarter of 20 is ___","['4','5','10','15']","5","20 ÷ 4 = 5.")]},
  "ma12_1": {"vocab":[("left","trái","Turn left.","⬅️"),("right","phải","Turn right.","➡️"),("above","ở trên","The bird is above.","⬆️"),("below","ở dưới","The fish is below.","⬇️")],"quiz":[("The opposite of left is ___","['up','right','down','above']","right","Left ↔ right.")]},
  "ma12_2": {"vocab":[("turn","xoay","Turn around.","🔄")],"quiz":[("A half turn is ___","['90°','180°','270°','360°']","180°","Half turn = 180°.")]},
  # ═══ SCIENCE remaining ═══
  "sc1_3": {"vocab":[("wild","hoang dã","Wild flowers.","🌼"),("garden","vườn","Garden plants.","🌻")],"quiz":[("A daisy in a field is a ___ plant.","['garden','wild','house','water']","wild","Daisy in field = wild plant.")]},
  "sc1_4": {"vocab":[("deciduous","rụng lá","Deciduous trees lose leaves.","🍂"),("evergreen","thường xanh","Evergreen trees stay green.","🌲"),("trunk","thân cây","The tree trunk.","🪵"),("branch","cành cây","A bird on a branch.","🌿"),("bark","vỏ cây","Rough bark.","🪵")],"quiz":[("A tree that loses its leaves in autumn is ___","['evergreen','deciduous','tropical','wild']","deciduous","Deciduous = rụng lá mùa thu."),("An evergreen tree ___","['loses leaves','stays green','has no trunk','grows in water']","stays green","Evergreen = luôn xanh.")]},
  "sc1_5": {"vocab":[],"quiz":[("Plants need ___ to grow.","['darkness','water','plastic','metal']","water","Plants need water, sunlight, and soil.")]},
  "sc2_2": {"vocab":[("carnivore","động vật ăn thịt","A lion is a carnivore.","🦁"),("herbivore","động vật ăn cỏ","A cow is a herbivore.","🐄"),("omnivore","động vật ăn tạp","Humans are omnivores.","🧑")],"quiz":[("A lion only eats meat. It is a ___","['herbivore','omnivore','carnivore','amphibian']","carnivore","Eats only meat = carnivore."),("A cow eats only plants. It is a ___","['carnivore','herbivore','omnivore','reptile']","herbivore","Eats only plants = herbivore.")]},
  "sc2_3": {"vocab":[("head","đầu","My head.","🗣️"),("arm","cánh tay","My arm.","💪"),("leg","chân","My leg.","🦵"),("hand","bàn tay","My hand.","🤚")],"quiz":[("You walk with your ___","['arms','legs','ears','eyes']","legs","Walk with legs = đi bằng chân.")]},
  "sc2_5": {"vocab":[],"quiz":[("Which sense helps you smell a flower?","['sight','hearing','smell','touch']","smell","Smell = ngửi.")]},
  "sc3_2": {"vocab":[("hard","cứng","A rock is hard.","🪨"),("soft","mềm","Cotton is soft.","☁️"),("rough","thô ráp","Sandpaper is rough.","📄"),("smooth","mịn","Glass is smooth.","🪟")],"quiz":[("Which is soft?","['rock','metal','cotton','glass']","cotton","Cotton is soft = bông mềm."),("Sandpaper feels ___","['smooth','soft','rough','cold']","rough","Sandpaper is rough.")]},
  "sc3_3": {"vocab":[],"quiz":[("Which material is best for a raincoat?","['paper','fabric','waterproof plastic','wood']","waterproof plastic","Raincoat needs waterproof material.")]},
  "sc3_4": {"vocab":[("waterproof","chống nước","Plastic is waterproof.","🌧️")],"quiz":[("Which material keeps water out?","['paper','fabric','plastic','wood']","plastic","Plastic is waterproof.")]},
  "sc4_2": {"vocab":[("leaves","lá","Leaves change colour.","🍁"),("fall","rơi","Leaves fall down.","🍂")],"quiz":[("In autumn, leaves ___","['grow bigger','fall from trees','turn blue','stay green']","fall from trees","Autumn = lá rụng.")]},
  "sc4_3": {"vocab":[("cold","lạnh","Winter is cold.","❄️"),("frost","sương giá","Frost on the window.","🌨️"),("snow","tuyết","White snow.","⛄")],"quiz":[("In winter you might see ___","['butterflies','snow','sunflowers','swimming']","snow","Winter = snow.")]},
  "sc4_4": {"vocab":[],"quiz":[("In summer, days are ___","['shorter','longer','the same','darker']","longer","Summer = longer days.")]},
  "sc5_1": {"vocab":[("blossom","hoa nở","Cherry blossom.","🌸"),("bud","nụ","A flower bud.","🌱"),("nest","tổ chim","A bird's nest.","🪺")],"quiz":[("In spring, trees grow new ___","['snow','buds','frost','ice']","buds","Spring = buds appear.")]},
  "sc5_2": {"vocab":[],"quiz":[("Summer weather is usually ___","['cold and icy','warm and sunny','foggy','snowy']","warm and sunny","Summer = warm and sunny.")]},
  "sc5_3": {"vocab":[],"quiz":[("A weather diary records ___","['food','weather each day','homework','stories']","weather each day","Weather diary = ghi thời tiết mỗi ngày.")]},
  "sc5_4": {"vocab":[],"quiz":[("Which season has the shortest days?","['spring','summer','autumn','winter']","winter","Winter has shortest days.")]},
  "sc6_1": {"vocab":[("water","nước","Plants need water.","💧"),("sunlight","ánh nắng","Sunlight helps plants grow.","☀️"),("soil","đất","Seeds grow in soil.","🪴")],"quiz":[("Plants need all EXCEPT ___","['water','sunlight','chocolate','soil']","chocolate","Plants don't need chocolate!")]},
  "sc6_2": {"vocab":[("seed","hạt giống","Plant the seed.","🌱"),("bean","hạt đậu","Grow a bean.","🫘")],"quiz":[("First step to grow a bean: put ___ in soil","['a leaf','a seed','a flower','a branch']","a seed","Seed goes in soil first.")]},
  "sc6_3": {"vocab":[("observe","quan sát","Observe the plant.","👀"),("record","ghi chép","Record your findings.","📝")],"quiz":[("Scientists ___ what they see.","['ignore','record','forget','hide']","record","Scientists record observations.")]},
  "sc6_4": {"vocab":[],"quiz":[("Which is NOT a plant part?","['root','stem','wheel','leaf']","wheel","Wheel is not a plant part."),("Animals that eat both plants and meat are ___","['herbivores','carnivores','omnivores','reptiles']","omnivores","Both plants + meat = omnivores.")]},
}

# Read existing file and append new entries
with open('src/data/year1-interactive-content.ts', 'r') as f:
    content = f.read()

# Find the closing };
insert_pos = content.rfind('};')

new_entries = []
for tid, d in DATA.items():
    if f'"{tid}"' in content:
        continue  # skip existing
    lines = [f'  "{tid}": {{']
    if d["vocab"]:
        lines.append('    vocabCards: [')
        for v in d["vocab"]:
            w, m, ex, em = v
            lines.append(f'      {{ word: "{w}", meaning: "{m}", example: "{ex}", imageEmoji: "{em}" }},')
        lines.append('    ],')
    if d["quiz"]:
        lines.append('    quizzes: [')
        for q in d["quiz"]:
            question, opts, ans, exp = q
            lines.append(f'      {{ question: "{question}", options: {opts}, answer: "{ans}", explanationVi: "{exp}" }},')
        lines.append('    ],')
    lines.append('  },')
    new_entries.append('\n'.join(lines))

if new_entries:
    new_block = '\n'.join(new_entries) + '\n'
    content = content[:insert_pos] + new_block + content[insert_pos:]
    with open('src/data/year1-interactive-content.ts', 'w') as f:
        f.write(content)

print(f'ADDED {len(new_entries)} new topics')
