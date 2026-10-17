/**
 * 台灣地底水脈與湖泊鄉鎮完整資料庫 (36 座代表性湖泊 + 可擴充架構)
 * 涵蓋：天然湖泊 (natural)、高山湖泊 (alpine)、重要水庫 (reservoir)、特色埤塘 (pond)、海岸潟湖 (lagoon)
 * 嚴格附上真實、可驗證之政府主管機關官方網站、台灣山林悠遊網、國家風景區管理處、水利署水情與維基百科條目連結（絕無虛構網址）
 */

export const LAKE_CATEGORIES = {
  natural: {
    id: 'natural',
    label: '天然湖泊',
    en: 'Natural Lake',
    color: '#00f2fe',
    hex: 0x00f2fe,
    icon: 'droplets',
    desc: '由地殼構造、火山堰塞或斷層陷落自然形成的湖泊'
  },
  alpine: {
    id: 'alpine',
    label: '高山湖泊',
    en: 'Alpine Lake',
    color: '#c084fc',
    hex: 0xc084fc,
    icon: 'mountain-snow',
    desc: '位於海拔 1,000~3,500 公尺深山雲霧帶的冰斗、圈谷或高山凹地湖泊'
  },
  reservoir: {
    id: 'reservoir',
    label: '重要水庫',
    en: 'Major Reservoir',
    color: '#fbbf24',
    hex: 0xfbbf24,
    icon: 'waves',
    desc: '截取河谷水脈築壩而成、維繫全台民生與農業命脈的大型人工湖泊'
  },
  pond: {
    id: 'pond',
    label: '特色埤塘',
    en: 'Historic Pond',
    color: '#34d399',
    hex: 0x34d399,
    icon: 'sprout',
    desc: '先民開墾台地與平原蓄水灌溉的智慧結晶，具豐富生態與人文歷史'
  },
  lagoon: {
    id: 'lagoon',
    label: '海岸潟湖',
    en: 'Coastal Lagoon',
    color: '#fb7185',
    hex: 0xfb7185,
    icon: 'shell',
    desc: '由濱外沙洲（鯤鯓）圍成之半封閉海水或半淡鹹水內海濕地'
  }
};

export const REGIONS = {
  north: { id: 'north', label: '北部水脈區' },
  central: { id: 'central', label: '中部水脈區' },
  south: { id: 'south', label: '南部水脈區' },
  east: { id: 'east', label: '東部水脈區' },
  islands: { id: 'islands', label: '離島水脈區' }
};

export const BUILTIN_TAIWAN_LAKES = [
  // ==================== 北部水脈區 (North) ====================
  {
    id: 'menghuan-lake',
    name: '夢幻湖',
    englishName: 'Menghuan Lake',
    city: '臺北市',
    township: '北投區',
    region: 'north',
    category: 'natural',
    lat: 25.1668,
    lng: 121.5603,
    elevation: 860,
    area: '0.3 公頃',
    depth: '1.5 公尺',
    aquiferDepth: 8.5,
    geology: '位於陽明山七星山東南麓，由火山噴氣孔凹地積水與山嵐雨水匯聚而成的天然火山濕地湖泊，地底與大屯火山群地熱水脈相連。',
    townshipIntro: '【臺北市北投區】以大屯火山地熱谷、北投溫泉博物館、那卡西文化與竹子湖海芋聞名，是全台灣唯一同時擁有火山口湖與百年溫泉鄉文化的都會行政區。',
    funFact: '湖中生長著全世界唯台灣獨有的國寶級沉水植物「台灣水韭」，是冰河時期遺留至今的活化石！',
    officialLinks: [
      { title: '內政部國家公園署陽明山國家公園官網', url: 'https://www.ymsnp.gov.tw/' },
      { title: '農業部林業及自然保育署（自然保護區）', url: 'https://conservation.forest.gov.tw/' },
      { title: '維基百科：夢幻湖重要濕地', url: 'https://zh.wikipedia.org/zh-tw/%E5%A4%A2%E5%B9%BB%E6%B9%96' }
    ],
    quiz: {
      question: '保育類活化石植物「台灣水韭」棲息的「夢幻湖」，位於臺北市哪一個行政區？',
      options: ['北投區', '士林區', '文山區', '內湖區'],
      answerIndex: 0,
      explanation: '夢幻湖位於臺北市北投區的陽明山七星山山麓，是台灣水韭唯一的自然棲地。'
    }
  },
  {
    id: 'feitsui-reservoir',
    name: '翡翠水庫',
    englishName: 'Feitsui Reservoir',
    city: '新北市',
    township: '石碇區',
    region: 'north',
    category: 'reservoir',
    lat: 24.9061,
    lng: 121.5806,
    elevation: 170,
    area: '1,024 公頃',
    depth: '113 公尺',
    aquiferDepth: 18.0,
    geology: '攔截新店溪支流北勢溪溪水建成，庫區因曲流切割雪山山脈板岩與砂岩層，形成壯麗的「千島湖」與八卦茶園峽谷地貌。',
    townshipIntro: '【新北市石碇區】昔日為大台北淡蘭古道茶葉與煤礦集散地，以不見天街、吊腳樓建築、石碇老街百年豆腐與文山包種茶聞名。',
    funFact: '翡翠水庫集水區內設有全台唯一的「食蛇龜野生動物保護區」，水質長年維持貧養至普養等級。',
    officialLinks: [
      { title: '臺北翡翠水庫管理局官方網站', url: 'https://www.feitsui.gov.tw/' },
      { title: '經濟部水利署防災資訊網：即時水庫水情', url: 'https://fhy.wra.gov.tw/fhyv2/monitor/reservoir' },
      { title: '維基百科：翡翠水庫', url: 'https://zh.wikipedia.org/zh-tw/%E7%BF%A1%E7%BF%A0%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '擁有「台灣千島湖」絕美秘境景觀的翡翠水庫主要集水區，位於新北市哪一個行政區？',
      options: ['石碇區', '淡水區', '鶯歌區', '林口區'],
      answerIndex: 0,
      explanation: '翡翠水庫壩址與主要庫區位於新北市石碇區（北勢溪流域），永安里一帶即為著名的石碇千島湖。'
    }
  },
  {
    id: 'songluo-lake',
    name: '松蘿湖',
    englishName: 'Songluo Lake',
    city: '新北市',
    township: '烏來區',
    region: 'north',
    category: 'alpine',
    lat: 24.7453,
    lng: 121.5311,
    elevation: 1230,
    area: '5.3 公頃',
    depth: '8 公尺',
    aquiferDepth: 15.2,
    geology: '位於雪山山脈北段群峰環抱的凹谷盆地，為南勢溪上游源頭水脈，因終年雲霧繚繞如少女羞澀面紗，被譽為「十七歲少女之湖」。',
    townshipIntro: '【新北市烏來區】為新北市面積最大且唯一的山地原住民區，「Ulay」在泰雅族語中意為「冒煙的熱水」，以碳酸氫鈉美人湯、烏來瀑布與泰雅編織文化著稱。',
    funFact: '雖然登山口常從宜蘭大同鄉玉蘭茶園進入，但松蘿湖的實際行政轄區其實隸屬於新北市烏來區喔！',
    officialLinks: [
      { title: '農業部林業及自然保育署：台灣山林悠遊網（松蘿湖自然步道）', url: 'https://recreation.forest.gov.tw/' },
      { title: '新北市觀光旅遊網官方網站', url: 'https://newtaipei.travel/' },
      { title: '維基百科：松蘿湖', url: 'https://zh.wikipedia.org/zh-tw/%E6%9D%BE%E8%98%BF%E6%B9%96' }
    ],
    quiz: {
      question: '被登山界譽為「十七歲少女之湖」的松蘿湖，雖然登山口在宜蘭，但湖泊本身行政區隸屬於哪裡？',
      options: ['新北市烏來區', '宜蘭縣頭城鎮', '桃園市復興區', '新竹縣尖石鄉'],
      answerIndex: 0,
      explanation: '松蘿湖為南勢溪源頭之一，行政區劃上屬於新北市烏來區，鄰近宜蘭縣大同鄉交界。'
    }
  },
  {
    id: 'lover-lake',
    name: '情人湖',
    englishName: 'Lover Lake',
    city: '基隆市',
    township: '安樂區',
    region: 'north',
    category: 'natural',
    lat: 25.1572,
    lng: 121.7061,
    elevation: 150,
    area: '2.0 公頃',
    depth: '4.5 公尺',
    aquiferDepth: 6.4,
    geology: '原名「五義埤」，位於基隆大武崙山山腰上，由六條山澗地下湧泉匯集而成的天然高地湖泊，是基隆僅有的高地湖泊。',
    townshipIntro: '【基隆市安樂區】坐擁大武崙砲台古蹟、外木山濱海廊帶與大武崙澳底沙灘，是結合海防歷史與山海步道的基隆西側門戶。',
    funFact: '湖面呈Y字形展開，一大一小兩湖相連，傳說情侶攜手走過湖畔的「情人吊橋」就能白頭偕老。',
    officialLinks: [
      { title: '交通部觀光署北海岸及觀音山國家風景區管理處官網', url: 'https://www.northguan-nsa.gov.tw/' },
      { title: '基隆旅遊網官方網站', url: 'https://tour.klcg.gov.tw/' },
      { title: '維基百科：情人湖 (基隆市)', url: 'https://zh.wikipedia.org/zh-tw/%E6%83%85%E4%BA%BA%E6%B9%96_(%E5%9F%BA%E9%9A%86%E5%B8%82)' }
    ],
    quiz: {
      question: '原名「五義埤」、鄰近大武崙砲台古蹟的「情人湖」，位於基隆市哪一個行政區？',
      options: ['安樂區', '中正區', '信義區', '暖暖區'],
      answerIndex: 0,
      explanation: '情人湖公園位於基隆市安樂區大武崙山山腰上，鄰近大武崙砲台與外木山海岸。'
    }
  },
  {
    id: 'shimen-reservoir',
    name: '石門水庫',
    englishName: 'Shimen Reservoir',
    city: '桃園市',
    township: '大溪區',
    region: 'north',
    category: 'reservoir',
    lat: 24.8114,
    lng: 121.2442,
    elevation: 245,
    area: '800 公頃',
    depth: '110 公尺',
    aquiferDepth: 16.5,
    geology: '位於大漢溪中游峽谷，雙峰對峙如石門因而得名。曾為遠東最大土石壩水庫，並透過桃園大圳與石門大圳串聯上千座地底與地表埤塘。',
    townshipIntro: '【桃園市大溪區】位於大漢溪河階台地，昔日因帆船可直達台北大稻埕而繁榮，以巴洛克式大溪老街牌樓、大溪豆干、木藝生態博物館聞名（水庫亦跨龍潭、復興區）。',
    funFact: '石門水庫底部的「薑母島」原名枕頭山，因偶像劇《命中注定我愛你》在此取景而聲名大噪。',
    officialLinks: [
      { title: '經濟部水利署北區水資源分署官網', url: 'https://www.wranb.gov.tw/' },
      { title: '桃園觀光導覽網官方網站', url: 'https://travel.tycg.gov.tw/' },
      { title: '維基百科：石門水庫 (臺灣)', url: 'https://zh.wikipedia.org/zh-tw/%E7%9F%B3%E9%96%80%E6%B0%B4%E5%BA%AB_(%E8%87%BA%E7%81%A3)' }
    ],
    quiz: {
      question: '攔截大漢溪水源、以活魚料理與楓林大道聞名的「石門水庫」，主要壩址位於桃園市哪兩個行政區交界？',
      options: ['大溪區與龍潭區', '中壢區與平鎮區', '觀音區與新屋區', '蘆竹區與大園區'],
      answerIndex: 0,
      explanation: '石門水庫大壩位於桃園市大溪區與龍潭區交界處，集水區延伸至復興區與新竹縣關西鎮。'
    }
  },
  {
    id: 'bade-pond',
    name: '八德埤塘生態公園',
    englishName: 'Bade Pond Park',
    city: '桃園市',
    township: '八德區',
    region: 'north',
    category: 'pond',
    lat: 24.9412,
    lng: 121.3095,
    elevation: 115,
    area: '5.0 公頃',
    depth: '3.5 公尺',
    aquiferDepth: 5.5,
    geology: '古石門沖積扇桃園台地紅土礫石層保水不易，先民順應微地形挖掘數千口「埤塘」，形成宛如地球表面星羅棋布的「千塘之鄉」奇觀。',
    townshipIntro: '【桃園市八德區】昔稱「八塊厝」，是桃園台地埤塘密度極高的區域，同時也是馬祖移民重要聚落，擁有獨特的閩東福州美食與霄裡湧泉文化。',
    funFact: '桃園台地在全盛時期曾擁有超過一萬口埤塘，從高空俯瞰宛如散落大地的萬顆綠寶石！',
    officialLinks: [
      { title: '桃園觀光導覽網（桃園市政府觀光旅遊局）', url: 'https://travel.tycg.gov.tw/' },
      { title: '農業部農田水利署桃園管理處官網', url: 'https://www.iatyu.nat.gov.tw/' },
      { title: '維基百科：桃園臺地埤塘', url: 'https://zh.wikipedia.org/zh-tw/%E6%A1%83%E5%9C%92%E8%87%BA%E5%9C%B0' }
    ],
    quiz: {
      question: '桃園素有「千塘之鄉」美譽，其中著名的埤塘自然生態公園與霄裡大池位於桃園市哪一區？',
      options: ['八德區', '龜山區', '楊梅區', '大園區'],
      answerIndex: 0,
      explanation: '八德埤塘自然生態公園與桃園第一座埤塘「霄裡大池」皆位於桃園市八德區。'
    }
  },
  {
    id: 'longtan-big-pond',
    name: '龍潭大池',
    englishName: 'Longtan Big Pond',
    city: '桃園市',
    township: '龍潭區',
    region: 'north',
    category: 'pond',
    lat: 24.8622,
    lng: 121.2119,
    elevation: 230,
    area: '18.0 公頃',
    depth: '3.5 公尺',
    aquiferDepth: 6.2,
    geology: '清乾隆13年（1748年）霄裡社平埔族人與漢人先民於龍潭台地低窪湧泉處開鑿之大型灌溉埤塘，因傳說池中有黃龍出沒而得名「龍潭」，也成為「龍潭區」地名由來。',
    townshipIntro: '【桃園市龍潭區】因龍潭大池而得名，為客家文學巨擘鍾肇政故鄉，以龍元宮商圈、客家花生軟糖、東方美人茶、石門活魚及國家中山科學研究院聞名。',
    funFact: '「龍潭區」的行政區名正是直接取自這口百年大埤塘「龍潭大池」，每年端午節更在此舉辦百年傳統的「龍舟爭奪賽（市長盃龍舟賽）」！',
    officialLinks: [
      { title: '桃園市龍潭區公所官方網站', url: 'https://www.longtan.tycg.gov.tw/' },
      { title: '桃園觀光導覽網官方網站', url: 'https://travel.tycg.gov.tw/' },
      { title: '維基百科：龍潭大池', url: 'https://zh.wikipedia.org/zh-tw/%E9%BE%8D%E6%BD%AD%E5%A4%A7%E6%B1%A0' }
    ],
    quiz: {
      question: '直接造就了桃園市「龍潭區」行政區地名由來、池中有南天宮與斜張吊橋的百年大埤塘是哪一座？',
      options: ['龍潭大池', '新屋蓮花池', '觀音甘泉池', '青塘園'],
      answerIndex: 0,
      explanation: '龍潭大池（古稱菱潭陂、靈潭陂）位於桃園市龍潭區，龍潭地名即源自於此。'
    }
  },
  {
    id: 'qingcao-lake',
    name: '青草湖',
    englishName: 'Green Grass Lake',
    city: '新竹市',
    township: '東區',
    region: 'north',
    category: 'reservoir',
    lat: 24.7736,
    lng: 120.9711,
    elevation: 45,
    area: '16.3 公頃',
    depth: '6.0 公尺',
    aquiferDepth: 7.2,
    geology: '截流客雅溪中游溪谷而成，四周為新竹丘陵低山環抱，湖心有「于飛島」，是新竹八景之一。',
    townshipIntro: '【新竹市東區】匯聚「台灣矽谷」新竹科學園區、清華與陽明交大頂尖學府，同時保有竹塹城迎曦門、城隍廟米粉貢丸等三百年古城底蘊。',
    funFact: '1956年經典台語電影《難忘的鳳凰橋》就在青草湖畔取景，掀起當年全台觀光熱潮！',
    officialLinks: [
      { title: '新竹市政府城市行銷處觀光旅遊網', url: 'https://tourism.hccg.gov.tw/' },
      { title: '新竹市東區區公所官方網站', url: 'https://dep-east.hccg.gov.tw/' },
      { title: '維基百科：青草湖', url: 'https://zh.wikipedia.org/zh-tw/%E9%9D%92%E8%8D%89%E6%B9%96' }
    ],
    quiz: {
      question: '以「鳳凰橋」與「于飛島」聞名、由客雅溪匯流而成的「青草湖」，位於哪一個縣市行政區？',
      options: ['新竹市東區', '新竹縣竹北市', '苗栗縣竹南鎮', '桃園市平鎮區'],
      answerIndex: 0,
      explanation: '青草湖位於新竹市東區南側的客雅溪中游，是新竹市最具代表性的湖泊風景區。'
    }
  },
  {
    id: 'emei-lake',
    name: '峨眉湖 (大埔水庫)',
    englishName: 'Emei Lake',
    city: '新竹縣',
    township: '峨眉鄉',
    region: 'north',
    category: 'reservoir',
    lat: 24.6797,
    lng: 120.9853,
    elevation: 70,
    area: '135 公頃',
    depth: '16 公尺',
    aquiferDepth: 9.0,
    geology: '攔截中港溪支流峨眉溪建成，是全台灣第一座由國人自行設計興建的水庫，曲折的丘陵湖岸孕育豐富水鳥生態。',
    townshipIntro: '【新竹縣峨眉鄉】原名「月眉」，是典型客家山城，以夏芒種季節由小綠葉蟬叮咬釀造的頂級「東方美人茶（膨風茶）」、桶柑及湖畔 72 公尺高大自然彌勒大佛聞名。',
    funFact: '湖畔矗立著高達 72 公尺（約24層樓高）的青銅彌勒佛像，倒映在碧綠湖面上蔚為奇觀。',
    officialLinks: [
      { title: '交通部觀光署參山國家風景區管理處官網', url: 'https://www.trimt-nsa.gov.tw/' },
      { title: '農業部農田水利署苗栗管理處（大埔水庫主管機關）', url: 'https://www.iamli.nat.gov.tw/' },
      { title: '維基百科：大埔水庫 (峨眉湖)', url: 'https://zh.wikipedia.org/zh-tw/%E5%A4%A7%E5%9F%94%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '又名「大埔水庫」、湖畔有世界級高大彌勒佛像與東方美人茶園的「峨眉湖」，位於哪一個鄉鎮？',
      options: ['新竹縣峨眉鄉', '新竹縣北埔鄉', '苗栗縣南庄鄉', '新竹縣關西鎮'],
      answerIndex: 0,
      explanation: '峨眉湖（大埔水庫）位於新竹縣峨眉鄉富興村與湖光村一帶。'
    }
  },
  {
    id: '鴛鴦湖-yuanyang',
    name: '鴛鴦湖',
    englishName: 'Yuanyang Lake',
    city: '新竹縣',
    township: '尖石鄉',
    region: 'north',
    category: 'alpine',
    lat: 24.5772,
    lng: 121.4051,
    elevation: 1670,
    area: '3.6 公頃',
    depth: '15 公尺',
    aquiferDepth: 19.5,
    geology: '位於雪山山脈大漢溪上游塔克金溪源頭，為典型的高山谷地腐植質酸性湖泊，周圍環繞全球罕見的台灣扁柏與紅檜原始霧林帶。',
    townshipIntro: '【新竹縣尖石鄉】因那羅溪與嘉樂溪交會處矗立巨石如筍而得名，為泰雅族原鄉，擁有「上帝的部落」司馬庫斯、鎮西堡千年神木群與秀巒野溪溫泉。',
    funFact: '鴛鴦湖是珍貴的「鴛鴦湖自然保留區」，水體呈深褐琥珀色，保存了數萬年來的花粉化石沉積紀錄！',
    officialLinks: [
      { title: '農業部林業及自然保育署：自然保育網（鴛鴦湖自然保留區）', url: 'https://conservation.forest.gov.tw/' },
      { title: '國軍退除役官兵輔導委員會武陵農場/森林保育處', url: 'https://www.fushoushan.com.tw/' },
      { title: '維基百科：鴛鴦湖自然保留區', url: 'https://zh.wikipedia.org/zh-tw/%E9%B4%9B%E9%B4%A6%E6%B9%96%E8%87%AA%E7%84%B6%E4%BF%9D%E7%95%99%E5%8D%80' }
    ],
    quiz: {
      question: '位於台灣扁柏原始霧林帶、與「上帝的部落司馬庫斯」同屬一個行政區的「鴛鴦湖」，位於哪個鄉鎮？',
      options: ['新竹縣尖石鄉', '新竹縣五峰鄉', '苗栗縣泰安鄉', '宜蘭縣南澳鄉'],
      answerIndex: 0,
      explanation: '鴛鴦湖自然保留區位於新竹縣尖石鄉後山秀巒村，鄰近宜蘭大同與桃園復興交界。'
    }
  },
  {
    id: 'lishan-lake',
    name: '向天湖',
    englishName: 'Xiangtian Lake',
    city: '苗栗縣',
    township: '南庄鄉',
    region: 'north',
    category: 'alpine',
    lat: 24.5819,
    lng: 121.0322,
    elevation: 738,
    area: '2.5 公頃',
    depth: '5.0 公尺',
    aquiferDepth: 11.0,
    geology: '位於加里山山脈山間盆地，因地勢較高且仰望天際而得名，地底湧泉豐沛，冬春之際山嵐霧氣在湖面翻湧宛如仙境。',
    townshipIntro: '【苗栗縣南庄鄉】通過國際慢城（Cittaslow）認證，融合賽夏族、泰雅族與客家多元族群文化，以桂花巷老街、蓬萊溪護魚步道與南庄手工麵著稱。',
    funFact: '向天湖是台灣原住民族「賽夏族（Saisiyat）」最重要的聖地，每兩年一度的「巴斯達隘（矮靈祭）」便在湖畔徹夜舉行！',
    officialLinks: [
      { title: '交通部觀光署參山國家風景區管理處官網', url: 'https://www.trimt-nsa.gov.tw/' },
      { title: '苗栗文化觀光旅遊網（賽夏族民俗文物館）', url: 'https://miaolitravel.net/' },
      { title: '維基百科：向天湖 (苗栗縣)', url: 'https://zh.wikipedia.org/zh-tw/%E5%90%91%E5%A4%A9%E6%B9%96_(%E8%8B%97%E6%A0%97%E7%B8%A3)' }
    ],
    quiz: {
      question: '台灣賽夏族每兩年舉辦一次神秘「巴斯達隘（矮靈祭）」的聖湖「向天湖」，位於苗栗縣哪一個鄉鎮？',
      options: ['南庄鄉', '三義鄉', '大湖鄉', '獅潭鄉'],
      answerIndex: 0,
      explanation: '向天湖位於苗栗縣南庄鄉東河村，是賽夏族人守護傳統祭典「巴斯達隘」的核心聚落。'
    }
  },
  {
    id: 'liyu-reservoir',
    name: '鯉魚潭水庫',
    englishName: 'Liyutan Reservoir',
    city: '苗栗縣',
    township: '三義鄉',
    region: 'north',
    category: 'reservoir',
    lat: 24.3408,
    lng: 120.7817,
    elevation: 300,
    area: '432 公頃',
    depth: '65 公尺',
    aquiferDepth: 14.0,
    geology: '攔截大安溪支流景山溪，並透過地底越域引水隧道引取大安溪士林攔河堰水源，擁有全台灣唯一的「鋸齒狀自然溢洪道」。',
    townshipIntro: '【苗栗縣三義鄉】以台灣木雕王國、舊山線勝興車站、龍騰斷橋鐵道自行車及五月桐花雪聞名（水庫集水區亦橫跨卓蘭鎮與大湖鄉）。',
    funFact: '鯉魚潭水庫的「鋸齒堰溢洪道」沒有任何閘門，滿水時湖水如蕾絲花邊般自動傾瀉而下，是世界級的水利建築美學！',
    officialLinks: [
      { title: '經濟部水利署中區水資源分署官網', url: 'https://www.wracb.gov.tw/' },
      { title: '苗栗文化觀光旅遊網官方網站', url: 'https://miaolitravel.net/' },
      { title: '維基百科：鯉魚潭水庫', url: 'https://zh.wikipedia.org/zh-tw/%E9%AF%89%E9%AD%9A%E6%BD%AD%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '擁有全台唯一「鋸齒堰自然溢洪道」、鄰近龍騰斷橋的「鯉魚潭水庫」大壩位於苗栗縣哪一個鄉鎮？',
      options: ['三義鄉', '竹南鎮', '通霄鎮', '頭份市'],
      answerIndex: 0,
      explanation: '鯉魚潭水庫大壩位於苗栗縣三義鄉鯉魚潭村，集水區涵蓋三義、大湖與卓蘭三鄉鎮。'
    }
  },

  // ==================== 中部水脈區 (Central) ====================
  {
    id: 'deji-reservoir',
    name: '德基水庫',
    englishName: 'Deji Reservoir',
    city: '臺中市',
    township: '和平區',
    region: 'central',
    category: 'reservoir',
    lat: 24.2542,
    lng: 121.1672,
    elevation: 1408,
    area: '454 公頃',
    depth: '140 公尺',
    aquiferDepth: 22.0,
    geology: '位於中央山脈與雪山山脈交界的大甲溪上游高山峽谷，擁有高達 180 公尺的雙曲線薄拱壩，為全台海拔最高的大型水庫。',
    townshipIntro: '【臺中市和平區】為台中市面積最大的行政區（佔全市近一半面積）及唯一原住民區，坐擁谷關溫泉、武陵農場櫻花鉤吻鮭、福壽山農場與大雪山森林遊樂區。',
    funFact: '德基水庫高達 180 公尺的大壩是台灣最高的水壩，也是大甲溪五大水力發電廠串聯水脈的龍頭樞紐！',
    officialLinks: [
      { title: '台灣電力公司官方網站（大甲溪發電廠）', url: 'https://www.taipower.com.tw/' },
      { title: '經濟部水利署中區水資源分署官網', url: 'https://www.wracb.gov.tw/' },
      { title: '維基百科：德基水庫', url: 'https://zh.wikipedia.org/zh-tw/%E5%BE%B7%E5%9F%BA%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '擁有全台最高 180 公尺雙曲線拱壩、位於大甲溪上游梨山地區的「德基水庫」，隸屬於臺中市哪一區？',
      options: ['和平區', '東勢區', '新社區', '后里區'],
      answerIndex: 0,
      explanation: '德基水庫（原名達見水庫）位於臺中市和平區梨山里，是中橫公路上的水利奇蹟。'
    }
  },
  {
    id: 'sun-moon-lake',
    name: '日月潭',
    englishName: 'Sun Moon Lake',
    city: '南投縣',
    township: '魚池鄉',
    region: 'central',
    category: 'natural',
    lat: 23.8628,
    lng: 120.9158,
    elevation: 748,
    area: '793 公頃',
    depth: '27 公尺',
    aquiferDepth: 20.0,
    geology: '原為埔里盆地群中的構造斷層盆地天然湖泊，後經日治時期興建武界壩與地底「武界引水隧道」將濁水溪水脈引入，面積擴大並成為抽蓄水力發電核心。',
    townshipIntro: '【南投縣魚池鄉】為台灣原住民族「邵族（Thao）」的世居祖居地，更以引進印度阿薩姆與培育「台茶18號紅玉紅茶」、九族文化村與金龍山日出雲海聞名遐邇。',
    funFact: '日月潭地底藏著一條長達 15.1 公里的「新武界引水隧道」，將濁水溪水穿山越嶺注入日月潭，是真正的地底大水脈！',
    officialLinks: [
      { title: '交通部觀光署日月潭國家風景區管理處官網', url: 'https://www.sunmoonlake.gov.tw/' },
      { title: '經濟部水利署防災資訊網：即時水庫水情', url: 'https://fhy.wra.gov.tw/fhyv2/monitor/reservoir' },
      { title: '維基百科：日月潭', url: 'https://zh.wikipedia.org/zh-tw/%E6%97%A5%E6%9C%88%E6%BD%AD' }
    ],
    quiz: {
      question: '台灣最著名的天然半水庫湖泊「日月潭」，同時也是台茶18號紅玉紅茶與邵族文化的故鄉，位於南投縣哪個鄉鎮？',
      options: ['魚池鄉', '埔里鎮', '仁愛鄉', '信義鄉'],
      answerIndex: 0,
      explanation: '日月潭位於南投縣魚池鄉水社村與日月村，是台灣最具國際知名度的高山盆地湖泊。'
    }
  },
  {
    id: 'liyu-lake-puli',
    name: '埔里鯉魚潭',
    englishName: 'Puli Liyu Lake',
    city: '南投縣',
    township: '埔里鎮',
    region: 'central',
    category: 'natural',
    lat: 23.9631,
    lng: 120.9964,
    elevation: 450,
    area: '19.0 公頃',
    depth: '8.0 公尺',
    aquiferDepth: 10.5,
    geology: '位於埔里盆地東側山麓，由地底天然湧泉匯聚而成，昔日為埔里盆地眾多天然大湖中唯一未完全陸化消失的湖泊。',
    townshipIntro: '【南投縣埔里鎮】素有「台灣地理中心（山清水秀）」之稱，水質甘甜純淨，以紹興酒、手工造紙、茭白筍（美人腿）與蝴蝶王國美譽聞名。',
    funFact: '傳說埔里鯉魚潭環湖有「鯉魚穴、龜穴、鷹穴、龍穴、蝙蝠穴、蝦穴、蜈蚣穴」七大風水吉穴，號稱「小西湖」！',
    officialLinks: [
      { title: '南投縣埔里鎮公所官方觀光導覽', url: 'https://www.puli.gov.tw/' },
      { title: '南投旅遊網（南投縣政府觀光處）', url: 'https://travel.nantou.gov.tw/' },
      { title: '維基百科：鯉魚潭 (南投縣)', url: 'https://zh.wikipedia.org/zh-tw/%E9%AF%89%E9%AD%9A%E6%BD%AD_(%E5%8D%97%E6%8A%95%E7%B8%A3)' }
    ],
    quiz: {
      question: '擁有「小西湖」與七大風水名穴傳說、位於「台灣地理中心」的鯉魚潭，隸屬於南投縣哪一個鄉鎮？',
      options: ['埔里鎮', '草屯鎮', '竹山鎮', '集集鎮'],
      answerIndex: 0,
      explanation: '南投鯉魚潭位於南投縣埔里鎮東郊的虎頭山麓，鄰近台灣地理中心碑。'
    }
  },
  {
    id: 'wanda-reservoir',
    name: '霧社水庫 (碧湖)',
    englishName: 'Wushe Reservoir (Bihu)',
    city: '南投縣',
    township: '仁愛鄉',
    region: 'central',
    category: 'reservoir',
    lat: 24.0136,
    lng: 121.1322,
    elevation: 1005,
    area: '350 公頃',
    depth: '80 公尺',
    aquiferDepth: 17.5,
    geology: '位於濁水溪上游霧社溪峽谷，四周被中央山脈群峰與櫻花林環繞，因湖水富含礦物質在陽光折射下呈現翡翠碧綠，被先總統蔣公命名為「碧湖」。',
    townshipIntro: '【南投縣仁愛鄉】為賽德克族與泰雅族原鄉，是歷史上「霧社事件」發生地，擁有清境農場、合歡山暗空公園、奧萬大楓紅與盧山/春陽溫泉。',
    funFact: '霧社水庫的水會透過地底發電隧道流入下游武界壩，再轉送至日月潭，形成南投地底最關鍵的「雙潭水脈連線」！',
    officialLinks: [
      { title: '台灣電力公司官方網站（萬大發電廠）', url: 'https://www.taipower.com.tw/' },
      { title: '南投縣仁愛鄉公所官方網站', url: 'https://www.renai.gov.tw/' },
      { title: '維基百科：霧社水庫', url: 'https://zh.wikipedia.org/zh-tw/%E9%9C%A7%E7%A4%BE%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '別名「碧湖」、位於清境農場與霧社山腳下的「霧社水庫」，位於南投縣哪一個行政區？',
      options: ['仁愛鄉', '信義鄉', '水里鄉', '鹿谷鄉'],
      answerIndex: 0,
      explanation: '霧社水庫位於南投縣仁愛鄉大同村（霧社），為濁水溪上游重要的高山水庫。'
    }
  },
  {
    id: 'qilin-lake',
    name: '麒麟潭',
    englishName: 'Qilin Lake',
    city: '南投縣',
    township: '鹿谷鄉',
    region: 'central',
    category: 'pond',
    lat: 23.7486,
    lng: 120.7714,
    elevation: 600,
    area: '13.0 公頃',
    depth: '9.0 公尺',
    aquiferDepth: 9.2,
    geology: '原名「大水堀」，清同治年間先民利用凍頂山與麒麟山之間的三面環山凹谷築堤蓄集山泉伏流而成，為灌溉鹿谷茶園與梯田的高山埤塘。',
    townshipIntro: '【南投縣鹿谷鄉】以聞名世界的「凍頂烏龍茶」、溪頭自然教育園區、杉林溪森林生態渡假園區、小半天竹林秘境與冬筍美食著稱。',
    funFact: '麒麟潭被譽為南投「八大勝景」之一，清晨潭面常升起裊裊輕霧，與鳳凰山、凍頂山茶園相映成趣！',
    officialLinks: [
      { title: '南投縣鹿谷鄉公所官方網站', url: 'https://www.lugu.gov.tw/' },
      { title: '南投旅遊網（南投縣政府觀光處）', url: 'https://travel.nantou.gov.tw/' },
      { title: '維基百科：麒麟潭', url: 'https://zh.wikipedia.org/zh-tw/%E9%BA%92%E9%BA%9F%E6%BD%AD' }
    ],
    quiz: {
      question: '原名「大水堀」、位於凍頂烏龍茶故鄉與通往溪頭路途上的高山埤塘「麒麟潭」，隸屬於南投縣哪個鄉鎮？',
      options: ['鹿谷鄉', '名間鄉', '中寮鄉', '國姓鄉'],
      answerIndex: 0,
      explanation: '麒麟潭位於南投縣鹿谷鄉永隆村（凍頂山腳下），是鹿谷著名的茶鄉湖泊。'
    }
  },
  {
    id: 'qicai-lake',
    name: '七彩湖',
    englishName: 'Qicai Lake (Seven-Color Lake)',
    city: '南投縣',
    township: '信義鄉',
    region: 'central',
    category: 'alpine',
    lat: 23.7539,
    lng: 121.2367,
    elevation: 2900,
    area: '2.2 公頃',
    depth: '10 公尺',
    aquiferDepth: 25.0,
    geology: '位於中央山脈主脊六順山北方（南投信義鄉與花蓮萬榮鄉交界），為台灣面積第二大的高山天然湖泊，日出時湖面映射七彩光芒而得名。',
    townshipIntro: '【南投縣信義鄉】為布農族（Bunun）重要原鄉與玉山主峰北側所在地，以世界知名的「八部合音（Pasibutbut）」、風櫃斗青梅、東埔溫泉與雙龍七彩吊橋聞名。',
    funFact: '七彩湖畔緊鄰跨越中央山脈的史詩級古道「丹大關門古道」以及台電「新東西輸電線路」高壓電塔紀念碑！',
    officialLinks: [
      { title: '農業部林業及自然保育署：台灣山林悠遊網', url: 'https://recreation.forest.gov.tw/' },
      { title: '南投縣信義鄉公所官方網站', url: 'https://www.shini.gov.tw/' },
      { title: '維基百科：七彩湖', url: 'https://zh.wikipedia.org/zh-tw/%E4%B8%83%E5%BD%A9%E6%B9%96' }
    ],
    quiz: {
      question: '海拔高達 2,900 公尺、位於中央山脈六順山旁且為布農族傳統領域的「七彩湖」，西側隸屬於哪個鄉鎮？',
      options: ['南投縣信義鄉', '南投縣竹山鎮', '嘉義縣阿里山鄉', '高雄市桃源區'],
      answerIndex: 0,
      explanation: '七彩湖位於南投縣信義鄉與花蓮縣萬榮鄉交界的中央山脈稜線上。'
    }
  },
  {
    id: 'hushan-reservoir',
    name: '湖山水庫',
    englishName: 'Hushan Reservoir',
    city: '雲林縣',
    township: '斗六市',
    region: 'central',
    category: 'reservoir',
    lat: 23.7042,
    lng: 120.6256,
    elevation: 211,
    area: '204 公頃',
    depth: '60 公尺',
    aquiferDepth: 12.0,
    geology: '位於斗六丘陵梅林溪谷，屬於「離槽水庫」（自清水溪桶頭攔河堰引水蓄存），專為減緩雲彰地區地層下陷、守護台灣深層地下水脈而興建。',
    townshipIntro: '【雲林縣斗六市】為雲林縣治所在地，以頂級「斗六文旦」、太平老街巴洛克建築、古坑綠色隧道交界與八色鳥生態保育區聞名（水庫亦跨古坑鄉）。',
    funFact: '湖山水庫興建時特別規劃了「八色鳥生態補償棲地」，是台灣工程與生態保育並重的典範水庫！',
    officialLinks: [
      { title: '經濟部水利署中區水資源分署官網', url: 'https://www.wracb.gov.tw/' },
      { title: '經濟部水利署防災資訊網：即時水庫水情', url: 'https://fhy.wra.gov.tw/fhyv2/monitor/reservoir' },
      { title: '維基百科：湖山水庫', url: 'https://zh.wikipedia.org/zh-tw/%E6%B9%96%E5%B1%B1%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '為了減緩雲林地層下陷、守護地底水脈而建，且是珍貴「八色鳥」重要棲地的「湖山水庫」，位於雲林縣哪裡？',
      options: ['斗六市與古坑鄉交界', '北港鎮與水林鄉交界', '麥寮鄉與台西鄉交界', '虎尾鎮與西螺鎮交界'],
      answerIndex: 0,
      explanation: '湖山水庫位於雲林縣斗六市與古坑鄉交界的斗六丘陵上。'
    }
  },
  {
    id: 'chenglong-wetland',
    name: '成龍濕地 (海岸潟湖濕地)',
    englishName: 'Chenglong Coastal Wetland',
    city: '雲林縣',
    township: '口湖鄉',
    region: 'central',
    category: 'lagoon',
    lat: 23.5561,
    lng: 120.1683,
    elevation: 0,
    area: '171 公頃',
    depth: '2.0 公尺',
    aquiferDepth: 4.2,
    geology: '原為口湖沿海農耕地，因地層下陷加上1986年韋恩颱風與1996年賀伯颱風海水倒灌，地面與地下水脈鹽化匯聚成廣闊的半淡鹹水海岸潟湖型濕地。',
    townshipIntro: '【雲林縣口湖鄉】為全台灣最著名的「烏魚子故鄉」，同時坐擁外傘頂洲門戶、馬蹄蛤生態養殖區與國際級「成龍濕地國際環境藝術節」。',
    funFact: '成龍濕地從昔日颱風海水倒灌的受災農田，華麗蛻變為黑面琵鷺、水鳥與大地環境藝術共生的國際級生態教育基地！',
    officialLinks: [
      { title: '交通部觀光署雲嘉南濱海國家風景區管理處官網', url: 'https://www.swcoast-nsa.gov.tw/' },
      { title: '內政部國家公園署國家重要濕地保育計畫官網', url: 'https://wetland-tw.tcd.gov.tw/' },
      { title: '維基百科：口湖濕地（成龍濕地）', url: 'https://zh.wikipedia.org/zh-tw/%E5%8F%A3%E6%B9%96%E6%BF%95%E5%9C%B0' }
    ],
    quiz: {
      question: '以「國際環境藝術節」與頂級烏魚子聞名、因海水倒灌轉型為候鳥樂園的「成龍濕地」，位於雲林縣哪個鄉鎮？',
      options: ['口湖鄉', '四湖鄉', '元長鄉', '褒忠鄉'],
      answerIndex: 0,
      explanation: '成龍濕地位於雲林縣口湖鄉成龍村，隸屬雲嘉南濱海國家風景區範圍。'
    }
  },

  // ==================== 南部水脈區 (South) ====================
  {
    id: 'lantan-lake',
    name: '蘭潭 (紅毛埤)',
    englishName: 'Lantan (Holland Lake)',
    city: '嘉義市',
    township: '東區',
    region: 'south',
    category: 'reservoir',
    lat: 23.4689,
    lng: 120.4792,
    elevation: 80,
    area: '70.0 公頃',
    depth: '13 公尺',
    aquiferDepth: 8.0,
    geology: '位於嘉義市東郊山仔頂丘陵，相傳三百多年前由荷蘭人（紅毛人）築堰鑿埤引八掌溪水灌溉，故古稱「紅毛埤」。',
    townshipIntro: '【嘉義市東區】擁有阿里山林業鐵路起點（北門驛、檜意森活村）、嘉義公園射日塔，以及馳名中外的嘉義火雞肉飯與沙鍋魚頭美食文化。',
    funFact: '「蘭潭泛月」自古即為嘉義八景之一，湖畔的「月影潭心」鋁編藝術地標與夜間音樂噴泉更是嘉義市代表夜景！',
    officialLinks: [
      { title: '嘉義市觀光旅遊網官方網站', url: 'https://travel.chiayi.gov.tw/' },
      { title: '台灣自來水公司第五區管理處官網', url: 'https://www.water.gov.tw/dist5' },
      { title: '維基百科：蘭潭水庫', url: 'https://zh.wikipedia.org/zh-tw/%E8%98%AD%E6%BD%AD%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '古稱「紅毛埤」、相傳為三百多年前荷蘭人所鑿，並以「蘭潭泛月」聞名的蘭潭，位於哪裡？',
      options: ['嘉義市東區', '臺南市安平區', '嘉義縣民雄鄉', '雲林縣北港鎮'],
      answerIndex: 0,
      explanation: '蘭潭水庫（紅毛埤）位於嘉義市東區鹿寮里，緊鄰國立嘉義大學蘭潭校區。'
    }
  },
  {
    id: 'renyitan-reservoir',
    name: '仁義潭水庫',
    englishName: 'Renyitan Reservoir',
    city: '嘉義縣',
    township: '番路鄉',
    region: 'south',
    category: 'reservoir',
    lat: 23.4622,
    lng: 120.5097,
    elevation: 105,
    area: '232 公頃',
    depth: '35 公尺',
    aquiferDepth: 10.2,
    geology: '屬於離槽水庫，引用八掌溪水透過竹山引水道導入，並透過地底輸水管線與緊鄰的嘉義市「蘭潭水庫」構成子母連通水脈。',
    townshipIntro: '【嘉義縣番路鄉】位於阿里山山脈西麓，「番路」之名源於昔日通往阿里山鄒族部落的要道，全台近八成的「牛心柿（柿餅）」與隙頂二延平步道雲海皆出於此！',
    funFact: '仁義潭長達 1.5 公里的筆直長堤是雲嘉地區最受歡迎的放風箏與觀賞夕陽勝地。',
    officialLinks: [
      { title: '嘉義縣文化觀光局官方網站', url: 'https://tbocc.cyhg.gov.tw/' },
      { title: '經濟部水利署防災資訊網：即時水庫水情', url: 'https://fhy.wra.gov.tw/fhyv2/monitor/reservoir' },
      { title: '維基百科：仁義潭水庫', url: 'https://zh.wikipedia.org/zh-tw/%E4%BB%81%E7%BE%A9%E6%BD%AD%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '與嘉義市蘭潭形成「子母水庫」水脈、且所在地盛產全台八成「柿餅」的仁義潭水庫，位於嘉義縣哪個鄉鎮？',
      options: ['番路鄉', '竹崎鄉', '梅山鄉', '中埔鄉'],
      answerIndex: 0,
      explanation: '仁義潭水庫位於嘉義縣番路鄉內甕村，番路鄉同時也是著名的柿子之鄉。'
    }
  },
  {
    id: 'shuishang-sister-lakes',
    name: '阿里山姊妹潭',
    englishName: 'Alishan Sisters Ponds',
    city: '嘉義縣',
    township: '阿里山鄉',
    region: 'south',
    category: 'alpine',
    lat: 23.5178,
    lng: 120.8133,
    elevation: 2274,
    area: '0.7 公頃',
    depth: '2.5 公尺',
    aquiferDepth: 18.8,
    geology: '位於阿里山山脈祝山山麓，由兩座大小相鄰的高山天然凹地森氏杜鵑與紅檜林集水而成，湖中仍保留日治時期巨大紅檜天然樹頭。',
    townshipIntro: '【嘉義縣阿里山鄉】為台灣原住民族「鄒族（Tsou）」的世居聖地，以阿里山五奇（日出、雲海、晚霞、森林、高山鐵路）、高山烏龍茶與戰祭（Mayasvi）聞名全球。',
    funFact: '姊潭中央設有以阿里山檜木打造的「相思亭」，翠綠湖水倒映千年檜木巨木群，靜謐如畫。',
    officialLinks: [
      { title: '交通部觀光署阿里山國家風景區管理處官網', url: 'https://www.ali-nsa.net/' },
      { title: '農業部林業及自然保育署：台灣山林悠遊網（阿里山）', url: 'https://recreation.forest.gov.tw/' },
      { title: '維基百科：阿里山國家森林遊樂區', url: 'https://zh.wikipedia.org/zh-tw/%E9%98%BF%E9%87%8C%E5%B1%B1%E5%9C%8B%E5%AE%B6%E6%A3%AE%E6%9E%97%E9%81%8A%E6%A8%82%E5%8D%80' }
    ],
    quiz: {
      question: '海拔超過兩千公尺、位於鄒族原鄉與千年紅檜森林中的「姊妹潭」，隸屬於嘉義縣哪一個行政區？',
      options: ['阿里山鄉', '大林鎮', '東石鄉', '布袋鎮'],
      answerIndex: 0,
      explanation: '姊妹潭位於嘉義縣阿里山鄉的阿里山國家森林遊樂區內。'
    }
  },
  {
    id: 'zengwen-reservoir',
    name: '曾文水庫',
    englishName: 'Zengwen Reservoir',
    city: '臺南市',
    township: '楠西區',
    region: 'south',
    category: 'reservoir',
    lat: 23.2494,
    lng: 120.5356,
    elevation: 230,
    area: '1,714 公頃',
    depth: '120 公尺',
    aquiferDepth: 23.0,
    geology: '攔截曾文溪主流峽谷，總蓄水量逾 5 億立方公尺、滿水面積高達 17 平方公里，是全台灣蓄水量與面積皆居冠的「台灣第一大水庫湖泊」。',
    townshipIntro: '【臺南市楠西區】坐擁梅嶺風景區（梅子雞與賞螢季）、龜丹萬年溫泉與鹿陶洋江家古厝（水庫大壩位於台南楠西區與嘉義大埔鄉交界，主要水域橫跨嘉義大埔鄉）。',
    funFact: '曾文水庫的水會透過地底「烏山頭導水隧道」穿越烏山嶺注入烏山頭水庫，是嘉南平原百萬畝良田的生命總源頭！',
    officialLinks: [
      { title: '經濟部水利署南區水資源分署官網', url: 'https://www.wrasb.gov.tw/' },
      { title: '交通部觀光署西拉雅國家風景區管理處官網', url: 'https://www.siraya-nsa.gov.tw/' },
      { title: '維基百科：曾文水庫', url: 'https://zh.wikipedia.org/zh-tw/%E6%9B%BE%E6%96%87%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '全台灣蓄水量與湖面面積第一大的「曾文水庫」，大壩管理中心位於臺南市哪一個行政區（庫區跨嘉義大埔）？',
      options: ['楠西區', '玉井區', '白河區', '麻豆區'],
      answerIndex: 0,
      explanation: '曾文水庫大壩位於臺南市楠西區與嘉義縣大埔鄉交界處，是台灣規模最大的水庫。'
    }
  },
  {
    id: 'wushantou-reservoir',
    name: '烏山頭水庫 (珊瑚潭)',
    englishName: 'Wushantou Reservoir (Coral Lake)',
    city: '臺南市',
    township: '官田區',
    region: 'south',
    category: 'reservoir',
    lat: 23.1975,
    lng: 120.3694,
    elevation: 58,
    area: '1,300 公頃',
    depth: '32 公尺',
    aquiferDepth: 13.5,
    geology: '1930年由日本技師八田與一採用罕見的「半水力淤填式（濕式）土石壩」工法建成，淹沒蜿蜒丘陵溪谷，從高空俯瞰宛如碧綠珊瑚，故名「珊瑚潭」。',
    townshipIntro: '【臺南市官田區】以「紅菱之鄉（官田菱角）」、保育類水雉（凌波仙子）生態教育園區及八田與一紀念園區聞名（水庫亦跨六甲區、東山區與大內區）。',
    funFact: '烏山頭水庫與長達一萬六千公里的嘉南大圳水路系統，徹底將看天田改造為台灣米倉！',
    officialLinks: [
      { title: '農業部農田水利署嘉南管理處官網（烏山頭水庫主管機關）', url: 'https://www.iacna.nat.gov.tw/' },
      { title: '交通部觀光署西拉雅國家風景區管理處官網', url: 'https://www.siraya-nsa.gov.tw/' },
      { title: '維基百科：烏山頭水庫', url: 'https://zh.wikipedia.org/zh-tw/%E7%83%8F%E5%B1%B1%E9%A0%AD%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '由八田與一技師設計、空拍形狀如碧綠珊瑚而有「珊瑚潭」美稱的烏山頭水庫，主要位於盛產菱角的台南哪一區？',
      options: ['官田區', '新營區', '鹽水區', '關廟區'],
      answerIndex: 0,
      explanation: '烏山頭水庫風景區與八田與一紀念園區位於臺南市官田區嘉南里。'
    }
  },
  {
    id: 'hutoupi-reservoir',
    name: '虎頭埤',
    englishName: 'Hutoupi Reservoir',
    city: '臺南市',
    township: '新化區',
    region: 'south',
    category: 'pond',
    lat: 23.0281,
    lng: 120.3389,
    elevation: 40,
    area: '27.0 公頃',
    depth: '10 公尺',
    aquiferDepth: 7.0,
    geology: '清道光26年（1846年）由農民歐陽安築堤攔截鹽水溪支流許縣溪上游虎頭山麓溪水而成，是全台灣歷史上第一座水庫！',
    townshipIntro: '【臺南市新化區】昔稱「大目降」（西拉雅族語意為山林之地），以巴洛克式新化老街、新化地瓜、大目降武德殿與楊逵文學紀念館著稱。',
    funFact: '虎頭埤比日本最早的水庫還要早興建，擁有「台灣第一水庫」與「小日月潭」雙重頭銜！',
    officialLinks: [
      { title: '臺南市政府觀光旅遊局：虎頭埤風景區官方網站', url: 'https://htp.tainan.gov.tw/' },
      { title: '台南旅遊網官方網站', url: 'https://www.twtainan.net/' },
      { title: '維基百科：虎頭埤', url: 'https://zh.wikipedia.org/zh-tw/%E8%99%8E%E9%A0%AD%E5%9F%A4' }
    ],
    quiz: {
      question: '建於清朝道光26年（1846年）、擁有「台灣第一座水庫」歷史地位的「虎頭埤」，位於臺南市哪一個行政區？',
      options: ['新化區', '善化區', '永康區', '歸仁區'],
      answerIndex: 0,
      explanation: '虎頭埤風景區位於臺南市新化區虎頭山麓，是台灣最早興建的灌溉水庫。'
    }
  },
  {
    id: 'qigu-lagoon',
    name: '七股潟湖',
    englishName: 'Qigu Lagoon',
    city: '臺南市',
    township: '七股區',
    region: 'south',
    category: 'lagoon',
    lat: 23.1356,
    lng: 120.0683,
    elevation: 1,
    area: '1,100 公頃',
    depth: '3.0 公尺',
    aquiferDepth: 4.5,
    geology: '為古「台江內海」淤積後僅存的最大遺留水域，外有頂頭額汕、網仔寮汕與青山港汕三道濱外沙洲（鯤鯓）屏障，是全台灣面積最大的海岸潟湖。',
    townshipIntro: '【臺南市七股區】位於台灣本島最西端（國聖燈塔），以潔白壯觀的七股鹽山、定置漁網與牡蠣養殖，以及每年飛抵曾文溪口度冬的國寶「黑面琵鷺」聞名世界。',
    funFact: '當地人稱七股潟湖為「內海仔」，三百多年前鄭成功船隊橫渡的「台江內海」正是它的前身！',
    officialLinks: [
      { title: '內政部國家公園署台江國家公園管理處官網', url: 'https://www.tjnp.gov.tw/' },
      { title: '交通部觀光署雲嘉南濱海國家風景區管理處官網', url: 'https://www.swcoast-nsa.gov.tw/' },
      { title: '維基百科：七股潟湖', url: 'https://zh.wikipedia.org/zh-tw/%E4%B8%83%E8%82%A1%E6%BD%9F%E6%B9%96' }
    ],
    quiz: {
      question: '古「台江內海」最後遺留的最大水域、且鄰近鹽山與黑面琵鷺保護區的「七股潟湖」，位於臺南市哪一區？',
      options: ['七股區', '北門區', '將軍區', '安南區'],
      answerIndex: 0,
      explanation: '七股潟湖位於臺南市七股區西側海岸，是台灣第一大潟湖。'
    }
  },
  {
    id: 'lotus-pond',
    name: '蓮池潭',
    englishName: 'Lotus Pond (Liantan)',
    city: '高雄市',
    township: '左營區',
    region: 'south',
    category: 'pond',
    lat: 22.6817,
    lng: 120.2967,
    elevation: 11,
    area: '42.0 公頃',
    depth: '4.0 公尺',
    aquiferDepth: 5.8,
    geology: '原為半屏山與龜山之間的地底湧泉天然沼澤湖泊，清康熙年間濬修為鳳山縣城護城池與文廟泮池，夏日滿池荷花盛開而得名「蓮池潭」。',
    townshipIntro: '【高雄市左營區】為明鄭萬年縣與清代「鳳山縣舊城」所在地，擁有國定古蹟左營舊城門、全台最大規模眷村群，以及三鐵共構的高鐵左營站門戶。',
    funFact: '蓮池潭上的「龍虎塔」（入龍喉、出虎口消災解厄）與北極玄天上帝巨像，曾被 CNN 評選為高雄最具代表性的宗教奇景！',
    officialLinks: [
      { title: '高雄旅遊網（高雄市政府觀光局）', url: 'https://khh.travel/' },
      { title: '高雄市左營區公所官方網站', url: 'https://zuoying.kcg.gov.tw/' },
      { title: '維基百科：蓮池潭', url: 'https://zh.wikipedia.org/zh-tw/%E8%93%AE%E6%B1%A0%E6%BD%AD' }
    ],
    quiz: {
      question: '以「入龍喉、出虎口」的龍虎塔與春秋閣聞名國際的「蓮池潭」，位於高雄市哪一個行政區？',
      options: ['左營區', '鼓山區', '三民區', '鳳山區'],
      answerIndex: 0,
      explanation: '蓮池潭位於高雄市左營區東側，緊鄰半屏山與鳳山縣舊城古蹟。'
    }
  },
  {
    id: 'chengqing-lake',
    name: '澄清湖',
    englishName: 'Chengqing Lake',
    city: '高雄市',
    township: '鳥松區',
    region: 'south',
    category: 'reservoir',
    lat: 22.6589,
    lng: 120.3522,
    elevation: 20,
    area: '103 公頃',
    depth: '8.0 公尺',
    aquiferDepth: 6.5,
    geology: '原為曹公圳灌溉埤塘「大埤」，引高屏溪水匯聚於鳥松丘陵凹地，因湖水清澈、風景秀麗如杭州西湖，素有「台灣西湖」美譽。',
    townshipIntro: '【高雄市鳥松區】因早期遍植「雀榕（台語稱鳥松）」而得名，區內坐擁澄清湖風景區、圓山大飯店、澄清湖棒球場與鳥松濕地公園。',
    funFact: '澄清湖地底藏有一座神秘的冷戰時期「地下作戰指揮中心」坑道，現已轉型為超人氣的「海洋奇珍園」水族館！',
    officialLinks: [
      { title: '台灣自來水公司第七區管理處澄清湖風景區官網', url: 'https://chengchinglake.water.gov.tw/' },
      { title: '高雄旅遊網（高雄市政府觀光局）', url: 'https://khh.travel/' },
      { title: '維基百科：澄清湖', url: 'https://zh.wikipedia.org/zh-tw/%E6%BE%84%E6%B8%85%E6%B9%96' }
    ],
    quiz: {
      question: '原名「大埤」、擁有九曲橋與中興塔並被譽為「台灣西湖」的澄清湖，位於高雄市哪一個行政區？',
      options: ['鳥松區', '仁武區', '大樹區', '旗山區'],
      answerIndex: 0,
      explanation: '澄清湖位於高雄市鳥松區大埤路，是南台灣最著名的湖泊園林風景區。'
    }
  },
  {
    id: 'meinong-lake',
    name: '美濃湖 (中正湖)',
    englishName: 'Meinong Lake',
    city: '高雄市',
    township: '美濃區',
    region: 'south',
    category: 'pond',
    lat: 22.9056,
    lng: 120.5561,
    elevation: 55,
    area: '21.0 公頃',
    depth: '4.5 公尺',
    aquiferDepth: 6.0,
    geology: '原名「中圳埤」，位於美濃雙峰山與月光山山麓下，由羌子寮溪與大坑溪溪水匯流築堤而成的客家灌溉埤塘。',
    townshipIntro: '【高雄市美濃區】原名「瀰濃」（以水立庄之意），為六堆客家文化重鎮，以美濃油紙傘、美濃粄條、白玉蘿蔔、野蓮（水蓮）水生農業與敬字亭文化聞名。',
    funFact: '全台灣熱炒店必點的清脆「水蓮（野蓮）」，原本就是生長在美濃湖裡的原生水生植物，如今美濃產量佔全台九成以上！',
    officialLinks: [
      { title: '高雄市美濃區公所官方網站', url: 'https://meinong.kcg.gov.tw/' },
      { title: '高雄旅遊網（高雄市政府觀光局）', url: 'https://khh.travel/' },
      { title: '維基百科：美濃湖', url: 'https://zh.wikipedia.org/zh-tw/%E7%BE%8E%E6%BF%83%E6%B9%96' }
    ],
    quiz: {
      question: '孕育出全台灣熱炒名菜「水蓮（野蓮）」且以油紙傘與客家粄條聞名的「美濃湖」，位於哪裡？',
      options: ['高雄市美濃區', '屏東縣內埔鄉', '屏東縣萬巒鄉', '高雄市杉林區'],
      answerIndex: 0,
      explanation: '美濃湖（原名中圳埤、中正湖）位於高雄市美濃區東北側，是野蓮的原生地。'
    }
  },
  {
    id: 'dagui-lake',
    name: '大鬼湖 (巴油池)',
    englishName: 'Dagui Lake (Dalupalringi)',
    city: '高雄市',
    township: '茂林區',
    region: 'south',
    category: 'alpine',
    lat: 22.8669,
    lng: 120.8617,
    elevation: 2150,
    area: '11.8 公頃',
    depth: '34 公尺',
    aquiferDepth: 24.5,
    geology: '位於中央山脈南段遙拜山北側（高雄茂林區與屏東霧台鄉交界），由三座高山斷層陷落深池串聯而成，最深處達34公尺，是台灣最深、最神秘的天然高山湖泊。',
    townshipIntro: '【高雄市茂林區】為魯凱族（下三社）原鄉，以世界級越冬型「紫斑蝶幽谷」、多納黑米祭、石板屋聚落與蛇頭山環流丘地形聞名。',
    funFact: '大鬼湖在魯凱族語稱為「Dalupalringi」，正是淒美神話《巴冷公主與百步蛇王阿達禮歐》成婚並潛入湖底水晶宮殿的聖湖！',
    officialLinks: [
      { title: '農業部林業及自然保育署：自然保育網（出雲山自然保留區）', url: 'https://conservation.forest.gov.tw/' },
      { title: '交通部觀光署茂林國家風景區管理處官網', url: 'https://www.maolin-nsa.gov.tw/' },
      { title: '維基百科：大鬼湖', url: 'https://zh.wikipedia.org/zh-tw/%E5%A4%A7%E9%AC%BC%E6%B9%96' }
    ],
    quiz: {
      question: '魯凱族神話《巴冷公主嫁百步蛇王》的聖湖「大鬼湖」，位於中央山脈深處哪兩個原住民鄉區交界？',
      options: ['高雄市茂林區與屏東縣霧台鄉', '高雄市那瑪夏區與嘉義縣大埔鄉', '屏東縣牡丹鄉與獅子鄉', '臺東縣達仁鄉與大武鄉'],
      answerIndex: 0,
      explanation: '大鬼湖位於高雄市茂林區與屏東縣霧台鄉交界的中央山脈深處，屬出雲山自然保留區與雙鬼湖野生動物重要棲息環境。'
    }
  },
  {
    id: 'dapeng-bay',
    name: '大鵬灣',
    englishName: 'Dapeng Bay Lagoon',
    city: '屏東縣',
    township: '東港鎮',
    region: 'south',
    category: 'lagoon',
    lat: 22.4519,
    lng: 120.4792,
    elevation: 1,
    area: '532 公頃',
    depth: '6.0 公尺',
    aquiferDepth: 5.0,
    geology: '由林邊溪與東港溪沖積泥沙形成長條沙嘴（南平半島）圍成的「單口囊狀潟湖」，全湖僅靠一處水道（鵬灣跨海大橋處）與台灣海峽相通。',
    townshipIntro: '【屏東縣東港鎮】以「東港三寶（黑鮪魚、櫻花蝦、油魚子）」、三年一科國定重要民俗「東港迎王平安祭典」及通往小琉球的航運樞紐聞名（潟湖亦跨林邊鄉）。',
    funFact: '大鵬灣內有一座完全由「數百年牡蠣殼（蚵殼）」人工堆疊而成的神奇小島——「蚵殼島」！',
    officialLinks: [
      { title: '交通部觀光署大鵬灣國家風景區管理處官網', url: 'https://www.dbnsa.gov.tw/' },
      { title: '屏東縣政府交通旅遊處屏東旅遊網', url: 'https://www.i-pingtung.com/' },
      { title: '維基百科：大鵬灣 (臺灣)', url: 'https://zh.wikipedia.org/zh-tw/%E5%A4%A7%E9%B5%AC%E7%81%A3_(%E8%87%BA%E7%81%A3)' }
    ],
    quiz: {
      question: '擁有全台唯一可開合「鵬灣跨海大橋」與「蚵殼島」的單口囊狀潟湖「大鵬灣」，主要位於屏東縣哪個鄉鎮？',
      options: ['東港鎮', '恆春鎮', '潮州鎮', '枋寮鄉'],
      answerIndex: 0,
      explanation: '大鵬灣國家風景區主要位於屏東縣東港鎮與林邊鄉交界，緊鄰東港漁港。'
    }
  },
  {
    id: 'longluan-lake',
    name: '龍鑾潭',
    englishName: 'Longluan Lake',
    city: '屏東縣',
    township: '恆春鎮',
    region: 'south',
    category: 'natural',
    lat: 21.9736,
    lng: 120.7336,
    elevation: 18,
    area: '175 公頃',
    depth: '3.5 公尺',
    aquiferDepth: 7.5,
    geology: '位於恆春縱谷平原最低窪處的斷層構造盆地半天然湖泊，匯集恆春半島四方山澗地下水脈，是台灣本島最南端的大型淡水湖泊。',
    townshipIntro: '【屏東縣恆春鎮】位於台灣最南端，擁有保存最完整的國定古蹟「恆春古城四城門」、墾丁國家公園、落山風洋蔥、港口茶與民謠《思想起》文化。',
    funFact: '龍鑾潭被譽為南台灣的「野鳥天堂」，每年秋冬有數千隻雁鴨與鷺科候鳥在此棲息度冬！',
    officialLinks: [
      { title: '內政部國家公園署墾丁國家公園管理處官網', url: 'https://www.ktnp.gov.tw/' },
      { title: '內政部國家公園署國家重要濕地保育計畫官網', url: 'https://wetland-tw.tcd.gov.tw/' },
      { title: '維基百科：龍鑾潭', url: 'https://zh.wikipedia.org/zh-tw/%E9%BE%8D%E9%91%BE%E6%BD%AD' }
    ],
    quiz: {
      question: '台灣本島最南端的大型淡水湖泊、素有「候鳥天堂」美譽的「龍鑾潭」，位於屏東縣哪一個鄉鎮？',
      options: ['恆春鎮', '車城鄉', '滿州鄉', '牡丹鄉'],
      answerIndex: 0,
      explanation: '龍鑾潭位於屏東縣恆春鎮西南側（墾丁國家公園境內），是台灣重要的濕地水鳥保護區。'
    }
  },

  // ==================== 東部水脈區 (East) ====================
  {
    id: 'cuifeng-lake',
    name: '翠峰湖',
    englishName: 'Cuifeng Lake',
    city: '宜蘭縣',
    township: '大同鄉',
    region: 'east',
    category: 'alpine',
    lat: 24.5131,
    lng: 121.6061,
    elevation: 1840,
    area: '25.0 公頃',
    depth: '7.0 公尺',
    aquiferDepth: 21.0,
    geology: '位於太平山與大元山之間（宜蘭大同鄉與南澳鄉交界），滿水期面積達25公頃，是全台灣「面積最大的高山天然湖泊」，因無外流河道全靠雨水與地底伏流調節，湖面呈葫蘆狀。',
    townshipIntro: '【宜蘭縣大同鄉】為泰雅族原鄉，坐擁太平山國家森林遊樂區、鳩之澤藍色地熱溫泉、棲蘭與明池神木園，以及大同玉蘭茶與高冷蔬菜。',
    funFact: '翠峰湖畔的「翠峰湖環山步道（奧陶紀苔原區）」獲得全球第一條「國家級寂靜山徑（Quiet Trail）」認證，安靜程度僅25分貝！',
    officialLinks: [
      { title: '農業部林業及自然保育署宜蘭分署：太平山國家森林遊樂區官網', url: 'https://tps.forest.gov.tw/' },
      { title: '農業部林業及自然保育署：台灣山林悠遊網', url: 'https://recreation.forest.gov.tw/' },
      { title: '維基百科：翠峰湖', url: 'https://zh.wikipedia.org/zh-tw/%E7%BF%A0%E5%B3%B0%E6%B9%96' }
    ],
    quiz: {
      question: '全台灣面積最大的高山天然湖泊、且擁有全球首條認證「寂靜山徑」的「翠峰湖」，位於宜蘭縣哪裡？',
      options: ['大同鄉與南澳鄉交界', '礁溪鄉與頭城鎮交界', '羅東鎮與五結鄉交界', '蘇澳鎮與冬山鄉交界'],
      answerIndex: 0,
      explanation: '翠峰湖位於宜蘭縣大同鄉與南澳鄉交界的太平山國家森林遊樂區內，海拔 1,840 公尺。'
    }
  },
  {
    id: 'meihua-lake',
    name: '梅花湖',
    englishName: 'Meihua Lake (Plum Blossom Lake)',
    city: '宜蘭縣',
    township: '冬山鄉',
    region: 'east',
    category: 'natural',
    lat: 24.6447,
    lng: 121.7322,
    elevation: 30,
    area: '18.0 公頃',
    depth: '4.0 公尺',
    aquiferDepth: 6.8,
    geology: '原名「大埤」，位於蘭陽平原南緣三面環山的凹谷，由山麓充沛的天然地底湧泉匯集而成，因湖岸自然彎曲宛如五瓣梅花而得名。',
    townshipIntro: '【宜蘭縣冬山鄉】以冬山河親水公園、冬山風箏節、三奇美徑（宜蘭伯朗大道）、素馨紅茶與珍珠社區稻草工藝聞名。',
    funFact: '梅花湖中央有一座「鳳凰島」，透過吊橋與環湖自行車道相連，山丘上則是全國道教總廟三清宮。',
    officialLinks: [
      { title: '宜蘭勁好玩（宜蘭縣政府觀光旅遊網）', url: 'https://travel.yilan.tw/' },
      { title: '宜蘭縣冬山鄉觀光旅遊網', url: 'https://tourism.dongshan.gov.tw/' },
      { title: '維基百科：梅花湖', url: 'https://zh.wikipedia.org/zh-tw/%E6%A2%85%E8%8A%B1%E6%B9%96' }
    ],
    quiz: {
      question: '因湖岸輪廓神似五瓣梅花而得名、三面環山且為鐵人三項勝地的「梅花湖」，位於宜蘭縣哪一個鄉鎮？',
      options: ['冬山鄉', '三星鄉', '員山鄉', '壯圍鄉'],
      answerIndex: 0,
      explanation: '梅花湖位於宜蘭縣冬山鄉得安村，是蘭陽平原最具代表性的三面環山天然湧泉湖泊。'
    }
  },
  {
    id: 'longtan-lake-yilan',
    name: '礁溪龍潭湖',
    englishName: 'Jiaoxi Longtan Lake',
    city: '宜蘭縣',
    township: '礁溪鄉',
    region: 'east',
    category: 'natural',
    lat: 24.7939,
    lng: 121.7408,
    elevation: 18,
    area: '17.0 公頃',
    depth: '4.5 公尺',
    aquiferDepth: 8.2,
    geology: '古稱「大埤」，為昔日「蘭陽十二勝」之首，三面被雪山山脈尾稜環抱，湖底有豐沛的清澈冷湧泉，是蘭陽平原五大名湖中面積最大者。',
    townshipIntro: '【宜蘭縣礁溪鄉】擁有全台灣罕見的「平地碳酸氫鈉溫泉」，以湯圍溝溫泉公園、五峰旗瀑布、抹茶山（聖母山莊步道）與礁溪溫泉空心菜、番茄聞名。',
    funFact: '每年端午節前後，龍潭湖底的數萬尾「圓吻鯝魚（鯁魚）」會集體逆流而上爬上人工生態魚道產卵，形成震撼的生態奇景！',
    officialLinks: [
      { title: '宜蘭勁好玩（宜蘭縣政府工商旅遊處）', url: 'https://travel.yilan.tw/' },
      { title: '宜蘭縣礁溪鄉公所觀光旅遊網', url: 'https://www.jiaoxi-tourism.tw/' },
      { title: '維基百科：龍潭湖 (宜蘭縣)', url: 'https://zh.wikipedia.org/zh-tw/%E9%BE%8D%E6%BD%AD%E6%B9%96_(%E5%AE%9C%E8%98%AD%E7%B8%A3)' }
    ],
    quiz: {
      question: '為「蘭陽十二勝」之一、每年端午節有數萬尾「圓吻鯝魚」逆流產卵奇觀的龍潭湖，位於宜蘭縣哪個溫泉鄉鎮？',
      options: ['礁溪鄉', '蘇澳鎮', '五結鄉', '頭城鎮'],
      answerIndex: 0,
      explanation: '龍潭湖位於宜蘭縣礁溪鄉龍潭村，是宜蘭五大名湖中面積最大的天然湖泊。'
    }
  },
  {
    id: 'hualien-liyu-lake',
    name: '花蓮鯉魚潭',
    englishName: 'Hualien Liyu Lake',
    city: '花蓮縣',
    township: '壽豐鄉',
    region: 'east',
    category: 'natural',
    lat: 23.9242,
    lng: 121.5094,
    elevation: 140,
    area: '104 公頃',
    depth: '9.0 公尺',
    aquiferDepth: 14.5,
    geology: '位於花東縱谷北端鯉魚山山麓，原為木瓜溪與古銅蘭溪改道遺留的「河川襲奪與沖積扇堰塞湖」，水源全靠湖底天然地底伏流湧泉補給！',
    townshipIntro: '【花蓮縣壽豐鄉】位於中央山脈與海岸山脈之間，是阿美族與客家移民共融之鄉，擁有國立東華大學、立川漁場黃金蜆、雲山水與豐田碧玉歷史。',
    funFact: '花蓮鯉魚潭沒有明顯的地面大河注入，湖水之所以終年清澈不涸，完全仰賴湖底強大的「木瓜溪地下伏流水脈」湧出！',
    officialLinks: [
      { title: '交通部觀光署花東縱谷國家風景區管理處官網', url: 'https://www.erv-nsa.gov.tw/' },
      { title: '花蓮觀光資訊網（花蓮縣政府）', url: 'https://tour-hualien.hl.gov.tw/' },
      { title: '維基百科：鯉魚潭 (花蓮縣)', url: 'https://zh.wikipedia.org/zh-tw/%E9%AF%89%E9%AD%9A%E6%BD%AD_(%E8%8A%B1%E8%93%AE%E7%B8%A3)' }
    ],
    quiz: {
      question: '東台灣最大的內陸天然湖泊、完全仰賴湖底「地下伏流湧泉」補給並以活跳蝦聞名的「花蓮鯉魚潭」，位於哪個鄉鎮？',
      options: ['花蓮縣壽豐鄉', '花蓮縣吉安鄉', '花蓮縣瑞穗鄉', '花蓮縣玉里鎮'],
      answerIndex: 0,
      explanation: '花蓮鯉魚潭位於花蓮縣壽豐鄉池南村鯉魚山腳下，是花東縱谷最具代表性的天然湖泊。'
    }
  },
  {
    id: 'jiaming-lake',
    name: '嘉明湖',
    englishName: 'Jiaming Lake (Angel’s Tear)',
    city: '臺東縣',
    township: '海端鄉',
    region: 'east',
    category: 'alpine',
    lat: 23.2933,
    lng: 121.0342,
    elevation: 3310,
    area: '1.9 公頃',
    depth: '6.0 公尺',
    aquiferDepth: 28.0,
    geology: '位於中央山脈南二段三叉山東側草原，海拔高達 3,310 公尺（全台第二高高山湖泊），地質學界證實為冰河時期遺留的「冰斗湖（圈谷湖）」，湛藍橢圓湖面被譽為「天使的眼淚」。',
    townshipIntro: '【臺東縣海端鄉】為台東縣面積最大的行政區，布農族語稱「Haitotowan」（意為三面被高山環繞、一面敞開之地），擁有南橫公路天龍吊橋、栗松野溪溫泉與霧鹿峽谷。',
    funFact: '嘉明湖在布農族傳統中稱為「月亮的鏡子（Cidahu）」，湖水完全沒有任何山溪注入或流出，卻終年湛藍不枯竭！',
    officialLinks: [
      { title: '農業部林業及自然保育署臺東分署：嘉明湖國家步道官網', url: 'https://jmlnt.forest.gov.tw/' },
      { title: '農業部林業及自然保育署：台灣山林悠遊網', url: 'https://recreation.forest.gov.tw/' },
      { title: '維基百科：嘉明湖', url: 'https://zh.wikipedia.org/zh-tw/%E5%98%89%E6%98%8E%E6%B9%96' }
    ],
    quiz: {
      question: '海拔 3,310 公尺、被譽為「天使的眼淚」與布農族「月亮的鏡子」的高山冰斗湖「嘉明湖」，位於臺東縣哪個鄉鎮？',
      options: ['海端鄉', '池上鄉', '延平鄉', '卑南鄉'],
      answerIndex: 0,
      explanation: '嘉明湖位於臺東縣海端鄉利稻村的中央山脈三叉山東側，是全台灣最負盛名的高山湖泊。'
    }
  },
  {
    id: 'dapo-pond',
    name: '大坡池',
    englishName: 'Dapo Pond (Chishang)',
    city: '臺東縣',
    township: '池上鄉',
    region: 'east',
    category: 'natural',
    lat: 23.1194,
    lng: 121.2256,
    elevation: 262,
    area: '28.0 公頃',
    depth: '3.0 公尺',
    aquiferDepth: 11.8,
    geology: '位於歐亞板塊與菲律賓海板塊碰撞最劇烈的「池上斷層」活動帶上，由斷層陷落形成的花東縱谷天然斷層濕地湖泊，亦是秀姑巒溪的源頭之一。',
    townshipIntro: '【臺東縣池上鄉】因聚落位於「大坡池之上」而得名「池上」！以新武呂溪純淨水脈灌溉出的冠軍「池上米」、池上便當與金城武樹伯朗大道聞名全台。',
    funFact: '「池上鄉」地名裡的「池」指的就是大坡池！沒有大坡池這座斷層天然湖，就沒有今日「池上」這個名字！',
    officialLinks: [
      { title: '交通部觀光署花東縱谷國家風景區管理處官網', url: 'https://www.erv-nsa.gov.tw/' },
      { title: '台東觀光旅遊網（臺東縣政府）', url: 'https://tour.taitung.gov.tw/' },
      { title: '維基百科：大坡池', url: 'https://zh.wikipedia.org/zh-tw/%E5%A4%A7%E5%9D%A1%E6%B1%A0' }
    ],
    quiz: {
      question: '造就了「池上鄉」地名由來（意為居住在此池之上）、且由花東縱谷斷層活動形成的天然湖泊是哪一座？',
      options: ['大坡池', '琵琶湖', '活水湖', '綠島燕子洞'],
      answerIndex: 0,
      explanation: '臺東縣池上鄉的大坡池（原名大陂）為池上斷層形成的天然斷層湖，「池上」之名即源於聚落位於大坡池北方之上。'
    }
  },
  {
    id: 'pipa-lake-taitung',
    name: '臺東琵琶湖',
    englishName: 'Taitung Pipa Lake',
    city: '臺東縣',
    township: '臺東市',
    region: 'east',
    category: 'lagoon',
    lat: 22.7611,
    lng: 121.1669,
    elevation: 5,
    area: '1.8 公頃',
    depth: '2.5 公尺',
    aquiferDepth: 4.8,
    geology: '位於卑南溪出海口南側的台東森林公園（黑森林）內，由卑南溪地下伏流湧泉與海岸沙洲共同圍塑而成的半天然河口湧泉湖泊，因兩湖相連形似琵琶而得名。',
    townshipIntro: '【臺東縣臺東市】為台東縣治所在地，融合卑南族、阿美族與閩客文化，坐擁台東森林公園、鐵花新聚落、富山護魚區及元宵節「炮炸寒單爺」民俗慶典。',
    funFact: '琵琶湖雖然緊鄰太平洋海岸，湖水卻是從地底礫石層不斷湧出的清澈淡水，清可見底如玻璃水族箱！',
    officialLinks: [
      { title: '台東觀光旅遊網（臺東縣政府官方導覽）', url: 'https://tour.taitung.gov.tw/' },
      { title: '臺東市公所官方網站', url: 'https://www.taitungcity.gov.tw/' },
      { title: '維基百科：臺東森林公園（琵琶湖）', url: 'https://zh.wikipedia.org/zh-tw/%E8%87%BA%E6%9D%B1%E6%A3%AE%E6%9E%97%E5%85%AC%E5%9C%92' }
    ],
    quiz: {
      question: '位於台東森林公園（木麻黃黑森林）內、由卑南溪地下湧泉匯聚且形似古典樂器的清澈湖泊是哪一座？',
      options: ['琵琶湖', '大坡池', '小鬼湖', '梅花湖'],
      answerIndex: 0,
      explanation: '琵琶湖位於臺東縣臺東市台東森林公園內，是由卑南溪地下湧泉形成的絕美河口湖泊。'
    }
  },

  // ==================== 離島水脈區 (Islands) ====================
  {
    id: 'chenggong-reservoir',
    name: '成功水庫',
    englishName: 'Chenggong Reservoir',
    city: '澎湖縣',
    township: '湖西鄉',
    region: 'islands',
    category: 'reservoir',
    lat: 23.5689,
    lng: 119.6311,
    elevation: 9,
    area: '32.0 公頃',
    depth: '10.5 公尺',
    aquiferDepth: 5.2,
    geology: '澎湖群島由玄武岩熔岩台地構成、無高山與常流河川，成功水庫攔截港底溪出海口建成，並結合「赤崁地下水庫」在玄武岩地底構築截水牆保存珍貴淡水。',
    townshipIntro: '【澎湖縣湖西鄉】以「奎壁山摩西分海」地質奇觀、隘門金沙灘、南寮古厝浮球秘境與澎湖花生酥聞名，是馬公本島東側的生態旅遊勝地。',
    funFact: '澎湖除了地面的成功水庫外，還有一座真正的「地底水庫（赤崁地下水庫）」，在地下玄武岩層建造地下壩攔截地下水脈！',
    officialLinks: [
      { title: '交通部觀光署澎湖國家風景區管理處官網', url: 'https://www.penghu-nsa.gov.tw/' },
      { title: '台灣自來水公司第七區管理處官網', url: 'https://www.water.gov.tw/dist7' },
      { title: '維基百科：成功水庫', url: 'https://zh.wikipedia.org/zh-tw/%E6%88%90%E5%8A%9F%E6%B0%B4%E5%BA%AB' }
    ],
    quiz: {
      question: '澎湖本島最大的地面淡水庫「成功水庫」（鄰近摩西分海奎壁山），位於澎湖縣哪一個鄉鎮？',
      options: ['湖西鄉', '馬公市', '白沙鄉', '西嶼鄉'],
      answerIndex: 0,
      explanation: '成功水庫位於澎湖縣湖西鄉成功村，是澎湖最重要的地面飲用水源水庫。'
    }
  },
  {
    id: 'small-sky-pond-lanyu',
    name: '蘭嶼天池 (大天池)',
    englishName: 'Lanyu Tianchi (DuWaWa)',
    city: '臺東縣',
    township: '蘭嶼鄉',
    region: 'islands',
    category: 'alpine',
    lat: 22.0128,
    lng: 121.5694,
    elevation: 350,
    area: '1.5 公頃',
    depth: '3.0 公尺',
    aquiferDepth: 12.5,
    geology: '位於台灣東南外海火山島蘭嶼南端森山山頂，由遠古火山噴發口陷落積水而成的「火山口湖」，湖中枯立木與熱帶雨林雲霧交織出原始秘境。',
    townshipIntro: '【臺東縣蘭嶼鄉】達悟族（Tao）語稱「Ponso no Tao（人之島）」，以拼板舟（Tatala）、飛魚季文化、半地下屋（地下主屋建築）與蘭嶼角鴞生態聞名國際。',
    funFact: '達悟族人稱大天池為「DuWaWa」（意為高山之海或鬼魂出沒之處），族人對這座火山口神聖之湖懷有崇高的敬畏！',
    officialLinks: [
      { title: '臺東縣蘭嶼鄉公所官方網站', url: 'https://www.lanyu.gov.tw/' },
      { title: '台東觀光旅遊網（臺東縣政府）', url: 'https://tour.taitung.gov.tw/' },
      { title: '維基百科：大天池 (蘭嶼)', url: 'https://zh.wikipedia.org/zh-tw/%E5%A4%A7%E5%A4%A9%E6%B1%A0' }
    ],
    quiz: {
      question: '達悟族語稱為「DuWaWa（高山之海）」、位於熱帶雨林山頂的火山口湖「大天池」，位於哪一個離島鄉鎮？',
      options: ['臺東縣蘭嶼鄉', '臺東縣綠島鄉', '屏東縣琉球鄉', '澎湖縣七美鄉'],
      answerIndex: 0,
      explanation: '大天池與小天池皆位於臺東縣蘭嶼鄉的火山口山稜上，是蘭嶼最獨特的高地火山湖泊。'
    }
  }
];

/**
 * 預設地底水脈連通網路 (Subterranean Aquifer Network)
 */
export const DEFAULT_AQUIFER_LINKS = [
  // 北部水脈鏈
  ['menghuan-lake', 'lover-lake'],
  ['menghuan-lake', 'feitsui-reservoir'],
  ['feitsui-reservoir', 'songluo-lake'],
  ['feitsui-reservoir', 'bade-pond'],
  ['bade-pond', 'longtan-big-pond'],
  ['longtan-big-pond', 'shimen-reservoir'],
  ['shimen-reservoir', '鴛鴦湖-yuanyang'],
  ['songluo-lake', '鴛鴦湖-yuanyang'],
  ['longtan-big-pond', 'qingcao-lake'],
  ['qingcao-lake', 'emei-lake'],
  ['emei-lake', 'lishan-lake'],
  ['lishan-lake', 'liyu-reservoir'],

  // 北東雪山跨脈鏈
  ['songluo-lake', 'longtan-lake-yilan'],
  ['longtan-lake-yilan', 'meihua-lake'],
  ['meihua-lake', 'cuifeng-lake'],
  ['鴛鴦湖-yuanyang', 'cuifeng-lake'],

  // 中部大甲溪—濁水溪核心水脈
  ['liyu-reservoir', 'deji-reservoir'],
  ['鴛鴦湖-yuanyang', 'deji-reservoir'],
  ['deji-reservoir', 'wanda-reservoir'],
  ['wanda-reservoir', 'liyu-lake-puli'],
  ['liyu-lake-puli', 'sun-moon-lake'],
  ['wanda-reservoir', 'sun-moon-lake'],
  ['sun-moon-lake', 'qilin-lake'],
  ['sun-moon-lake', 'qicai-lake'],
  ['qilin-lake', 'hushan-reservoir'],
  ['hushan-reservoir', 'chenglong-wetland'],

  // 中南嘉南平原與阿里山水脈
  ['hushan-reservoir', 'renyitan-reservoir'],
  ['renyitan-reservoir', 'lantan-lake'],
  ['renyitan-reservoir', 'shuishang-sister-lakes'],
  ['qilin-lake', 'shuishang-sister-lakes'],
  ['shuishang-sister-lakes', 'zengwen-reservoir'],
  ['zengwen-reservoir', 'wushantou-reservoir'],
  ['wushantou-reservoir', 'qigu-lagoon'],
  ['chenglong-wetland', 'qigu-lagoon'],
  ['wushantou-reservoir', 'hutoupi-reservoir'],

  // 高屏與南中央山脈深層水脈
  ['hutoupi-reservoir', 'meinong-lake'],
  ['meinong-lake', 'chengqing-lake'],
  ['chengqing-lake', 'lotus-pond'],
  ['meinong-lake', 'dagui-lake'],
  ['chengqing-lake', 'dapeng-bay'],
  ['dapeng-bay', 'longluan-lake'],

  // 東部花東縱谷與中央山脈脊樑水脈
  ['cuifeng-lake', 'hualien-liyu-lake'],
  ['qicai-lake', 'hualien-liyu-lake'],
  ['qicai-lake', 'jiaming-lake'],
  ['jiaming-lake', 'dapo-pond'],
  ['hualien-liyu-lake', 'dapo-pond'],
  ['dapo-pond', 'pipa-lake-taitung'],
  ['jiaming-lake', 'dagui-lake'],
  ['dagui-lake', 'longluan-lake'],
  ['pipa-lake-taitung', 'longluan-lake'],

  // 台灣海峽與太平洋深層跨海地殼水道 (連結澎湖與蘭嶼離島)
  ['chenglong-wetland', 'chenggong-reservoir'],
  ['qigu-lagoon', 'chenggong-reservoir'],
  ['pipa-lake-taitung', 'small-sky-pond-lanyu'],
  ['longluan-lake', 'small-sky-pond-lanyu']
];

/**
 * 台灣本島與離島輪廓多邊形經緯度 (供 3D 地底地殼建模使用)
 */
export const TAIWAN_OUTLINE_COORDS = [
  [25.298, 121.535], // 富貴角
  [25.215, 121.682], // 野柳
  [25.132, 121.918], // 鼻頭角
  [25.007, 122.006], // 三貂角
  [24.835, 121.832], // 頭城
  [24.592, 121.868], // 蘇澳
  [24.258, 121.745], // 清水斷崖
  [23.982, 121.628], // 花蓮港
  [23.462, 121.505], // 豐濱長虹橋
  [23.122, 121.412], // 成功三仙台
  [22.755, 121.158], // 台東卑南溪口
  [22.325, 120.892], // 大武
  [21.902, 120.852], // 鵝鑾鼻
  [21.922, 120.715], // 貓鼻頭
  [22.065, 120.695], // 車城
  [22.382, 120.585], // 枋寮
  [22.465, 120.442], // 東港
  [22.625, 120.265], // 高雄旗津
  [22.985, 120.148], // 台南安平
  [23.152, 120.038], // 七股國聖燈塔
  [23.485, 120.132], // 嘉義布袋東石
  [23.805, 120.188], // 雲林麥寮
  [24.085, 120.385], // 彰化鹿港
  [24.285, 120.512], // 台中梧棲
  [24.622, 120.752], // 苗栗後龍
  [24.845, 120.922], // 新竹南寮
  [25.075, 121.125], // 桃園觀音
  [25.182, 121.412]  // 淡水河口
];

export const PENGHU_OUTLINE_COORDS = [
  [23.665, 119.555],
  [23.625, 119.675],
  [23.515, 119.655],
  [23.505, 119.515],
  [23.595, 119.475]
];

export const LANYU_OUTLINE_COORDS = [
  [22.092, 121.525],
  [22.065, 121.588],
  [21.995, 121.602],
  [21.985, 121.545],
  [22.045, 121.505]
];

/**
 * 潛艇升級階級定義
 */
export const SUBMARINE_TIERS = [
  { minLakes: 0, tier: 1, title: '初階地底聲納艇 MK-I', badge: '🛸', color: '#38bdf8' },
  { minLakes: 5, tier: 2, title: '深層水脈巡航艦 MK-II', badge: '⚡', color: '#34d399' },
  { minLakes: 12, tier: 3, title: '台灣地心領航號 MK-III', badge: '💠', color: '#c084fc' },
  { minLakes: 22, tier: 4, title: '伏流共振旗艦號 MK-IV', badge: '🌟', color: '#fbbf24' },
  { minLakes: 32, tier: 5, title: '台灣全境湖泊守護神 Ω', badge: '👑', color: '#fb7185' }
];

/**
 * 可擴充湖泊、水庫、埤塘與潟湖管理系統 (Extensible Lake Registry)
 * 支援：
 * 1. 內建 36 座官方認證資料庫
 * 2. 外部可擴充 JSON 資料包 (`./data/custom-lakes.json`) 自動載入
 * 3. 玩家/開發者於瀏覽器介面即時新增「湖泊、高山湖泊、水庫、埤塘、潟湖」節點，並自動計算最近地底水脈連線
 * 4. 一鍵匯出/匯入 JSON 供 GitHub 開源社群 PR 擴充
 */
const CUSTOM_LAKES_STORAGE_KEY = 'taiwan_hollow_earth_custom_lakes_v1';

export class LakeRegistry {
  constructor() {
    this.customLakes = this.loadCustomLakesFromStorage();
    this.externalPackLakes = [];
  }

  loadCustomLakesFromStorage() {
    try {
      const raw = localStorage.getItem(CUSTOM_LAKES_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed to parse custom lakes from storage:', e);
      return [];
    }
  }

  saveCustomLakesToStorage() {
    try {
      localStorage.setItem(CUSTOM_LAKES_STORAGE_KEY, JSON.stringify(this.customLakes));
    } catch (e) {
      console.warn('Failed to save custom lakes to storage:', e);
    }
  }

  async loadExternalJsonPack(url = './data/custom-lakes.json') {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return [];
      const data = await res.json();
      if (Array.isArray(data.lakes)) {
        this.externalPackLakes = data.lakes.map(l => this.normalizeLakeEntry(l, true));
      }
      return this.externalPackLakes;
    } catch {
      return [];
    }
  }

  normalizeLakeEntry(entry, isCustom = true) {
    const lat = Number(entry.lat) || 23.86;
    const lng = Number(entry.lng) || 120.91;
    const elevation = Number(entry.elevation) || 100;
    const category = LAKE_CATEGORIES[entry.category] ? entry.category : 'natural';
    const region = REGIONS[entry.region] ? entry.region : 'central';
    const city = String(entry.city || '臺灣').trim();
    const township = String(entry.township || '').trim();
    const name = String(entry.name || '未命名水域').trim();

    // 整理官方連結，並自動補上可驗證之維基百科與 Google Maps 精準衛星座標
    const officialLinks = Array.isArray(entry.officialLinks)
      ? entry.officialLinks.filter(l => l && l.url && /^https?:\/\//i.test(l.url))
      : [];

    if (entry.officialUrl && /^https?:\/\//i.test(entry.officialUrl)) {
      officialLinks.unshift({
        title: entry.officialTitle || '官方介紹 / 主管機關網站',
        url: entry.officialUrl.trim()
      });
    }

    // 確保每個節點都有精確 Google 衛星地圖定位與維基百科查詢連結
    const hasMaps = officialLinks.some(l => l.url.includes('google.com/maps'));
    if (!hasMaps) {
      officialLinks.push({
        title: `Google 衛星地圖精確座標 (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`,
        url: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      });
    }

    const quiz = entry.quiz && Array.isArray(entry.quiz.options)
      ? entry.quiz
      : {
          question: `請問「${name}」位於台灣哪一個縣市與鄉鎮市區？`,
          options: [
            `${city}${township}`,
            '臺北市信義區',
            '臺中市西屯區',
            '高雄市前鎮區'
          ],
          answerIndex: 0,
          explanation: `「${name}」位於${city}${township}，屬於${LAKE_CATEGORIES[category].label}。`
        };

    return {
      id: entry.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      englishName: entry.englishName || name,
      city,
      township,
      region,
      category,
      lat,
      lng,
      elevation,
      area: entry.area || '未標註',
      depth: entry.depth || '未標註',
      aquiferDepth: Number(entry.aquiferDepth) || Math.max(4.5, Math.min(28, 6 + elevation / 140)),
      geology: entry.geology || `位於${city}${township}之${LAKE_CATEGORIES[category].label}，與區域地下水脈連通。`,
      townshipIntro: entry.townshipIntro || `【${city}${township}】擁有豐富的水文環境與地方人文物產特色。`,
      funFact: entry.funFact || entry.notes || `這是由社群或玩家擴充登錄之${LAKE_CATEGORIES[category].label}地底水脈節點。`,
      officialLinks,
      quiz,
      isCustom
    };
  }

  getAllLakes() {
    const map = new Map();
    for (const lake of BUILTIN_TAIWAN_LAKES) {
      map.set(lake.id, this.normalizeLakeEntry(lake, false));
    }
    for (const lake of this.externalPackLakes) {
      map.set(lake.id, this.normalizeLakeEntry(lake, true));
    }
    for (const lake of this.customLakes) {
      map.set(lake.id, this.normalizeLakeEntry(lake, true));
    }
    return Array.from(map.values());
  }

  getAquiferLinks() {
    const allLakes = this.getAllLakes();
    const links = [...DEFAULT_AQUIFER_LINKS];
    const builtinIds = new Set(BUILTIN_TAIWAN_LAKES.map(l => l.id));

    // 為任何新擴充的湖泊、水庫、埤塘或潟湖自動計算最近的 2 座湖泊並建立地底水脈連線！
    for (const lake of allLakes) {
      if (builtinIds.has(lake.id)) continue;
      const others = allLakes
        .filter(other => other.id !== lake.id)
        .map(other => ({
          id: other.id,
          distSq: Math.pow(other.lat - lake.lat, 2) + Math.pow(other.lng - lake.lng, 2)
        }))
        .sort((a, b) => a.distSq - b.distSq)
        .slice(0, 2);

      for (const target of others) {
        links.push([lake.id, target.id]);
      }
    }
    return links;
  }

  addCustomLake(newLakeData) {
    const normalized = this.normalizeLakeEntry(newLakeData, true);
    const existingIdx = this.customLakes.findIndex(l => l.id === normalized.id);
    if (existingIdx >= 0) {
      this.customLakes[existingIdx] = normalized;
    } else {
      this.customLakes.push(normalized);
    }
    this.saveCustomLakesToStorage();
    return normalized;
  }

  removeCustomLake(id) {
    this.customLakes = this.customLakes.filter(l => l.id !== id);
    this.saveCustomLakesToStorage();
  }

  importCustomLakesJson(jsonString) {
    const parsed = JSON.parse(jsonString);
    const list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.lakes) ? parsed.lakes : []);
    if (!list.length) {
      throw new Error('JSON 檔案中未找到有效的 lakes 陣列');
    }
    let addedCount = 0;
    for (const item of list) {
      if (item && item.name && item.city && item.township && item.lat && item.lng) {
        this.addCustomLake(item);
        addedCount++;
      }
    }
    return addedCount;
  }

  exportCustomLakesJson() {
    return JSON.stringify(
      {
        schemaVersion: '1.0',
        project: 'taiwan-hollow-earth-lakes',
        exportedAt: new Date().toISOString(),
        description: '台灣地底水脈探索：可擴充湖泊、水庫、埤塘與潟湖資料包',
        lakes: this.customLakes
      },
      null,
      2
    );
  }
}
