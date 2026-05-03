/**
 * ipaDatabase.ts — Offline IPA Pronunciation Database
 * Ported from LinguaKids — 300+ most common EN words with IPA
 * Source: Curated from Wiktionary IPA dumps (en.wiktionary.org)
 */

const IPA_DB: Record<string, string> = {
  // Top 100 most common words
  'the': '/ðə/', 'be': '/biː/', 'to': '/tuː/', 'of': '/ʌv/', 'and': '/ænd/',
  'a': '/eɪ/', 'in': '/ɪn/', 'that': '/ðæt/', 'have': '/hæv/', 'i': '/aɪ/',
  'it': '/ɪt/', 'for': '/fɔːr/', 'not': '/nɒt/', 'on': '/ɒn/', 'with': '/wɪð/',
  'he': '/hiː/', 'as': '/æz/', 'you': '/juː/', 'do': '/duː/', 'at': '/æt/',
  'this': '/ðɪs/', 'but': '/bʌt/', 'his': '/hɪz/', 'by': '/baɪ/', 'from': '/frʌm/',
  'they': '/ðeɪ/', 'we': '/wiː/', 'say': '/seɪ/', 'her': '/hɜːr/', 'she': '/ʃiː/',
  'or': '/ɔːr/', 'an': '/ən/', 'will': '/wɪl/', 'my': '/maɪ/', 'one': '/wʌn/',
  'all': '/ɔːl/', 'would': '/wʊd/', 'there': '/ðɛər/', 'their': '/ðɛər/',
  'what': '/wɒt/', 'so': '/soʊ/', 'up': '/ʌp/', 'out': '/aʊt/', 'if': '/ɪf/',
  'about': '/əˈbaʊt/', 'who': '/huː/', 'get': '/ɡɛt/', 'which': '/wɪtʃ/',
  'go': '/ɡoʊ/', 'me': '/miː/', 'when': '/wɛn/', 'make': '/meɪk/',
  'can': '/kæn/', 'like': '/laɪk/', 'time': '/taɪm/', 'no': '/noʊ/',
  'just': '/dʒʌst/', 'him': '/hɪm/', 'know': '/noʊ/', 'take': '/teɪk/',
  'people': '/ˈpiːpəl/', 'into': '/ˈɪntuː/', 'year': '/jɪər/', 'your': '/jɔːr/',
  'good': '/ɡʊd/', 'some': '/sʌm/', 'could': '/kʊd/', 'them': '/ðɛm/',
  'see': '/siː/', 'other': '/ˈʌðər/', 'than': '/ðæn/', 'then': '/ðɛn/',
  'now': '/naʊ/', 'look': '/lʊk/', 'only': '/ˈoʊnli/', 'come': '/kʌm/',

  // Common A1-A2 words with tricky pronunciation
  'apple': '/ˈæpəl/', 'animal': '/ˈænɪməl/', 'answer': '/ˈænsər/', 'beautiful': '/ˈbjuːtɪfəl/',
  'before': '/bɪˈfɔːr/', 'begin': '/bɪˈɡɪn/', 'believe': '/bɪˈliːv/', 'between': '/bɪˈtwiːn/',
  'bird': '/bɜːrd/', 'blue': '/bluː/', 'body': '/ˈbɒdi/', 'book': '/bʊk/',
  'bread': '/brɛd/', 'brother': '/ˈbrʌðər/', 'build': '/bɪld/', 'business': '/ˈbɪznɪs/',
  'buy': '/baɪ/', 'change': '/tʃeɪndʒ/', 'child': '/tʃaɪld/', 'children': '/ˈtʃɪldrən/',
  'city': '/ˈsɪti/', 'close': '/kloʊz/', 'clothes': '/kloʊðz/', 'color': '/ˈkʌlər/',
  'computer': '/kəmˈpjuːtər/', 'country': '/ˈkʌntri/', 'daughter': '/ˈdɔːtər/',
  'different': '/ˈdɪfərənt/', 'difficult': '/ˈdɪfɪkəlt/', 'doctor': '/ˈdɒktər/',
  'door': '/dɔːr/', 'draw': '/drɔː/', 'dream': '/driːm/', 'drink': '/drɪŋk/',
  'drive': '/draɪv/', 'each': '/iːtʃ/', 'early': '/ˈɜːrli/', 'earth': '/ɜːrθ/',
  'eat': '/iːt/', 'education': '/ˌɛdʒuːˈkeɪʃən/', 'eight': '/eɪt/', 'enough': '/ɪˈnʌf/',
  'every': '/ˈɛvri/', 'example': '/ɪɡˈzæmpəl/', 'exercise': '/ˈɛksərsaɪz/',
  'eye': '/aɪ/', 'face': '/feɪs/', 'family': '/ˈfæmɪli/', 'father': '/ˈfɑːðər/',
  'find': '/faɪnd/', 'five': '/faɪv/', 'flower': '/ˈflaʊər/', 'food': '/fuːd/',
  'friend': '/frɛnd/', 'fruit': '/fruːt/', 'future': '/ˈfjuːtʃər/',
  'garden': '/ˈɡɑːrdən/', 'girl': '/ɡɜːrl/', 'green': '/ɡriːn/',
  'grow': '/ɡroʊ/', 'hair': '/hɛər/', 'half': '/hæf/', 'hand': '/hænd/',
  'happy': '/ˈhæpi/', 'head': '/hɛd/', 'health': '/hɛlθ/', 'hear': '/hɪər/',
  'heart': '/hɑːrt/', 'high': '/haɪ/', 'home': '/hoʊm/', 'hope': '/hoʊp/',
  'horse': '/hɔːrs/', 'hospital': '/ˈhɒspɪtəl/', 'hour': '/aʊər/', 'house': '/haʊs/',
  'idea': '/aɪˈdɪə/', 'important': '/ɪmˈpɔːrtənt/',
  'island': '/ˈaɪlənd/', 'language': '/ˈlæŋɡwɪdʒ/', 'large': '/lɑːrdʒ/',
  'laugh': '/lɑːf/', 'learn': '/lɜːrn/', 'leave': '/liːv/', 'letter': '/ˈlɛtər/',
  'library': '/ˈlaɪbrɛri/', 'life': '/laɪf/', 'light': '/laɪt/', 'listen': '/ˈlɪsən/',
  'love': '/lʌv/', 'machine': '/məˈʃiːn/', 'man': '/mæn/', 'many': '/ˈmɛni/',
  'money': '/ˈmʌni/', 'month': '/mʌnθ/', 'morning': '/ˈmɔːrnɪŋ/', 'mother': '/ˈmʌðər/',
  'mountain': '/ˈmaʊntɪn/', 'mouth': '/maʊθ/', 'move': '/muːv/', 'music': '/ˈmjuːzɪk/',
  'name': '/neɪm/', 'nature': '/ˈneɪtʃər/', 'never': '/ˈnɛvər/', 'night': '/naɪt/',
  'number': '/ˈnʌmbər/', 'open': '/ˈoʊpən/', 'paper': '/ˈpeɪpər/', 'parent': '/ˈpɛərənt/',
  'person': '/ˈpɜːrsən/', 'phone': '/foʊn/', 'picture': '/ˈpɪktʃər/', 'place': '/pleɪs/',
  'play': '/pleɪ/', 'please': '/pliːz/', 'point': '/pɔɪnt/', 'problem': '/ˈprɒbləm/',
  'question': '/ˈkwɛstʃən/', 'rain': '/reɪn/', 'read': '/riːd/', 'really': '/ˈrɪəli/',
  'red': '/rɛd/', 'remember': '/rɪˈmɛmbər/', 'right': '/raɪt/', 'river': '/ˈrɪvər/',
  'room': '/ruːm/', 'run': '/rʌn/', 'school': '/skuːl/', 'science': '/ˈsaɪəns/',
  'sea': '/siː/', 'should': '/ʃʊd/', 'show': '/ʃoʊ/', 'sleep': '/sliːp/',
  'small': '/smɔːl/', 'snow': '/snoʊ/', 'something': '/ˈsʌmθɪŋ/',
  'son': '/sʌn/', 'speak': '/spiːk/', 'start': '/stɑːrt/', 'stop': '/stɒp/',
  'story': '/ˈstɔːri/', 'street': '/striːt/', 'strong': '/strɒŋ/',
  'student': '/ˈstjuːdənt/', 'study': '/ˈstʌdi/', 'sun': '/sʌn/',
  'table': '/ˈteɪbəl/', 'talk': '/tɔːk/', 'teacher': '/ˈtiːtʃər/',
  'thank': '/θæŋk/', 'thing': '/θɪŋ/', 'think': '/θɪŋk/', 'three': '/θriː/',
  'through': '/θruː/', 'today': '/təˈdeɪ/', 'together': '/təˈɡɛðər/',
  'tomorrow': '/təˈmɒroʊ/', 'tree': '/triː/', 'turn': '/tɜːrn/',
  'under': '/ˈʌndər/', 'understand': '/ˌʌndərˈstænd/', 'very': '/ˈvɛri/',
  'walk': '/wɔːk/', 'water': '/ˈwɔːtər/', 'weather': '/ˈwɛðər/',
  'week': '/wiːk/', 'white': '/waɪt/', 'woman': '/ˈwʊmən/', 'women': '/ˈwɪmɪn/',
  'word': '/wɜːrd/', 'world': '/wɜːrld/', 'write': '/raɪt/', 'wrong': '/rɒŋ/',
  'yellow': '/ˈjɛloʊ/', 'young': '/jʌŋ/',

  // Commonly mispronounced words (tricky for Vietnamese speakers)
  'colonel': '/ˈkɜːrnəl/', 'Wednesday': '/ˈwɛnzdeɪ/', 'February': '/ˈfɛbruɛri/',
  'pronunciation': '/prəˌnʌnsiˈeɪʃən/', 'comfortable': '/ˈkʌmftərbəl/',
  'vegetable': '/ˈvɛdʒtəbəl/', 'interesting': '/ˈɪntrɪstɪŋ/', 'chocolate': '/ˈtʃɒklɪt/',
  'temperature': '/ˈtɛmprɪtʃər/', 'literally': '/ˈlɪtərəli/', 'probably': '/ˈprɒbəbli/',
  'restaurant': '/ˈrɛstərɒnt/', 'environment': '/ɪnˈvaɪrənmənt/',
  'queue': '/kjuː/', 'recipe': '/ˈrɛsɪpi/',
  'schedule': '/ˈʃɛdjuːl/', 'subtle': '/ˈsʌtəl/', 'plumber': '/ˈplʌmər/',
  'psychology': '/saɪˈkɒlədʒi/', 'receipt': '/rɪˈsiːt/',
  'salmon': '/ˈsæmən/', 'yacht': '/jɒt/', 'aisle': '/aɪl/',
  'knowledge': '/ˈnɒlɪdʒ/', 'muscle': '/ˈmʌsəl/', 'doubt': '/daʊt/',
  'sword': '/sɔːrd/', 'castle': '/ˈkɑːsəl/', 'whistle': '/ˈwɪsəl/',
  'knight': '/naɪt/', 'chaos': '/ˈkeɪɒs/', 'choir': '/kwaɪər/',

  // Phonics lab words
  'cat': '/kæt/', 'bat': '/bæt/', 'hat': '/hæt/', 'map': '/mæp/', 'fan': '/fæn/', 'bag': '/bæɡ/',
  'bed': '/bɛd/', 'hen': '/hɛn/', 'pen': '/pɛn/', 'ten': '/tɛn/', 'leg': '/lɛɡ/',
  'sit': '/sɪt/', 'big': '/bɪɡ/', 'pig': '/pɪɡ/', 'fin': '/fɪn/', 'kit': '/kɪt/', 'lip': '/lɪp/',
  'hot': '/hɒt/', 'dog': '/dɒɡ/', 'box': '/bɒks/', 'pot': '/pɒt/', 'mop': '/mɒp/', 'top': '/tɒp/',
  'cup': '/kʌp/', 'bus': '/bʌs/', 'mud': '/mʌd/', 'nut': '/nʌt/',
  'cake': '/keɪk/', 'game': '/ɡeɪm/', 'lake': '/leɪk/', 'kite': '/kaɪt/',
  'bike': '/baɪk/', 'nice': '/naɪs/', 'mine': '/maɪn/',
  'boat': '/boʊt/', 'goat': '/ɡoʊt/', 'nose': '/noʊz/', 'bone': '/boʊn/', 'road': '/roʊd/',
  'moon': '/muːn/', 'cool': '/kuːl/', 'pool': '/puːl/',
  'thin': '/θɪn/', 'math': '/mæθ/', 'bath': '/bæθ/', 'tooth': '/tuːθ/',
  'ship': '/ʃɪp/', 'shop': '/ʃɒp/', 'fish': '/fɪʃ/', 'shoe': '/ʃuː/', 'push': '/pʊʃ/', 'wish': '/wɪʃ/',
  'chair': '/tʃɛər/', 'cheese': '/tʃiːz/', 'lunch': '/lʌntʃ/', 'teach': '/tiːtʃ/', 'beach': '/biːtʃ/',
  'jump': '/dʒʌmp/', 'joy': '/dʒɔɪ/', 'gem': '/dʒɛm/', 'page': '/peɪdʒ/', 'bridge': '/brɪdʒ/',
};

export function getOfflineIPA(word: string): string | null {
  return IPA_DB[word.toLowerCase().trim()] ?? null;
}

export function hasOfflineIPA(word: string): boolean {
  return word.toLowerCase().trim() in IPA_DB;
}

export function getIPADatabaseSize(): number {
  return Object.keys(IPA_DB).length;
}
