(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=JSON.parse(`[{"id":"hua-she-tian-zu","word":"畫蛇添足","pinyin":"huà shé tiān zú","cantonese":"waak6 se4 tim1 zuk1","meaning":"畫蛇時多畫幾隻腳，比喻做多餘的事，反而弄巧成拙。","origin":"《戰國策·齊策二》載楚人祭祀後賜酒，門客比賽畫蛇，先畫成者多添蛇足，反被他人搶先畫完而失酒。","sourceBook":"《戰國策·齊策二》","tier":1,"tags":["寓言","做事"]},{"id":"shou-zhu-dai-tu","word":"守株待兔","pinyin":"shǒu zhū dài tù","cantonese":"sau2 zyu1 doi6 tou3","meaning":"守在樹樁旁等兔子再撞上來，比喻死守經驗、妄想不勞而獲。","origin":"《韓非子·五蠹》載宋國農夫見兔撞樹樁而死，從此放下農具守候樹旁，妄想再得兔子，終被國人恥笑。","sourceBook":"《韓非子·五蠹》","tier":1,"tags":["寓言","做事"]},{"id":"wang-yang-bu-lao","word":"亡羊補牢","pinyin":"wáng yáng bǔ láo","cantonese":"mong4 joeng4 bou2 lou4","meaning":"羊走失後修補羊圈，比喻出錯後及時補救，還來得及。","origin":"《戰國策·楚策四》載莊辛勸楚襄王及早防秦，引「亡羊而補牢，未為遲也」，說明出錯後補救仍未算遲。","sourceBook":"《戰國策·楚策四》","tier":1,"tags":["寓言","做事"]},{"id":"dui-niu-tan-qin","word":"對牛彈琴","pinyin":"duì niú tán qín","cantonese":"deoi3 ngau4 taan4 kam4","meaning":"對著牛彈琴，比喻對不懂道理的人講道理，白費口舌。","origin":"漢·牟融《理惑論》載公明儀為牛彈琴，牛只顧吃草，說明說話要看對象，否則徒勞無功。","sourceBook":"《弘明集·理惑論》","tier":1,"tags":["寓言","說話"]},{"id":"jing-di-zhi-wa","word":"井底之蛙","pinyin":"jǐng dǐ zhī wā","cantonese":"zeng2 dai2 zi1 waa1","meaning":"井底的青蛙以為天空只有井口般大，比喻見識短淺。","origin":"《莊子·秋水》載井底青蛙向東海之鱉誇耀井中樂趣，鱉未入井，左腳已被絆住，喻眼界狹窄。","sourceBook":"《莊子·秋水》","tier":1,"tags":["寓言","動物"]},{"id":"zi-xiang-mao-dun","word":"自相矛盾","pinyin":"zì xiāng máo dùn","cantonese":"zi6 soeng1 maau4 teon5","meaning":"自己的說話或做法前後抵觸，不能自圓其說。","origin":"《韓非子·難一》載楚人賣矛與盾，既誇矛能刺穿一切，又誇盾能擋住一切，被問以子之矛陷子之盾而無言。","sourceBook":"《韓非子·難一》","tier":1,"tags":["寓言","說話"]},{"id":"yan-er-dao-ling","word":"掩耳盜鈴","pinyin":"yǎn ěr dào líng","cantonese":"jim2 ji5 dou6 ling4","meaning":"掩住耳朵偷鈴鐺，比喻自己欺騙自己，以為別人不知道。","origin":"《呂氏春秋·自知》載有人偷鐘怕響聲，掩住自己耳朵以為別人聽不到，喻自欺欺人。","sourceBook":"《呂氏春秋·自知》","tier":1,"tags":["寓言","做事"]},{"id":"ke-zhou-qiu-jian","word":"刻舟求劍","pinyin":"kè zhōu qiú jiàn","cantonese":"hak1 zau1 kau4 gim3","meaning":"劍掉水中卻在船邊刻記號，比喻拘泥固執、不懂變通。","origin":"《呂氏春秋·察今》載楚人渡江時劍落水中，在船舷刻記號，待船停才下水尋劍，自然找不到。","sourceBook":"《呂氏春秋·察今》","tier":1,"tags":["寓言","做事"]},{"id":"hu-jia-hu-wei","word":"狐假虎威","pinyin":"hú jiǎ hǔ wēi","cantonese":"wu4 gaa2 fu2 wai1","meaning":"狐狸借老虎的威風嚇走百獸，比喻倚仗別人勢力欺壓人。","origin":"《戰國策·楚策一》載狐狸對老虎說百獸都怕牠，其實是借老虎威風，老虎信以為真。","sourceBook":"《戰國策·楚策一》","tier":1,"tags":["寓言","動物"]},{"id":"ye-gong-hao-long","word":"葉公好龍","pinyin":"yè gōng hào lóng","cantonese":"jip6 gung1 hou3 lung4","meaning":"葉公愛好龍，真龍來了卻嚇跑，比喻表面愛好而非真心。","origin":"漢·劉向《新序·雜事五》載葉公愛龍成癖，屋宇器物皆畫龍，真龍聞訊下降，他卻嚇得逃走。","sourceBook":"《新序·雜事五》","tier":1,"tags":["寓言","動物"]},{"id":"nan-yuan-bei-zhe","word":"南轅北轍","pinyin":"nán yuán běi zhé","cantonese":"naam4 jyun4 bak1 cit3","meaning":"想往南走卻駕車向北，比喻行動與目的背道而馳。","origin":"《戰國策·魏策四》載有人欲往楚國卻駕車向北，人問其故，答稱馬好、路費多、車夫善，方向卻完全相反。","sourceBook":"《戰國策·魏策四》","tier":1,"tags":["寓言","做事"]},{"id":"sai-weng-shi-ma","word":"塞翁失馬","pinyin":"sài wēng shī mǎ","cantonese":"coi3 jung1 sat1 maa5","meaning":"邊塞老翁失馬，後來馬帶良馬歸來，比喻禍福相倚、得失難料。","origin":"《淮南子·人間訓》載塞上老翁失馬，人皆慰問，他說未必是禍；不久馬帶胡地良馬歸來，禍福難料。","sourceBook":"《淮南子·人間訓》","tier":1,"tags":["寓言","人生"]},{"id":"jing-gong-zhi-niao","word":"驚弓之鳥","pinyin":"jīng gōng zhī niǎo","cantonese":"ging1 gung1 zi1 niu5","meaning":"受過箭傷的鳥一聽弓弦聲就驚慌，比喻受過驚嚇後遇事心怯。","origin":"《戰國策·楚策四》載更羸對魏王說可虛發弓弦射落飛鳥，因雁受過箭傷、聞弦聲即驚落。","sourceBook":"《戰國策·楚策四》","tier":1,"tags":["寓言","動物"]},{"id":"qi-ren-you-tian","word":"杞人憂天","pinyin":"qǐ rén yōu tiān","cantonese":"gei2 jan4 jau1 tin1","meaning":"杞國人擔心天會塌下來，比喻毫無根據的憂慮。","origin":"《列子·天瑞》載杞國有人憂天塌地陷，寢食不安；後人笑其庸人自擾。","sourceBook":"《列子·天瑞》","tier":1,"tags":["寓言","情感"]},{"id":"yu-gong-yi-shan","word":"愚公移山","pinyin":"yú gōng yí shān","cantonese":"jyu4 gung1 ji4 saan1","meaning":"愚公率子孫挖山不止，比喻有毅力、肯堅持終能成事。","origin":"《列子·湯問》載愚公年近九十，率子孫挖太行、王屋二山，感動天帝派夸蛾氏移走。","sourceBook":"《列子·湯問》","tier":1,"tags":["寓言","堅持"]},{"id":"yi-ming-jing-ren","word":"一鳴驚人","pinyin":"yī míng jīng rén","cantonese":"jat1 ming4 ging1 jan4","meaning":"平日默默無聞，一出手就令人震驚，比喻成就非凡。","origin":"《史記·滑稽列傳》載齊威王好長夜之飲，淳于髡以「不鳴則已，一鳴驚人」諷諫，王遂改過。","sourceBook":"《史記·滑稽列傳》","tier":1,"tags":["學習","人物"]},{"id":"hua-long-dian-jing","word":"畫龍點睛","pinyin":"huà lóng diǎn jīng","cantonese":"waak6 lung4 dim2 zing1","meaning":"畫龍後點上眼睛，比喻在關鍵處加上一筆，使內容生動傳神。","origin":"唐·張彥遠《歷代名畫記》載張僧繇於金陵安樂寺畫龍，點睛後雷電破壁、二龍飛去。","sourceBook":"《歷代名畫記》","tier":1,"tags":["藝術","寫作"]},{"id":"san-gu-mao-lu","word":"三顧茅廬","pinyin":"sān gù máo lú","cantonese":"saam1 gu3 maau4 lou4","meaning":"劉備三次到草廬拜訪諸葛亮，比喻誠意邀請或多次拜訪賢才。","origin":"《三國志·蜀書·諸葛亮傳》載劉備三度到隆中草廬拜訪諸葛亮，諸葛亮感其誠意而出山輔佐。","sourceBook":"《三國志·蜀書·諸葛亮傳》","tier":2,"tags":["歷史","人物"]},{"id":"ru-yu-de-shui","word":"如魚得水","pinyin":"rú yú dé shuǐ","cantonese":"jyu4 jyu4 dak1 seoi2","meaning":"像魚得到水一樣，比喻得到合意的人才或環境。","origin":"《三國志·蜀書·諸葛亮傳》載劉備得諸葛亮後說「孤之有孔明，猶魚之有水也」，形容契合無間。","sourceBook":"《三國志·蜀書·諸葛亮傳》","tier":2,"tags":["人物","動物"]},{"id":"gua-mu-xiang-kan","word":"刮目相看","pinyin":"guā mù xiāng kàn","cantonese":"gwaat3 muk6 soeng1 hon3","meaning":"用新眼光看待別人的進步，比喻另眼相看。","origin":"《三國志·吳書·呂蒙傳》裴松之注引《江表傳》載呂蒙發憤讀書，魯肅驚嘆其長進，呂蒙說士別三日當刮目相待。","sourceBook":"《三國志·吳書·呂蒙傳》","tier":2,"tags":["學習","人物"]},{"id":"le-bu-si-shu","word":"樂不思蜀","pinyin":"lè bù sī shǔ","cantonese":"lok6 bat1 si1 suk6","meaning":"安樂得不想回蜀國，比喻樂而忘本或不思歸返。","origin":"《三國志·蜀書·後主傳》裴松之注引《漢晉春秋》載劉禪降魏後說「此間樂，不思蜀」，後人譏其昏庸。","sourceBook":"《三國志·蜀書·後主傳》","tier":2,"tags":["歷史","人物"]},{"id":"qi-bu-cheng-shi","word":"七步成詩","pinyin":"qī bù chéng shī","cantonese":"cat1 bou6 sing4 si1","meaning":"七步之內完成一首詩，比喻才思敏捷。","origin":"《世說新語·文學》載曹丕令曹植七步內作詩，否則治罪，曹植應聲成「煮豆燃豆萁」之詩。","sourceBook":"《世說新語·文學》","tier":2,"tags":["學習","人物"]},{"id":"he-li-ji-qun","word":"鶴立雞群","pinyin":"hè lì jī qún","cantonese":"hok6 laap6 gai1 kwan4","meaning":"仙鶴站在雞群中，比喻儀表或才能出眾、超越同輩。","origin":"《世說新語·容止》載有人讚嵇紹「卓卓如野鶴之在雞群」，形容其氣度超群。","sourceBook":"《世說新語·容止》","tier":2,"tags":["人物","動物"]},{"id":"wang-mei-zhi-ke","word":"望梅止渴","pinyin":"wàng méi zhǐ kě","cantonese":"mong6 mui4 zi2 hot3","meaning":"用空想安慰自己，比喻願望無法實現。","origin":"《世說新語·假譎》載曹操行軍缺水，誑稱前有梅林，士卒聞之口生唾液，暫解口渴。","sourceBook":"《世說新語·假譎》","tier":2,"tags":["寓言","生活"]},{"id":"wen-ji-qi-wu","word":"聞雞起舞","pinyin":"wén jī qǐ wǔ","cantonese":"man4 gai1 hei2 mou5","meaning":"聽到雞啼就起床舞劍，比喻有志之士及時奮發。","origin":"《晉書·祖逖傳》載祖逖與劉琨同寢，半夜聞雞鳴即起床舞劍，刻苦鍛鍊，立志報國。","sourceBook":"《晉書·祖逖傳》","tier":2,"tags":["學習","堅持"]},{"id":"cheng-feng-po-lang","word":"乘風破浪","pinyin":"chéng fēng pò làng","cantonese":"sing4 fung1 po3 long6","meaning":"船趁風勢破浪前進，比喻志向遠大、勇往直前。","origin":"《宋書·宗慤傳》載宗慤少年時答叔父，願乘長風破萬里浪，後人用以形容遠大志向。","sourceBook":"《宋書·宗慤傳》","tier":2,"tags":["人物","堅持"]},{"id":"yi-ye-zhi-qiu","word":"一葉知秋","pinyin":"yī yè zhī qiū","cantonese":"jat1 jip6 zi1 cau1","meaning":"看見一片落葉便知秋天到來，比喻由細微跡象推知趨勢。","origin":"《淮南子·說山訓》載「見一葉落而知歲之將暮」，由一片落葉推知一年將盡。","sourceBook":"《淮南子·說山訓》","tier":2,"tags":["自然","思維"]},{"id":"gao-zhen-wu-you","word":"高枕無憂","pinyin":"gāo zhěn wú yōu","cantonese":"gou1 zam2 mou4 jau1","meaning":"墊高枕頭安心睡覺，比喻平安無事、無所顧慮。","origin":"《戰國策·齊策四》載馮諼為孟嘗君營造三窟後說「君姑高枕為樂矣」，孟嘗君自此無憂。","sourceBook":"《戰國策·齊策四》","tier":2,"tags":["生活","做事"]},{"id":"an-ju-le-ye","word":"安居樂業","pinyin":"ān jū lè yè","cantonese":"on1 geoi1 lok6 jip6","meaning":"人民安定居住、樂於本業，形容社會太平、生活安定。","origin":"《漢書·貨殖傳》載「各安其居而樂其業，甘其食而美其服」，形容百姓生活安定滿足。","sourceBook":"《漢書·貨殖傳》","tier":2,"tags":["生活","社會"]},{"id":"zhi-lu-wei-ma","word":"指鹿為馬","pinyin":"zhǐ lù wéi mǎ","cantonese":"zi2 luk6 wai4 maa5","meaning":"指著鹿說是馬，比喻故意顛倒是非、測試順逆。","origin":"《史記·秦始皇本紀》載趙高獻鹿於秦二世而稱馬，群臣或沉默或附和，以此測試誰敢違逆。","sourceBook":"《史記·秦始皇本紀》","tier":2,"tags":["歷史","說話"]},{"id":"po-fu-chen-zhou","word":"破釜沉舟","pinyin":"pò fǔ chén zhōu","cantonese":"po3 fu2 cam4 zau1","meaning":"打破鍋、鑿沉船，比喻下定決心、不留退路。","origin":"《史記·項羽本紀》載項羽渡河救趙，鑿沉船隻、打破炊具，只帶三日糧，士卒無退路而奮勇作戰。","sourceBook":"《史記·項羽本紀》","tier":2,"tags":["歷史","勇氣"]},{"id":"si-mian-chu-ge","word":"四面楚歌","pinyin":"sì miàn chǔ gē","cantonese":"sei3 min6 co2 go1","meaning":"四面都響起楚人歌聲，比喻四面受敵、孤立無援。","origin":"《史記·項羽本紀》載項羽被圍垓下，夜聞漢軍四面皆楚歌，以為楚地盡失，軍心渙散。","sourceBook":"《史記·項羽本紀》","tier":2,"tags":["歷史","情感"]},{"id":"wo-xin-chang-dan","word":"臥薪嘗膽","pinyin":"wò xīn cháng dǎn","cantonese":"ngo6 san1 soeng4 daam2","meaning":"睡柴草、嘗苦膽，比喻刻苦自勵、發憤圖強。","origin":"《史記·越王勾踐世家》載勾踐被吳所敗後臥薪嘗膽、勵精圖治，終於滅吳復仇。","sourceBook":"《史記·越王勾踐世家》","tier":2,"tags":["歷史","堅持"]},{"id":"zhi-shang-tan-bing","word":"紙上談兵","pinyin":"zhǐ shàng tán bīng","cantonese":"zi2 soeng6 taam4 bing1","meaning":"只在紙面上談論用兵，比喻空談理論、不能解決實際問題。","origin":"《史記·廉頗藺相如列傳》載趙括熟讀兵書卻只會空談，長平之戰大敗，四十萬趙軍被坑殺。","sourceBook":"《史記·廉頗藺相如列傳》","tier":2,"tags":["學習","做事"]},{"id":"fu-jing-qing-zui","word":"負荊請罪","pinyin":"fù jīng qǐng zuì","cantonese":"fu6 ging1 cing2 zeoi6","meaning":"背著荊條向人請罪，比喻主動認錯、甘願受罰。","origin":"《史記·廉頗藺相如列傳》載廉頗知錯後脫衣露背、背負荊條到藺相如門前請罪，二人終成刎頸之交。","sourceBook":"《史記·廉頗藺相如列傳》","tier":2,"tags":["人物","品格"]},{"id":"wan-bi-gui-zhao","word":"完璧歸趙","pinyin":"wán bì guī zhào","cantonese":"jyun4 bik1 gwai1 ziu6","meaning":"把和氏璧完好送回趙國，比喻把原物完整無損地歸還。","origin":"《史記·廉頗藺相如列傳》載藺相如奉和氏璧使秦，見秦王無意割城，設計將璧完好送回趙國。","sourceBook":"《史記·廉頗藺相如列傳》","tier":2,"tags":["歷史","人物"]},{"id":"yi-nuo-qian-jin","word":"一諾千金","pinyin":"yī nuò qiān jīn","cantonese":"jat1 nok6 cin1 gam1","meaning":"一句承諾價值千金，形容說話極有信用、絕不食言。","origin":"《史記·季布欒布列傳》載季布重然諾，楚人諺曰「得黃金百斤，不如得季布一諾」。","sourceBook":"《史記·季布欒布列傳》","tier":1,"tags":["品格","誠信"]},{"id":"qing-mei-zhu-ma","word":"青梅竹馬","pinyin":"qīng méi zhú mǎ","cantonese":"cing1 mui4 zuk1 maa5","meaning":"騎竹馬、弄青梅，形容小兒女天真嬉戲，也指自幼相識的伴侶。","origin":"唐·李白《長干行》「郎騎竹馬來，繞床弄青梅」，描寫小兒女天真無邪的玩樂情景。","sourceBook":"《李太白集·長干行》","tier":2,"tags":["情感","生活"]},{"id":"jing-wei-tian-hai","word":"精衛填海","pinyin":"jīng wèi tián hǎi","cantonese":"zing1 wai6 tin4 hoi2","meaning":"精衛鳥銜木石填海不止，比喻意志堅決、不畏艱難。","origin":"《山海經·北山經》載炎帝之女溺死東海，化為精衛鳥，常銜西山木石以填東海，永不止息。","sourceBook":"《山海經·北山經》","tier":2,"tags":["寓言","堅持"]},{"id":"kua-fu-zhui-ri","word":"夸父追日","pinyin":"kuā fù zhuī rì","cantonese":"kwaa1 fu6 zeoi1 jat6","meaning":"夸父與太陽競走，比喻宏偉的志向，也比喻不自量力。","origin":"《山海經·海外北經》載夸父與日競走，渴飲河渭不足，道渴而死，手杖化為鄧林。","sourceBook":"《山海經·海外北經》","tier":2,"tags":["寓言","堅持"]},{"id":"nv-wa-bu-tian","word":"女媧補天","pinyin":"nǚ wā bǔ tiān","cantonese":"neoi5 wo1 bou2 tin1","meaning":"女媧煉石補天，比喻偉大的救世功業。","origin":"《淮南子·覽冥訓》載天柱折、地維絕，女媧煉五色石補天、斷鰲足立四極，拯救蒼生。","sourceBook":"《淮南子·覽冥訓》","tier":2,"tags":["寓言","神話"]},{"id":"cao-mu-jie-bing","word":"草木皆兵","pinyin":"cǎo mù jiē bīng","cantonese":"cou2 muk6 gaai1 bing1","meaning":"把草木都當成敵兵，比喻驚慌時疑神疑鬼。","origin":"《晉書·苻堅載記》載苻堅敗退時登城望見八公山草木，以為皆是晉兵，驚懼失色。","sourceBook":"《晉書·苻堅載記》","tier":2,"tags":["歷史","戰爭"]},{"id":"shi-wai-tao-yuan","word":"世外桃源","pinyin":"shì wài táo yuán","cantonese":"sai3 ngoi6 tou4 jyun4","meaning":"與世隔絕、安樂美好的地方，比喻理想中的生活環境。","origin":"陶淵明《桃花源記》描寫漁人誤入與世隔絕的桃花源，居民安居樂業，不知外面朝代更替。","sourceBook":"《陶淵明集·桃花源記》","tier":2,"tags":["自然","生活"]},{"id":"huo-ran-kai-lang","word":"豁然開朗","pinyin":"huò rán kāi lǎng","cantonese":"kut3 jin4 hoi1 long5","meaning":"眼前忽然開闊明亮，比喻由困惑轉為明白通達。","origin":"陶淵明《桃花源記》載漁人穿過狹窄山洞後「豁然開朗」，眼前土地平曠、屋舍儼然。","sourceBook":"《陶淵明集·桃花源記》","tier":2,"tags":["學習","情感"]},{"id":"shui-luo-shi-chu","word":"水落石出","pinyin":"shuǐ luò shí chū","cantonese":"seoi2 lok6 sek6 ceot1","meaning":"水位下降石頭露出，比喻事情真相大白。","origin":"歐陽修《醉翁亭記》寫琅琊山溪澗「水落而石出」，本寫景，後借喻真相顯露。","sourceBook":"《歐陽文忠公集·醉翁亭記》","tier":2,"tags":["自然","做事"]},{"id":"san-ren-cheng-hu","word":"三人成虎","pinyin":"sān rén chéng hǔ","cantonese":"saam1 jan4 sing4 fu2","meaning":"三個人說市上有虎，聽者便信以為真，比喻謠言重複多次便被當真。","origin":"《戰國策·魏策二》載龐蔥對魏王說：一人言市有虎王不信，三人言則王信之，喻讒言可畏。","sourceBook":"《戰國策·魏策二》","tier":3,"tags":["寓言","說話"]},{"id":"jiao-tu-san-ku","word":"狡兔三窟","pinyin":"jiǎo tù sān kū","cantonese":"gaau2 tou3 saam1 fat1","meaning":"狡兔準備三個洞穴，比喻預留多條後路以避禍。","origin":"《戰國策·齊策四》載馮諼對孟嘗君說狡兔有三窟才免於死，遂為孟嘗君營造三處安身之所。","sourceBook":"《戰國策·齊策四》","tier":3,"tags":["寓言","思維"]},{"id":"ye-lang-zi-da","word":"夜郎自大","pinyin":"yè láng zì dà","cantonese":"je6 long4 zi6 daai6","meaning":"夜郎侯自以為國土最大，比喻見識淺薄、妄自尊大。","origin":"《史記·西南夷列傳》載夜郎侯問漢使「漢孰與我大」，因道路不通而不知漢朝廣大。","sourceBook":"《史記·西南夷列傳》","tier":3,"tags":["歷史","人物"]},{"id":"mao-sui-zi-jian","word":"毛遂自薦","pinyin":"máo suì zì jiàn","cantonese":"mou4 seoi6 zi6 zin3","meaning":"毛遂主動請求跟隨出使，比喻自告奮勇、主動承擔。","origin":"《史記·平原君虞卿列傳》載毛遂主動請求隨平原君出使楚國，並按劍說服楚王合縱。","sourceBook":"《史記·平原君虞卿列傳》","tier":3,"tags":["人物","做事"]},{"id":"tuo-ying-er-chu","word":"脫穎而出","pinyin":"tuō yǐng ér chū","cantonese":"tyut3 wing6 ji4 ceot1","meaning":"錐尖穿出布袋，比喻才能顯露、超越眾人。","origin":"《史記·平原君虞卿列傳》載毛遂自喻如錐處囊中，若早得處囊中，早已脫穎而出。","sourceBook":"《史記·平原君虞卿列傳》","tier":3,"tags":["人物","學習"]},{"id":"yi-zi-qian-jin","word":"一字千金","pinyin":"yī zì qiān jīn","cantonese":"jat1 zi6 cin1 gam1","meaning":"一個字價值千金，形容文辭精妙、不可改動。","origin":"《史記·呂不韋列傳》載呂不韋著《呂氏春秋》，懸於咸陽市門，稱能增損一字者予千金。","sourceBook":"《史記·呂不韋列傳》","tier":3,"tags":["寫作","說話"]},{"id":"yue-fa-san-zhang","word":"約法三章","pinyin":"yuē fǎ sān zhāng","cantonese":"joek3 faat3 saam1 zoeng1","meaning":"訂立簡單明確的規約，大家共同遵守。","origin":"《史記·高祖本紀》載劉邦入關後與父老約定「殺人者死，傷人及盜抵罪」三章，秦民大悅。","sourceBook":"《史記·高祖本紀》","tier":3,"tags":["歷史","社會"]},{"id":"ji-ming-gou-dao","word":"雞鳴狗盜","pinyin":"jī míng gǒu dào","cantonese":"gai1 ming4 gau2 dou6","meaning":"學雞啼、裝狗偷，比喻微末技能或不入流的本領。","origin":"《史記·孟嘗君列傳》載孟嘗君門客學雞鳴賺開城門、裝狗盜取狐白裘，助其逃出秦國。","sourceBook":"《史記·孟嘗君列傳》","tier":3,"tags":["人物","動物"]},{"id":"tu-qiong-bi-xian","word":"圖窮匕見","pinyin":"tú qióng bǐ xiàn","cantonese":"tou4 kung4 bei6 jin6","meaning":"地圖展盡而匕首出現，比喻事情敗露、真相畢現。","origin":"《戰國策·燕策三》載荊軻獻燕督亢地圖，圖卷展盡而匕首現，刺秦王不中，終被殺。","sourceBook":"《戰國策·燕策三》","tier":4,"tags":["歷史","人物"]},{"id":"qi-huo-ke-ju","word":"奇貨可居","pinyin":"qí huò kě jū","cantonese":"kei4 fo3 ho2 geoi1","meaning":"把稀奇的貨物囤積起來等待高價，比喻挾持某人或某物以牟利。","origin":"《史記·呂不韋列傳》載呂不韋見秦公子子楚而曰「此奇貨可居」，遂投資助其歸國即位。","sourceBook":"《史記·呂不韋列傳》","tier":4,"tags":["歷史","做事"]},{"id":"xiang-zhuang-wu-jian","word":"項莊舞劍","pinyin":"xiàng zhuāng wǔ jiàn","cantonese":"hong6 zong1 mou5 gim3","meaning":"項莊舞劍助興，實則意在刺殺沛公，比喻言行表面無害而別有用心。","origin":"《史記·項羽本紀》載鴻門宴上項莊舞劍，項伯以身遮護沛公，范增欲藉機刺殺劉邦。","sourceBook":"《史記·項羽本紀》","tier":4,"tags":["歷史","說話"]},{"id":"wen-gu-zhi-xin","word":"溫故知新","pinyin":"wēn gù zhī xīn","cantonese":"wan1 gu3 zi1 san1","meaning":"溫習舊知識而領悟新道理，形容善於學習、與時俱進。","origin":"《論語·為政》載孔子曰「溫故而知新，可以為師矣」，說明溫習舊學能悟出新知，便可為人師。","sourceBook":"《論語·為政》","tier":1,"tags":["學習","智慧"]},{"id":"bu-chi-xia-wen","word":"不恥下問","pinyin":"bù chǐ xià wèn","cantonese":"bat1 ci2 haa6 man6","meaning":"不以向地位或學識比自己低的人請教為恥，形容謙虛好學。","origin":"《論語·公冶長》載孔子讚孔文子「敏而好學，不恥下問」，故諡之為文。","sourceBook":"《論語·公冶長》","tier":2,"tags":["學習","品格"]},{"id":"ju-yi-fan-san","word":"舉一反三","pinyin":"jǔ yī fǎn sān","cantonese":"geoi2 jat1 faan2 saam1","meaning":"舉出一角就能推知其餘三角，形容善於類推、觸類旁通。","origin":"《論語·述而》載孔子說「舉一隅不以三隅反，則不復也」，要求學生能由此及彼。","sourceBook":"《論語·述而》","tier":2,"tags":["學習","思維"]},{"id":"jian-yi-yong-wei","word":"見義勇為","pinyin":"jiàn yì yǒng wéi","cantonese":"gin3 ji6 jung5 wai4","meaning":"看到合於正義的事就勇敢去做，形容有正義感、敢於擔當。","origin":"《論語·為政》載孔子曰「見義不為，無勇也」，勉人見合義之事應挺身而出。","sourceBook":"《論語·為政》","tier":2,"tags":["品格","做事"]},{"id":"jian-xian-si-qi","word":"見賢思齊","pinyin":"jiàn xián sī qí","cantonese":"gin3 jin4 si1 cai4","meaning":"看見賢人就想向他看齊，形容積極向上、自我要求。","origin":"《論語·里仁》載「見賢思齊焉，見不賢而內自省也」，勉人向善並反省自己。","sourceBook":"《論語·里仁》","tier":2,"tags":["學習","品格"]},{"id":"hou-sheng-ke-wei","word":"後生可畏","pinyin":"hòu shēng kě wèi","cantonese":"hau6 saang1 ho2 wai3","meaning":"年輕人有潛力，日後成就值得敬畏，不可輕視。","origin":"《論語·子罕》載孔子曰「後生可畏，焉知來者之不如今也」，提醒勿輕視年輕後輩。","sourceBook":"《論語·子罕》","tier":2,"tags":["人物","學習"]},{"id":"yan-er-you-xin","word":"言而有信","pinyin":"yán ér yǒu xìn","cantonese":"jin4 ji4 jau5 seon3","meaning":"說話講信用，答應別人的事一定做到，絕不食言。","origin":"《論語·學而》載子夏曰「與朋友交，言而有信」，強調交友須守信諾。","sourceBook":"《論語·學而》","tier":2,"tags":["品格","說話"]},{"id":"bu-yi-le-hu","word":"不亦樂乎","pinyin":"bù yì lè hū","cantonese":"bat1 jik6 lok6 fu4","meaning":"豈不是很快樂嗎，形容心情非常愉快、高興。","origin":"《論語·學而》載孔子曰「有朋自遠方來，不亦樂乎」，表達迎接朋友的喜悅。","sourceBook":"《論語·學而》","tier":2,"tags":["情感","學習"]},{"id":"qiao-yan-ling-se","word":"巧言令色","pinyin":"qiǎo yán lìng sè","cantonese":"haau2 jin4 ling6 sik1","meaning":"花言巧語、裝出討好的臉色，形容虛偽諂媚。","origin":"《論語·學而》載孔子曰「巧言令色，鮮矣仁」，指巧言善色之人少有仁德。","sourceBook":"《論語·學而》","tier":3,"tags":["說話","人物"]},{"id":"cha-yan-guan-se","word":"察言觀色","pinyin":"chá yán guān sè","cantonese":"caat3 jin4 gun1 sik1","meaning":"觀察別人的言語和臉色，揣摩其心意。","origin":"《論語·顏淵》載孔子論「達」曰「質直而好義，察言而觀色」，指善於體察人情。","sourceBook":"《論語·顏淵》","tier":3,"tags":["說話","做事"]},{"id":"cheng-ren-zhi-mei","word":"成人之美","pinyin":"chéng rén zhī měi","cantonese":"sing4 jan4 zi1 mei5","meaning":"成全別人的好事，形容胸襟寬厚、樂於助人。","origin":"《論語·顏淵》載孔子曰「君子成人之美，不成人之惡」，小人則反是。","sourceBook":"《論語·顏淵》","tier":3,"tags":["品格"]},{"id":"jing-er-yuan-zhi","word":"敬而遠之","pinyin":"jìng ér yuǎn zhī","cantonese":"ging3 ji4 jyun6 zi1","meaning":"尊敬但保持距離，形容不親近也不得罪。","origin":"《論語·雍也》載孔子曰「務民之義，敬鬼神而遠之，可謂知矣」，後泛指敬重而疏遠。","sourceBook":"《論語·雍也》","tier":3,"tags":["做事","說話"]},{"id":"wen-zhi-bin-bin","word":"文質彬彬","pinyin":"wén zhì bīn bīn","cantonese":"man4 zat1 ban1 ban1","meaning":"文采與質樸配合得宜，形容人舉止文雅、表裡相稱。","origin":"《論語·雍也》載孔子曰「文質彬彬，然後君子」，指內在質樸與外在文采相稱。","sourceBook":"《論語·雍也》","tier":3,"tags":["人物","品格"]},{"id":"le-zai-qi-zhong","word":"樂在其中","pinyin":"lè zài qí zhōng","cantonese":"lok6 zoi6 kei4 zung1","meaning":"在所做的平凡事情中體會到無窮樂趣，形容自得其樂。","origin":"《論語·述而》載孔子曰「飯疏食飲水，曲肱而枕之，樂亦在其中矣」，安貧樂道。","sourceBook":"《論語·述而》","tier":3,"tags":["情感","學習"]},{"id":"fa-fen-wang-shi","word":"發憤忘食","pinyin":"fā fèn wàng shí","cantonese":"faat3 fan5 mong4 sik6","meaning":"專心努力到忘記吃飯，形容勤奮投入。","origin":"《論語·述而》載孔子自述「發憤忘食，樂以忘憂，不知老之將至云爾」。","sourceBook":"《論語·述而》","tier":3,"tags":["學習","堅持"]},{"id":"hui-ren-bu-juan","word":"誨人不倦","pinyin":"huì rén bù juàn","cantonese":"fui3 jan4 bat1 gyun6","meaning":"教導別人不知疲倦，形容教學熱誠、有耐性。","origin":"《論語·述而》載孔子曰「學而不厭，誨人不倦」，自述好學與教學的態度。","sourceBook":"《論語·述而》","tier":3,"tags":["學習","人物"]},{"id":"xue-er-bu-yan","word":"學而不厭","pinyin":"xué ér bù yàn","cantonese":"hok6 ji4 bat1 jim3","meaning":"學習永遠不感到滿足，形容非常好學、勤奮不倦。","origin":"《論語·述而》載孔子曰「默而識之，學而不厭，誨人不倦，何有於我哉」。","sourceBook":"《論語·述而》","tier":3,"tags":["學習"]},{"id":"ren-zhong-dao-yuan","word":"任重道遠","pinyin":"rèn zhòng dào yuǎn","cantonese":"jam6 zung6 dou6 jyun5","meaning":"擔子沉重、路程遙遠，比喻責任重大而道路漫長。","origin":"《論語·泰伯》載曾子曰「士不可以不弘毅，任重而道遠」，勉人承擔使命。","sourceBook":"《論語·泰伯》","tier":2,"tags":["人物","做事"]},{"id":"si-er-hou-yi","word":"死而後已","pinyin":"sǐ ér hòu yǐ","cantonese":"sei2 ji4 hau6 ji5","meaning":"到死才停止，形容為理想奮鬥終生、不懈努力。","origin":"《論語·泰伯》載曾子曰「仁以為己任，不亦重乎？死而後已，不亦遠乎」。","sourceBook":"《論語·泰伯》","tier":3,"tags":["品格","堅持"]},{"id":"yu-su-bu-da","word":"欲速不達","pinyin":"yù sù bù dá","cantonese":"juk6 cuk1 bat1 daat6","meaning":"一味求快反而不能達到目的，說明做事要按部就班。","origin":"《論語·子路》載孔子曰「無欲速，無見小利。欲速則不達，見小利則大事不成」。","sourceBook":"《論語·子路》","tier":3,"tags":["做事","思維"]},{"id":"yuan-tian-you-ren","word":"怨天尤人","pinyin":"yuàn tiān yóu rén","cantonese":"jyun3 tin1 jau4 jan4","meaning":"遇到挫折就埋怨上天、責怪別人，形容推卸責任、消極抱怨。","origin":"《論語·憲問》載孔子自述「不怨天，不尤人，下學而上達」，以反襯怨天尤人之非。","sourceBook":"《論語·憲問》","tier":3,"tags":["情感"]},{"id":"yi-de-bao-yuan","word":"以德報怨","pinyin":"yǐ dé bào yuàn","cantonese":"ji5 dak1 bou3 jyun3","meaning":"用恩德來回報別人的怨恨，形容為人寬厚、以善化惡。","origin":"《論語·憲問》載或問「以德報怨，何如」，孔子答以「以直報怨，以德報德」。","sourceBook":"《論語·憲問》","tier":3,"tags":["品格"]},{"id":"you-jiao-wu-lei","word":"有教無類","pinyin":"yǒu jiào wú lèi","cantonese":"jau5 gaau3 mou4 leoi6","meaning":"不分貧富貴賤、資質高低，一律給予教導。","origin":"《論語·衛靈公》載孔子曰「有教無類」，主張教育應普及所有人。","sourceBook":"《論語·衛靈公》","tier":2,"tags":["學習","社會"]},{"id":"sha-shen-cheng-ren","word":"殺身成仁","pinyin":"shā shēn chéng rén","cantonese":"saat3 san1 sing4 jan4","meaning":"犧牲生命以成全仁德，形容為正義捨生。","origin":"《論語·衛靈公》載孔子曰「志士仁人，無求生以害仁，有殺身以成仁」。","sourceBook":"《論語·衛靈公》","tier":3,"tags":["品格"]},{"id":"dang-ren-bu-rang","word":"當仁不讓","pinyin":"dāng rén bù ràng","cantonese":"dong1 jan4 bat1 joeng6","meaning":"遇到該做的事就主動承擔，不推讓給別人。","origin":"《論語·衛靈公》載孔子曰「當仁不讓於師」，指面對仁義之事不必謙讓。","sourceBook":"《論語·衛靈公》","tier":3,"tags":["品格","做事"]},{"id":"zhi-shi-ren-ren","word":"志士仁人","pinyin":"zhì shì rén rén","cantonese":"zi3 si6 jan4 jan4","meaning":"有志向、有仁德的人，形容品格高尚、心懷天下。","origin":"《論語·衛靈公》載孔子曰「志士仁人，無求生以害仁，有殺身以成仁」。","sourceBook":"《論語·衛靈公》","tier":3,"tags":["人物","品格"]},{"id":"wu-wei-er-zhi","word":"無為而治","pinyin":"wú wéi ér zhì","cantonese":"mou4 wai4 ji4 zi6","meaning":"以順應自然、不妄加干預的方式治理，形容政簡刑清。","origin":"《論語·衛靈公》載孔子曰「無為而治者，其舜也與」，指舜能選賢任能而天下治。","sourceBook":"《論語·衛靈公》","tier":3,"tags":["社會"]},{"id":"fen-beng-li-xi","word":"分崩離析","pinyin":"fēn bēng lí xī","cantonese":"fan1 bang1 lei4 sik1","meaning":"國家或組織分裂瓦解，形容局勢混亂、四分五裂。","origin":"《論語·季氏》載孔子謂季氏「邦分崩離析而不能守也」，指國家分裂難以守護。","sourceBook":"《論語·季氏》","tier":4,"tags":["社會","歷史"]},{"id":"huo-qi-xiao-qiang","word":"禍起蕭牆","pinyin":"huò qǐ xiāo qiáng","cantonese":"wo6 hei2 siu1 coeng4","meaning":"禍患從內部產生，比喻內部不和招致災禍。","origin":"《論語·季氏》載孔子曰「吾恐季孫之憂，不在顓臾，而在蕭牆之內也」，指憂患在內部。","sourceBook":"《論語·季氏》","tier":4,"tags":["社會","歷史"]},{"id":"xue-qi-fang-gang","word":"血氣方剛","pinyin":"xuè qì fāng gāng","cantonese":"hyut3 hei3 fong1 gong1","meaning":"年輕人精力旺盛，形容血氣正盛、易於衝動。","origin":"《論語·季氏》載孔子曰「及其壯也，血氣方剛，戒之在鬥」，提醒少年戒爭鬥。","sourceBook":"《論語·季氏》","tier":4,"tags":["人物","情感"]},{"id":"si-ti-bu-qin","word":"四體不勤","pinyin":"sì tǐ bù qín","cantonese":"sei3 tai2 bat1 kan4","meaning":"四肢不勞動，形容脫離勞動、不事生產。","origin":"《論語·微子》載丈人批評子路「四體不勤，五穀不分，孰為夫子」。","sourceBook":"《論語·微子》","tier":4,"tags":["人物","生活"]},{"id":"bo-xue-du-zhi","word":"博學篤志","pinyin":"bó xué dǔ zhì","cantonese":"bok3 hok6 duk1 zi3","meaning":"廣泛學習且志向堅定，形容治學態度踏實。","origin":"《論語·子張》載子夏曰「博學而篤志，切問而近思，仁在其中矣」。","sourceBook":"《論語·子張》","tier":4,"tags":["學習"]},{"id":"san-shi-er-li","word":"三十而立","pinyin":"sān shí ér lì","cantonese":"saam1 sap6 ji4 laap6","meaning":"三十歲能自立於世，形容人到了三十歲應有所成就。","origin":"《論語·為政》載孔子自述「吾十有五而志於學，三十而立」，指三十歲能立足處世。","sourceBook":"《論語·為政》","tier":3,"tags":["人物","生活"]},{"id":"shen-zhong-zhui-yuan","word":"慎終追遠","pinyin":"shèn zhōng zhuī yuǎn","cantonese":"san6 zung1 zeoi1 jyun5","meaning":"謹慎辦理喪事、虔誠追念祖先，形容重視根本、不忘本。","origin":"《論語·學而》載曾子曰「慎終追遠，民德歸厚矣」，指重視喪祭可使民風淳厚。","sourceBook":"《論語·學而》","tier":3,"tags":["品格","習俗"]},{"id":"jing-yi-qiu-jing","word":"精益求精","pinyin":"jīng yì qiú jīng","cantonese":"zing1 jik1 kau4 zing1","meaning":"已經很好仍要求更好，形容追求卓越、不滿足於現狀。","origin":"《論語·學而》「如切如磋，如琢如磨」，朱熹《論語集注》釋為「治之已精，而益求其精也」。","sourceBook":"《論語集注·學而》","tier":2,"tags":["學習","做事"]},{"id":"zhuan-xin-zhi-zhi","word":"專心致志","pinyin":"zhuān xīn zhì zhì","cantonese":"zyun1 sam1 zi3 zi3","meaning":"一心一意、集中精神，形容做事非常專注投入。","origin":"《孟子·告子上》載弈秋教二人下棋，一人專心致志，另一人分心，學棋結果大不相同。","sourceBook":"《孟子·告子上》","tier":2,"tags":["學習"]},{"id":"she-sheng-qu-yi","word":"捨生取義","pinyin":"shě shēng qǔ yì","cantonese":"se2 sang1 ceoi2 ji6","meaning":"寧可犧牲生命也要堅守正義，形容氣節高尚。","origin":"《孟子·告子上》載「生，亦我所欲也；義，亦我所欲也；二者不可得兼，舍生而取義者也」。","sourceBook":"《孟子·告子上》","tier":2,"tags":["品格"]},{"id":"yuan-mu-qiu-yu","word":"緣木求魚","pinyin":"yuán mù qiú yú","cantonese":"jyun4 muk6 kau4 jyu4","meaning":"爬到樹上找魚，比喻方向或方法錯誤，必然徒勞無功。","origin":"《孟子·梁惠王上》載孟子謂齊宣王「以若所為求若所欲，猶緣木而求魚也」。","sourceBook":"《孟子·梁惠王上》","tier":2,"tags":["寓言","做事"]},{"id":"de-dao-duo-zhu","word":"得道多助","pinyin":"dé dào duō zhù","cantonese":"dak1 dou6 do1 zo6","meaning":"施行仁義的人得到眾人支持，形容得人心者多助。","origin":"《孟子·公孫丑下》載「得道者多助，失道者寡助」，說明行仁義則天下歸心。","sourceBook":"《孟子·公孫丑下》","tier":3,"tags":["社會","品格"]},{"id":"chu-lei-ba-cui","word":"出類拔萃","pinyin":"chū lèi bá cuì","cantonese":"ceot1 leoi6 bat6 seoi6","meaning":"超出同類、高出眾人，形容才能卓越、與眾不同。","origin":"《孟子·公孫丑上》載「出於其類，拔乎其萃，自生民以來，未有盛於孔子也」。","sourceBook":"《孟子·公孫丑上》","tier":3,"tags":["人物","學習"]},{"id":"mao-se-dun-kai","word":"茅塞頓開","pinyin":"máo sè dùn kāi","cantonese":"maau4 sak1 deon6 hoi1","meaning":"被茅草堵住的心忽然開通，比喻受到啟發而恍然大悟。","origin":"《孟子·盡心下》以山徑久不用則茅塞之為喻，後人用「茅塞頓開」形容忽然明白。","sourceBook":"《孟子·盡心下》","tier":3,"tags":["學習","思維"]},{"id":"yi-pu-shi-han","word":"一曝十寒","pinyin":"yī pù shí hán","cantonese":"jat1 buk6 sap6 hon4","meaning":"曬一天、冷十天，比喻勤奮少而懈怠多，不能堅持。","origin":"《孟子·告子上》載「雖有天下易生之物也，一日暴之，十日寒之，未有能生者也」。","sourceBook":"《孟子·告子上》","tier":3,"tags":["學習","做事"]},{"id":"shui-shen-huo-re","word":"水深火熱","pinyin":"shuǐ shēn huǒ rè","cantonese":"seoi2 sam1 fo2 jit6","meaning":"像陷在深水和烈火中，比喻處境極其痛苦艱難。","origin":"《孟子·梁惠王下》載「如水益深，如火益熱」，形容百姓所受苦難日益加深。","sourceBook":"《孟子·梁惠王下》","tier":2,"tags":["生活","社會"]},{"id":"liu-lian-wang-fan","word":"流連忘返","pinyin":"liú lián wàng fǎn","cantonese":"lau4 lin4 mong4 faan2","meaning":"沉迷於玩樂而忘記回去，形容十分留戀、不忍離去。","origin":"《孟子·梁惠王下》載晏子釋「流連荒亡」，指沉迷遊樂而忘記返國。","sourceBook":"《孟子·梁惠王下》","tier":3,"tags":["生活","情感"]},{"id":"yu-min-tong-le","word":"與民同樂","pinyin":"yǔ mín tóng lè","cantonese":"jyu5 man4 tung4 lok6","meaning":"和百姓一同享樂，形容施政得民心、與民共享。","origin":"《孟子·梁惠王下》載孟子曰「今王與百姓同樂，則王矣」，勉齊王與民同樂。","sourceBook":"《孟子·梁惠王下》","tier":3,"tags":["社會","人物"]},{"id":"pi-fu-zhi-yong","word":"匹夫之勇","pinyin":"pǐ fū zhī yǒng","cantonese":"pat1 fu1 zi1 jung5","meaning":"只憑個人血氣的勇敢，形容有勇無謀、逞一時之氣。","origin":"《孟子·梁惠王下》載孟子曰「夫撫劍疾視曰彼惡敢當我哉，此匹夫之勇，敵一人者也」。","sourceBook":"《孟子·梁惠王下》","tier":3,"tags":["人物","做事"]},{"id":"bei-shui-che-xin","word":"杯水車薪","pinyin":"bēi shuǐ chē xīn","cantonese":"bui1 seoi2 ce1 san1","meaning":"用一杯水去救一車柴火，比喻力量太小、無濟於事。","origin":"《孟子·告子上》載「猶以一杯水救一車薪之火也」，說明力量不足難成事。","sourceBook":"《孟子·告子上》","tier":3,"tags":["做事","思維"]},{"id":"bu-yuan-qian-li","word":"不遠千里","pinyin":"bù yuǎn qiān lǐ","cantonese":"bat1 jyun5 cin1 lei5","meaning":"不以千里為遠，形容不怕路途遙遠、誠意懇切。","origin":"《孟子·梁惠王上》載梁惠王謂孟子「叟不遠千里而來，亦將有以利吾國乎」。","sourceBook":"《孟子·梁惠王上》","tier":3,"tags":["做事","人物"]},{"id":"ming-cha-qiu-hao","word":"明察秋毫","pinyin":"míng chá qiū háo","cantonese":"ming4 caat3 cau1 hou4","meaning":"目光敏銳到能看清秋天鳥獸新生的細毛，形容觀察入微、明辨是非。","origin":"《孟子·梁惠王上》載「明足以察秋毫之末，而不見輿薪」，喻能見細微卻忽略大事。","sourceBook":"《孟子·梁惠王上》","tier":3,"tags":["思維","做事"]},{"id":"dang-wu-zhi-ji","word":"當務之急","pinyin":"dāng wù zhī jí","cantonese":"dong1 mou6 zi1 gap1","meaning":"當前最急需處理的事情，形容分輕重緩急。","origin":"《孟子·盡心上》載孟子曰「知者無不知也，當務之為急」，指智者懂得先做急要之事。","sourceBook":"《孟子·盡心上》","tier":3,"tags":["做事"]},{"id":"bu-yan-er-yu","word":"不言而喻","pinyin":"bù yán ér yù","cantonese":"bat1 jin4 ji4 jyu6","meaning":"不用說就能明白，形容道理淺顯或情況明顯。","origin":"《孟子·盡心上》載「君子所性，仁義禮智根於心……施於四體，四體不言而喻」。","sourceBook":"《孟子·盡心上》","tier":3,"tags":["說話","思維"]},{"id":"chu-er-fan-er","word":"出爾反爾","pinyin":"chū ěr fǎn ěr","cantonese":"ceot1 ji5 faan2 ji5","meaning":"你怎樣對待別人，別人也怎樣回報你；後多指言行反覆無常。","origin":"《孟子·梁惠王下》載「出乎爾者，反乎爾者也」，原指善惡終有回報，後轉為反覆無常之意。","sourceBook":"《孟子·梁惠王下》","tier":3,"tags":["說話","品格"]},{"id":"shi-ban-gong-bei","word":"事半功倍","pinyin":"shì bàn gōng bèi","cantonese":"si6 bun3 gung1 pui5","meaning":"用一半力氣得到雙倍功效，形容方法得當、效率高。","origin":"《孟子·公孫丑上》載「故事半古之人，功必倍之」，指方法得宜則成效倍增。","sourceBook":"《孟子·公孫丑上》","tier":2,"tags":["做事"]},{"id":"ren-zhe-wu-di","word":"仁者無敵","pinyin":"rén zhě wú dí","cantonese":"jan4 ze2 mou4 dik6","meaning":"有仁德的人天下無敵，形容以德服人最為強大。","origin":"《孟子·梁惠王上》載孟子曰「仁者無敵，王請勿疑」，勉梁惠王行仁政。","sourceBook":"《孟子·梁惠王上》","tier":4,"tags":["品格","社會"]},{"id":"qie-er-bu-she","word":"鍥而不捨","pinyin":"qiè ér bù shě","cantonese":"kit3 ji4 bat1 se2","meaning":"不停地雕刻，比喻堅持不懈、有恆心，終能成功。","origin":"《荀子·勸學》載「鍥而舍之，朽木不折；鍥而不舍，金石可鏤」，喻持之以恆。","sourceBook":"《荀子·勸學》","tier":2,"tags":["學習","堅持"]},{"id":"qing-chu-yu-lan","word":"青出於藍","pinyin":"qīng chū yú lán","cantonese":"cing1 ceot1 jyu1 laam4","meaning":"青色由藍草提煉卻比藍草更深，比喻學生勝過老師或後輩超越前輩。","origin":"《荀子·勸學》載「青，取之於藍，而青於藍；冰，水為之，而寒於水」。","sourceBook":"《荀子·勸學》","tier":2,"tags":["學習"]},{"id":"ji-tu-cheng-shan","word":"積土成山","pinyin":"jī tǔ chéng shān","cantonese":"zik1 tou2 sing4 saan1","meaning":"把泥土堆積成高山，比喻日積月累、積少成多。","origin":"《荀子·勸學》載「積土成山，風雨興焉；積水成淵，蛟龍生焉」，喻積累之效。","sourceBook":"《荀子·勸學》","tier":3,"tags":["學習","自然"]},{"id":"chun-wang-chi-han","word":"唇亡齒寒","pinyin":"chún wáng chǐ hán","cantonese":"seon4 mong4 ci2 hon4","meaning":"嘴唇沒有了，牙齒就會受寒，比喻雙方關係密切、互相依存。","origin":"《左傳·僖公五年》載晉欲假道虞國伐虢，宮之奇諫曰「輔車相依，唇亡齒寒」，虞君不聽終被滅。","sourceBook":"《左傳·僖公五年》","tier":2,"tags":["寓言","歷史"]},{"id":"yi-gu-zuo-qi","word":"一鼓作氣","pinyin":"yī gǔ zuò qì","cantonese":"jat1 gu2 zok3 hei3","meaning":"第一次擊鼓時士氣最盛，比喻趁勁頭足時一舉成事。","origin":"《左傳·莊公十年》載曹劌論戰，待齊軍三鼓後才擊鼓出戰，指出「一鼓作氣，再而衰，三而竭」。","sourceBook":"《左傳·莊公十年》","tier":2,"tags":["歷史","勇氣"]},{"id":"zai-shuai-san-jie","word":"再衰三竭","pinyin":"zài shuāi sān jié","cantonese":"zoi3 seoi1 saam1 kit3","meaning":"士氣一再受挫而逐漸衰竭，形容力量由盛轉衰。","origin":"《左傳·莊公十年》載曹劌論戰，謂「一鼓作氣，再而衰，三而竭」，後概括為再衰三竭。","sourceBook":"《左傳·莊公十年》","tier":5,"tags":["歷史","戰爭"]},{"id":"tui-bi-san-she","word":"退避三舍","pinyin":"tuì bì sān shè","cantonese":"teoi3 bei6 saam1 se3","meaning":"主動退讓九十里，比喻主動迴避、不與人爭。","origin":"《左傳·僖公二十三年》載晉文公重耳流亡楚國，承諾日後交戰退避三舍，城濮之戰果然踐諾。","sourceBook":"《左傳·僖公二十三年》","tier":3,"tags":["歷史","人物"]},{"id":"qin-jin-zhi-hao","word":"秦晉之好","pinyin":"qín jìn zhī hǎo","cantonese":"ceon4 zeon3 zi1 hou2","meaning":"春秋時秦晉兩國世代通婚，後泛指兩姓聯姻、和睦友好。","origin":"《左傳·僖公二十三年》載秦穆公助重耳歸晉並以女妻之，秦晉世代聯姻，後稱秦晉之好。","sourceBook":"《左傳·僖公二十三年》","tier":4,"tags":["歷史","情感"]},{"id":"da-yi-mie-qin","word":"大義滅親","pinyin":"dà yì miè qīn","cantonese":"daai6 ji6 mit6 can1","meaning":"為維護正義而不顧親情，形容執法公正、不徇私。","origin":"《左傳·隱公四年》載石碏為國誅殺參與作亂的親子石厚，時人稱其大義滅親。","sourceBook":"《左傳·隱公四年》","tier":3,"tags":["歷史","品格"]},{"id":"you-bei-wu-huan","word":"有備無患","pinyin":"yǒu bèi wú huàn","cantonese":"jau5 bei6 mou4 waan6","meaning":"事先有準備就不會有禍患，強調防患於未然。","origin":"《左傳·襄公十一年》載魏絳引《書》曰「居安思危，思則有備，有備無患」。","sourceBook":"《左傳·襄公十一年》","tier":3,"tags":["做事","思維"]},{"id":"ju-an-si-wei","word":"居安思危","pinyin":"jū ān sī wēi","cantonese":"geoi1 on1 si1 ngai4","meaning":"處在安樂環境中仍想到可能的危險，形容有憂患意識。","origin":"《左傳·襄公十一年》載魏絳引《書》曰「居安思危，思則有備，有備無患」。","sourceBook":"《左傳·襄公十一年》","tier":3,"tags":["做事","思維"]},{"id":"ma-shou-shi-zhan","word":"馬首是瞻","pinyin":"mǎ shǒu shì zhān","cantonese":"maa5 sau2 si6 zim1","meaning":"看著主帥馬頭的方向行動，比喻服從指揮、追隨某人。","origin":"《左傳·襄公十四年》載荀偃下令「唯余馬首是瞻」，士卒皆隨其馬首進退。","sourceBook":"《左傳·襄公十四年》","tier":4,"tags":["歷史","做事"]},{"id":"bin-zhi-ru-gui","word":"賓至如歸","pinyin":"bīn zhì rú guī","cantonese":"ban1 zi3 jyu4 gwai1","meaning":"客人到來像回到自己家一樣，形容招待周到、使人親切。","origin":"《左傳·襄公三十一年》載子產論晉文公接待諸侯賓客，館舍修整、服務周到，故「賓至如歸」。","sourceBook":"《左傳·襄公三十一年》","tier":3,"tags":["生活","社會"]},{"id":"tan-wei-guan-zhi","word":"嘆為觀止","pinyin":"tàn wéi guān zhǐ","cantonese":"taan3 wai4 gun1 zi2","meaning":"讚嘆所見事物美好到極點，形容非常出色。","origin":"《左傳·襄公二十九年》載吳公子季札觀周樂，至《韶箾》嘆曰「觀止矣，若有他樂，吾不敢請已」。","sourceBook":"《左傳·襄公二十九年》","tier":3,"tags":["人物","情感"]},{"id":"shang-xia-qi-shou","word":"上下其手","pinyin":"shàng xià qí shǒu","cantonese":"soeng6 haa6 kei4 sau2","meaning":"玩弄手法、串通作弊，形容暗中操縱、顛倒是非。","origin":"《左傳·襄公二十六年》載伯州犁審案，以手勢上下示意囚犯身份而偏袒，後喻串通作弊。","sourceBook":"《左傳·襄公二十六年》","tier":4,"tags":["歷史","做事"]},{"id":"cong-shan-ru-liu","word":"從善如流","pinyin":"cóng shàn rú liú","cantonese":"cung4 sin6 jyu4 lau4","meaning":"聽從好的意見像水流一樣自然，形容樂於接受善言。","origin":"《左傳·成公八年》載君子曰「從善如流，宜哉」，讚欒書能聽從知莊子之諫。","sourceBook":"《左傳·成公八年》","tier":3,"tags":["品格","做事"]},{"id":"ming-lie-qian-mao","word":"名列前茅","pinyin":"míng liè qián máo","cantonese":"ming4 lit6 cin4 maau4","meaning":"名次排列在前列，形容成績優異、表現突出。","origin":"《左傳·宣公十二年》載楚軍以茅草為旌旗作前哨，稱「前茅慮無」，後借指名次在前。","sourceBook":"《左傳·宣公十二年》","tier":3,"tags":["人物","學習"]},{"id":"lang-zi-ye-xin","word":"狼子野心","pinyin":"láng zǐ yě xīn","cantonese":"long4 zi2 je5 sam1","meaning":"狼崽雖小卻有野獸之心，比喻兇暴之人野心難改。","origin":"《左傳·宣公四年》載子文謂子良「諺曰狼子野心，是乃狼也，其可畜乎」，喻本性凶殘。","sourceBook":"《左傳·宣公四年》","tier":4,"tags":["人物","動物"]},{"id":"shi-zhi-da-dong","word":"食指大動","pinyin":"shí zhǐ dà dòng","cantonese":"sik6 zi2 daai6 dung6","meaning":"食指跳動預示有美食，後形容見到美食而饞涎欲滴。","origin":"《左傳·宣公四年》載鄭靈公將食黿，子公食指動，預知有美味，後果得嘗。","sourceBook":"《左傳·宣公四年》","tier":4,"tags":["生活","飲食"]},{"id":"shen-xiao-chen-shang","word":"甚囂塵上","pinyin":"shèn xiāo chén shàng","cantonese":"sam6 hiu1 can4 soeng6","meaning":"軍中喧嘩、塵土飛揚，後比喻議論紛紛、傳聞喧騰。","origin":"《左傳·成公十六年》載晉楚鄢陵之戰，楚軍逼近晉營「甚囂且塵上矣」，形容喧鬧囂張。","sourceBook":"《左傳·成公十六年》","tier":4,"tags":["社會","說話"]},{"id":"pi-yu-ben-ming","word":"疲於奔命","pinyin":"pí yú bēn mìng","cantonese":"pei4 jyu1 ban1 ming6","meaning":"為應付命令而奔走疲累，形容事務繁多、窮於應付。","origin":"《左傳·成公七年》載楚子重、子反為吳軍所擾，一年七次奔走應命，人稱「疲於奔命」。","sourceBook":"《左傳·成公七年》","tier":4,"tags":["生活","做事"]},{"id":"wei-da-bu-diao","word":"尾大不掉","pinyin":"wěi dà bù diào","cantonese":"mei5 daai6 bat1 diu6","meaning":"尾巴太大難以擺動，比喻下屬勢力太大，難以指揮控制。","origin":"《左傳·昭公十一年》載申無宇謂「末大必折，尾大不掉」，喻部屬勢力過大難以駕馭。","sourceBook":"《左傳·昭公十一年》","tier":5,"tags":["社會","做事"]},{"id":"shu-dian-wang-zu","word":"數典忘祖","pinyin":"shǔ diǎn wàng zǔ","cantonese":"sou2 din2 mong4 zou2","meaning":"列舉典章制度卻忘了祖先，比喻忘本、不念本源。","origin":"《左傳·昭公十五年》載周景王責籍談不知祖先職官掌故，謂其「數典而忘其祖」。","sourceBook":"《左傳·昭公十五年》","tier":4,"tags":["人物","品格"]},{"id":"hu-e-bu-quan","word":"怙惡不悛","pinyin":"hù è bù quān","cantonese":"wu6 ok3 bat1 syun1","meaning":"堅持作惡、不肯悔改，形容壞事做盡仍無悔意。","origin":"《左傳·隱公六年》載「長惡不悛，從自及也」，後作怙惡不悛，指倚仗惡行而不悔改。","sourceBook":"《左傳·隱公六年》","tier":5,"tags":["品格"]},{"id":"cheng-xia-zhi-meng","word":"城下之盟","pinyin":"chéng xià zhī méng","cantonese":"sing4 haa6 zi1 mang4","meaning":"敵軍兵臨城下時被迫簽訂的屈辱盟約，比喻被迫接受不利條件。","origin":"《左傳·桓公十二年》載楚軍圍絞，絞人被迫求和，楚人「為城下之盟而還」。","sourceBook":"《左傳·桓公十二年》","tier":4,"tags":["歷史","社會"]},{"id":"zhong-zhi-cheng-cheng","word":"眾志成城","pinyin":"zhòng zhì chéng chéng","cantonese":"zung3 zi3 sing4 sing4","meaning":"眾人同心協力，力量堅如城牆，形容團結一致。","origin":"《國語·周語下》載「眾心成城，眾口鑠金」，喻眾人的意志可凝聚成堅固力量。","sourceBook":"《國語·周語下》","tier":3,"tags":["社會","做事"]},{"id":"zhong-kou-shuo-jin","word":"眾口鑠金","pinyin":"zhòng kǒu shuò jīn","cantonese":"zung3 hau2 soek3 gam1","meaning":"眾人的言論足以熔化金屬，比喻輿論力量強大，也指讒言可畏。","origin":"《國語·周語下》載「眾心成城，眾口鑠金」，說明眾口一詞的力量足以改變事實。","sourceBook":"《國語·周語下》","tier":4,"tags":["說話","社會"]},{"id":"yi-bai-tu-di","word":"一敗塗地","pinyin":"yī bài tú dì","cantonese":"jat1 baai6 tou4 dei6","meaning":"一旦失敗就不可收拾，形容慘敗到無法挽回。","origin":"《史記·高祖本紀》載劉邦論立將曰「今置將不善，壹敗塗地」，指所託非人則一敗不可收拾。","sourceBook":"《史記·高祖本紀》","tier":3,"tags":["歷史","情感"]},{"id":"yun-chou-wei-wo","word":"運籌帷幄","pinyin":"yùn chóu wéi wò","cantonese":"wan6 cau4 wai4 ak1","meaning":"在帳幕中謀劃策略，形容善於策劃、決策高明。","origin":"《史記·高祖本紀》載劉邦曰「夫運籌策帷幄之中，決勝於千里之外，吾不如子房」。","sourceBook":"《史記·高祖本紀》","tier":4,"tags":["人物","做事"]},{"id":"jue-sheng-qian-li","word":"決勝千里","pinyin":"jué shèng qiān lǐ","cantonese":"kyut3 sing3 cin1 lei5","meaning":"在千里之外決定勝負，形容謀略高超、指揮若定。","origin":"《史記·高祖本紀》載劉邦讚張良「運籌策帷幄之中，決勝於千里之外」。","sourceBook":"《史記·高祖本紀》","tier":4,"tags":["人物","做事"]},{"id":"duo-duo-yi-shan","word":"多多益善","pinyin":"duō duō yì shàn","cantonese":"do1 do1 jik1 sin6","meaning":"越多越好，形容不嫌多、數量愈多愈好。","origin":"《史記·淮陰侯列傳》載劉邦問韓信能帶多少兵，信曰「臣多多而益善耳」。","sourceBook":"《史記·淮陰侯列傳》","tier":3,"tags":["人物","做事"]},{"id":"bei-shui-yi-zhan","word":"背水一戰","pinyin":"bèi shuǐ yī zhàn","cantonese":"bui3 seoi2 jat1 zin3","meaning":"背靠河水列陣，後有追兵、無路可退，比喻決一死戰。","origin":"《史記·淮陰侯列傳》載韓信背水列陣，趙軍輕敵來攻，漢軍無退路奮勇作戰而大勝。","sourceBook":"《史記·淮陰侯列傳》","tier":3,"tags":["歷史","勇氣"]},{"id":"yi-fan-zhi-en","word":"一飯之恩","pinyin":"yī fàn zhī ēn","cantonese":"jat1 faan6 zi1 jan1","meaning":"一頓飯的恩惠，形容微小的恩情也應銘記報答。","origin":"《史記·淮陰侯列傳》載韓信貧困時受漂母一飯之恩，封侯後以千金報答。","sourceBook":"《史記·淮陰侯列傳》","tier":4,"tags":["情感","品格"]},{"id":"kua-xia-zhi-ru","word":"胯下之辱","pinyin":"kuà xià zhī rǔ","cantonese":"kwaa3 haa6 zi1 juk6","meaning":"從別人胯下爬過的恥辱，形容能忍辱負重以成大業。","origin":"《史記·淮陰侯列傳》載韓信少時受淮陰少年胯下之辱，忍辱而不與計較，後終成大將。","sourceBook":"《史記·淮陰侯列傳》","tier":4,"tags":["歷史","人物"]},{"id":"wei-wei-jiu-zhao","word":"圍魏救趙","pinyin":"wéi wèi jiù zhào","cantonese":"wai4 ngai6 gau3 ziu6","meaning":"圍攻魏國以解救趙國，比喻避實擊虛、迂迴制勝。","origin":"《史記·孫子吳起列傳》載孫臏建議田忌引兵攻魏都大梁，迫使魏軍回救，於桂陵大敗魏軍。","sourceBook":"《史記·孫子吳起列傳》","tier":3,"tags":["歷史","做事"]},{"id":"san-ling-wu-shen","word":"三令五申","pinyin":"sān lìng wǔ shēn","cantonese":"saam1 ling6 ng5 san1","meaning":"再三命令告誡，形容反覆強調、清楚交代。","origin":"《史記·孫子吳起列傳》載孫武以宮女練兵，三令五申而宮女仍嬉笑，遂斬隊長以嚴軍紀。","sourceBook":"《史記·孫子吳起列傳》","tier":3,"tags":["做事","說話"]},{"id":"tou-bi-cong-rong","word":"投筆從戎","pinyin":"tóu bǐ cóng róng","cantonese":"tau4 bat1 cung4 jung4","meaning":"丟下筆去從軍，形容棄文從武、立志報國。","origin":"《後漢書·班超傳》載班超家貧為官佣書，投筆嘆曰「大丈夫當效傅介子、張騫立功異域」。","sourceBook":"《後漢書·班超傳》","tier":3,"tags":["人物","歷史"]},{"id":"lao-dang-yi-zhuang","word":"老當益壯","pinyin":"lǎo dāng yì zhuàng","cantonese":"lou5 dong1 jik1 zong3","meaning":"年紀大了志氣更壯，形容人老而志不衰。","origin":"《後漢書·馬援傳》載馬援曰「丈夫為志，窮當益堅，老當益壯」，自勉志向不因年老而減。","sourceBook":"《後漢書·馬援傳》","tier":3,"tags":["人物","堅持"]},{"id":"ma-ge-guo-shi","word":"馬革裹屍","pinyin":"mǎ gé guǒ shī","cantonese":"maa5 gaak3 gwo2 si1","meaning":"用馬皮把屍體包起來，形容將士英勇作戰、戰死沙場的決心。","origin":"《後漢書·馬援傳》載馬援曰「男兒要當死於邊野，以馬革裹屍還葬耳」。","sourceBook":"《後漢書·馬援傳》","tier":4,"tags":["人物","勇氣"]},{"id":"wang-chen-mo-ji","word":"望塵莫及","pinyin":"wàng chén mò jí","cantonese":"mong6 can4 mok6 kap6","meaning":"望見前面揚起的塵土卻追不上，比喻遠遠落後、無法趕上。","origin":"《後漢書·趙咨傳》載曹暠欲送趙咨，趙咨不顧而去，曹暠望其車塵而追趕不及。","sourceBook":"《後漢書·趙咨傳》","tier":4,"tags":["人物","做事"]},{"id":"jin-shi-wei-kai","word":"金石為開","pinyin":"jīn shí wéi kāi","cantonese":"gam1 sek6 wai6 hoi1","meaning":"金石那樣堅硬的東西也被打開，形容真誠或毅力足以感動一切。","origin":"《後漢書·廣陵思王荊傳》載「精誠所加，金石為開」，喻至誠可感動萬物。","sourceBook":"《後漢書·廣陵思王荊傳》","tier":4,"tags":["堅持","情感"]},{"id":"pin-jian-zhi-jiao","word":"貧賤之交","pinyin":"pín jiàn zhī jiāo","cantonese":"pan4 zin6 zi1 gaau1","meaning":"貧困微賤時結交的朋友，形容患難之交不可忘。","origin":"《後漢書·宋弘傳》載宋弘曰「貧賤之交不可忘，糟糠之妻不下堂」，拒絕光武帝說媒。","sourceBook":"《後漢書·宋弘傳》","tier":4,"tags":["情感","社會"]},{"id":"zao-kang-zhi-qi","word":"糟糠之妻","pinyin":"zāo kāng zhī qī","cantonese":"zou1 hong1 zi1 cai1","meaning":"共過患難、一起吃糟糠的妻子，形容不因富貴而拋棄的元配。","origin":"《後漢書·宋弘傳》載宋弘曰「貧賤之交不可忘，糟糠之妻不下堂」，表明不棄糟糠。","sourceBook":"《後漢書·宋弘傳》","tier":4,"tags":["情感","家庭"]},{"id":"jiu-niu-yi-mao","word":"九牛一毛","pinyin":"jiǔ niú yī máo","cantonese":"gau2 ngau4 jat1 mou4","meaning":"九頭牛身上的一根毛，比喻極大數量中的極小部分。","origin":"司馬遷《報任少卿書》載「若九牛亡一毛，與螻蟻何以異」，自謙所受屈辱微不足道。","sourceBook":"《漢書·司馬遷傳》","tier":3,"tags":["人物","思維"]},{"id":"bu-xue-wu-shu","word":"不學無術","pinyin":"bù xué wú shù","cantonese":"bat1 hok6 mou4 seot6","meaning":"沒有學問、沒有本領，形容人不學無知。","origin":"《漢書·霍光傳》載班固評霍光「然光不學亡術，闇於大理」，指其缺乏學識與治術。","sourceBook":"《漢書·霍光傳》","tier":2,"tags":["學習","人物"]},{"id":"qu-tu-xi-xin","word":"曲突徙薪","pinyin":"qū tū xǐ xīn","cantonese":"kuk1 dat6 saai2 san1","meaning":"把煙囪改彎、把柴草移開，比喻事先採取措施防止災禍。","origin":"《漢書·霍光傳》載客人勸主人改煙囪、移柴草以防火，主人不聽終失火，後喻防患未然。","sourceBook":"《漢書·霍光傳》","tier":5,"tags":["寓言","做事"]},{"id":"mang-ci-zai-bei","word":"芒刺在背","pinyin":"máng cì zài bèi","cantonese":"mong4 ci3 zoi6 bui3","meaning":"像有芒刺扎在背上，形容坐立不安、內心惶恐。","origin":"《漢書·霍光傳》載漢宣帝謁高廟，霍光驂乘，宣帝「若有芒刺在背」，惶恐不安。","sourceBook":"《漢書·霍光傳》","tier":4,"tags":["情感","生活"]},{"id":"yi-qiu-zhi-he","word":"一丘之貉","pinyin":"yī qiū zhī hé","cantonese":"jat1 jau1 zi1 hok6","meaning":"同一個山丘上的貉，比喻彼此同類、沒有分別，多含貶義。","origin":"《漢書·楊惲傳》載楊惲曰「古與今如一丘之貉」，譏讒諂之人古今皆同。","sourceBook":"《漢書·楊惲傳》","tier":4,"tags":["動物","社會"]},{"id":"lin-yuan-xian-yu","word":"臨淵羨魚","pinyin":"lín yuān xiàn yú","cantonese":"lam4 jyun1 sin6 jyu4","meaning":"站在河邊羨慕魚兒，比喻空想而無實際行動。","origin":"《漢書·董仲舒傳》載「臨淵羨魚，不如退而結網」，勉人與其空想不如實幹。","sourceBook":"《漢書·董仲舒傳》","tier":3,"tags":["思維","做事"]},{"id":"huo-shu-yin-hua","word":"火樹銀花","pinyin":"huǒ shù yín huā","cantonese":"fo2 syu6 ngan4 faa1","meaning":"燈火如樹、銀光似花，形容燈會煙火絢麗燦爛的夜景。","origin":"唐·蘇味道《正月十五夜》「火樹銀花合，星橋鐵鎖開」，描寫元宵燈火輝煌的景象。","sourceBook":"《全唐詩·正月十五夜》","tier":3,"tags":["自然","生活"]},{"id":"yi-shi-tong-ren","word":"一視同仁","pinyin":"yī shì tóng rén","cantonese":"jat1 si6 tung4 jan4","meaning":"以同樣的態度看待所有人，形容公正平等、沒有偏私。","origin":"唐·韓愈《原人》載「是故聖人一視而同仁，篤近而舉遠」，指聖人平等對待萬民。","sourceBook":"《昌黎先生集·原人》","tier":3,"tags":["社會","品格"]},{"id":"yi-qu-tong-gong","word":"異曲同工","pinyin":"yì qǔ tóng gōng","cantonese":"ji6 kuk1 tung4 gung1","meaning":"曲調不同卻同樣精妙，比喻做法不同而效果同樣好。","origin":"唐·韓愈《進學解》載「子雲相如，同工異曲」，指揚雄與司馬相如辭賦各擅勝場。","sourceBook":"《昌黎先生集·進學解》","tier":3,"tags":["藝術","寫作"]},{"id":"ye-jing-yu-qin","word":"業精於勤","pinyin":"yè jīng yú qín","cantonese":"jip6 zing1 jyu1 kan4","meaning":"學業因勤奮而精進，形容勤學是成功的關鍵。","origin":"唐·韓愈《進學解》載「業精於勤，荒於嬉；行成於思，毀於隨」。","sourceBook":"《昌黎先生集·進學解》","tier":3,"tags":["學習"]},{"id":"xing-cheng-yu-si","word":"行成於思","pinyin":"xíng chéng yú sī","cantonese":"hang4 sing4 jyu1 si1","meaning":"德行與事業因深思而成功，強調思考的重要性。","origin":"唐·韓愈《進學解》載「業精於勤，荒於嬉；行成於思，毀於隨」。","sourceBook":"《昌黎先生集·進學解》","tier":4,"tags":["做事","思維"]},{"id":"fen-gao-ji-gui","word":"焚膏繼晷","pinyin":"fén gāo jì guǐ","cantonese":"fan4 gou1 gai3 gwai2","meaning":"點燃油燈接著日光讀書，形容夜以繼日、勤奮苦學。","origin":"唐·韓愈《進學解》載「焚膏油以繼晷，恆兀兀以窮年」，形容日夜苦讀。","sourceBook":"《昌黎先生集·進學解》","tier":4,"tags":["學習","堅持"]},{"id":"dong-zhe-de-jiu","word":"動輒得咎","pinyin":"dòng zhé dé jiù","cantonese":"dung6 zip3 dak1 gau3","meaning":"一有行動就招來責備，形容動彈不得、處處受責。","origin":"唐·韓愈《進學解》載「跋前躓後，動輒得咎」，形容進退皆受責難。","sourceBook":"《昌黎先生集·進學解》","tier":5,"tags":["生活","情感"]},{"id":"ba-qian-zhi-hou","word":"跋前躓後","pinyin":"bá qián zhì hòu","cantonese":"bat6 cin4 zi3 hau6","meaning":"前進就踩到下巴、後退就被尾巴絆倒，比喻進退兩難。","origin":"唐·韓愈《進學解》載「跋前躓後，動輒得咎」，本形容狼進退不便，後喻處境困難。","sourceBook":"《昌黎先生集·進學解》","tier":5,"tags":["生活","做事"]},{"id":"zuo-jing-guan-tian","word":"坐井觀天","pinyin":"zuò jǐng guān tiān","cantonese":"co5 zeng2 gun1 tin1","meaning":"坐在井裡看天，比喻眼界狹窄、見識有限。","origin":"唐·韓愈《原道》載「坐井而觀天，曰天小者，非天小也」，喻所見受限而妄下判斷。","sourceBook":"《昌黎先生集·原道》","tier":2,"tags":["寓言","思維"]},{"id":"shen-ju-jian-chu","word":"深居簡出","pinyin":"shēn jū jiǎn chū","cantonese":"sam1 geoi1 gaan2 ceot1","meaning":"住在深處、很少外出，形容生活低調、不常露面。","origin":"唐·韓愈《送浮屠文暢師序》載「夫獸深居而簡出，懼物之為己害也」，後喻人少外出。","sourceBook":"《昌黎先生集·送浮屠文暢師序》","tier":4,"tags":["生活","社會"]},{"id":"tou-xian-zhi-san","word":"投閒置散","pinyin":"tóu xián zhì sǎn","cantonese":"tau4 haan4 zi3 saan2","meaning":"被安置在閒散無用的職位，形容不受重用。","origin":"唐·韓愈《進學解》載「投閒置散，乃分之宜」，表面自嘲，實諷不被重用。","sourceBook":"《昌黎先生集·進學解》","tier":5,"tags":["生活","人物"]},{"id":"ti-yao-gou-xuan","word":"提要鉤玄","pinyin":"tí yào gōu xuán","cantonese":"tai4 jiu3 ngau1 jyun4","meaning":"提取要點、探索深意，形容讀書善於抓住綱要與精義。","origin":"唐·韓愈《進學解》載「記事者必提其要，纂言者必鉤其玄」，指治學方法。","sourceBook":"《昌黎先生集·進學解》","tier":5,"tags":["學習","寫作"]},{"id":"han-ying-ju-hua","word":"含英咀華","pinyin":"hán yīng jǔ huá","cantonese":"ham4 jing1 zeoi2 waa4","meaning":"口中含著花朵細細咀嚼，比喻細心品味詩文精華。","origin":"唐·韓愈《進學解》載「沈浸醲郁，含英咀華」，形容讀書深入體味文章菁華。","sourceBook":"《昌黎先生集·進學解》","tier":5,"tags":["學習","藝術"]},{"id":"tian-chang-di-jiu","word":"天長地久","pinyin":"tiān cháng dì jiǔ","cantonese":"tin1 coeng4 dei6 gau2","meaning":"像天地一樣長久存在，形容時間悠久、情誼永恆。","origin":"《老子·第七章》載「天長地久。天地所以能長且久者，以其不自生，故能長生」，後用以祝頌長久。","sourceBook":"《老子·第七章》","tier":1,"tags":["情感","自然"]},{"id":"shang-shan-ruo-shui","word":"上善若水","pinyin":"shàng shàn ruò shuǐ","cantonese":"soeng6 sin6 joek6 seoi2","meaning":"最高的善德像水一樣，形容為人謙下、利萬物而不爭。","origin":"《老子·第八章》載「上善若水。水善利萬物而不爭，處眾人之所惡，故幾於道」。","sourceBook":"《老子·第八章》","tier":3,"tags":["品格","自然"]},{"id":"jin-yu-man-tang","word":"金玉滿堂","pinyin":"jīn yù mǎn táng","cantonese":"gam1 juk6 mun5 tong4","meaning":"黃金美玉堆滿廳堂，形容財富極多，也比喻學識豐富。","origin":"《老子·第九章》載「金玉滿堂，莫之能守；富貴而驕，自遺其咎」，戒人勿恃財而驕。","sourceBook":"《老子·第九章》","tier":1,"tags":["財富","生活"]},{"id":"gong-cheng-shen-tui","word":"功成身退","pinyin":"gōng chéng shēn tuì","cantonese":"gung1 sing4 san1 teoi3","meaning":"功業成就後就抽身退隱，形容不戀權位、知所進退。","origin":"《老子·第九章》載「功遂身退，天之道也」，指功成之後退讓才合於天道。","sourceBook":"《老子·第九章》","tier":3,"tags":["人物","做事"]},{"id":"da-qi-wan-cheng","word":"大器晚成","pinyin":"dà qì wǎn chéng","cantonese":"daai6 hei3 maan5 sing4","meaning":"大的器物要很久才完成，比喻有大才的人成就較晚。","origin":"《老子·第四十一章》載「大方無隅，大器晚成，大音希聲，大象無形」。","sourceBook":"《老子·第四十一章》","tier":3,"tags":["人物","學習"]},{"id":"xiao-guo-gua-min","word":"小國寡民","pinyin":"xiǎo guó guǎ mín","cantonese":"siu2 gwok3 gwaa2 man4","meaning":"國家小、人民少，形容簡樸自足、互不往來的社會理想。","origin":"《老子·第八十章》載「小國寡民，使有什伯之器而不用」，描繪安土樂俗的理想社會。","sourceBook":"《老子·第八十章》","tier":4,"tags":["社會"]},{"id":"zhi-zu-chang-le","word":"知足常樂","pinyin":"zhī zú cháng lè","cantonese":"zi1 zuk1 soeng4 lok6","meaning":"懂得滿足就常常快樂，形容不貪求、心境平和。","origin":"《老子·第四十六章》載「禍莫大於不知足……故知足之足，常足矣」，後概括為知足常樂。","sourceBook":"《老子·第四十六章》","tier":2,"tags":["情感","生活"]},{"id":"da-qiao-ruo-zhuo","word":"大巧若拙","pinyin":"dà qiǎo ruò zhuō","cantonese":"daai6 haau2 joek6 zyut3","meaning":"真正靈巧的人看似笨拙，形容有真本領而不炫耀。","origin":"《老子·第四十五章》載「大直若屈，大巧若拙，大辯若訥」，指真有智慧者外表質樸。","sourceBook":"《老子·第四十五章》","tier":4,"tags":["思維","品格"]},{"id":"zi-qiang-bu-xi","word":"自強不息","pinyin":"zì qiáng bù xī","cantonese":"zi6 koeng4 bat1 sik1","meaning":"自己努力向上、永不停息，形容不斷進取。","origin":"《易經·乾卦》載「天行健，君子以自強不息」，勉人效法天道努力不懈。","sourceBook":"《易經·乾卦》","tier":1,"tags":["堅持","學習"]},{"id":"hou-de-zai-wu","word":"厚德載物","pinyin":"hòu dé zài wù","cantonese":"hau5 dak1 zoi3 mat6","meaning":"以深厚的德行承載萬物，形容胸襟寬厚、能容人容事。","origin":"《易經·坤卦》載「地勢坤，君子以厚德載物」，以大地厚實喻君子德行。","sourceBook":"《易經·坤卦》","tier":4,"tags":["品格"]},{"id":"zhao-qian-xi-ti","word":"朝乾夕惕","pinyin":"zhāo qián xī tì","cantonese":"ziu1 gon1 zik6 tik1","meaning":"從早到晚勤勉謹慎，形容終日兢兢業業、不敢懈怠。","origin":"《易經·乾卦》載「君子終日乾乾，夕惕若厲，無咎」，後概括為朝乾夕惕。","sourceBook":"《易經·乾卦》","tier":5,"tags":["做事","品格"]},{"id":"pi-ji-tai-lai","word":"否極泰來","pinyin":"pǐ jí tài lái","cantonese":"pei2 gik6 taai3 loi4","meaning":"壞運到了盡頭，好運便會到來，形容情況由壞轉好。","origin":"《易經》以「否」「泰」二卦象徵閉塞與通達，後人合為否極泰來，喻逆境終會轉順。","sourceBook":"《易經·否卦》","tier":4,"tags":["人生","思維"]},{"id":"qun-long-wu-shou","word":"群龍無首","pinyin":"qún lóng wú shǒu","cantonese":"kwan4 lung4 mou4 sau2","meaning":"一群龍沒有首領，比喻眾人缺乏領導、秩序混亂。","origin":"《易經·乾卦》載「用九，見群龍無首，吉」，原為吉象，後多用以形容無人領導。","sourceBook":"《易經·乾卦》","tier":4,"tags":["社會","動物"]},{"id":"hu-shi-dan-dan","word":"虎視眈眈","pinyin":"hǔ shì dān dān","cantonese":"fu2 si6 daam1 daam1","meaning":"像老虎一樣凶猛地注視，形容心懷不軌、伺機而動。","origin":"《易經·頤卦》載「虎視眈眈，其欲逐逐，無咎」，形容目光貪婪專注。","sourceBook":"《易經·頤卦》","tier":3,"tags":["動物","情感"]},{"id":"tu-ru-qi-lai","word":"突如其來","pinyin":"tū rú qí lái","cantonese":"dat6 jyu4 kei4 loi4","meaning":"事情突然發生，形容出乎意料、使人措手不及。","origin":"《易經·離卦》載「突如其來如，焚如，死如，棄如」，原形容突然而至的災禍。","sourceBook":"《易經·離卦》","tier":3,"tags":["做事","情感"]},{"id":"ge-de-qi-suo","word":"各得其所","pinyin":"gè dé qí suǒ","cantonese":"gok3 dak1 kei4 so2","meaning":"每個人都得到合適的安置，形容安排得當、各安其位。","origin":"《易經·繫辭下》載「日中為市，致天下之民，聚天下之貨，交易而退，各得其所」。","sourceBook":"《易經·繫辭下》","tier":3,"tags":["社會","生活"]},{"id":"yun-xing-yu-shi","word":"雲行雨施","pinyin":"yún xíng yǔ shī","cantonese":"wan4 hang4 jyu5 si1","meaning":"雲氣流動、雨澤普降，比喻德政普及萬民。","origin":"《易經·乾卦》載「雲行雨施，品物流形」，形容天地施化、萬物生成。","sourceBook":"《易經·乾卦》","tier":5,"tags":["自然","社會"]},{"id":"zhi-ji-zhi-bi","word":"知己知彼","pinyin":"zhī jǐ zhī bǐ","cantonese":"zi1 gei2 zi1 bei2","meaning":"既了解自己又了解對方，形容謀事周詳、有把握。","origin":"《孫子兵法·謀攻》載「知彼知己者，百戰不殆；不知彼而知己，一勝一負」。","sourceBook":"《孫子兵法·謀攻》","tier":2,"tags":["做事","思維"]},{"id":"bai-zhan-bai-sheng","word":"百戰百勝","pinyin":"bǎi zhàn bǎi shèng","cantonese":"baak3 zin3 baak3 sing3","meaning":"每戰必勝，從未打敗仗，形容戰績輝煌、所向無敵。","origin":"《孫子兵法·謀攻》載「是故百戰百勝，非善之善者也；不戰而屈人之兵，善之善者也」。","sourceBook":"《孫子兵法·謀攻》","tier":2,"tags":["歷史","戰爭"]},{"id":"chu-qi-bu-yi","word":"出其不意","pinyin":"chū qí bù yì","cantonese":"ceot1 kei4 bat1 ji3","meaning":"趁對方沒有料到时採取行動，形容用計巧妙的突襲。","origin":"《孫子兵法·計篇》載「攻其無備，出其不意，此兵家之勝，不可先傳也」。","sourceBook":"《孫子兵法·計篇》","tier":3,"tags":["做事","思維"]},{"id":"chu-qi-zhi-sheng","word":"出奇制勝","pinyin":"chū qí zhì shèng","cantonese":"ceot1 kei4 zai3 sing3","meaning":"用奇兵或奇計取勝，形容以特殊手段贏得勝利。","origin":"《孫子兵法·勢篇》載「凡戰者，以正合，以奇勝」，後演為成語出奇制勝。","sourceBook":"《孫子兵法·勢篇》","tier":3,"tags":["做事","思維"]},{"id":"gong-qi-wu-bei","word":"攻其無備","pinyin":"gōng qí wú bèi","cantonese":"gung1 kei4 mou4 bei6","meaning":"趁對方沒有防備時進攻，形容善於把握時機。","origin":"《孫子兵法·計篇》載「攻其無備，出其不意」，指攻擊敵方鬆懈之處。","sourceBook":"《孫子兵法·計篇》","tier":4,"tags":["做事","戰爭"]},{"id":"bing-bu-yan-zha","word":"兵不厭詐","pinyin":"bīng bù yàn zhà","cantonese":"bing1 bat1 jim3 zaa3","meaning":"用兵不排斥詐術，形容為求取勝可用機巧策略。","origin":"《韓非子·難一》載舅犯曰「戰陣之間，不厭詐偽」，說明用兵講究權變。","sourceBook":"《韓非子·難一》","tier":4,"tags":["做事","說話"]},{"id":"yi-yi-gu-xing","word":"一意孤行","pinyin":"yī yì gū xíng","cantonese":"jat1 ji3 gu1 hang4","meaning":"固執地按自己的意思行事，不聽勸告。","origin":"《史記·酷吏列傳》載趙禹「禹為人廉倨……孤立行一意而已」，後作一意孤行。","sourceBook":"《史記·酷吏列傳》","tier":3,"tags":["人物","做事"]},{"id":"zhan-zhan-zi-xi","word":"沾沾自喜","pinyin":"zhān zhān zì xǐ","cantonese":"zim1 zim1 zi6 hei2","meaning":"自以為不錯而得意洋洋，形容淺薄自滿、見識不廣。","origin":"《史記·魏其武安侯列傳》載竇嬰「魏其沾沾自喜耳，多易」，形容自得之貌。","sourceBook":"《史記·魏其武安侯列傳》","tier":4,"tags":["情感","人物"]},{"id":"shou-shu-liang-duan","word":"首鼠兩端","pinyin":"shǒu shǔ liǎng duān","cantonese":"sau2 syu2 loeng5 dyun1","meaning":"像老鼠出洞時左右張望，比喻猶豫不決、兩邊討好。","origin":"《史記·魏其武安侯列傳》載田蚡「首鼠兩端」，形容遲疑觀望、不表立場。","sourceBook":"《史記·魏其武安侯列傳》","tier":5,"tags":["人物","做事"]},{"id":"pang-ruo-wu-ren","word":"旁若無人","pinyin":"páng ruò wú rén","cantonese":"pong4 joek6 mou4 jan4","meaning":"身旁好像沒有人一樣，形容態度自然，也形容狂妄自大。","origin":"《史記·刺客列傳》載荊軻與高漸離飲於市中，「已而相泣，旁若無人」。","sourceBook":"《史記·刺客列傳》","tier":3,"tags":["人物","情感"]},{"id":"xiang-ti-bing-lun","word":"相提並論","pinyin":"xiāng tí bìng lùn","cantonese":"soeng1 tai4 bing6 leon6","meaning":"把不同的人或事放在一起談論或看待。","origin":"《史記·魏其武安侯列傳》載「相提而論，是自明揚主上之過」，後作相提並論。","sourceBook":"《史記·魏其武安侯列傳》","tier":3,"tags":["說話","思維"]},{"id":"da-cai-xiao-yong","word":"大材小用","pinyin":"dà cái xiǎo yòng","cantonese":"daai6 coi4 siu2 jung6","meaning":"把大材料用在小地方，比喻人才被埋沒、屈居下位。","origin":"宋·陸游《送辛幼安殿撰造朝》載「大材小用古所嘆，管仲蕭何實流亞」，惜辛棄疾未盡其才。","sourceBook":"《劍南詩稿·送辛幼安殿撰造朝》","tier":3,"tags":["人物","做事"]},{"id":"bie-kai-sheng-mian","word":"別開生面","pinyin":"bié kāi shēng miàn","cantonese":"bit6 hoi1 sang1 min6","meaning":"另創新的風格或局面，形容不落俗套、有新意。","origin":"唐·杜甫《丹青引》載「凌煙功臣少顏色，將軍下筆開生面」，讚曹霸重畫凌煙閣功臣。","sourceBook":"《杜工部集·丹青引》","tier":3,"tags":["藝術","寫作"]},{"id":"fu-zhi-yi-ju","word":"付之一炬","pinyin":"fù zhī yī jù","cantonese":"fu6 zi1 jat1 geoi6","meaning":"放一把火全部燒光，形容把東西徹底燒毀。","origin":"唐·杜牧《阿房宮賦》載「楚人一炬，可憐焦土」，寫項羽焚燒阿房宮，後作付之一炬。","sourceBook":"《樊川文集·阿房宮賦》","tier":4,"tags":["做事","歷史"]},{"id":"bu-ping-ze-ming","word":"不平則鳴","pinyin":"bù píng zé míng","cantonese":"bat1 ping4 zak1 ming4","meaning":"遇到不公平的事就要發出聲音，形容敢於申訴。","origin":"唐·韓愈《送孟東野序》載「大凡物不得其平則鳴」，指事物失衡便會發出聲響，後喻人受屈而鳴。","sourceBook":"《昌黎先生集·送孟東野序》","tier":3,"tags":["說話","情感"]},{"id":"da-fang-jue-ci","word":"大放厥詞","pinyin":"dà fàng jué cí","cantonese":"daai6 fong3 kyut3 ci4","meaning":"原指極力鋪陳辭藻，後多指大發議論，含貶義。","origin":"唐·韓愈《祭柳子厚文》載「玉佩瓊琚，大放厥詞」，原讚柳宗元文辭華美。","sourceBook":"《昌黎先生集·祭柳子厚文》","tier":4,"tags":["說話","寫作"]},{"id":"xiu-wai-hui-zhong","word":"秀外慧中","pinyin":"xiù wài huì zhōng","cantonese":"sau3 ngoi6 wai6 zung1","meaning":"外表秀美、內心聰慧，形容女子才貌雙全、表裡俱佳。","origin":"唐·韓愈《送李愿歸盤谷序》載「曲眉豐頰，清聲而便體，秀外而惠中」，後作秀外慧中。","sourceBook":"《昌黎先生集·送李愿歸盤谷序》","tier":4,"tags":["人物","品格"]},{"id":"ying-ying-gou-gou","word":"蠅營狗苟","pinyin":"yíng yíng gǒu gǒu","cantonese":"jing4 jing4 gau2 gau2","meaning":"像蒼蠅般鑽營、像狗般苟且，比喻卑劣無恥、只圖私利。","origin":"唐·韓愈《送窮文》載「蠅營狗苟，驅去復還」，形容為利鑽營、不顧廉恥。","sourceBook":"《昌黎先生集·送窮文》","tier":5,"tags":["動物","品格"]},{"id":"chui-tou-sang-qi","word":"垂頭喪氣","pinyin":"chuí tóu sàng qì","cantonese":"seoi4 tau4 song3 hei3","meaning":"低垂著頭、失去銳氣，形容沮喪失意的樣子。","origin":"唐·韓愈《送窮文》載「主人於是垂頭喪氣，上手稱謝」，形容頹喪洩氣。","sourceBook":"《昌黎先生集·送窮文》","tier":2,"tags":["情感"]},{"id":"lao-bu-ke-po","word":"牢不可破","pinyin":"láo bù kě pò","cantonese":"lou4 bat1 ho2 po3","meaning":"堅固得無法摧毀，形容關係或觀念極其牢固。","origin":"唐·韓愈《平淮西碑》載「大官臆決唱聲，萬口和附，并為一談，牢不可破」，指成見牢固。","sourceBook":"《昌黎先生集·平淮西碑》","tier":4,"tags":["做事","社會"]},{"id":"cheng-men-li-xue","word":"程門立雪","pinyin":"chéng mén lì xuě","cantonese":"cing4 mun4 laap6 syut3","meaning":"在程頤門外冒雪站立等候，形容尊師重道、求學誠懇。","origin":"《宋史·楊時傳》載楊時與游酢拜見程頤，頤瞑目而坐，二人侍立不去，門外雪深一尺。","sourceBook":"《宋史·楊時傳》","tier":3,"tags":["學習","人物"]},{"id":"zao-bi-tou-guang","word":"鑿壁偷光","pinyin":"záo bì tōu guāng","cantonese":"zok6 bik1 tau1 gwong1","meaning":"鑿穿牆壁借鄰家燈光讀書，形容家貧仍刻苦學習。","origin":"《西京雜記·卷二》載匡衡家貧無燭，鑿壁引鄰舍之光讀書，終成大儒。","sourceBook":"《西京雜記·卷二》","tier":2,"tags":["學習","坚持"]},{"id":"xuan-liang-ci-gu","word":"懸梁刺股","pinyin":"xuán liáng cì gǔ","cantonese":"jyun4 loeng4 ci3 gu2","meaning":"把頭髮懸在樑上、用錐刺大腿提神，形容讀書刻苦。","origin":"《戰國策·秦策一》載蘇秦讀書欲睡，以錐刺股；《太平御覽》載孫敬懸梁苦讀，後合成語。","sourceBook":"《戰國策·秦策一》","tier":3,"tags":["學習","堅持"]},{"id":"ou-xin-li-xue","word":"嘔心瀝血","pinyin":"ǒu xīn lì xuè","cantonese":"au2 sam1 lik6 hyut3","meaning":"吐出心血，形容費盡心思、極度勞累地創作或工作。","origin":"唐·李商隱《李長吉小傳》載李賀作詩「是兒要當嘔出心乃已爾」，後與瀝血合為成語。","sourceBook":"《李義山文集·李長吉小傳》","tier":3,"tags":["寫作","堅持"]},{"id":"ji-shao-cheng-duo","word":"積少成多","pinyin":"jī shǎo chéng duō","cantonese":"zik1 siu2 sing4 do1","meaning":"一點一滴累積，就能由少變多，形容日積月累之效。","origin":"《漢書·董仲舒傳》載「眾少成多，積小致鉅」，說明積累小量可成大數。","sourceBook":"《漢書·董仲舒傳》","tier":1,"tags":["做事","學習"]},{"id":"qian-jun-yi-fa","word":"千鈞一髮","pinyin":"qiān jūn yī fà","cantonese":"cin1 gwan1 jat1 faat3","meaning":"千鈞重量繫於一根頭髮，比喻情況萬分危急。","origin":"《漢書·枚乘傳》載「夫以一縷之任，係千鈞之重」，後演為千鈞一髮，喻極度危險。","sourceBook":"《漢書·枚乘傳》","tier":2,"tags":["情感","做事"]},{"id":"zhong-yong-zhi-dao","word":"中庸之道","pinyin":"zhōng yōng zhī dào","cantonese":"zung1 jung4 zi1 dou6","meaning":"不偏不倚、恰到好處的處世原則，形容行事守中道。","origin":"《論語·雍也》載孔子曰「中庸之為德也，其至矣乎！民鮮久矣」，指中庸是最高的德行。","sourceBook":"《論語·雍也》","tier":3,"tags":["思維","品格"]},{"id":"guo-you-bu-ji","word":"過猶不及","pinyin":"guò yóu bù jí","cantonese":"gwo3 jau4 bat1 kap6","meaning":"做得過頭與做得不夠一樣不好，形容做事要恰到好處。","origin":"《論語·先進》載子貢問師與商孰賢，孔子曰「過猶不及」，指過與不及皆非中道。","sourceBook":"《論語·先進》","tier":3,"tags":["思維","做事"]},{"id":"he-er-bu-tong","word":"和而不同","pinyin":"hé ér bù tóng","cantonese":"wo4 ji4 bat1 tung4","meaning":"與人和睦相處但不盲目附和，形容有原則又能包容。","origin":"《論語·子路》載孔子曰「君子和而不同，小人同而不和」。","sourceBook":"《論語·子路》","tier":3,"tags":["社會","品格"]},{"id":"qun-er-bu-dang","word":"群而不黨","pinyin":"qún ér bù dǎng","cantonese":"kwan4 ji4 bat1 dong2","meaning":"與眾人合群但不結黨營私，形容正直而有原則。","origin":"《論語·衛靈公》載孔子曰「君子矜而不爭，群而不黨」，指君子合群而不偏私。","sourceBook":"《論語·衛靈公》","tier":5,"tags":["社會","品格"]},{"id":"jian-li-si-yi","word":"見利思義","pinyin":"jiàn lì sī yì","cantonese":"gin3 lei6 si1 ji6","meaning":"見到利益先想到道義，形容取財有道、不貪不義之財。","origin":"《論語·憲問》載「見利思義，見危授命，久要不忘平生之言，亦可以為成人矣」。","sourceBook":"《論語·憲問》","tier":3,"tags":["品格"]},{"id":"jian-wei-shou-ming","word":"見危授命","pinyin":"jiàn wēi shòu mìng","cantonese":"gin3 ngai4 sau6 ming6","meaning":"遇到危難時肯付出生命，形容見義勇為、忠貞不屈。","origin":"《論語·憲問》載「見利思義，見危授命」，指危難關頭能捨身赴義。","sourceBook":"《論語·憲問》","tier":4,"tags":["品格"]},{"id":"yi-zhi-bao-yuan","word":"以直報怨","pinyin":"yǐ zhí bào yuàn","cantonese":"ji5 zik6 bou3 jyun3","meaning":"用正直公正的態度回應怨恨，形容不偏私、不記仇。","origin":"《論語·憲問》載或問以德報怨，孔子曰「以直報怨，以德報德」。","sourceBook":"《論語·憲問》","tier":4,"tags":["品格","做事"]},{"id":"bu-nian-jiu-e","word":"不念舊惡","pinyin":"bù niàn jiù è","cantonese":"bat1 nim6 gau6 ok3","meaning":"不記掛別人過去的過錯，形容寬宏大量。","origin":"《論語·公冶長》載「伯夷、叔齊不念舊惡，怨是用希」，讚二人寬厚不記仇。","sourceBook":"《論語·公冶長》","tier":4,"tags":["品格","情感"]},{"id":"yin-e-yang-shan","word":"隱惡揚善","pinyin":"yǐn è yáng shàn","cantonese":"jan2 ok3 joeng4 sin6","meaning":"隱藏別人的過惡、表揚別人的善行，形容待人寬厚。","origin":"《禮記·中庸》載「舜好問而好察邇言，隱惡而揚善」，讚舜能包容教化。","sourceBook":"《禮記·中庸》","tier":3,"tags":["說話","品格"]},{"id":"yan-gui-yu-hao","word":"言歸於好","pinyin":"yán guī yú hǎo","cantonese":"jin4 gwai1 jyu1 hou2","meaning":"雙方重新和好，形容消除嫌隙、恢復友誼。","origin":"《左傳·僖公九年》載齊桓公盟諸侯曰「凡我同盟之人，既盟之後，言歸于好」。","sourceBook":"《左傳·僖公九年》","tier":3,"tags":["說話","社會"]},{"id":"chun-nuan-hua-kai","word":"春暖花開","pinyin":"chūn nuǎn huā kāi","cantonese":"ceon1 nyun5 faa1 hoi1","meaning":"春天天氣溫暖、百花盛開，形容春景宜人，也比喻大好時機。","origin":"明·朱國禎《湧幢小品·南內》載「春暖花開，命中貴陪內閣儒臣宴賞」，描寫春日宮苑賞花的景象。","sourceBook":"《湧幢小品·南內》","tier":1,"tags":["自然","時令"]},{"id":"niao-yu-hua-xiang","word":"鳥語花香","pinyin":"niǎo yǔ huā xiāng","cantonese":"niu5 jyu5 faa1 hoeng1","meaning":"鳥兒鳴叫、花兒飄香，形容春天美好的景色。","origin":"宋·呂本中《庵居》詩載「鳥語花香變夕陰，稍閒復恐病相尋」，描寫春日園居所見所聞。","sourceBook":"《東萊詩集·庵居》","tier":1,"tags":["自然"]},{"id":"hua-hao-yue-yuan","word":"花好月圓","pinyin":"huā hǎo yuè yuán","cantonese":"faa1 hou2 jyut6 jyun4","meaning":"花兒正好、月亮正圓，比喻美好圓滿，常用作新婚祝賀。","origin":"宋·張先《木蘭花》詞載「人意共憐花月滿，花好月圓人又散」，後用以祝願人月兩圓。","sourceBook":"《張子野詞·木蘭花》","tier":1,"tags":["情感","自然"]},{"id":"shan-ming-shui-xiu","word":"山明水秀","pinyin":"shān míng shuǐ xiù","cantonese":"saan1 ming4 seoi2 sau3","meaning":"山水明麗清秀，形容自然風景優美動人、令人舒暢。","origin":"宋·黃庭堅《驀山溪·贈衡陽陳湘》載「眉黛斂秋波，盡湖南，山明水秀」，描寫湖南山水之美。","sourceBook":"《山谷集·驀山溪》","tier":1,"tags":["自然"]},{"id":"feng-ping-lang-jing","word":"風平浪靜","pinyin":"fēng píng làng jìng","cantonese":"fung1 ping4 long6 zing6","meaning":"沒有風浪，形容水面平靜，也比喻局勢安穩無事。","origin":"宋·釋普濟《五燈會元·卷七》載僧問「風恬浪靜時如何」，後人以風平浪靜喻平靜無事。","sourceBook":"《五燈會元·卷七》","tier":1,"tags":["自然","生活"]},{"id":"wu-yan-liu-se","word":"五顏六色","pinyin":"wǔ yán liù sè","cantonese":"ng5 ngaan4 luk6 sik1","meaning":"形容色彩繁多、鮮豔紛呈，令人眼花撩亂。","origin":"清·李汝珍《鏡花緣·第十四回》載「惟各人所登之雲，五顏六色，其形不一」，形容色彩繽紛。","sourceBook":"《鏡花緣·第十四回》","tier":1,"tags":["自然","生活"]},{"id":"wu-hua-ba-men","word":"五花八門","pinyin":"wǔ huā bā mén","cantonese":"ng5 faa1 baat3 mun4","meaning":"原指五行陣和八門陣，後比喻花樣繁多、變化多端。","origin":"清·張潮《虞初新志·孫嘉淦南遊記》載「四布羅列，如平沙萬幕，八門五花」，後作五花八門。","sourceBook":"《虞初新志·南遊記》","tier":2,"tags":["社會","做事"]},{"id":"qi-shang-ba-xia","word":"七上八下","pinyin":"qī shàng bā xià","cantonese":"cat1 soeng5 baat3 haa6","meaning":"形容心神不定、忐忑不安，心中十分慌亂。","origin":"《水滸全傳·第二十六回》載「那胡正卿心頭十五個吊桶打水，七上八下」，形容心中慌亂不安。","sourceBook":"《水滸全傳·第二十六回》","tier":2,"tags":["情感"]},{"id":"qi-zui-ba-she","word":"七嘴八舌","pinyin":"qī zuǐ bā shé","cantonese":"cat1 zeoi2 baat3 sit3","meaning":"形容人多口雜、議論紛紛，場面熱鬧嘈雜。","origin":"清·袁枚《牘外餘言》載「故晉大夫七嘴八舌，冷譏熱嘲」，形容眾人爭相議論。","sourceBook":"《牘外餘言》","tier":2,"tags":["說話","社會"]},{"id":"ba-xian-guo-hai","word":"八仙過海","pinyin":"bā xiān guò hǎi","cantonese":"baat3 sin1 gwo3 hoi2","meaning":"八仙渡海各顯神通，比喻各自施展本領、互相競爭。","origin":"明·無名氏雜劇《八仙過海·第二折》載「則俺這八仙過海神通大」，後喻各顯神通。","sourceBook":"《八仙過海·第二折》","tier":2,"tags":["神話","寓言"]},{"id":"qian-fang-bai-ji","word":"千方百計","pinyin":"qiān fāng bǎi jì","cantonese":"cin1 fong1 baak3 gai3","meaning":"想盡一切辦法，形容費盡心思去達成目的。","origin":"《朱子語類·論語十七》載「譬如捉賊相似，須是着起氣力精神，千方百計去趕他」。","sourceBook":"《朱子語類·論語十七》","tier":2,"tags":["做事","思維"]},{"id":"wan-zhong-yi-xin","word":"萬眾一心","pinyin":"wàn zhòng yī xīn","cantonese":"maan6 zung3 jat1 sam1","meaning":"萬人同心，形容團結一致、齊心協力，共同努力。","origin":"《後漢書·朱儁傳》載「萬人一心，猶不可當，況十萬乎」，說明眾心同一的力量。","sourceBook":"《後漢書·朱儁傳》","tier":1,"tags":["社會","情感"]},{"id":"ban-tu-er-fei","word":"半途而廢","pinyin":"bàn tú ér fèi","cantonese":"bun3 tou4 ji4 fai3","meaning":"走到半路就停下來，比喻事情做到一半就放棄。","origin":"《禮記·中庸》載「君子遵道而行，半途而廢，吾弗難已矣」，感嘆人常中道而止。","sourceBook":"《禮記·中庸》","tier":1,"tags":["學習","做事"]},{"id":"mu-deng-kou-dai","word":"目瞪口呆","pinyin":"mù dèng kǒu dāi","cantonese":"muk6 cing4 hau2 ngoi4","meaning":"瞪大眼睛、說不出話，形容因驚訝或害怕而發愣。","origin":"元·無名氏雜劇《賺蒯通·第一折》載「嚇得項王目瞪口呆，動彈不得」，形容驚愕失神的樣子。","sourceBook":"《賺蒯通·第一折》","tier":1,"tags":["情感"]},{"id":"mu-bu-zhuan-jing","word":"目不轉睛","pinyin":"mù bù zhuǎn jīng","cantonese":"muk6 bat1 zyun2 zing1","meaning":"眼珠一動不動地看著，形容注意力高度集中。","origin":"明·馮夢龍《警世通言·卷十一》載「老婆婆看着小官人，目不轉睛，不覺兩淚交流」。","sourceBook":"《警世通言·卷十一》","tier":1,"tags":["情感","生活"]},{"id":"mei-kai-yan-xiao","word":"眉開眼笑","pinyin":"méi kāi yǎn xiào","cantonese":"mei4 hoi1 ngaan5 siu3","meaning":"眉毛舒展、眼睛含笑，形容十分高興的樣子。","origin":"元·王實甫《西廂記·第二本第二折》載「今日眉花眼笑」，後作眉開眼笑，形容欣喜。","sourceBook":"《西廂記·第二本第二折》","tier":1,"tags":["情感"]},{"id":"shou-wu-zu-dao","word":"手舞足蹈","pinyin":"shǒu wǔ zú dǎo","cantonese":"sau2 mou5 zuk1 dou6","meaning":"手腳都舞動起來，形容高興到了極點、情不自禁。","origin":"《毛詩序·關雎》載「詠歌之不足，不知手之舞之，足之蹈之也」，形容內心喜悅形於外。","sourceBook":"《毛詩序·關雎》","tier":1,"tags":["情感"]},{"id":"xing-gao-cai-lie","word":"興高采烈","pinyin":"xìng gāo cǎi liè","cantonese":"hing3 gou1 coi2 lit6","meaning":"興致高昂、神采飛揚，形容非常高興、氣氛熱烈。","origin":"南朝梁·劉勰《文心雕龍·體性》載「叔夜俊俠，故興高而采烈」，原評嵇康文章風格。","sourceBook":"《文心雕龍·體性》","tier":1,"tags":["情感"]},{"id":"zi-yan-zi-yu","word":"自言自語","pinyin":"zì yán zì yǔ","cantonese":"zi6 jin4 zi6 jyu5","meaning":"自己跟自己說話，形容獨自低聲說話。","origin":"元·無名氏雜劇《桃花女·第四折》載「你這般鬼促促的，在這自言自語」，形容獨自嘟噥。","sourceBook":"《桃花女·第四折》","tier":1,"tags":["說話"]},{"id":"da-chi-yi-jing","word":"大吃一驚","pinyin":"dà chī yī jīng","cantonese":"daai6 hek3 jat1 geng1","meaning":"大吃一驚，形容受到很大驚嚇或感到意外。","origin":"明·馮夢龍《警世通言·卷二十八》載「那員外大吃一驚，回身便走」，形容突然受驚。","sourceBook":"《警世通言·卷二十八》","tier":1,"tags":["情感"]},{"id":"jin-shang-tian-hua","word":"錦上添花","pinyin":"jǐn shàng tiān huā","cantonese":"gam2 soeng6 tim1 faa1","meaning":"在錦緞上再繡花，比喻在美好的事物上增添光彩。","origin":"宋·黃庭堅《了了庵頌》載「又要涪翁作頌，且圖錦上添花」，比喻美上加美。","sourceBook":"《山谷集·了了庵頌》","tier":1,"tags":["生活","藝術"]},{"id":"xue-zhong-song-tan","word":"雪中送炭","pinyin":"xuě zhōng sòng tàn","cantonese":"syut3 zung1 sung3 taan3","meaning":"在下雪天給人送炭取暖，比喻在別人急需時伸出援手。","origin":"宋·范成大《大雪送炭與芥隱》詩載「不是雪中須送炭，聊裝風景要詩來」，後喻及時救助。","sourceBook":"《石湖詩集·大雪送炭與芥隱》","tier":1,"tags":["情感","品格"]},{"id":"wu-guang-shi-se","word":"五光十色","pinyin":"wǔ guāng shí sè","cantonese":"ng5 gwong1 sap6 sik1","meaning":"形容色彩鮮豔奪目、花樣繁多，十分好看。","origin":"南朝梁·江淹《麗色賦》載「五光徘徊，十色陸離」，形容色彩斑斕、光彩奪目。","sourceBook":"《江文通集·麗色賦》","tier":2,"tags":["自然","藝術"]},{"id":"wan-zi-qian-hong","word":"萬紫千紅","pinyin":"wàn zǐ qiān hóng","cantonese":"maan6 zi2 cin1 hung4","meaning":"形容百花齊放、色彩絢麗，也比喻事物豐富多彩。","origin":"宋·朱熹《春日》詩載「等閒識得東風面，萬紫千紅總是春」，描寫春天百花盛開。","sourceBook":"《千家詩·春日》","tier":1,"tags":["自然"]},{"id":"shou-kou-ru-ping","word":"守口如瓶","pinyin":"shǒu kǒu rú píng","cantonese":"sau2 hau2 jyu4 ping4","meaning":"閉口不說話像瓶口塞緊，形容說話謹慎、嚴守秘密。","origin":"宋·周密《癸辛雜識·別集下》載「富鄭公有守口如瓶、防意如城之語」，喻慎言。","sourceBook":"《癸辛雜識·別集下》","tier":2,"tags":["說話","品格"]},{"id":"shi-jin-bu-mei","word":"拾金不昧","pinyin":"shí jīn bù mèi","cantonese":"sap6 gam1 bat1 mui6","meaning":"拾到金錢不據為己有，形容為人誠實、廉潔。","origin":"清·吳熾昌《客窗閒話·義丐》載有人拾金歸還，里人表其門曰「拾金不昧」，傳為美談。","sourceBook":"《客窗閒話·義丐》","tier":1,"tags":["品格"]},{"id":"ai-bu-shi-shou","word":"愛不釋手","pinyin":"ài bù shì shǒu","cantonese":"oi3 bat1 sik1 sau2","meaning":"喜愛得捨不得放手，形容對某物極為喜愛、不忍放下。","origin":"南朝梁·蕭統《陶淵明集序》載「余愛嗜其文，不能釋手」，表達對陶淵明作品的喜愛。","sourceBook":"《陶淵明集·序》","tier":1,"tags":["情感"]},{"id":"qing-bu-zi-jin","word":"情不自禁","pinyin":"qíng bù zì jīn","cantonese":"cing4 bat1 zi6 gam3","meaning":"感情激動得無法自制，形容自然流露、難以抑制。","origin":"南朝梁·劉遵《七夕穿針》詩載「步月如有意，情來不自禁」，後作情不自禁。","sourceBook":"《玉臺新詠·七夕穿針》","tier":1,"tags":["情感"]},{"id":"mei-fei-se-wu","word":"眉飛色舞","pinyin":"méi fēi sè wǔ","cantonese":"mei4 fei1 sik1 mou5","meaning":"眉毛上揚、神色飛動，形容十分得意或高興。","origin":"清·李寶嘉《官場現形記·第三十二回》載余藎臣聽聞喜訊「不禁眉飛色舞」。","sourceBook":"《官場現形記·第三十二回》","tier":2,"tags":["情感"]},{"id":"shou-mang-jiao-luan","word":"手忙腳亂","pinyin":"shǒu máng jiǎo luàn","cantonese":"sau2 mong4 goek3 lyun6","meaning":"手和腳都忙亂起來，形容做事慌張、沒有條理。","origin":"宋·釋普濟《五燈會元》載禪師答「如何是境中人」曰「手忙腳亂」，後形容慌張失措。","sourceBook":"《五燈會元》","tier":1,"tags":["生活"]},{"id":"jing-tian-dong-di","word":"驚天動地","pinyin":"jīng tiān dòng dì","cantonese":"ging1 tin1 dung6 dei6","meaning":"使天地震動，形容聲勢浩大或事業偉大。","origin":"唐·白居易《李白墓》詩載「可憐荒冢窮泉骨，曾有驚天動地文」，讚李白詩文震撼人心。","sourceBook":"《白氏長慶集·李白墓》","tier":1,"tags":["情感","藝術"]},{"id":"jing-xin-dong-po","word":"驚心動魄","pinyin":"jīng xīn dòng pò","cantonese":"ging1 sam1 dung6 paak3","meaning":"使人心靈震驚、魂魄震動，形容極度驚險或感人。","origin":"南朝梁·鍾嶸《詩品·卷上》載「文溫以麗，意悲而遠，驚心動魄，可謂幾乎一字千金」。","sourceBook":"《詩品·卷上》","tier":2,"tags":["情感","藝術"]},{"id":"xing-zhi-bo-bo","word":"興致勃勃","pinyin":"xìng zhì bó bó","cantonese":"hing3 zi3 but6 but6","meaning":"興致濃厚、情緒高漲，形容對某事充滿興趣。","origin":"清·李汝珍《鏡花緣·第五十六回》載眾人以為緇氏不肯去，誰知他仍「興致勃勃」想去應考。","sourceBook":"《鏡花緣·第五十六回》","tier":2,"tags":["情感"]},{"id":"sheng-long-huo-hu","word":"生龍活虎","pinyin":"shēng lóng huó hǔ","cantonese":"saang1 lung4 wut6 fu2","meaning":"像有活力的龍虎，形容人精力充沛、生氣勃勃。","origin":"清·吳趼人《痛史·第五回》載張世傑等「如生龍活虎一般，殺入陣去」，形容勇猛矯健。","sourceBook":"《痛史·第五回》","tier":1,"tags":["動物","人物"]},{"id":"long-fei-feng-wu","word":"龍飛鳳舞","pinyin":"lóng fēi fèng wǔ","cantonese":"lung4 fei1 fung6 mou5","meaning":"龍在飛、鳳在舞，形容書法筆勢雄壯活潑，也形容氣象非凡。","origin":"宋·蘇軾《表忠觀碑》載「天目之山，苕水出焉，龍飛鳳舞，萃於臨安」，形容山川氣勢。","sourceBook":"《東坡全集·表忠觀碑》","tier":2,"tags":["藝術","動物"]},{"id":"ma-dao-cheng-gong","word":"馬到成功","pinyin":"mǎ dào chéng gōng","cantonese":"maa5 dou3 sing4 gung1","meaning":"戰馬一到就取得勝利，形容事情順利、迅速成功。","origin":"元·無名氏雜劇《小尉遲·第二折》載「那老尉遲這一去，馬到成功」，祝人出征順利。","sourceBook":"《小尉遲·第二折》","tier":1,"tags":["做事","人物"]},{"id":"guang-ming-zheng-da","word":"光明正大","pinyin":"guāng míng zhèng dà","cantonese":"gwong1 ming4 zing3 daai6","meaning":"胸懷坦蕩、行事正當，形容不搞陰謀、光明磊落。","origin":"宋·朱熹《朱子語類·卷七十三》載「聖人所說底話，光明正大」，形容言論正當無私。","sourceBook":"《朱子語類·卷七十三》","tier":1,"tags":["品格"]},{"id":"guang-ming-lei-luo","word":"光明磊落","pinyin":"guāng míng lěi luò","cantonese":"gwong1 ming4 leoi5 lok6","meaning":"心地光明、胸懷坦蕩，形容為人正直無私。","origin":"宋·朱熹《朱子語類·卷七十四》載「譬如人光明磊落底便是好人」，形容胸懷坦蕩。","sourceBook":"《朱子語類·卷七十四》","tier":2,"tags":["品格"]},{"id":"hua-zhi-zhao-zhan","word":"花枝招展","pinyin":"huā zhī zhāo zhǎn","cantonese":"faa1 zi1 ziu1 zin2","meaning":"花枝迎風擺動，形容女子打扮豔麗動人。","origin":"清·曹雪芹《紅樓夢·第六十二回》載平兒「打扮的花枝招展的來了」，形容妝扮明豔。","sourceBook":"《紅樓夢·第六十二回》","tier":2,"tags":["人物","自然"]},{"id":"hua-tuan-jin-cu","word":"花團錦簇","pinyin":"huā tuán jǐn cù","cantonese":"faa1 tyun4 gam2 cuk1","meaning":"花朵聚集、錦繡成團，形容色彩紛呈、景象繁華。","origin":"宋·釋道原《景德傳燈錄·卷十七》載「攢花簇錦」，後作花團錦簇，形容繁華絢麗。","sourceBook":"《景德傳燈錄·卷十七》","tier":2,"tags":["自然","生活"]},{"id":"hua-yan-qiao-yu","word":"花言巧語","pinyin":"huā yán qiǎo yǔ","cantonese":"faa1 jin4 haau2 jyu5","meaning":"虛偽動聽的言語，形容用甜言蜜語騙人。","origin":"宋·朱熹《朱子語類·論語三》載「巧言即今所謂花言巧語」，指虛浮不實的言辭。","sourceBook":"《朱子語類·論語三》","tier":2,"tags":["說話"]},{"id":"hua-rong-yue-mao","word":"花容月貌","pinyin":"huā róng yuè mào","cantonese":"faa1 jung4 jyut6 maau6","meaning":"像花一樣的容貌、像月一樣的丰采，形容女子美貌。","origin":"明·吳承恩《西遊記·第六十二回》載「那公主花容月貌，有二十分人才」，形容女子美豔。","sourceBook":"《西遊記·第六十二回》","tier":2,"tags":["人物","情感"]},{"id":"hua-hong-liu-lv","word":"花紅柳綠","pinyin":"huā hóng liǔ lǜ","cantonese":"faa1 hung4 lau5 luk6","meaning":"紅花綠柳相互映襯，形容春天景色鮮明美麗。","origin":"五代蜀·魏承班《生查子》詞載「花紅柳綠間晴空」，描寫春日花柳相映的明媚景色。","sourceBook":"《花間集·生查子》","tier":2,"tags":["自然"]},{"id":"qiu-gao-qi-shuang","word":"秋高氣爽","pinyin":"qiū gāo qì shuǎng","cantonese":"cau1 gou1 hei3 song2","meaning":"秋天天空高遠、空氣清爽，形容秋日氣候宜人。","origin":"唐·杜甫《崔氏東山草堂》詩載「愛汝玉山草堂靜，高秋爽氣相鮮新」，後作秋高氣爽。","sourceBook":"《杜工部集·崔氏東山草堂》","tier":1,"tags":["自然"]},{"id":"feng-hua-xue-yue","word":"風花雪月","pinyin":"fēng huā xuě yuè","cantonese":"fung1 faa1 syut3 jyut6","meaning":"原指四時美景，後多指浮華空泛、吟詠風月的詩文。","origin":"宋·邵雍《伊川擊壤集序》載「何異四時風花雪月一過乎眼也」，以四時景物喻世事變幻。","sourceBook":"《伊川擊壤集·序》","tier":2,"tags":["自然","情感"]},{"id":"feng-he-ri-li","word":"風和日麗","pinyin":"fēng hé rì lì","cantonese":"fung1 wo4 jat6 lai6","meaning":"微風和煦、陽光燦爛，形容天氣晴朗溫和、十分宜人。","origin":"元·李愛山《集賢賓·春日傷別》載「那時節和風麗日滿東園」，後作風和日麗。","sourceBook":"《全元散曲·春日傷別》","tier":2,"tags":["自然"]},{"id":"feng-tiao-yu-shun","word":"風調雨順","pinyin":"fēng tiáo yǔ shùn","cantonese":"fung1 tiu4 jyu5 seon6","meaning":"風雨適時合宜，形容年景好、農事順利。","origin":"《六韜》載周武王克殷後「風調雨順」，後用以稱頌太平盛世、五穀豐收。","sourceBook":"《六韜》","tier":2,"tags":["自然","社會"]},{"id":"bai-fa-bai-zhong","word":"百發百中","pinyin":"bǎi fā bǎi zhòng","cantonese":"baak3 faat3 baak3 zung3","meaning":"每次射箭都命中目標，形容射術高明，也比喻料事準確。","origin":"《戰國策·西周策》載楚人養由基「去柳葉者百步而射之，百發百中」，形容善射。","sourceBook":"《戰國策·西周策》","tier":2,"tags":["歷史","勇氣"]},{"id":"qiu-shou-dong-cang","word":"秋收冬藏","pinyin":"qiū shōu dōng cáng","cantonese":"cau1 sau1 dung1 cong4","meaning":"秋天收穫、冬天儲藏，形容順應時令安排農事。","origin":"《史記·太史公自序》載「夫春生夏長，秋收冬藏，此天道之大經也」，說明四時農事規律。","sourceBook":"《史記·太史公自序》","tier":3,"tags":["自然","做事"]},{"id":"xin-hua-nu-fang","word":"心花怒放","pinyin":"xīn huā nù fàng","cantonese":"sam1 faa1 nou6 fong3","meaning":"心裡像花兒盛開，形容非常高興、喜悅。","origin":"清·李寶嘉《文明小史·第六十回》載平中丞「喜得心花怒放，連說難為他了」，形容欣喜萬分。","sourceBook":"《文明小史·第六十回》","tier":2,"tags":["情感"]},{"id":"xin-kuang-shen-yi","word":"心曠神怡","pinyin":"xīn kuàng shén yí","cantonese":"sam1 kwong3 san4 ji4","meaning":"心境開闊、精神愉快，形容置身美景時舒暢愉快。","origin":"宋·范仲淹《岳陽樓記》載「登斯樓也，則有心曠神怡，寵辱皆忘」，寫登樓遠眺的暢快。","sourceBook":"《范文正公集·岳陽樓記》","tier":2,"tags":["情感","自然"]},{"id":"xin-ping-qi-he","word":"心平氣和","pinyin":"xīn píng qì hé","cantonese":"sam1 ping4 hei3 wo4","meaning":"心情平靜、態度溫和，形容不急不躁、待人從容。","origin":"宋·蘇軾《菜羹賦》載「先生心平而氣和，故雖老而體胖」，指心境平和則身體安泰。","sourceBook":"《東坡全集·菜羹賦》","tier":2,"tags":["情感","品格"]},{"id":"xin-gan-qing-yuan","word":"心甘情願","pinyin":"xīn gān qíng yuàn","cantonese":"sam1 gam1 cing4 jyun6","meaning":"心裡完全願意，形容自願而沒有半點勉強。","origin":"宋·王明清《摭青雜說·項四郎》載「此事兒甘心情願也」，表示完全出於自願。","sourceBook":"《摭青雜說·項四郎》","tier":2,"tags":["情感"]},{"id":"xin-zhi-kou-kuai","word":"心直口快","pinyin":"xīn zhí kǒu kuài","cantonese":"sam1 zik6 hau2 faai3","meaning":"性情直率、說話爽快，形容想到什麼就說什麼。","origin":"元·張國賓《羅李郎·第四折》載「哥哥是心直口快射糧軍」，形容為人爽直。","sourceBook":"《羅李郎·第四折》","tier":3,"tags":["人物","說話"]},{"id":"xin-hui-yi-leng","word":"心灰意冷","pinyin":"xīn huī yì lěng","cantonese":"sam1 fui1 ji3 laang5","meaning":"心灰意懶、意志消沉，形容遭受挫折後失去信心。","origin":"明·吳承恩《西遊記·第四十回》載「故我意懶心灰」，形容意志消沉、提不起勁。","sourceBook":"《西遊記·第四十回》","tier":3,"tags":["情感"]},{"id":"xin-yuan-yi-ma","word":"心猿意馬","pinyin":"xīn yuán yì mǎ","cantonese":"sam1 jyun4 ji3 maa5","meaning":"心思像猿猴跳躍、快馬奔騰，形容心神不定、難以專注。","origin":"漢·魏伯陽《參同契》注有「心猿不定，意馬四馳」之語，後喻心思浮躁難收。","sourceBook":"《周易參同契·注》","tier":3,"tags":["情感","思維"]},{"id":"xin-zhao-bu-xuan","word":"心照不宣","pinyin":"xīn zhào bù xuān","cantonese":"sam1 ziu3 bat1 syun1","meaning":"彼此心裡明白而不說出來，形容默契十足。","origin":"晉·潘岳《夏侯常侍誄》載「心照神交，唯我與子」，後作心照不宣，指心意相通。","sourceBook":"《潘黃門集·夏侯常侍誄》","tier":3,"tags":["情感","說話"]},{"id":"xin-kou-ru-yi","word":"心口如一","pinyin":"xīn kǒu rú yī","cantonese":"sam1 hau2 jyu4 jat1","meaning":"心裡想的和嘴裡說的完全一致，形容為人誠實。","origin":"清·李汝珍《鏡花緣·第六十五回》載「好在心口如一，直截了當，倒是一個極爽快的」。","sourceBook":"《鏡花緣·第六十五回》","tier":4,"tags":["品格"]},{"id":"ren-shan-ren-hai","word":"人山人海","pinyin":"rén shān rén hǎi","cantonese":"jan4 saan1 jan4 hoi2","meaning":"人像山一樣多、像海一樣廣，形容聚集的人極多。","origin":"《水滸全傳·第五十一回》載「賺得那人山人海價看」，形容圍觀的人潮擁擠。","sourceBook":"《水滸全傳·第五十一回》","tier":1,"tags":["社會","生活"]},{"id":"ren-ding-sheng-tian","word":"人定勝天","pinyin":"rén dìng shèng tiān","cantonese":"jan4 ding6 sing3 tin1","meaning":"人的力量可以戰勝自然，形容有信心克服困難。","origin":"宋·劉過《襄陽歌》載「人定兮勝天，半壁久無胡日月」，後用以勉人努力可勝天命。","sourceBook":"《龍洲集·襄陽歌》","tier":3,"tags":["做事","思維"]},{"id":"ren-jin-qi-cai","word":"人盡其才","pinyin":"rén jìn qí cái","cantonese":"jan4 zeon6 kei4 coi4","meaning":"每個人都能充分發揮才能，形容用人得當。","origin":"《淮南子·兵略訓》載「若乃人盡其才，悉用其力」，指用人能各展所長。","sourceBook":"《淮南子·兵略訓》","tier":3,"tags":["社會","學習"]},{"id":"ren-jie-di-ling","word":"人傑地靈","pinyin":"rén jié dì líng","cantonese":"jan4 git6 dei6 ling4","meaning":"傑出人物出生於靈秀之地，形容地方因人才而著名。","origin":"唐·王勃《滕王閣序》載「人傑地靈，徐孺下陳蕃之榻」，讚洪州人才輩出。","sourceBook":"《王子安集·滕王閣序》","tier":3,"tags":["人物","自然"]},{"id":"ren-yun-yi-yun","word":"人云亦云","pinyin":"rén yún yì yún","cantonese":"jan4 wan4 jik6 wan4","meaning":"別人說什麼自己也跟著說，形容沒有主見、盲目附和。","origin":"金·蔡松年《槽聲同彥高賦》載「他日人云吾亦云」，後作人云亦云，喻缺乏獨立見解。","sourceBook":"《明秀集·槽聲同彥高賦》","tier":3,"tags":["說話","思維"]},{"id":"ren-sheng-ding-fei","word":"人聲鼎沸","pinyin":"rén shēng dǐng fèi","cantonese":"jan4 sing1 ding2 fai3","meaning":"人聲像鼎中沸水般喧鬧，形容場面熱鬧嘈雜。","origin":"明·馮夢龍《醒世恆言·卷十》載「只聽得人聲鼎沸」，形容周圍人聲喧嘩。","sourceBook":"《醒世恆言·卷十》","tier":3,"tags":["社會"]},{"id":"ren-cai-bei-chu","word":"人才輩出","pinyin":"rén cái bèi chū","cantonese":"jan4 coi4 bui3 ceot1","meaning":"有才能的人不斷湧現，形容人才興旺。","origin":"清·畢沅《續資治通鑑·元紀》載「得如左丞許衡教國子，則人才輩出矣」，指辦學可培育人才。","sourceBook":"《續資治通鑑·元紀》","tier":4,"tags":["社會","學習"]},{"id":"tian-yi-wu-feng","word":"天衣無縫","pinyin":"tiān yī wú fèng","cantonese":"tin1 ji1 mou4 fung6","meaning":"天上神仙的衣服沒有縫線，比喻事物周密自然、毫無破綻。","origin":"前蜀·牛嶠《靈怪錄·郭翰》載郭翰見織女之衣「並無縫」，織女答「天衣本非針線為也」。","sourceBook":"《靈怪錄·郭翰》","tier":2,"tags":["思維","藝術"]},{"id":"tian-luo-di-wang","word":"天羅地網","pinyin":"tiān luó dì wǎng","cantonese":"tin1 lo4 dei6 mong5","meaning":"天上地下都布滿羅網，形容包圍嚴密、無處可逃。","origin":"《大宋宣和遺事·亨集》載「又值天羅地網災」，後以天羅地網喻嚴密包圍。","sourceBook":"《大宋宣和遺事·亨集》","tier":2,"tags":["社會","做事"]},{"id":"tian-ya-hai-jiao","word":"天涯海角","pinyin":"tiān yá hǎi jiǎo","cantonese":"tin1 ngaai4 hoi2 gok3","meaning":"天的邊際、海的角落，形容極遠的地方。","origin":"宋·張世南《遊宦紀聞·卷六》載「今之遠宦及遠服賈者，皆曰天涯海角」，指極偏遠之地。","sourceBook":"《遊宦紀聞·卷六》","tier":2,"tags":["自然","情感"]},{"id":"tian-fan-di-fu","word":"天翻地覆","pinyin":"tiān fān dì fù","cantonese":"tin1 faan1 dei6 fuk1","meaning":"天地都翻轉過來，形容變化巨大或場面混亂。","origin":"唐·劉商《胡笳十八拍·第六拍》載「天翻地覆誰得知，如今正南看北斗」，形容世變之烈。","sourceBook":"《全唐詩·胡笳十八拍》","tier":3,"tags":["社會","情感"]},{"id":"tian-jing-di-yi","word":"天經地義","pinyin":"tiān jīng dì yì","cantonese":"tin1 ging1 dei6 ji6","meaning":"天地間常行的道理，形容事情理所當然、不容置疑。","origin":"《左傳·昭公二十五年》載「夫禮，天之經也，地之義也，民之行也」，指禮乃天經地義。","sourceBook":"《左傳·昭公二十五年》","tier":3,"tags":["社會","思維"]},{"id":"tian-hua-luan-zhui","word":"天花亂墜","pinyin":"tiān huā luàn zhuì","cantonese":"tin1 faa1 lyun6 zeoi6","meaning":"天花紛紛飄落，原形容佛說法動人，後比喻說話誇張動聽。","origin":"《心地觀經·序品》載「六慾諸天來供養，天華亂墜遍虛空」，後喻言辭動聽而不切實際。","sourceBook":"《心地觀經·序品》","tier":3,"tags":["說話","藝術"]},{"id":"tian-nan-di-bei","word":"天南地北","pinyin":"tiān nán dì běi","cantonese":"tin1 naam4 dei6 bak1","meaning":"一個天南、一個地北，形容相隔遙遠或到處各地。","origin":"金·元好問《邁陂塘》詞載「天南地北雙飛客，老翅幾回寒暑」，以雁喻分隔兩地。","sourceBook":"《遺山樂府·邁陂塘》","tier":3,"tags":["自然","情感"]},{"id":"tian-rang-zhi-bie","word":"天壤之別","pinyin":"tiān rǎng zhī bié","cantonese":"tin1 joeng6 zi1 bit6","meaning":"天與地相比，形容差別極大、相距懸殊。","origin":"晉·葛洪《抱朴子·內篇·論仙》載「其為不同，已有天壤之覺，冰炭之乖矣」，喻差別懸殊。","sourceBook":"《抱朴子·內篇·論仙》","tier":4,"tags":["思維","社會"]},{"id":"da-gong-wu-si","word":"大公無私","pinyin":"dà gōng wú sī","cantonese":"daai6 gung1 mou4 si1","meaning":"一心為公、毫無私心，形容處事公正、不偏不倚。","origin":"漢·馬融《忠經·天地神明》載「忠者中也，至公無私」，指忠誠在於公正無私。","sourceBook":"《忠經·天地神明》","tier":3,"tags":["品格"]},{"id":"da-jing-xiao-guai","word":"大驚小怪","pinyin":"dà jīng xiǎo guài","cantonese":"daai6 geng1 siu2 gwaai3","meaning":"對小事過分驚訝，形容少見多怪、反應過度。","origin":"宋·朱熹《答林擇之》載「不必如此大驚小怪，起模畫樣也」，勸人勿小題大作。","sourceBook":"《朱子文集·答林擇之》","tier":2,"tags":["情感","做事"]},{"id":"da-kuai-ren-xin","word":"大快人心","pinyin":"dà kuài rén xīn","cantonese":"daai6 faai3 jan4 sam1","meaning":"使大家心裡非常痛快，形容懲惡揚善、令人稱快。","origin":"明·許三階《節俠記·誅佞》載「今日聖旨殺他，大快人心」，形容除掉壞人後眾人心快。","sourceBook":"《節俠記·誅佞》","tier":3,"tags":["情感"]},{"id":"da-shi-suo-qu","word":"大勢所趨","pinyin":"dà shì suǒ qū","cantonese":"daai6 sai3 so2 ceoi1","meaning":"整個局勢發展的趨向，形容不可逆轉的潮流。","origin":"宋·陳亮《上孝宗皇帝第三書》載「天下大勢之所趨，非人力之所能移也」，指形勢不可強改。","sourceBook":"《龍川文集·上孝宗皇帝第三書》","tier":4,"tags":["社會","思維"]},{"id":"xiao-xin-yi-yi","word":"小心翼翼","pinyin":"xiǎo xīn yì yì","cantonese":"siu2 sam1 jik6 jik6","meaning":"形容舉止十分謹慎，一點也不敢疏忽大意。","origin":"《詩經·大雅·大明》載「維此文王，小心翼翼」，讚周文王行事恭謹敬慎。","sourceBook":"《詩經·大雅·大明》","tier":1,"tags":["做事","情感"]},{"id":"xiao-niao-yi-ren","word":"小鳥依人","pinyin":"xiǎo niǎo yī rén","cantonese":"siu2 niu5 ji1 jan4","meaning":"像小鳥般依偎著人，形容女子或小孩嬌柔可愛。","origin":"《舊唐書·長孫無忌傳》載唐太宗評褚遂良「譬如飛鳥依人，自加憐愛」，後作小鳥依人。","sourceBook":"《舊唐書·長孫無忌傳》","tier":3,"tags":["人物","動物"]},{"id":"xiao-ti-da-zuo","word":"小題大做","pinyin":"xiǎo tí dà zuò","cantonese":"siu2 tai4 daai6 zou6","meaning":"把小題目寫成大文章，比喻把小事當大事處理。","origin":"清·方東樹《昭昧詹言·卷二十》評黃庭堅詩「全是以實形虛，小題大做」，後喻誇大其事。","sourceBook":"《昭昧詹言·卷二十》","tier":3,"tags":["做事","說話"]},{"id":"shui-dao-qu-cheng","word":"水到渠成","pinyin":"shuǐ dào qú chéng","cantonese":"seoi2 dou3 keoi4 sing4","meaning":"水流到之處自然成渠，比喻條件成熟事情自然成功。","origin":"宋·蘇軾《答秦太虛書》載「水到渠成，不須預慮」，說明時機成熟自然有成。","sourceBook":"《東坡全集·答秦太虛書》","tier":1,"tags":["做事","思維"]},{"id":"shui-xie-bu-tong","word":"水泄不通","pinyin":"shuǐ xiè bù tōng","cantonese":"seoi2 sit3 bat1 tung1","meaning":"連水都流不出去，形容包圍嚴密或擁擠不堪。","origin":"宋·釋道原《景德傳燈錄》載「德山門下，水泄不通」，原形容門風嚴密，後喻擁擠。","sourceBook":"《景德傳燈錄》","tier":3,"tags":["社會","自然"]},{"id":"shui-ru-jiao-rong","word":"水乳交融","pinyin":"shuǐ rǔ jiāo róng","cantonese":"seoi2 jyu5 gaau1 jung4","meaning":"水和乳汁融合在一起，比喻關係融洽、結合緊密。","origin":"宋·釋普濟《五燈會元·卷十七》載「致使玄黃不辨，水乳不分」，後反用其意為水乳交融。","sourceBook":"《五燈會元·卷十七》","tier":3,"tags":["思維","情感"]},{"id":"shui-di-shi-chuan","word":"水滴石穿","pinyin":"shuǐ dī shí chuān","cantonese":"seoi2 dik1 sek6 cyun1","meaning":"水滴不斷也能穿透石頭，比喻持之以恆終能成功。","origin":"《漢書·枚乘傳》載「泰山之霤穿石……漸靡使之然也」，說明持續之力可穿石。","sourceBook":"《漢書·枚乘傳》","tier":2,"tags":["堅持","做事"]},{"id":"shui-tian-yi-se","word":"水天一色","pinyin":"shuǐ tiān yī sè","cantonese":"seoi2 tin1 jat1 sik1","meaning":"水面與天空同色相連，形容水域遼闊、景色壯麗。","origin":"唐·王勃《滕王閣序》載「落霞與孤鶩齊飛，秋水共長天一色」，描寫江天相映之美。","sourceBook":"《王子安集·滕王閣序》","tier":3,"tags":["自然"]},{"id":"shui-zhang-chuan-gao","word":"水漲船高","pinyin":"shuǐ zhǎng chuán gāo","cantonese":"seoi2 zoeng3 syun4 gou1","meaning":"水位上升船身也升高，比喻事物隨基礎提高而提高。","origin":"宋·釋道原《景德傳燈錄》載「水長船高，泥多佛大」，喻所依憑者增厚則自身亦高。","sourceBook":"《景德傳燈錄》","tier":3,"tags":["思維","社會"]},{"id":"ri-xin-yue-yi","word":"日新月異","pinyin":"rì xīn yuè yì","cantonese":"jat6 san1 jyut6 ji6","meaning":"每天每月都有新變化，形容進步迅速、不斷更新。","origin":"《禮記·大學》載「苟日新，日日新，又日新」，勉人日日更新，後作日新月異。","sourceBook":"《禮記·大學》","tier":2,"tags":["社會","學習"]},{"id":"ri-ji-yue-lei","word":"日積月累","pinyin":"rì jī yuè lěi","cantonese":"jat6 zik1 jyut6 leoi6","meaning":"一天天累積、一月月增加，形容長期不斷積聚。","origin":"宋·朱熹《答周南仲書》載「日積月累，自然純熟，自然光明」，指學問靠長期累積。","sourceBook":"《朱子文集·答周南仲書》","tier":1,"tags":["學習","堅持"]},{"id":"ri-mu-tu-qiong","word":"日暮途窮","pinyin":"rì mù tú qióng","cantonese":"jat6 mou6 tou4 kung4","meaning":"天色已晚而路已走盡，比喻陷入絕境、無路可走。","origin":"《史記·伍子胥列傳》載伍子胥曰「吾日暮途遠，吾故倒行而逆施之」，後作日暮途窮。","sourceBook":"《史記·伍子胥列傳》","tier":4,"tags":["生活","情感"]},{"id":"ri-shang-san-gan","word":"日上三竿","pinyin":"rì shàng sān gān","cantonese":"jat6 soeng5 saam1 gon1","meaning":"太陽升到三根竹竿高，形容時間不早、起床很晚。","origin":"《南齊書·天文志上》載「日出高三竿」，後以日上三竿形容時候已不早。","sourceBook":"《南齊書·天文志上》","tier":4,"tags":["自然","生活"]},{"id":"yue-ming-xing-xi","word":"月明星稀","pinyin":"yuè míng xīng xī","cantonese":"jyut6 ming4 sing1 hei1","meaning":"月亮明亮時星星顯得稀疏，形容夜空景色。","origin":"三國魏·曹操《短歌行》載「月明星稀，烏鵲南飛。繞樹三匝，何枝可依」。","sourceBook":"《樂府詩集·短歌行》","tier":3,"tags":["自然"]},{"id":"yue-xia-lao-ren","word":"月下老人","pinyin":"yuè xià lǎo rén","cantonese":"jyut6 haa6 lou5 jan4","meaning":"月光下翻閱婚書的老人，後指主管婚姻的神，也指媒人。","origin":"唐·李復言《續幽怪錄·定婚店》載韋固遇老人在月下翻婚姻簿，謂其主天下婚配。","sourceBook":"《續幽怪錄·定婚店》","tier":3,"tags":["神話","情感"]},{"id":"yue-bai-feng-qing","word":"月白風清","pinyin":"yuè bái fēng qīng","cantonese":"jyut6 baak6 fung1 cing1","meaning":"月色皎潔、微風清涼，形容夜晚景色清幽美好。","origin":"宋·蘇軾《後赤壁賦》載「月白風清，如此良夜何」，讚嘆秋夜月色風光。","sourceBook":"《東坡全集·後赤壁賦》","tier":4,"tags":["自然"]},{"id":"mu-zhong-wu-ren","word":"目中無人","pinyin":"mù zhōng wú rén","cantonese":"muk6 zung1 mou4 jan4","meaning":"眼裡沒有別人，形容自高自大、看不起人。","origin":"明·馮夢龍《東周列國志·第九十六回》載趙括論兵「指天畫地，目中無人」，形容狂妄。","sourceBook":"《東周列國志·第九十六回》","tier":3,"tags":["人物","情感"]},{"id":"mu-bu-xia-ji","word":"目不暇給","pinyin":"mù bù xiá jǐ","cantonese":"muk6 bat1 haa6 kap1","meaning":"眼睛來不及看，形容景物繁多、令人目不暇接。","origin":"清·吳璿《飛龍全傳·序》載「庶足令閱者驚奇拍案，目不暇給矣」，形容內容豐富多彩。","sourceBook":"《飛龍全傳·序》","tier":4,"tags":["情感","生活"]},{"id":"mu-guang-ru-ju","word":"目光如炬","pinyin":"mù guāng rú jù","cantonese":"muk6 gwong1 jyu4 geoi6","meaning":"目光像火炬般明亮，形容見識高明或憤怒注視。","origin":"《南史·檀道濟傳》載檀道濟被收捕時「憤怒氣盛，目光如炬」，形容怒目而視。","sourceBook":"《南史·檀道濟傳》","tier":4,"tags":["人物","情感"]},{"id":"kou-ruo-xuan-he","word":"口若懸河","pinyin":"kǒu ruò xuán hé","cantonese":"hau2 joek6 jyun4 ho4","meaning":"說話像瀑布傾瀉不停，形容口才流利、能言善辯。","origin":"南朝宋·劉義慶《世說新語·賞譽》載郭子玄「語議如懸河瀉水，注而不竭」，後喻健談。","sourceBook":"《世說新語·賞譽》","tier":3,"tags":["說話"]},{"id":"kou-mi-fu-jian","word":"口蜜腹劍","pinyin":"kǒu mì fù jiàn","cantonese":"hau2 mat6 fuk1 gim3","meaning":"嘴上甜蜜、心裡藏劍，形容表面和善而內心陰險。","origin":"《資治通鑑·唐紀》載世人謂李林甫「口有蜜，腹有劍」，形容其為人陰險狡詐。","sourceBook":"《資治通鑑·唐紀》","tier":3,"tags":["說話","品格"]},{"id":"kou-shi-xin-fei","word":"口是心非","pinyin":"kǒu shì xīn fēi","cantonese":"hau2 si6 sam1 fei1","meaning":"嘴裡說是、心裡說非，形容心口不一、表裡不一。","origin":"漢·桓譚《新論·辨惑》載「口是而心非者，雖寸斷支解，而道猶不出也」，指心口不一。","sourceBook":"《新論·辨惑》","tier":3,"tags":["說話","品格"]},{"id":"kou-zhu-bi-fa","word":"口誅筆伐","pinyin":"kǒu zhū bǐ fá","cantonese":"hau2 zyu1 bat1 fat6","meaning":"用言語和文字加以聲討，形容嚴厲批評譴責。","origin":"宋·陳亮《畏羞於君子》載「免筆誅口伐於蓽門閨竇之間」，後作口誅筆伐。","sourceBook":"《龍川文集·畏羞於君子》","tier":4,"tags":["說話","寫作"]},{"id":"shou-zu-wu-cuo","word":"手足無措","pinyin":"shǒu zú wú cuò","cantonese":"sau2 zuk1 mou4 cou3","meaning":"手腳不知該放哪裡，形容慌張得不知如何是好。","origin":"《論語·子路》載「刑罰不中，則民無所措手足」，後以手足無措形容驚慌失措。","sourceBook":"《論語·子路》","tier":1,"tags":["情感","生活"]},{"id":"shou-dao-qin-lai","word":"手到擒來","pinyin":"shǒu dào qín lái","cantonese":"sau2 dou3 kam4 loi4","meaning":"一伸手就把敵人捉住，形容事情輕而易舉、有把握。","origin":"元·康進之《李逵負荊·第四折》載「管教他甕中捉鱉，手到拿來」，形容輕而易舉。","sourceBook":"《李逵負荊·第四折》","tier":4,"tags":["做事"]},{"id":"shou-bu-shi-juan","word":"手不釋卷","pinyin":"shǒu bù shì juàn","cantonese":"sau2 bat1 sik1 gyun2","meaning":"手裡捨不得放下書本，形容勤奮好學。","origin":"《三國志·吳書·呂蒙傳》裴注引《江表傳》載漢光武帝「當兵馬之務，手不釋卷」，形容好學不倦。","sourceBook":"《三國志·吳書·呂蒙傳》","tier":3,"tags":["學習"]},{"id":"zu-zhi-duo-mou","word":"足智多謀","pinyin":"zú zhì duō móu","cantonese":"zuk1 zi3 do1 mau4","meaning":"智慧充足、計謀很多，形容人聰明能幹、善於謀劃。","origin":"元·無名氏雜劇《連環計·第一折》載「此人足智多謀，可與共事」，形容人聰明多計。","sourceBook":"《連環計·第一折》","tier":3,"tags":["人物","思維"]},{"id":"zu-bu-chu-hu","word":"足不出戶","pinyin":"zú bù chū hù","cantonese":"zuk1 bat1 ceot1 wu6","meaning":"腳不走出家門，形容長時間留在家中、很少外出。","origin":"明·凌濛初《初刻拍案驚奇·卷二十五》載「足不出門，一客不見」，形容閉門不出。","sourceBook":"《初刻拍案驚奇·卷二十五》","tier":3,"tags":["生活"]},{"id":"ma-bu-ting-ti","word":"馬不停蹄","pinyin":"mǎ bù tíng tí","cantonese":"maa5 bat1 ting4 tai4","meaning":"馬不停下腳步，形容一路奔走、毫不歇息。","origin":"元·王實甫《麗春堂·第二折》載「打的他馬不停蹄」，形容不停奔走、連續行動。","sourceBook":"《麗春堂·第二折》","tier":1,"tags":["做事","動物"]},{"id":"dan-qiang-pi-ma","word":"單槍匹馬","pinyin":"dān qiāng pī mǎ","cantonese":"daan1 coeng1 pat1 maa5","meaning":"一支槍、一匹馬，形容獨自行動、沒有人幫助。","origin":"五代楚·汪遵《烏江》詩載「兵散弓殘挫虎威，單槍匹馬突重圍」，形容孤身奮戰。","sourceBook":"《全唐詩·烏江》","tier":3,"tags":["人物","勇氣"]},{"id":"long-teng-hu-yue","word":"龍騰虎躍","pinyin":"lóng téng hǔ yuè","cantonese":"lung4 tang4 fu2 joek6","meaning":"龍在騰飛、虎在跳躍，形容動作矯健有力、場面熱烈。","origin":"唐·嚴從《擬三國名臣贊序》載「龍騰虎躍，風流雲蒸」，形容人才奮發、氣象蓬勃。","sourceBook":"《全唐文·擬三國名臣贊序》","tier":2,"tags":["動物","人物"]},{"id":"long-ma-jing-shen","word":"龍馬精神","pinyin":"lóng mǎ jīng shén","cantonese":"lung4 maa5 zing1 san4","meaning":"像龍馬般的精神，形容人身體健旺、精神飽滿。","origin":"唐·李郢《上裴晉公》詩載「四朝憂國鬢如絲，龍馬精神海鶴姿」，祝人老而健旺。","sourceBook":"《全唐詩·上裴晉公》","tier":2,"tags":["人物","動物"]},{"id":"long-zheng-hu-dou","word":"龍爭虎鬥","pinyin":"lóng zhēng hǔ dòu","cantonese":"lung4 zang1 fu2 dau3","meaning":"龍虎互相爭鬥，比喻雙方勢均力敵、激烈競爭。","origin":"漢·班固《答賓戲》載「分裂諸夏，龍戰虎爭」，形容群雄角逐、競爭激烈。","sourceBook":"《文選·答賓戲》","tier":2,"tags":["動物","歷史"]},{"id":"long-tan-hu-xue","word":"龍潭虎穴","pinyin":"lóng tán hǔ xué","cantonese":"lung4 taam4 fu2 jyut6","meaning":"龍潛的深潭、虎居的洞穴，比喻極其危險的地方。","origin":"元·無名氏雜劇《昊天塔·第三折》載「跳出這龍潭虎窟」，形容身處凶險之地。","sourceBook":"《昊天塔·第三折》","tier":3,"tags":["動物","做事"]},{"id":"hu-tou-she-wei","word":"虎頭蛇尾","pinyin":"hǔ tóu shé wěi","cantonese":"fu2 tau4 se4 mei5","meaning":"開頭像虎頭般聲勢大，結尾像蛇尾般無力，比喻做事有始無終。","origin":"元·康進之《李逵負荊·第二折》載「這廝敢狗行狼心，虎頭蛇尾」，諷人做事有始無終。","sourceBook":"《李逵負荊·第二折》","tier":3,"tags":["動物","做事"]},{"id":"hu-kou-yu-sheng","word":"虎口餘生","pinyin":"hǔ kǒu yú shēng","cantonese":"fu2 hau2 jyu4 sang1","meaning":"從老虎口中逃出性命，比喻經歷大險而僥倖生還。","origin":"《莊子·盜跖》載孔子自嘲「疾走料虎頭，編虎鬚，幾不免虎口哉」，後作虎口餘生。","sourceBook":"《莊子·盜跖》","tier":3,"tags":["動物","情感"]},{"id":"hu-bei-xiong-yao","word":"虎背熊腰","pinyin":"hǔ bèi xióng yāo","cantonese":"fu2 bui3 hung4 jiu1","meaning":"背如虎般寬厚、腰如熊般粗壯，形容人身材魁梧。","origin":"元·無名氏雜劇《飛刀對箭》載「這廝倒是一條好漢……是虎背熊腰」，形容體格健壯。","sourceBook":"《飛刀對箭》","tier":3,"tags":["人物","動物"]},{"id":"jin-chan-tuo-qiao","word":"金蟬脫殼","pinyin":"jīn chán tuō qiào","cantonese":"gam1 sim4 tyut3 hok3","meaning":"蟬蛻去外殼，比喻用計脫身、留下假象迷惑對方。","origin":"元·關漢卿《謝天香·第二折》載「覓不的個金蟬脫殼這一個謊」，後喻巧計脫身。","sourceBook":"《謝天香·第二折》","tier":3,"tags":["動物","做事"]},{"id":"jin-bi-hui-huang","word":"金碧輝煌","pinyin":"jīn bì huī huáng","cantonese":"gam1 bik1 fai1 wong4","meaning":"金黃碧綠光彩奪目，形容建築裝飾華麗燦爛。","origin":"宋·羅大經《鶴林玉露·補遺》載「眾以為金碧熒煌」，形容樓閣彩繪輝煌耀眼。","sourceBook":"《鶴林玉露·補遺》","tier":3,"tags":["藝術","生活"]},{"id":"jin-ge-tie-ma","word":"金戈鐵馬","pinyin":"jīn gē tiě mǎ","cantonese":"gam1 gwo1 tit3 maa5","meaning":"金屬戈矛與披甲戰馬，形容戰爭的雄壯場面。","origin":"《新五代史·李襲吉傳》載「金戈鐵馬，蹂踐於明時」，描寫兵馬征戰的景象。","sourceBook":"《新五代史·李襲吉傳》","tier":4,"tags":["歷史","戰爭"]},{"id":"jin-zhi-yu-ye","word":"金枝玉葉","pinyin":"jīn zhī yù yè","cantonese":"gam1 zi1 juk6 jip6","meaning":"金造的枝、玉作的葉，形容出身高貴的皇族子孫。","origin":"晉·崔豹《古今注·輿服》載黃帝時「常有五色雲氣金枝玉葉止於帝上」，後指皇族後裔。","sourceBook":"《古今注·輿服》","tier":4,"tags":["人物","財富"]},{"id":"yu-shi-ju-fen","word":"玉石俱焚","pinyin":"yù shí jù fén","cantonese":"juk6 sek6 keoi1 fan4","meaning":"美玉和石頭一同燒毀，比喻好壞同歸於盡。","origin":"《尚書·胤征》載「火焱昆崗，玉石俱焚」，喻不分善惡一同毀滅。","sourceBook":"《尚書·胤征》","tier":4,"tags":["做事","情感"]},{"id":"yu-jie-bing-qing","word":"玉潔冰清","pinyin":"yù jié bīng qīng","cantonese":"juk6 git3 bing1 cing1","meaning":"像玉一樣潔白、冰一樣清淨，形容人品高潔、操守清白。","origin":"漢·桓譚《新論·妄瑕》載伯夷叔齊「冰清玉潔，以義不為孤竹之嗣」，喻節操高潔。","sourceBook":"《新論·妄瑕》","tier":4,"tags":["品格"]},{"id":"zheng-da-guang-ming","word":"正大光明","pinyin":"zhèng dà guāng míng","cantonese":"zing3 daai6 gwong1 ming4","meaning":"心術正當、行事光明，形容為人正直無私。","origin":"宋·朱熹《答呂伯恭書》載「大抵聖賢之心，正大光明，洞然四達」，形容胸懷坦蕩。","sourceBook":"《朱子文集·答呂伯恭書》","tier":2,"tags":["品格"]},{"id":"zheng-jin-wei-zuo","word":"正襟危坐","pinyin":"zhèng jīn wēi zuò","cantonese":"zing3 kam1 ngai4 zo6","meaning":"整理衣襟端正坐好，形容嚴肅恭敬的樣子。","origin":"《史記·日者列傳》載宋忠、賈誼「獵纓正襟危坐」，形容端莊恭敬地坐著。","sourceBook":"《史記·日者列傳》","tier":4,"tags":["人物","生活"]},{"id":"zheng-ben-qing-yuan","word":"正本清源","pinyin":"zhèng běn qīng yuán","cantonese":"zing3 bun2 cing1 jyun4","meaning":"從根本上整頓、從源頭上清理，比喻徹底解決問題。","origin":"《晉書·武帝紀》載「思與天下式明王度，正本清源」，指從根本糾正弊端。","sourceBook":"《晉書·武帝紀》","tier":4,"tags":["社會","做事"]},{"id":"tang-tang-zheng-zheng","word":"堂堂正正","pinyin":"táng táng zhèng zhèng","cantonese":"tong4 tong4 zing3 zing3","meaning":"形容儀表莊重大方，也形容行事光明磊落。","origin":"《孫子兵法·軍爭》載「無邀正正之旗，勿擊堂堂之陣」，後作堂堂正正，喻光明正大。","sourceBook":"《孫子兵法·軍爭》","tier":2,"tags":["品格"]},{"id":"xing-yun-liu-shui","word":"行雲流水","pinyin":"xíng yún liú shuǐ","cantonese":"hang4 wan4 lau4 seoi2","meaning":"像浮雲流動、流水自然，形容文章或動作自然流暢。","origin":"宋·蘇軾《答謝民師書》載「大略如行雲流水，初無定質，但常行於所當行」，喻文章自然。","sourceBook":"《東坡全集·答謝民師書》","tier":3,"tags":["藝術","自然"]},{"id":"xing-shi-zou-rou","word":"行屍走肉","pinyin":"xíng shī zǒu ròu","cantonese":"hang4 si1 zau2 juk6","meaning":"會走動的屍體，比喻沒有靈魂、無所作為的人。","origin":"晉·王嘉《拾遺記·卷六》載「不學者，雖存，謂之行屍走肉耳」，諷不學之人如行屍。","sourceBook":"《拾遺記·卷六》","tier":4,"tags":["人物","品格"]},{"id":"xing-se-cong-cong","word":"行色匆匆","pinyin":"xíng sè cōng cōng","cantonese":"hang4 sik1 cung1 cung1","meaning":"出行時神色匆忙，形容旅途急促、來去匆匆。","origin":"唐·牟融《送客之杭》詩載「西風吹冷透貂裘，行色匆匆不暫留」，形容匆忙趕路。","sourceBook":"《全唐詩·送客之杭》","tier":4,"tags":["生活","情感"]},{"id":"li-ying-wai-he","word":"裡應外合","pinyin":"lǐ yìng wài hé","cantonese":"leoi5 jing3 ngoi6 hap6","meaning":"外面攻打、裡面接應，形容內外配合行動。","origin":"元·楊梓《豫讓吞炭·第三折》載「反被韓魏同謀，里應外合，決水淹我軍」，指內外勾結。","sourceBook":"《豫讓吞炭·第三折》","tier":4,"tags":["做事","社會"]},{"id":"zhong-liu-di-zhu","word":"中流砥柱","pinyin":"zhōng liú dǐ zhù","cantonese":"zung1 lau4 dai2 cyu5","meaning":"立在急流中的砥柱山，比喻能擔當重任、支撐局面的中堅人物。","origin":"《晏子春秋·內篇諫下》載「黿銜左驂，以入砥柱之中流」，後以中流砥柱喻堅強支柱。","sourceBook":"《晏子春秋·內篇諫下》","tier":3,"tags":["人物","社會"]},{"id":"zhong-bao-si-nang","word":"中飽私囊","pinyin":"zhōng bǎo sī náng","cantonese":"zung1 baau2 si1 nong4","meaning":"把公款裝進自己口袋，形容貪污舞弊、營私自肥。","origin":"《韓非子·外儲說右下》載「府庫空虛於上，百姓貧餓於下，然而奸吏富矣」，即中飽私囊。","sourceBook":"《韓非子·外儲說右下》","tier":4,"tags":["社會","財富"]},{"id":"shang-xia-yi-xin","word":"上下一心","pinyin":"shàng xià yī xīn","cantonese":"soeng6 haa6 jat1 sam1","meaning":"上級和下屬同心協力，形容團結一致。","origin":"《淮南子·詮言訓》載「上下一心，君臣同志」，形容上下齊心、目標一致。","sourceBook":"《淮南子·詮言訓》","tier":3,"tags":["社會","做事"]},{"id":"shang-xing-xia-xiao","word":"上行下效","pinyin":"shàng xíng xià xiào","cantonese":"soeng6 hang4 haa6 haau6","meaning":"上面怎麼做、下面就照著學，形容上位者的榜樣作用。","origin":"《舊唐書·賈曾傳》載「上行下效，淫俗將成」，說明在上者行為會影響風氣。","sourceBook":"《舊唐書·賈曾傳》","tier":3,"tags":["社會","做事"]},{"id":"xia-bi-cheng-zhang","word":"下筆成章","pinyin":"xià bǐ chéng zhāng","cantonese":"haa6 bat1 sing4 zoeng1","meaning":"一下筆就寫成文章，形容文思敏捷、才華出眾。","origin":"《三國志·魏書·陳思王植傳》載曹植「言出為論，下筆成章」，形容其文才敏捷。","sourceBook":"《三國志·魏書·陳思王植傳》","tier":3,"tags":["寫作","學習"]},{"id":"xia-li-ba-ren","word":"下里巴人","pinyin":"xià lǐ bā rén","cantonese":"haa6 lei5 baa1 jan4","meaning":"古代楚國通俗歌曲名，後泛指通俗淺近的文學藝術。","origin":"宋玉《對楚王問》載「客有歌於郢中者，其始曰下里巴人，國中屬而和者數千人」。","sourceBook":"《文選·對楚王問》","tier":4,"tags":["藝術","社會"]},{"id":"you-shi-you-zhong","word":"有始有終","pinyin":"yǒu shǐ yǒu zhōng","cantonese":"jau5 ci2 jau5 zung1","meaning":"有開頭也有結尾，形容做事貫徹到底、不半途而廢。","origin":"《論語·子張》載「有始有卒者，其惟聖人乎」，後作有始有終，勉人做事貫徹。","sourceBook":"《論語·子張》","tier":1,"tags":["做事","堅持"]},{"id":"you-shi-wu-kong","word":"有恃無恐","pinyin":"yǒu shì wú kǒng","cantonese":"jau5 ci5 mou4 hung2","meaning":"有所倚仗就不害怕，形容有靠山而膽子大。","origin":"《左傳·僖公二十六年》載齊孝公伐魯，展喜答「何恃而不恐」，後反其意為有恃無恐。","sourceBook":"《左傳·僖公二十六年》","tier":3,"tags":["情感","做事"]},{"id":"you-kou-jie-bei","word":"有口皆碑","pinyin":"yǒu kǒu jiē bēi","cantonese":"jau5 hau2 gaai1 bei1","meaning":"人人嘴裡都在稱讚，形容功德或好名聲廣為傳頌。","origin":"宋·釋普濟《五燈會元·卷十七》載「勸君不用鐫頑石，路上行人口似碑」，後作有口皆碑。","sourceBook":"《五燈會元·卷十七》","tier":4,"tags":["社會","說話"]},{"id":"you-sheng-you-se","word":"有聲有色","pinyin":"yǒu shēng yǒu sè","cantonese":"jau5 sing1 jau5 sik1","meaning":"有聲音有色彩，形容敘述或表演生動精彩。","origin":"清·洪亮吉《北江詩話·卷一》載「寫月有聲有色如此，後人復何着筆耶」，讚描寫生動。","sourceBook":"《北江詩話·卷一》","tier":2,"tags":["藝術","說話"]},{"id":"you-tiao-bu-wen","word":"有條不紊","pinyin":"yǒu tiáo bù wěn","cantonese":"jau5 tiu4 bat1 man6","meaning":"有條理而不混亂，形容做事有次序、有章法。","origin":"《尚書·盤庚上》載「若網在綱，有條而不紊」，喻處事有條理則不亂。","sourceBook":"《尚書·盤庚上》","tier":3,"tags":["做事","思維"]},{"id":"you-yong-wu-mou","word":"有勇無謀","pinyin":"yǒu yǒng wú móu","cantonese":"jau5 jung5 mou4 mau4","meaning":"只有勇氣而沒有計謀，形容魯莽行事、缺少謀略。","origin":"唐·陸贄《論兩河及淮西利害狀》載「武俊蕃種，有勇無謀」，形容有勇而乏智。","sourceBook":"《翰苑集·論兩河及淮西利害狀》","tier":3,"tags":["人物","思維"]},{"id":"you-qiu-bi-ying","word":"有求必應","pinyin":"yǒu qiú bì yìng","cantonese":"jau5 kau4 bit1 jing3","meaning":"只要有人請求就必定答應，形容樂於助人、慷慨。","origin":"清·霽園主人《夜譚隨錄·崔秀才》載「往日良朋密友，有求必應」，形容慷慨相助。","sourceBook":"《夜譚隨錄·崔秀才》","tier":2,"tags":["生活","情感"]},{"id":"han-dan-xue-bu","word":"邯鄲學步","pinyin":"hán dān xué bù","cantonese":"hon4 daan1 hok6 bou6","meaning":"到邯鄲學人家走路，不但沒學成，連原本的步法也忘了，比喻盲目模仿而弄巧成拙。","origin":"《莊子·秋水》載燕國少年到趙國邯鄲學走路，未得其能，又失故步，只好爬著回去。","sourceBook":"《莊子·秋水》","tier":2,"tags":["寓言","學習"]},{"id":"dong-shi-xiao-pin","word":"東施效顰","pinyin":"dōng shī xiào pín","cantonese":"dung1 si1 haau6 pan4","meaning":"醜女東施模仿美女西施皺眉，結果更難看，比喻盲目模仿、弄巧成拙。","origin":"《莊子·天運》載西施心痛而顰，東施見之美，歸而效顰，村里富人見之閉門不出。","sourceBook":"《莊子·天運》","tier":2,"tags":["寓言","人物"]},{"id":"tang-lang-bu-chan","word":"螳螂捕蟬","pinyin":"táng láng bǔ chán","cantonese":"tong4 long4 bou6 sim4","meaning":"螳螂捕蟬時不知黃雀在後，比喻只顧眼前利益而不顧後患。","origin":"《莊子·山木》載螳螂捕蟬而忘其身，異鵲在後又欲取之，說明見利忘害之危。","sourceBook":"《莊子·山木》","tier":2,"tags":["寓言","動物"]},{"id":"zhao-san-mu-si","word":"朝三暮四","pinyin":"zhāo sān mù sì","cantonese":"ziu1 saam1 mou6 sei3","meaning":"原指用欺騙手法愚弄人，後多比喻反覆無常、經常變卦。","origin":"《莊子·齊物論》載狙公以橡實餵猴，朝三暮四眾狙怒，朝四暮三則眾狙喜，喻名實未變而喜怒不同。","sourceBook":"《莊子·齊物論》","tier":2,"tags":["寓言","思維"]},{"id":"dai-ruo-mu-ji","word":"呆若木雞","pinyin":"dāi ruò mù jī","cantonese":"ngoi4 joek6 muk6 gai1","meaning":"呆得像木頭做的雞，形容人因驚嚇或發愣而一動不動。","origin":"《莊子·達生》載紀渻子為齊王養鬥雞，養到「望之似木雞」時，其他雞望風而逃。","sourceBook":"《莊子·達生》","tier":2,"tags":["寓言","人物"]},{"id":"chen-yu-luo-yan","word":"沉魚落雁","pinyin":"chén yú luò yàn","cantonese":"cam4 jyu4 lok6 ngaan6","meaning":"魚沉水底、雁落沙洲，形容女子容貌極美。","origin":"《莊子·齊物論》以毛嬙、麗姬之美為喻，後人合「沉魚落雁」形容女子美得使魚雁驚避。","sourceBook":"《莊子·齊物論》","tier":3,"tags":["人物","動物"]},{"id":"pao-ding-jie-niu","word":"庖丁解牛","pinyin":"páo dīng jiě niú","cantonese":"paau4 ding1 gaai2 ngau4","meaning":"廚師分解牛體，比喻技藝純熟、做事得心應手。","origin":"《莊子·養生主》載庖丁為文惠君解牛，刀法嫻熟，十九年刀刃如新，喻順應規律而行。","sourceBook":"《莊子·養生主》","tier":3,"tags":["寓言","做事"]},{"id":"you-ren-you-yu","word":"游刃有餘","pinyin":"yóu rèn yǒu yú","cantonese":"jau4 jan6 jau5 jyu4","meaning":"刀刃在骨節空隙中運轉還有餘地，比喻技藝高超、應付自如。","origin":"《莊子·養生主》載庖丁解牛「恢恢乎其於遊刃必有餘地矣」，後喻處理事情輕鬆自如。","sourceBook":"《莊子·養生主》","tier":3,"tags":["做事","思維"]},{"id":"peng-cheng-wan-li","word":"鵬程萬里","pinyin":"péng chéng wàn lǐ","cantonese":"paang4 cing4 maan6 lei5","meaning":"大鵬飛翔萬里，比喻前程遠大、志向非凡。","origin":"《莊子·逍遙遊》載北冥之鵬「摶扶搖而上者九萬里」，後以鵬程萬里祝人前程遠大。","sourceBook":"《莊子·逍遙遊》","tier":2,"tags":["人物","學習"]},{"id":"wang-yang-xing-tan","word":"望洋興嘆","pinyin":"wàng yáng xīng tàn","cantonese":"mong6 joeng4 hing1 taan3","meaning":"仰望大海而感嘆渺小，比喻因力量不足而感到無可奈何。","origin":"《莊子·秋水》載河伯見北海若，始覺自身渺小，望洋向若而嘆，喻見識不足而自愧。","sourceBook":"《莊子·秋水》","tier":3,"tags":["情感","寓言"]},{"id":"xiang-ru-yi-mo","word":"相濡以沫","pinyin":"xiāng rú yǐ mò","cantonese":"soeng1 jyu4 ji5 mut6","meaning":"泉水乾涸時魚互相以口沫濕潤對方，比喻患難中互相扶持。","origin":"《莊子·大宗師》載「泉涸，魚相與處於陸，相呴以濕，相濡以沫」，下句說不如相忘於江湖。","sourceBook":"《莊子·大宗師》","tier":4,"tags":["情感","寓言"]},{"id":"xin-huo-xiang-chuan","word":"薪火相傳","pinyin":"xīn huǒ xiāng chuán","cantonese":"san1 fo2 soeng1 cyun4","meaning":"柴雖燒盡火種仍傳下去，比喻學問或精神一代代傳承。","origin":"《莊子·養生主》載「指窮於為薪，火傳也，不知其盡也」，喻道術薪火相傳不絕。","sourceBook":"《莊子·養生主》","tier":3,"tags":["學習","社會"]},{"id":"da-xiang-jing-ting","word":"大相徑庭","pinyin":"dà xiāng jìng tíng","cantonese":"daai6 soeng1 ging3 ting4","meaning":"彼此相差很遠，形容意見或情況大不相同。","origin":"《莊子·逍遙遊》載肩吾轉述接輿之言，堯認為「大有徑庭，不近人情」，後作大相徑庭。","sourceBook":"《莊子·逍遙遊》","tier":4,"tags":["思維","說話"]},{"id":"yue-zu-dai-pao","word":"越俎代庖","pinyin":"yuè zǔ dài páo","cantonese":"jyut6 zo2 doi6 paau4","meaning":"越過自己的職責去代人辦事，比喻多管閒事或越權。","origin":"《莊子·逍遙遊》載許由對堯說「庖人雖不治庖，尸祝不越樽俎而代之矣」，喻各守其職。","sourceBook":"《莊子·逍遙遊》","tier":5,"tags":["寓言","做事"]},{"id":"bai-ju-guo-xi","word":"白駒過隙","pinyin":"bái jū guò xì","cantonese":"baak6 keoi1 gwo3 kwik1","meaning":"白馬從縫隙前一閃而過，比喻時間過得極快。","origin":"《莊子·知北遊》載「人生天地之間，若白駒之過郤，忽然而已」，喻光陰飛逝。","sourceBook":"《莊子·知北遊》","tier":4,"tags":["時間","人生"]},{"id":"wo-jiao-zhi-zheng","word":"蝸角之爭","pinyin":"wō jiǎo zhī zhēng","cantonese":"wo1 gok3 zi1 zang1","meaning":"在蝸牛角上爭奪地盤，比喻為極小的利益爭執，毫無意義。","origin":"《莊子·則陽》載蝸牛左角有觸氏、右角有蠻氏，兩國為爭地而戰，伏屍數萬，喻爭端渺小。","sourceBook":"《莊子·則陽》","tier":5,"tags":["寓言","社會"]},{"id":"he-zhe-zhi-fu","word":"涸轍之鮒","pinyin":"hé zhé zhī fù","cantonese":"kok3 cit3 zi1 fu6","meaning":"車轍水乾時受困的鯽魚，比喻身處困境、急需救援的人。","origin":"《莊子·外物》載莊周見車轍中鮒魚求救，魚求斗升之水活命，莊周卻說將引西江水，魚憤然。","sourceBook":"《莊子·外物》","tier":5,"tags":["寓言","情感"]},{"id":"ku-yu-zhi-si","word":"枯魚之肆","pinyin":"kū yú zhī sì","cantonese":"fu1 jyu4 zi1 si3","meaning":"賣乾魚的店鋪，比喻身處絕境、為時已晚。","origin":"《莊子·外物》載鮒魚謂莊周「不如早索我於枯魚之肆」，喻遠水救不了近火。","sourceBook":"《莊子·外物》","tier":5,"tags":["寓言","生活"]},{"id":"ye-wei-tu-zhong","word":"曳尾塗中","pinyin":"yè wěi tú zhōng","cantonese":"jai5 mei5 tou4 zung1","meaning":"拖著尾巴在泥中爬行，比喻寧願貧賤自在而不願受官場束縛。","origin":"《莊子·秋水》載莊子以神龜寧生而曳尾於塗中，不願死而留骨為貴，表明寧願自由。","sourceBook":"《莊子·秋水》","tier":5,"tags":["寓言","生活"]},{"id":"tan-li-de-zhu","word":"探驪得珠","pinyin":"tàn lí dé zhū","cantonese":"taam3 lei4 dak1 zyu1","meaning":"到黑龍頷下取得珍珠，比喻文章切中要害、深得精髓。","origin":"《莊子·列禦寇》載有少年於驪龍頷下得千金之珠，喻冒大險而得大利或得文之精要。","sourceBook":"《莊子·列禦寇》","tier":5,"tags":["寓言","寫作"]},{"id":"tu-long-zhi-ji","word":"屠龍之技","pinyin":"tú lóng zhī jì","cantonese":"tou4 lung4 zi1 gei6","meaning":"學會殺龍的技術卻無龍可殺，比喻本領雖高卻不合實用。","origin":"《莊子·列禦寇》載朱泙漫學屠龍於支離益，耗盡千金，三年技成而無所用其巧。","sourceBook":"《莊子·列禦寇》","tier":5,"tags":["寓言","學習"]},{"id":"yun-jin-cheng-feng","word":"運斤成風","pinyin":"yùn jīn chéng fēng","cantonese":"wan6 gan1 sing4 fung1","meaning":"揮動斧頭帶起風聲，形容技藝純熟高超。","origin":"《莊子·徐無鬼》載匠石運斤成風，削去郢人鼻尖薄堊而不傷其鼻，喻技藝精妙。","sourceBook":"《莊子·徐無鬼》","tier":5,"tags":["藝術","寓言"]},{"id":"mo-ni-zhi-jiao","word":"莫逆之交","pinyin":"mò nì zhī jiāo","cantonese":"mok6 jik6 zi1 gaau1","meaning":"彼此心意相通、毫無違逆的朋友，形容感情深厚的知交。","origin":"《莊子·大宗師》載子祀、子輿等四人「相視而笑，莫逆於心，遂相與為友」。","sourceBook":"《莊子·大宗師》","tier":4,"tags":["情感","人物"]},{"id":"tang-bi-dang-che","word":"螳臂當車","pinyin":"táng bì dāng chē","cantonese":"tong4 bei3 dong1 ce1","meaning":"螳螂舉臂想阻擋車輪，比喻自不量力、必然失敗。","origin":"《莊子·人間世》載螳螂「怒其臂以當車轍，不知其不勝任也」，喻高估自己力量。","sourceBook":"《莊子·人間世》","tier":4,"tags":["寓言","動物"]},{"id":"qing-zhu-nan-shu","word":"罄竹難書","pinyin":"qìng zhú nán shū","cantonese":"hing3 zuk1 naan4 syu1","meaning":"用盡竹子也寫不完，形容罪惡極多、難以盡述。","origin":"《舊唐書·李密傳》載討隋煬帝檄文「罄南山之竹，書罪未窮；決東海之波，流惡難盡」。","sourceBook":"《舊唐書·李密傳》","tier":5,"tags":["歷史","社會"]},{"id":"ya-zi-bi-bao","word":"睚眥必報","pinyin":"yá zì bì bào","cantonese":"ngaai4 zaai6 bit1 bou3","meaning":"連瞪眼這樣的小怨都要報復，形容氣量狹小、報復心重。","origin":"《史記·范雎蔡澤列傳》載「一飯之德必償，睚眥之怨必報」，形容恩怨分明而心胸狹窄。","sourceBook":"《史記·范雎蔡澤列傳》","tier":5,"tags":["品格","情感"]},{"id":"hang-xie-yi-qi","word":"沆瀣一氣","pinyin":"hàng xiè yī qì","cantonese":"hong4 haai6 jat1 hei3","meaning":"原指師生情誼相投，後多比喻臭味相投、勾結一起做壞事。","origin":"宋·錢易《南部新書·戊集》載崔沆主考取崔瀣，時人稱「沆瀣一氣」，本無貶義，後轉為貶詞。","sourceBook":"《南部新書·戊集》","tier":5,"tags":["社會","人物"]},{"id":"bi-lu-lan-lv","word":"篳路藍縷","pinyin":"bì lù lán lǚ","cantonese":"bat1 lou6 laam4 lau5","meaning":"駕著簡陋柴車、穿著破舊衣服，形容開創事業的艱辛。","origin":"《左傳·宣公十二年》載楚人教導先君「篳路藍縷，以啟山林」，形容開疆闢土的勞苦。","sourceBook":"《左傳·宣公十二年》","tier":5,"tags":["做事","歷史"]},{"id":"ying-shu-yan-shuo","word":"郢書燕說","pinyin":"yǐng shū yān shuō","cantonese":"jing5 syu1 jin1 syut3","meaning":"郢人寫信、燕人誤解，比喻穿鑿附會、曲解原意。","origin":"《韓非子·外儲說左上》載郢人夜書，因火不明而說「舉燭」，誤書二字，燕相曲解為治國之道。","sourceBook":"《韓非子·外儲說左上》","tier":5,"tags":["寓言","學習"]},{"id":"jiao-zhu-gu-se","word":"膠柱鼓瑟","pinyin":"jiāo zhù gǔ sè","cantonese":"gaau1 cyu5 gu2 sat1","meaning":"把瑟柱黏死再彈，比喻拘泥固執、不知變通。","origin":"《史記·廉頗藺相如列傳》載趙括只會讀兵書，藺相如謂「若膠柱而鼓瑟耳」，喻不知應變。","sourceBook":"《史記·廉頗藺相如列傳》","tier":5,"tags":["做事","思維"]},{"id":"shi-wei-su-can","word":"尸位素餐","pinyin":"shī wèi sù cān","cantonese":"si1 wai6 sou3 caan1","meaning":"佔著職位白吃飯而不做事，形容官員怠忽職守。","origin":"《漢書·朱雲傳》載朱雲斥朝臣「上不能匡主，下亡以益民，皆尸位素餐」，喻尸祿無為。","sourceBook":"《漢書·朱雲傳》","tier":5,"tags":["社會","品格"]},{"id":"qi-qi-ai-ai","word":"期期艾艾","pinyin":"qī qī ài ài","cantonese":"kei4 kei4 ngaai6 ngaai6","meaning":"形容說話結結巴巴、口吃而不流利，令人聽得吃力。","origin":"《史記·張丞相列傳》載周昌口吃，言「期期知其不可」；《世說新語·言語》載鄧艾自稱「艾艾」，後合為成語。","sourceBook":"《史記·張丞相列傳》","tier":5,"tags":["說話","人物"]},{"id":"pi-fu-han-shu","word":"蚍蜉撼樹","pinyin":"pí fú hàn shù","cantonese":"pei4 fau4 ham6 syu6","meaning":"螞蟻想搖動大樹，比喻不自量力、妄想動搖強大者。","origin":"唐·韓愈《調張籍》載「蚍蜉撼大樹，可笑不自量」，諷妄議李白杜甫之人。","sourceBook":"《昌黎先生集·調張籍》","tier":5,"tags":["動物","思維"]},{"id":"mai-guan-yu-jue","word":"賣官鬻爵","pinyin":"mài guān yù jué","cantonese":"maai6 gun1 juk6 zoek3","meaning":"出賣官位和爵位以圖利，形容吏治腐敗。","origin":"《宋書·鄧琬傳》載「父子並賣官鬻爵」，指掌權者公開以官職爵位換取錢財。","sourceBook":"《宋書·鄧琬傳》","tier":5,"tags":["社會","財富"]},{"id":"bi-zhou-zuo-ye","word":"俾晝作夜","pinyin":"bǐ zhòu zuò yè","cantonese":"bei2 zau3 zok3 je6","meaning":"把白天當作夜晚，形容晝夜顛倒、生活荒淫。","origin":"《詩經·大雅·蕩》載「或號式呼，俾晝作夜」，諷刺酗酒作樂、日夜顛倒的貴族。","sourceBook":"《詩經·大雅·蕩》","tier":5,"tags":["生活","社會"]},{"id":"qin-shou-e-mei","word":"螓首蛾眉","pinyin":"qín shǒu é méi","cantonese":"ceon4 sau2 ngo4 mei4","meaning":"額頭如螓般寬廣、眉毛如蛾般細長，形容女子容貌美麗。","origin":"《詩經·衛風·碩人》載「螓首蛾眉，巧笑倩兮，美目盼兮」，描寫衛莊姜之美。","sourceBook":"《詩經·衛風·碩人》","tier":5,"tags":["人物","情感"]},{"id":"wu-niu-chuan-yue","word":"吳牛喘月","pinyin":"wú niú chuǎn yuè","cantonese":"ng4 ngau4 cyun2 jyut6","meaning":"吳地水牛怕熱，見月亮也以為是太陽而喘氣，比喻因疑懼而過度害怕。","origin":"《世說新語·言語》載滿奮答晉武帝「臣猶吳牛，見月而喘」，喻心中有懼而胡亂驚怕。","sourceBook":"《世說新語·言語》","tier":5,"tags":["動物","情感"]},{"id":"mang-ren-xia-ma","word":"盲人瞎馬","pinyin":"máng rén xiā mǎ","cantonese":"maang4 jan4 hat6 maa5","meaning":"盲人騎著瞎馬，比喻處境極其危險而不知。","origin":"《世說新語·排調》載「盲人騎瞎馬，夜半臨深池」，形容危險萬分而不自覺。","sourceBook":"《世說新語·排調》","tier":5,"tags":["情感","寓言"]},{"id":"yi-lin-wei-he","word":"以鄰為壑","pinyin":"yǐ lín wéi hè","cantonese":"ji5 leon4 wai4 kok3","meaning":"把鄰國當作排水溝，比喻把困難或禍害轉嫁他人。","origin":"《孟子·告子下》載白圭治水，孟子曰「今吾子以鄰國為壑」，責其以鄰為犧牲。","sourceBook":"《孟子·告子下》","tier":5,"tags":["社會","做事"]},{"id":"wei-yuan-qu-yu","word":"為淵驅魚","pinyin":"wèi yuān qū yú","cantonese":"wai6 jyun1 keoi1 jyu4","meaning":"把魚趕到深淵去，比喻政策不當，把人民推向敵方。","origin":"《孟子·離婁上》載「為淵驅魚者，獺也」，喻暴政把百姓趕向敵國。","sourceBook":"《孟子·離婁上》","tier":5,"tags":["社會","做事"]},{"id":"ju-ren-qian-li","word":"拒人千里","pinyin":"jù rén qiān lǐ","cantonese":"keoi5 jan4 cin1 lei5","meaning":"把人拒絕在千里之外，形容態度傲慢、不願接近人。","origin":"《孟子·告子下》載「距人於千里之外」，指態度拒人。","sourceBook":"《孟子·告子下》","tier":5,"tags":["說話","人物"]},{"id":"bu-yu-zhi-yu","word":"不虞之譽","pinyin":"bù yú zhī yù","cantonese":"bat1 jyu4 zi1 jyu6","meaning":"意料之外的讚譽，形容名不副實的稱讚。","origin":"《孟子·離婁上》載「有不虞之譽，有求全之毀」，指意外的美譽與苛求的詆毀。","sourceBook":"《孟子·離婁上》","tier":5,"tags":["社會","情感"]},{"id":"qiu-quan-zhi-hui","word":"求全之毀","pinyin":"qiú quán zhī huǐ","cantonese":"kau4 cyun4 zi1 wai2","meaning":"因求全責備而來的詆毀，形容苛求完美反招批評。","origin":"《孟子·離婁上》載「有不虞之譽，有求全之毀」，指過分求全易招人毀謗。","sourceBook":"《孟子·離婁上》","tier":5,"tags":["社會","情感"]},{"id":"yi-fu-zhong-xiu","word":"一傅眾咻","pinyin":"yī fù zhòng xiū","cantonese":"jat1 fu6 zung3 jau1","meaning":"一個人教導、眾人喧擾，比喻學習環境不良、難以有成。","origin":"《孟子·滕文公下》載「一齊人傅之，眾楚人咻之」，雖日日鞭撻求其學齊語亦不可得。","sourceBook":"《孟子·滕文公下》","tier":5,"tags":["學習","寓言"]},{"id":"yi-bao-yi-bao","word":"以暴易暴","pinyin":"yǐ bào yì bào","cantonese":"ji5 bou6 jik6 bou6","meaning":"用暴政代替暴政，形容統治手段同樣殘暴，於事無補。","origin":"《史記·伯夷列傳》載伯夷、叔齊之歌「以暴易暴兮，不知其非矣」，諷武王伐紂。","sourceBook":"《史記·伯夷列傳》","tier":5,"tags":["歷史","社會"]},{"id":"yun-zheng-xia-wei","word":"雲蒸霞蔚","pinyin":"yún zhēng xiá wèi","cantonese":"wan4 zing1 haa4 wai3","meaning":"雲氣升騰、彩霞聚集，形容景物絢麗多姿。","origin":"《世說新語·言語》載會稽山川「千巖競秀，萬壑爭流……若雲興霞蔚」，形容山川秀美。","sourceBook":"《世說新語·言語》","tier":5,"tags":["自然","藝術"]},{"id":"hao-yue-qian-li","word":"皓月千里","pinyin":"hào yuè qiān lǐ","cantonese":"hou6 jyut6 cin1 lei5","meaning":"皎潔的月光照耀千里，形容月夜景色遼闊明朗。","origin":"宋·范仲淹《岳陽樓記》載「長煙一空，皓月千里，浮光躍金，靜影沉璧」，描寫洞庭月夜。","sourceBook":"《范文正公集·岳陽樓記》","tier":5,"tags":["自然"]},{"id":"wang-feng-xi-xin","word":"望峰息心","pinyin":"wàng fēng xī xīn","cantonese":"mong6 fung1 sik1 sam1","meaning":"望見山峰而平息追求名利之心，形容自然景物使人恬淡。","origin":"南朝梁·吳均《與朱元思書》載「鳶飛戾天者，望峰息心；經綸世務者，窺谷忘反」。","sourceBook":"《與朱元思書》","tier":5,"tags":["自然","情感"]},{"id":"an-zhi-ting-lan","word":"岸芷汀蘭","pinyin":"àn zhǐ tīng lán","cantonese":"ngon6 zi2 ting1 laan4","meaning":"岸邊的白芷與水洲上的蘭草，形容水邊花草芬芳的美景。","origin":"宋·范仲淹《岳陽樓記》載「岸芷汀蘭，郁郁青青」，描寫洞庭湖畔花草繁茂。","sourceBook":"《范文正公集·岳陽樓記》","tier":5,"tags":["自然"]},{"id":"yi-xin-yi-yi","word":"一心一意","pinyin":"yī xīn yī yì","cantonese":"jat1 sam1 jat1 ji3","meaning":"心思專一、沒有雜念，形容做事專心致志。","origin":"《三國志·魏書·杜恕傳》裴松之注引《杜氏新書》載「推一心，任一意，直而行之耳」，後作一心一意。","sourceBook":"《三國志·魏書·杜恕傳》","tier":1,"tags":["情感","做事"]},{"id":"ban-xin-ban-yi","word":"半信半疑","pinyin":"bàn xìn bàn yí","cantonese":"bun3 seon3 bun3 ji4","meaning":"一半相信、一半懷疑，形容對事情真假難以確定。","origin":"三國魏·嵇康《答釋難宅無吉凶攝生論》載「何為半信而半不信耶」，形容疑信參半。","sourceBook":"《嵇中散集·答釋難宅無吉凶攝生論》","tier":1,"tags":["情感","思維"]},{"id":"qian-jun-wan-ma","word":"千軍萬馬","pinyin":"qiān jūn wàn mǎ","cantonese":"cin1 gwan1 maan6 maa5","meaning":"形容兵馬眾多、陣容浩大，聲勢十分驚人。","origin":"《南史·陳慶之傳》載童謠「名軍大將莫自牢，千兵萬馬避白袍」，形容軍隊浩大。","sourceBook":"《南史·陳慶之傳》","tier":1,"tags":["歷史","戰爭"]},{"id":"wu-hu-si-hai","word":"五湖四海","pinyin":"wǔ hú sì hǎi","cantonese":"ng5 wu4 sei3 hoi2","meaning":"泛指全國各地或世界各地，形容範圍廣大。","origin":"唐·呂岩《絕句》載「斗笠為帆扇作舟，五湖四海任遨遊」，後用以指各地各處。","sourceBook":"《全唐詩·絕句》","tier":1,"tags":["社會","自然"]},{"id":"qian-bian-wan-hua","word":"千變萬化","pinyin":"qiān biàn wàn huà","cantonese":"cin1 bin3 maan6 faa3","meaning":"變化無窮無盡，形容事物變化多端、難以捉摸。","origin":"《列子·周穆王》載「千變萬化，不可窮極」，形容變化無窮無盡。","sourceBook":"《列子·周穆王》","tier":1,"tags":["思維","自然"]},{"id":"liang-yao-ku-kou","word":"良藥苦口","pinyin":"liáng yào kǔ kǒu","cantonese":"loeng4 joek6 fu2 hau2","meaning":"能治病的藥味道苦，比喻忠告雖不中聽卻有益。","origin":"《韓非子·外儲說左上》載「夫良藥苦於口，而智者勸而飲之，知其入而已己疾也」。","sourceBook":"《韓非子·外儲說左上》","tier":1,"tags":["品格","說話"]},{"id":"zhong-yan-ni-er","word":"忠言逆耳","pinyin":"zhōng yán nì ěr","cantonese":"zung1 jin4 jik6 ji5","meaning":"忠誠的勸告聽起來不順耳，形容真話往往不易接受。","origin":"《孔子家語·六本》載「良藥苦於口而利於病，忠言逆於耳而利於行」。","sourceBook":"《孔子家語·六本》","tier":1,"tags":["品格","說話"]},{"id":"che-shui-ma-long","word":"車水馬龍","pinyin":"chē shuǐ mǎ lóng","cantonese":"ce1 seoi2 maa5 lung4","meaning":"車像流水、馬像游龍，形容車馬往來不絕、熱鬧繁華。","origin":"《後漢書·明德馬皇后紀》載「車如流水，馬如游龍」，形容外戚門前車馬極盛。","sourceBook":"《後漢書·明德馬皇后紀》","tier":1,"tags":["社會","生活"]},{"id":"ye-yi-ji-ri","word":"夜以繼日","pinyin":"yè yǐ jì rì","cantonese":"je6 ji5 gai3 jat6","meaning":"用夜晚接續白天，形容日夜不停、勤奮工作。","origin":"《莊子·至樂》載「夫貴者，夜以繼日，思慮善否」，《孟子·離婁下》亦有「夜以繼日」之語。","sourceBook":"《孟子·離婁下》","tier":1,"tags":["學習","堅持"]},{"id":"de-xin-ying-shou","word":"得心應手","pinyin":"dé xīn yìng shǒu","cantonese":"dak1 sam1 jing3 sau2","meaning":"心裡怎麼想，手就怎麼做，形容技藝純熟、運用自如。","origin":"《莊子·天道》載輪扁斲輪「得之於手而應於心」，後作得心應手，喻心手相應。","sourceBook":"《莊子·天道》","tier":1,"tags":["做事","藝術"]},{"id":"jiu-si-yi-sheng","word":"九死一生","pinyin":"jiǔ sǐ yī shēng","cantonese":"gau2 sei2 jat1 sang1","meaning":"九分死、一分生，形容經歷極大危險而僥倖生還。","origin":"戰國楚·屈原《離騷》載「亦余心之所善兮，雖九死其猶未悔」，後以九死一生喻險境餘生。","sourceBook":"《楚辭·離騷》","tier":1,"tags":["情感","生活"]},{"id":"tan-xiao-feng-sheng","word":"談笑風生","pinyin":"tán xiào fēng shēng","cantonese":"taam4 siu3 fung1 sang1","meaning":"談笑時興致勃勃、風趣橫生，形容談話生動愉快。","origin":"宋·辛棄疾《念奴嬌·贈夏成玉》詞載「遐想後日蛾眉，兩山橫黛，談笑風生頰」，形容談笑有風采。","sourceBook":"《稼軒詞·念奴嬌》","tier":1,"tags":["說話","情感"]},{"id":"ying-you-jin-you","word":"應有盡有","pinyin":"yīng yǒu jìn yǒu","cantonese":"jing1 jau5 zeon6 jau5","meaning":"該有的全都有，形容物品齊全、非常豐富。","origin":"《宋書·江智淵傳》載「人所應有盡有，人所應無盡無，其江智淵乎」，讚其取捨有度。","sourceBook":"《宋書·江智淵傳》","tier":1,"tags":["生活","財富"]},{"id":"san-si-er-xing","word":"三思而行","pinyin":"sān sī ér xíng","cantonese":"saam3 si1 ji4 hang4","meaning":"反覆思考後才行動，形容做事謹慎、考慮周詳。","origin":"《論語·公冶長》載「季文子三思而後行。子聞之曰：再，斯可矣」，後作三思而行。","sourceBook":"《論語·公冶長》","tier":2,"tags":["思維","做事"]},{"id":"zou-ma-kan-hua","word":"走馬看花","pinyin":"zǒu mǎ kàn huā","cantonese":"zau2 maa5 hon3 faa1","meaning":"騎馬奔馳看花，比喻粗略瀏覽、不深入。","origin":"唐·孟郊《登科後》詩載「春風得意馬蹄疾，一日看盡長安花」，後作走馬看花，喻粗略觀賞。","sourceBook":"《全唐詩·登科後》","tier":2,"tags":["生活","藝術"]},{"id":"pao-zhuan-yin-yu","word":"拋磚引玉","pinyin":"pāo zhuān yǐn yù","cantonese":"paau1 zyun1 jan5 juk6","meaning":"拋出磚頭引來美玉，比喻用淺陋意見引出高明見解。","origin":"宋·釋道原《景德傳燈錄·卷十》載「比來拋磚引玉，卻引得個墜子」，本為謙詞，後喻引出高見。","sourceBook":"《景德傳燈錄·卷十》","tier":2,"tags":["說話","做事"]},{"id":"shi-ru-po-zhu","word":"勢如破竹","pinyin":"shì rú pò zhú","cantonese":"sai3 jyu4 po3 zuk1","meaning":"形勢像劈竹子般順利，形容節節勝利、毫無阻擋。","origin":"《晉書·杜預傳》載「今兵威已振，譬如破竹，數節之後，皆迎刃而解」，喻進軍順利。","sourceBook":"《晉書·杜預傳》","tier":2,"tags":["歷史","戰爭"]},{"id":"hou-lai-ju-shang","word":"後來居上","pinyin":"hòu lái jū shàng","cantonese":"hau6 loi4 geoi1 soeng6","meaning":"後來的人超過了先前的人，形容後進者超越前輩。","origin":"《史記·汲鄭列傳》載汲黯曰「陛下用群臣，如積薪耳，後來者居上」，原為不平之語。","sourceBook":"《史記·汲鄭列傳》","tier":2,"tags":["人物","做事"]},{"id":"wu-zhong-sheng-you","word":"無中生有","pinyin":"wú zhōng shēng yǒu","cantonese":"mou4 zung1 sang1 jau5","meaning":"從沒有的生出有的，原為道家宇宙觀，後指憑空捏造。","origin":"《老子》載「天下萬物生於有，有生於無」，本為哲學命題，後轉指平白捏造事實。","sourceBook":"《老子》","tier":2,"tags":["思維","說話"]},{"id":"ta-shan-zhi-shi","word":"他山之石","pinyin":"tā shān zhī shí","cantonese":"taa1 saan1 zi1 sek6","meaning":"別的山上的石頭，比喻能幫助自己改正缺點的外力。","origin":"《詩經·小雅·鶴鳴》載「他山之石，可以為錯」及「可以攻玉」，喻借外力磨礪自己。","sourceBook":"《詩經·小雅·鶴鳴》","tier":2,"tags":["學習","思維"]},{"id":"chuan-liu-bu-xi","word":"川流不息","pinyin":"chuān liú bù xī","cantonese":"cyun1 lau4 bat1 sik1","meaning":"像河水一樣流個不停，形容行人車馬連續不斷。","origin":"南朝梁·周興嗣《千字文》載「川流不息，淵澄取映」，後用以形容往來不絕。","sourceBook":"《千字文》","tier":2,"tags":["自然","社會"]},{"id":"gao-shan-liu-shui","word":"高山流水","pinyin":"gāo shān liú shuǐ","cantonese":"gou1 saan1 lau4 seoi2","meaning":"形容樂曲高妙，也比喻知音難遇或情誼深厚。","origin":"《列子·湯問》載伯牙鼓琴志在高山流水，鍾子期皆能領會，後以高山流水喻知音。","sourceBook":"《列子·湯問》","tier":3,"tags":["藝術","情感"]},{"id":"si-fen-wu-lie","word":"四分五裂","pinyin":"sì fēn wǔ liè","cantonese":"sei3 fan1 ng5 lit6","meaning":"形容國家或組織分裂破碎、彼此割據，不能統一。","origin":"《戰國策·魏策一》載張儀說魏王，指魏國四面受敵，是「四分五裂之道也」。","sourceBook":"《戰國策·魏策一》","tier":3,"tags":["社會","歷史"]},{"id":"si-tong-ba-da","word":"四通八達","pinyin":"sì tōng bā dá","cantonese":"sei3 tung1 baat3 daat6","meaning":"四面八方都有道路相通，形容交通便利、道路暢通。","origin":"《子華子·晏子問黨》載「其途之所出，四通而八達，遊士之所湊也」，形容道路通達。","sourceBook":"《子華子·晏子問黨》","tier":3,"tags":["社會","自然"]},{"id":"shi-shi-qiu-shi","word":"實事求是","pinyin":"shí shì qiú shì","cantonese":"sat6 si6 kau4 si6","meaning":"按照事物的實際情況探求真理，形容做事踏實、尊重事實。","origin":"《漢書·河間獻王劉德傳》載河間獻王「修學好古，實事求是」，讚其治學篤實。","sourceBook":"《漢書·河間獻王劉德傳》","tier":3,"tags":["學習","思維"]},{"id":"luo-jing-xia-shi","word":"落井下石","pinyin":"luò jǐng xià shí","cantonese":"lok6 zeng2 haa6 sek6","meaning":"對掉進井裡的人再扔石頭，比喻乘人之危加以陷害。","origin":"唐·韓愈《柳子厚墓誌銘》載「落陷阱，不一引手救，反擠之，又下石焉者，皆是也」。","sourceBook":"《昌黎先生集·柳子厚墓誌銘》","tier":3,"tags":["品格","做事"]},{"id":"kuai-zhi-ren-kou","word":"膾炙人口","pinyin":"kuài zhì rén kǒu","cantonese":"kui2 zek3 jan4 hau2","meaning":"膾和炙人人愛吃，比喻詩文或事蹟為人稱頌傳誦。","origin":"五代·王定保《唐摭言·卷十》載「皆膾炙人口」，形容佳句為人傳誦。","sourceBook":"《唐摭言·卷十》","tier":3,"tags":["藝術","寫作"]},{"id":"yu-yin-rao-liang","word":"餘音繞樑","pinyin":"yú yīn rào liáng","cantonese":"jyu4 jam1 jiu2 loeng4","meaning":"歌聲餘韻環繞屋樑久久不散，形容歌聲優美動人。","origin":"《列子·湯問》載韓娥歌聲「餘音繞樑，三日不絕」，形容歌聲婉轉悠長。","sourceBook":"《列子·湯問》","tier":3,"tags":["藝術","聲音"]},{"id":"shi-po-tian-jing","word":"石破天驚","pinyin":"shí pò tiān jīng","cantonese":"sek6 po3 tin1 ging1","meaning":"石頭破裂、天也震驚，形容聲音或文章氣勢驚人。","origin":"唐·李賀《李憑箜篌引》載「女媧煉石補天處，石破天驚逗秋雨」，形容樂聲震撼。","sourceBook":"《李長吉歌詩·李憑箜篌引》","tier":3,"tags":["藝術","情感"]},{"id":"zui-weng-zhi-yi","word":"醉翁之意","pinyin":"zuì wēng zhī yì","cantonese":"zeoi3 jung1 zi1 ji3","meaning":"醉翁的心思不在喝酒，比喻本意別有所圖。","origin":"宋·歐陽修《醉翁亭記》載「醉翁之意不在酒，在乎山水之間也」，後喻別有用心。","sourceBook":"《歐陽文忠公集·醉翁亭記》","tier":3,"tags":["生活","說話"]},{"id":"feng-hui-lu-zhuan","word":"峰迴路轉","pinyin":"fēng huí lù zhuǎn","cantonese":"fung1 wui4 lou6 zyun2","meaning":"山峰迴環、道路曲折，形容路徑曲折，也比喻事情有轉機。","origin":"宋·歐陽修《醉翁亭記》載「峰迴路轉，有亭翼然臨於泉上者，醉翁亭也」。","sourceBook":"《歐陽文忠公集·醉翁亭記》","tier":3,"tags":["自然","生活"]},{"id":"luo-ying-bin-fen","word":"落英繽紛","pinyin":"luò yīng bīn fēn","cantonese":"lok6 jing1 ban1 fan1","meaning":"落花繁多而紛飛，形容花瓣飄落的景象。","origin":"陶淵明《桃花源記》載「芳草鮮美，落英繽紛」，描寫桃花源入口的春景。","sourceBook":"《陶淵明集·桃花源記》","tier":3,"tags":["自然"]},{"id":"wu-ren-wen-jin","word":"無人問津","pinyin":"wú rén wèn jīn","cantonese":"mou4 jan4 man6 zeon1","meaning":"沒有人來詢問渡口，比喻無人過問、備受冷落。","origin":"陶淵明《桃花源記》載「後遂無問津者」，後作無人問津，喻無人理會。","sourceBook":"《陶淵明集·桃花源記》","tier":3,"tags":["生活","社會"]},{"id":"yang-chun-bai-xue","word":"陽春白雪","pinyin":"yáng chūn bái xuě","cantonese":"joeng4 ceon1 baak6 syut3","meaning":"古代楚國高雅的歌曲，比喻高深的文學藝術。","origin":"宋玉《對楚王問》載「其為陽春白雪，國中屬而和者不過數十人」，喻曲高和寡。","sourceBook":"《文選·對楚王問》","tier":4,"tags":["藝術","社會"]},{"id":"qu-gao-he-gua","word":"曲高和寡","pinyin":"qǔ gāo hè guǎ","cantonese":"kuk1 gou1 wo6 gwaa2","meaning":"曲調越高深，能跟著唱的人越少，比喻言論或作品高深而少人理解。","origin":"宋玉《對楚王問》載「其曲彌高，其和彌寡」，喻知音難得。","sourceBook":"《文選·對楚王問》","tier":4,"tags":["藝術","社會"]},{"id":"hua-er-bu-shi","word":"華而不實","pinyin":"huá ér bù shí","cantonese":"waa4 ji4 bat1 sat6","meaning":"花開得好卻不結果，比喻外表好看而內裡空虛。","origin":"《左傳·文公五年》載「且華而不實，怨之所聚也」，指虛有其表易招怨恨。","sourceBook":"《左傳·文公五年》","tier":4,"tags":["人物","品格"]},{"id":"shi-yan-er-fei","word":"食言而肥","pinyin":"shí yán ér féi","cantonese":"sik6 jin4 ji4 fei4","meaning":"違背諾言而自肥，形容言而無信、只圖私利。","origin":"《左傳·哀公二十五年》載孟武伯問郭重何以肥，郭重答「是食言多矣，能無肥乎」，諷人食言。","sourceBook":"《左傳·哀公二十五年》","tier":4,"tags":["說話","品格"]},{"id":"qi-mao-bu-yang","word":"其貌不揚","pinyin":"qí mào bù yáng","cantonese":"kei4 maau6 bat1 joeng4","meaning":"相貌平凡、不出眾，形容外表並不起眼。","origin":"《左傳·昭公二十八年》載「今子少不揚」，杜預注「顏貌不顯揚」，後作其貌不揚。","sourceBook":"《左傳·昭公二十八年》","tier":4,"tags":["人物"]},{"id":"wei-ming-shi-cong","word":"唯命是從","pinyin":"wéi mìng shì cóng","cantonese":"wai4 ming6 si6 cung4","meaning":"完全聽從別人的命令，形容順從、不敢違抗。","origin":"《左傳·昭公十二年》載「今周與四國服事君王，將唯命是從，豈其愛鼎」。","sourceBook":"《左傳·昭公十二年》","tier":4,"tags":["做事","情感"]},{"id":"ge-zi-wei-zheng","word":"各自為政","pinyin":"gè zì wéi zhèng","cantonese":"gok3 zi6 wai4 zing3","meaning":"各人按自己的主張辦事，形容各行其是、步調不一。","origin":"《左傳·宣公二年》載「疇昔之羊，子為政，今日之事，我為政」，後作各自為政。","sourceBook":"《左傳·宣公二年》","tier":4,"tags":["社會","做事"]},{"id":"bei-gong-qu-xi","word":"卑躬屈膝","pinyin":"bēi gōng qū xī","cantonese":"bei1 gung1 wat1 sat1","meaning":"低聲下氣、屈膝奉承，形容諂媚討好、沒有骨氣。","origin":"宋·魏了翁《江陵州叢蘭精舍記》載「公卿大臣皆卑躬屈膝唯後」，形容諂媚之態。","sourceBook":"《鶴山集·江陵州叢蘭精舍記》","tier":4,"tags":["人物","品格"]},{"id":"duo-duo-bi-ren","word":"咄咄逼人","pinyin":"duō duō bī rén","cantonese":"deot1 deot1 bik1 jan4","meaning":"氣勢洶洶、言語逼人，形容態度強橫或氣勢逼人。","origin":"晉·衛鑠《與釋某書》載評王羲之書法「咄咄逼人」，本讚書勢雄強，後轉指氣勢逼人。","sourceBook":"《全晉文·與釋某書》","tier":4,"tags":["說話","氣勢"]},{"id":"bai-yun-cang-gou","word":"白雲蒼狗","pinyin":"bái yún cāng gǒu","cantonese":"baak6 wan4 cong1 gau2","meaning":"天上的白雲轉眼變成蒼狗，比喻世事變化無常。","origin":"唐·杜甫《可嘆》詩載「天上浮雲似白衣，斯須改變如蒼狗」，喻世事變幻莫測。","sourceBook":"《杜工部集·可嘆》","tier":4,"tags":["自然","人生"]},{"id":"cang-hai-sang-tian","word":"滄海桑田","pinyin":"cāng hǎi sāng tián","cantonese":"cong1 hoi2 song1 tin4","meaning":"大海變成桑田、桑田變成大海，比喻世事巨大變遷。","origin":"晉·葛洪《神仙傳·麻姑》載麻姑自言曾見東海三為桑田，喻世事變化之大。","sourceBook":"《神仙傳·麻姑》","tier":4,"tags":["自然","人生"]},{"id":"cang-hai-yi-su","word":"滄海一粟","pinyin":"cāng hǎi yī sù","cantonese":"cong1 hoi2 jat1 suk1","meaning":"大海中的一粒粟米，比喻人在天地間極其渺小。","origin":"宋·蘇軾《前赤壁賦》載「寄蜉蝣於天地，渺滄海之一粟」，喻人生短暫渺小。","sourceBook":"《東坡全集·前赤壁賦》","tier":4,"tags":["自然","人生"]},{"id":"lao-ji-fu-li","word":"老驥伏櫪","pinyin":"lǎo jì fú lì","cantonese":"lou5 kei3 fuk6 lik1","meaning":"年老的良馬伏在馬槽邊仍想奔馳千里，比喻人老而志不衰。","origin":"三國魏·曹操《步出夏門行》載「老驥伏櫪，志在千里；烈士暮年，壯心不已」。","sourceBook":"《樂府詩集·步出夏門行》","tier":4,"tags":["人物","堅持"]},{"id":"wei-bian-san-jue","word":"韋編三絕","pinyin":"wéi biān sān jué","cantonese":"wai4 pin1 saam1 zyut6","meaning":"串連竹簡的皮繩磨斷三次，形容讀書勤奮、反覆研讀。","origin":"《史記·孔子世家》載孔子讀《易》「韋編三絕」，形容其勤讀不倦。","sourceBook":"《史記·孔子世家》","tier":4,"tags":["學習","人物"]},{"id":"jing-wei-fen-ming","word":"涇渭分明","pinyin":"jīng wèi fēn míng","cantonese":"ging1 wai6 fan1 ming4","meaning":"涇水清、渭水濁，兩水交匯清濁分明，比喻是非好壞界限清楚。","origin":"《詩經·邶風·谷風》載「涇以渭濁，湜湜其沚」，後以涇渭分明喻清濁有別。","sourceBook":"《詩經·邶風·谷風》","tier":4,"tags":["思維","社會"]},{"id":"chu-sheng-ru-si","word":"出生入死","pinyin":"chū shēng rù sǐ","cantonese":"ceot1 sang1 jap6 sei2","meaning":"從生到死，原指人從出生到死亡，後形容冒著生命危險。","origin":"《老子·第五十章》載「出生入死，生之徒十有三，死之徒十有三」，後轉指冒險犯難。","sourceBook":"《老子·第五十章》","tier":4,"tags":["勇氣","生活"]},{"id":"gao-huang-zhi-ji","word":"膏肓之疾","pinyin":"gāo huāng zhī jí","cantonese":"gou1 fong1 zi1 zat6","meaning":"病在膏之下、肓之上，藥力難及，比喻難以根治的弊病。","origin":"《左傳·成公十年》載醫緩診晉景公曰「疾不可為也，在肓之上，膏之下」，喻病入膏肓。","sourceBook":"《左傳·成公十年》","tier":5,"tags":["生活","社會"]},{"id":"mu-mu-yi-gong","word":"墓木已拱","pinyin":"mù mù yǐ gǒng","cantonese":"mou6 muk6 ji5 gung2","meaning":"墓旁的樹已長到手可合抱，形容人死已久。","origin":"《左傳·僖公三十二年》載蹇叔對秦穆公曰「爾墓之木拱矣」，原為咒語，後喻亡故已久。","sourceBook":"《左傳·僖公三十二年》","tier":5,"tags":["時間","情感"]},{"id":"chi-mei-wang-liang","word":"魑魅魍魎","pinyin":"chī mèi wǎng liǎng","cantonese":"ci1 mei6 mong5 loeng5","meaning":"古代傳說中的山林鬼怪，比喻各種壞人或邪惡勢力。","origin":"《左傳·宣公三年》載「螭魅罔兩，莫能逢之」，後作魑魅魍魎，指鬼怪或壞人。","sourceBook":"《左傳·宣公三年》","tier":5,"tags":["神話","社會"]},{"id":"li-li-zai-mu","word":"歷歷在目","pinyin":"lì lì zài mù","cantonese":"lik6 lik6 zoi6 muk6","meaning":"往事清清楚楚地浮現在眼前，形容記憶猶新。","origin":"唐·杜甫《歷歷》詩載「歷歷開元事，分明在眼前」，後作歷歷在目，形容往事清晰如見。","sourceBook":"《杜工部集·歷歷》","tier":3,"tags":["情感","生活"]},{"id":"ruo-you-ruo-wu","word":"若有若無","pinyin":"ruò yǒu ruò wú","cantonese":"joek6 jau5 joek6 mou4","meaning":"好像有又好像沒有，形容隱約模糊、難以捉摸。","origin":"明·洪應明《菜根譚·閒適》載「若有若無，半真半幻，最足以悅人心目而豁人性靈」。","sourceBook":"《菜根譚·閒適》","tier":4,"tags":["自然","情感"]},{"id":"qing-feng-ming-yue","word":"清風明月","pinyin":"qīng fēng míng yuè","cantonese":"cing1 fung1 ming4 jyut6","meaning":"清涼的風、明朗的月，形容清雅閒適的生活情趣。","origin":"《南史·謝惠傳》載「入吾室者，但有清風；對吾飲者，惟當明月」，形容生活清雅。","sourceBook":"《南史·謝惠傳》","tier":3,"tags":["自然","品格"]},{"id":"ku-mu-feng-chun","word":"枯木逢春","pinyin":"kū mù féng chūn","cantonese":"fu1 muk6 fung4 ceon1","meaning":"乾枯的樹木遇到春天又發新芽，比喻絕處逢生、重獲生機。","origin":"宋·釋道原《景德傳燈錄·卷二十三》載僧問「枯樹逢春時如何」，後喻絕境重獲生機。","sourceBook":"《景德傳燈錄·卷二十三》","tier":3,"tags":["自然","人生"]},{"id":"ping-bu-qing-yun","word":"平步青雲","pinyin":"píng bù qīng yún","cantonese":"ping4 bou6 cing1 wan4","meaning":"平地走上青天，比喻一下子達到很高的地位。","origin":"《史記·范雎蔡澤列傳》載須賈曰「不意君能自致於青雲之上」，後作平步青雲，喻仕途得意。","sourceBook":"《史記·范雎蔡澤列傳》","tier":3,"tags":["人物","做事"]},{"id":"hai-kuo-tian-kong","word":"海闊天空","pinyin":"hǎi kuò tiān kōng","cantonese":"hoi2 fut3 tin1 hung1","meaning":"像大海般寬廣、天空般無際，形容心胸開闊或漫無邊際。","origin":"唐·劉氏瑤《暗離別》詩載「青鸞脈脈西飛去，海闊天高不知處」，後作海闊天空。","sourceBook":"《全唐詩·暗離別》","tier":2,"tags":["自然","思維"]},{"id":"fu-tang-dao-huo","word":"赴湯蹈火","pinyin":"fù tāng dǎo huǒ","cantonese":"fu6 tong1 dou6 fo2","meaning":"跳進滾水、踩過烈火，比喻不畏艱險、奮不顧身。","origin":"三國魏·嵇康《與山巨源絕交書》載「長而見羈，則狂顧頓纓，赴湯蹈火」，後喻奮勇赴難。","sourceBook":"《文選·與山巨源絕交書》","tier":4,"tags":["勇氣","情感"]},{"id":"shu-bu-jin-yan","word":"書不盡言","pinyin":"shū bù jìn yán","cantonese":"syu1 bat1 zeon6 jin4","meaning":"書信難以完全表達心意，形容言不盡意。","origin":"《易經·繫辭上》載「書不盡言，言不盡意」，指文字無法完全表達心思。","sourceBook":"《易經·繫辭上》","tier":4,"tags":["寫作","說話"]},{"id":"ya-kou-wu-yan","word":"啞口無言","pinyin":"yǎ kǒu wú yán","cantonese":"aa2 hau2 mou4 jin4","meaning":"像啞巴一樣說不出話，形容理屈詞窮或無話可說。","origin":"明·馮夢龍《醒世恆言·卷八》載一番言語「說得張六嫂啞口無言」，形容被駁得無話可說。","sourceBook":"《醒世恆言·卷八》","tier":3,"tags":["說話","情感"]},{"id":"yu-wu-lun-ci","word":"語無倫次","pinyin":"yǔ wú lún cì","cantonese":"jyu5 mou4 leon4 ci3","meaning":"說話顛三倒四、沒有條理，形容驚慌或思路混亂。","origin":"宋·胡仔《苕溪漁隱叢話·前集卷七》載古人律詩「語或似無倫次，而意若貫珠」。","sourceBook":"《苕溪漁隱叢話·前集卷七》","tier":3,"tags":["說話","情感"]},{"id":"xiang-an-wu-shi","word":"相安無事","pinyin":"xiāng ān wú shì","cantonese":"soeng1 on1 mou4 si6","meaning":"彼此和平相處、沒有爭執，形容相處融洽、平安無事。","origin":"宋·鄧牧《伯牙琴·吏道》載「古者君民間相安無事者」，指上下相安、不起紛爭。","sourceBook":"《伯牙琴·吏道》","tier":3,"tags":["社會","生活"]},{"id":"li-zhi-qi-zhuang","word":"理直氣壯","pinyin":"lǐ zhí qì zhuàng","cantonese":"lei5 zik6 hei3 zong3","meaning":"理由正當、氣勢自然壯盛，形容說話有底氣、不畏縮。","origin":"明·馮夢龍《喻世明言·卷三十一》載「便捉我到閻羅殿前，我也理直氣壯，不怕甚的」。","sourceBook":"《喻世明言·卷三十一》","tier":3,"tags":["品格","說話"]},{"id":"qi-you-ci-li","word":"豈有此理","pinyin":"qǐ yǒu cǐ lǐ","cantonese":"hei2 jau5 ci2 lei5","meaning":"哪有這樣的道理，形容對荒謬事情表示氣憤或驚訝。","origin":"《南齊書·虞悰傳》載「天下豈有此理邪」，後用以斥責荒謬無理之事。","sourceBook":"《南齊書·虞悰傳》","tier":3,"tags":["情感","說話"]},{"id":"dao-ting-tu-shuo","word":"道聽途說","pinyin":"dào tīng tú shuō","cantonese":"dou6 ting3 tou4 syut3","meaning":"路上聽來的傳聞，形容沒有根據的傳言。","origin":"《論語·陽貨》載「道聽而途說，德之棄也」，指聽聞不實之語而傳播，有損德行。","sourceBook":"《論語·陽貨》","tier":3,"tags":["說話","社會"]},{"id":"dao-bu-shi-yi","word":"道不拾遺","pinyin":"dào bù shí yí","cantonese":"dou6 bat1 sap6 wai4","meaning":"路上有失物也沒人拾取，形容社會風氣良好、治安清明。","origin":"《韓非子·外儲說左上》載「國無盜賊，道不拾遺」，形容治國有方、民風淳厚。","sourceBook":"《韓非子·外儲說左上》","tier":3,"tags":["社會","品格"]},{"id":"de-gao-wang-zhong","word":"德高望重","pinyin":"dé gāo wàng zhòng","cantonese":"dak1 gou1 mong6 zung6","meaning":"品德高尚、名望很大，形容受人敬重的長者。","origin":"《晉書·簡文三子傳》載「稱己德隆望重」，後作德高望重，形容年高德劭、眾望所歸。","sourceBook":"《晉書·簡文三子傳》","tier":3,"tags":["人物","品格"]},{"id":"tong-xin-tong-de","word":"同心同德","pinyin":"tóng xīn tóng dé","cantonese":"tung4 sam1 tung4 dak1","meaning":"思想與信念一致，形容團結齊心、共同努力。","origin":"《尚書·泰誓中》載「予有亂臣十人，同心同德」，指君臣同心同德。","sourceBook":"《尚書·泰誓中》","tier":3,"tags":["社會","品格"]},{"id":"qian-yan-wan-yu","word":"千言萬語","pinyin":"qiān yán wàn yǔ","cantonese":"cin1 jin4 maan6 jyu5","meaning":"形容話很多，也形容有許多話想說、難以盡述。","origin":"唐·鄭谷《燕》詩載「千言萬語無人會，又逐流鶯過短牆」，以燕喻無人傾訴之情。","sourceBook":"《全唐詩·燕》","tier":3,"tags":["說話","情感"]},{"id":"hai-na-bai-chuan","word":"海納百川","pinyin":"hǎi nà bǎi chuān","cantonese":"hoi2 naap6 baak3 cyun1","meaning":"大海容納眾多河流，比喻心胸寬廣、能包容萬物。","origin":"晉·袁宏《三國名臣序贊》「方寸海納」李周翰注「方寸之心，如海之納百川也」，喻包容廣大。","sourceBook":"《文選·三國名臣序贊》","tier":3,"tags":["品格","社會"]},{"id":"hai-shi-shen-lou","word":"海市蜃樓","pinyin":"hǎi shì shèn lóu","cantonese":"hoi2 si5 san5 lau4","meaning":"海邊或沙漠因光線折射出現的幻景，比喻虛幻不實的事物。","origin":"《史記·天官書》載「海旁蜃氣象樓臺，廣野氣成宮闕然」，指海上蜃氣形成的幻景。","sourceBook":"《史記·天官書》","tier":3,"tags":["自然","社會"]},{"id":"ge-an-guan-huo","word":"隔岸觀火","pinyin":"gé àn guān huǒ","cantonese":"gaak3 ngon6 gun1 fo2","meaning":"隔著河看對岸失火，比喻置身事外、袖手旁觀。","origin":"唐·乾康《投謁齊己》詩載「隔岸紅塵忙似火，當軒青嶂冷如冰」，後喻置身事外。","sourceBook":"《全唐詩·投謁齊己》","tier":4,"tags":["情感","做事"]}]`),t=JSON.parse(`[{"id":1,"chapter":1,"mode":"fill","title":"第 1 課：花下尋字","story":"櫻花樹下，阿墨用尾巴掃開落花，露出刻字的石板。糰子發現有幾個位置空着，正等人補上喵。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"風"},{"r":0,"c":1,"char":"花"},{"r":0,"c":2,"char":"雪"},{"r":0,"c":3,"char":"月"},{"r":1,"c":2,"char":"中"},{"r":2,"c":2,"char":"送"},{"r":3,"c":2,"char":"炭"}],"slots":[{"idiomId":"xue-zhong-song-tan","row":0,"col":2,"dir":"v","blanks":[1]},{"idiomId":"feng-hua-xue-yue","row":0,"col":0,"dir":"h","blanks":[3]}],"bank":["中","月"],"hintLimit":3},{"id":2,"chapter":1,"mode":"fill","title":"第 2 課：春風識字","story":"櫻花樹下，阿墨用尾巴掃開落花，露出刻字的石板。糰子發現有幾個位置空着，正等人補上喵。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"溫"},{"r":0,"c":1,"char":"故"},{"r":0,"c":2,"char":"知"},{"r":0,"c":3,"char":"新"},{"r":1,"c":2,"char":"己"},{"r":2,"c":2,"char":"知"},{"r":3,"c":2,"char":"彼"}],"slots":[{"idiomId":"wen-gu-zhi-xin","row":0,"col":0,"dir":"h","blanks":[0]},{"idiomId":"zhi-ji-zhi-bi","row":0,"col":2,"dir":"v","blanks":[3]}],"bank":["溫","彼"],"hintLimit":3},{"id":3,"chapter":1,"mode":"fill","title":"第 3 課：櫻語初開","story":"阿墨把字卡撒在草地上，笑說：「填字好似拼花，一筆一畫都要對位。」糰子已經伸出貓爪。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"守"},{"r":0,"c":1,"char":"口"},{"r":0,"c":2,"char":"如"},{"r":0,"c":3,"char":"瓶"},{"r":1,"c":0,"char":"株"},{"r":2,"c":0,"char":"待"},{"r":3,"c":0,"char":"兔"}],"slots":[{"idiomId":"shou-zhu-dai-tu","row":0,"col":0,"dir":"v","blanks":[3]},{"idiomId":"shou-kou-ru-ping","row":0,"col":0,"dir":"h","blanks":[1]}],"bank":["兔","口"],"hintLimit":3},{"id":4,"chapter":1,"mode":"fill","title":"第 4 課：石徑藏書","story":"春風吹過小徑，花瓣在石板上排成奇怪的形狀。糰子歪着頭問：「呢啲空缺，要填咩字先啱呀？」","rows":4,"cols":4,"cells":[{"r":0,"c":2,"char":"火"},{"r":1,"c":2,"char":"樹"},{"r":2,"c":2,"char":"銀"},{"r":3,"c":0,"char":"春"},{"r":3,"c":1,"char":"暖"},{"r":3,"c":2,"char":"花"},{"r":3,"c":3,"char":"開"}],"slots":[{"idiomId":"chun-nuan-hua-kai","row":3,"col":0,"dir":"h","blanks":[3]},{"idiomId":"huo-shu-yin-hua","row":0,"col":2,"dir":"v","blanks":[2]}],"bank":["開","銀"],"hintLimit":3},{"id":5,"chapter":1,"mode":"fill","title":"第 5 課：貓爪點墨","story":"春風吹過小徑，花瓣在石板上排成奇怪的形狀。糰子歪着頭問：「呢啲空缺，要填咩字先啱呀？」","rows":4,"cols":4,"cells":[{"r":0,"c":2,"char":"驚"},{"r":1,"c":2,"char":"天"},{"r":2,"c":2,"char":"動"},{"r":3,"c":0,"char":"天"},{"r":3,"c":1,"char":"羅"},{"r":3,"c":2,"char":"地"},{"r":3,"c":3,"char":"網"}],"slots":[{"idiomId":"jing-tian-dong-di","row":0,"col":2,"dir":"v","blanks":[1]},{"idiomId":"tian-luo-di-wang","row":3,"col":0,"dir":"h","blanks":[0,1]}],"bank":["天","天","羅"],"hintLimit":3},{"id":6,"chapter":1,"mode":"fill","title":"第 6 課：花瓣拼字","story":"櫻花樹下，阿墨用尾巴掃開落花，露出刻字的石板。糰子發現有幾個位置空着，正等人補上喵。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"五"},{"r":1,"c":0,"char":"湖"},{"r":2,"c":0,"char":"四"},{"r":2,"c":1,"char":"面"},{"r":2,"c":2,"char":"楚"},{"r":2,"c":3,"char":"歌"},{"r":3,"c":0,"char":"海"}],"slots":[{"idiomId":"wu-hu-si-hai","row":0,"col":0,"dir":"v","blanks":[0,1]},{"idiomId":"si-mian-chu-ge","row":2,"col":0,"dir":"h","blanks":[1]}],"bank":["五","面","湖"],"hintLimit":3},{"id":7,"chapter":1,"mode":"fill","title":"第 7 課：樹下聽課","story":"春風吹過小徑，花瓣在石板上排成奇怪的形狀。糰子歪着頭問：「呢啲空缺，要填咩字先啱呀？」","rows":4,"cols":4,"cells":[{"r":0,"c":1,"char":"破"},{"r":1,"c":1,"char":"釜"},{"r":2,"c":1,"char":"沉"},{"r":3,"c":0,"char":"刻"},{"r":3,"c":1,"char":"舟"},{"r":3,"c":2,"char":"求"},{"r":3,"c":3,"char":"劍"}],"slots":[{"idiomId":"ke-zhou-qiu-jian","row":3,"col":0,"dir":"h","blanks":[2]},{"idiomId":"po-fu-chen-zhou","row":0,"col":1,"dir":"v","blanks":[0,1]}],"bank":["求","破","釜"],"hintLimit":3},{"id":8,"chapter":1,"mode":"fill","title":"第 8 課：粉櫻書聲","story":"阿墨把字卡撒在草地上，笑說：「填字好似拼花，一筆一畫都要對位。」糰子已經伸出貓爪。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"目"},{"r":0,"c":1,"char":"中"},{"r":0,"c":2,"char":"無"},{"r":0,"c":3,"char":"人"},{"r":1,"c":0,"char":"瞪"},{"r":2,"c":0,"char":"口"},{"r":3,"c":0,"char":"呆"}],"slots":[{"idiomId":"mu-deng-kou-dai","row":0,"col":0,"dir":"v","blanks":[1,2]},{"idiomId":"mu-zhong-wu-ren","row":0,"col":0,"dir":"h","blanks":[3]}],"bank":["瞪","人","口"],"hintLimit":3},{"id":9,"chapter":1,"mode":"fill","title":"第 9 課：庭前對句","story":"阿墨把字卡撒在草地上，笑說：「填字好似拼花，一筆一畫都要對位。」糰子已經伸出貓爪。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"興"},{"r":0,"c":1,"char":"高"},{"r":0,"c":2,"char":"采"},{"r":0,"c":3,"char":"烈"},{"r":1,"c":1,"char":"枕"},{"r":2,"c":1,"char":"無"},{"r":3,"c":1,"char":"憂"}],"slots":[{"idiomId":"xing-gao-cai-lie","row":0,"col":0,"dir":"h","blanks":[2]},{"idiomId":"gao-zhen-wu-you","row":0,"col":1,"dir":"v","blanks":[1,3]}],"bank":["憂","采","枕"],"hintLimit":3},{"id":10,"chapter":1,"mode":"fill","title":"第 10 課：小徑通文","story":"櫻花小徑盡頭立着一塊大石碑，阿墨說這是第一章最後的考驗。糰子深吸一口氣，把學過的字都想了出來喵。","rows":4,"cols":4,"cells":[{"r":0,"c":3,"char":"五"},{"r":1,"c":3,"char":"光"},{"r":2,"c":3,"char":"十"},{"r":3,"c":0,"char":"五"},{"r":3,"c":1,"char":"顏"},{"r":3,"c":2,"char":"六"},{"r":3,"c":3,"char":"色"}],"slots":[{"idiomId":"wu-yan-liu-se","row":3,"col":0,"dir":"h","blanks":[1]},{"idiomId":"wu-guang-shi-se","row":0,"col":3,"dir":"v","blanks":[0,1]}],"bank":["五","光","顏"],"hintLimit":3},{"id":11,"chapter":2,"mode":"fill","title":"第 1 課：竹影排字","story":"阿墨撥開竹枝，指着地面：「呢度每塊石都藏住一句成語，填啱晒先過得去喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"捨"},{"r":0,"c":1,"char":"生"},{"r":0,"c":2,"char":"取"},{"r":0,"c":3,"char":"義"},{"r":1,"c":1,"char":"龍"},{"r":2,"c":1,"char":"活"},{"r":3,"c":1,"char":"虎"}],"slots":[{"idiomId":"sheng-long-huo-hu","row":0,"col":1,"dir":"v","blanks":[1,2]},{"idiomId":"she-sheng-qu-yi","row":0,"col":0,"dir":"h","blanks":[3]}],"bank":["龍","義","天","活"],"hintLimit":3},{"id":12,"chapter":2,"mode":"fill","title":"第 2 課：風過竹林","story":"竹林迷宮裏，竹葉沙沙作響，石筍上浮現一行行缺字的句子。糰子要靜下心，逐個字補回去。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"應"},{"r":0,"c":1,"char":"有"},{"r":0,"c":2,"char":"盡"},{"r":0,"c":3,"char":"有"},{"r":1,"c":1,"char":"聲"},{"r":2,"c":1,"char":"有"},{"r":3,"c":1,"char":"色"}],"slots":[{"idiomId":"ying-you-jin-you","row":0,"col":0,"dir":"h","blanks":[0,3]},{"idiomId":"you-sheng-you-se","row":0,"col":1,"dir":"v","blanks":[3]}],"bank":["睛","色","有","應"],"hintLimit":3},{"id":13,"chapter":2,"mode":"fill","title":"第 3 課：迷宮聽風","story":"竹林迷宮裏，竹葉沙沙作響，石筍上浮現一行行缺字的句子。糰子要靜下心，逐個字補回去。","rows":4,"cols":4,"cells":[{"r":0,"c":1,"char":"誨"},{"r":1,"c":1,"char":"人"},{"r":2,"c":0,"char":"馬"},{"r":2,"c":1,"char":"不"},{"r":2,"c":2,"char":"停"},{"r":2,"c":3,"char":"蹄"},{"r":3,"c":1,"char":"倦"}],"slots":[{"idiomId":"ma-bu-ting-ti","row":2,"col":0,"dir":"h","blanks":[2]},{"idiomId":"hui-ren-bu-juan","row":0,"col":1,"dir":"v","blanks":[0,3]}],"bank":["倦","於","誨","停"],"hintLimit":3},{"id":14,"chapter":2,"mode":"fill","title":"第 4 課：竹節接龍","story":"陽光穿過竹葉灑成點點光斑，糰子追着光點跑，差點忘了手上還有字卡。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"愛"},{"r":1,"c":0,"char":"不"},{"r":1,"c":1,"char":"學"},{"r":1,"c":2,"char":"無"},{"r":1,"c":3,"char":"術"},{"r":2,"c":0,"char":"釋"},{"r":3,"c":0,"char":"手"}],"slots":[{"idiomId":"ai-bu-shi-shou","row":0,"col":0,"dir":"v","blanks":[0,2]},{"idiomId":"bu-xue-wu-shu","row":1,"col":0,"dir":"h","blanks":[3]}],"bank":["術","釋","來","愛"],"hintLimit":3},{"id":15,"chapter":2,"mode":"chain","title":"第 5 課：青竹點頭","story":"糰子把字卡排在竹葉上，一條接一條，總算看見出口的亮光。","rows":3,"cols":4,"cells":[{"r":0,"c":0,"char":"夜"},{"r":0,"c":1,"char":"郎"},{"r":0,"c":2,"char":"自"},{"r":0,"c":3,"char":"大"},{"r":1,"c":0,"char":"大"},{"r":1,"c":1,"char":"快"},{"r":1,"c":2,"char":"人"},{"r":1,"c":3,"char":"心"},{"r":2,"c":0,"char":"心"},{"r":2,"c":1,"char":"曠"},{"r":2,"c":2,"char":"神"},{"r":2,"c":3,"char":"怡"}],"slots":[{"idiomId":"ye-lang-zi-da","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"da-kuai-ren-xin","row":1,"col":0,"dir":"h","blanks":[1]},{"idiomId":"xin-kuang-shen-yi","row":2,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["神","而","快","曠","怡"],"hintLimit":3},{"id":16,"chapter":2,"mode":"fill","title":"第 6 課：筍尖露字","story":"竹林迷宮裏，竹葉沙沙作響，石筍上浮現一行行缺字的句子。糰子要靜下心，逐個字補回去。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"人"},{"r":1,"c":0,"char":"山"},{"r":2,"c":0,"char":"人"},{"r":2,"c":1,"char":"傑"},{"r":2,"c":2,"char":"地"},{"r":2,"c":3,"char":"靈"},{"r":3,"c":0,"char":"海"}],"slots":[{"idiomId":"ren-shan-ren-hai","row":0,"col":0,"dir":"v","blanks":[0]},{"idiomId":"ren-jie-di-ling","row":2,"col":0,"dir":"h","blanks":[1,2]}],"bank":["地","人","傑","咻"],"hintLimit":3},{"id":17,"chapter":2,"mode":"fill","title":"第 7 課：竹林深處","story":"阿墨撥開竹枝，指着地面：「呢度每塊石都藏住一句成語，填啱晒先過得去喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"畫"},{"r":0,"c":1,"char":"蛇"},{"r":0,"c":2,"char":"添"},{"r":0,"c":3,"char":"足"},{"r":1,"c":3,"char":"不"},{"r":2,"c":3,"char":"出"},{"r":3,"c":3,"char":"戶"}],"slots":[{"idiomId":"hua-she-tian-zu","row":0,"col":0,"dir":"h","blanks":[0,2]},{"idiomId":"zu-bu-chu-hu","row":0,"col":3,"dir":"v","blanks":[2]}],"bank":["畫","出","備","添"],"hintLimit":3},{"id":18,"chapter":2,"mode":"fill","title":"第 8 課：葉響成句","story":"阿墨撥開竹枝，指着地面：「呢度每塊石都藏住一句成語，填啱晒先過得去喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"自"},{"r":0,"c":1,"char":"強"},{"r":0,"c":2,"char":"不"},{"r":0,"c":3,"char":"息"},{"r":1,"c":2,"char":"遠"},{"r":2,"c":2,"char":"千"},{"r":3,"c":2,"char":"里"}],"slots":[{"idiomId":"zi-qiang-bu-xi","row":0,"col":0,"dir":"h","blanks":[3]},{"idiomId":"bu-yuan-qian-li","row":0,"col":2,"dir":"v","blanks":[2,3]}],"bank":["里","隔","息","千"],"hintLimit":3},{"id":19,"chapter":2,"mode":"fill","title":"第 9 課：竹籬尋章","story":"陽光穿過竹葉灑成點點光斑，糰子追着光點跑，差點忘了手上還有字卡。","rows":4,"cols":4,"cells":[{"r":0,"c":2,"char":"鵬"},{"r":1,"c":2,"char":"程"},{"r":2,"c":0,"char":"千"},{"r":2,"c":1,"char":"變"},{"r":2,"c":2,"char":"萬"},{"r":2,"c":3,"char":"化"},{"r":3,"c":2,"char":"里"}],"slots":[{"idiomId":"qian-bian-wan-hua","row":2,"col":0,"dir":"h","blanks":[1]},{"idiomId":"peng-cheng-wan-li","row":0,"col":2,"dir":"v","blanks":[0,1]}],"bank":["鵬","夕","變","程"],"hintLimit":3},{"id":20,"chapter":2,"mode":"chain","title":"第 10 課：迷宮出口","story":"竹林迷宮最深處，竹節排成一道大門，門上滿是缺字。過了這關，就能走出迷宮喵。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"水"},{"r":0,"c":1,"char":"漲"},{"r":0,"c":2,"char":"船"},{"r":0,"c":3,"char":"高"},{"r":1,"c":0,"char":"高"},{"r":1,"c":1,"char":"山"},{"r":1,"c":2,"char":"流"},{"r":1,"c":3,"char":"水"},{"r":2,"c":0,"char":"水"},{"r":2,"c":1,"char":"落"},{"r":2,"c":2,"char":"石"},{"r":2,"c":3,"char":"出"},{"r":3,"c":0,"char":"出"},{"r":3,"c":1,"char":"類"},{"r":3,"c":2,"char":"拔"},{"r":3,"c":3,"char":"萃"}],"slots":[{"idiomId":"shui-zhang-chuan-gao","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"gao-shan-liu-shui","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shui-luo-shi-chu","row":2,"col":0,"dir":"h","blanks":[2]},{"idiomId":"chu-lei-ba-cui","row":3,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["山","拾","拔","萃","石","流","類"],"hintLimit":3},{"id":21,"chapter":3,"mode":"fill","title":"第 1 課：月下翻書","story":"月下書齋，古籍自動翻頁，書頁間浮起點點靈光。糰子趴在桌邊，替阿墨補上缺去的字。","rows":4,"cols":4,"cells":[{"r":0,"c":1,"char":"後"},{"r":1,"c":1,"char":"來"},{"r":2,"c":1,"char":"居"},{"r":3,"c":0,"char":"七"},{"r":3,"c":1,"char":"上"},{"r":3,"c":2,"char":"八"},{"r":3,"c":3,"char":"下"}],"slots":[{"idiomId":"qi-shang-ba-xia","row":3,"col":0,"dir":"h","blanks":[2]},{"idiomId":"hou-lai-ju-shang","row":0,"col":1,"dir":"v","blanks":[0,1]}],"bank":["身","八","後","來"],"hintLimit":3},{"id":22,"chapter":3,"mode":"fill","title":"第 2 課：銀漢無聲","story":"月光把硯台照成銀色，阿墨執筆輕點：「字要放啱位，句先會通順喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"心"},{"r":0,"c":1,"char":"平"},{"r":0,"c":2,"char":"氣"},{"r":0,"c":3,"char":"和"},{"r":1,"c":0,"char":"照"},{"r":2,"c":0,"char":"不"},{"r":3,"c":0,"char":"宣"}],"slots":[{"idiomId":"xin-ping-qi-he","row":0,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"xin-zhao-bu-xuan","row":0,"col":0,"dir":"v","blanks":[2]}],"bank":["氣","平","不","書"],"hintLimit":3},{"id":23,"chapter":3,"mode":"fill","title":"第 3 課：書齋夜讀","story":"窗外蟲鳴陣陣，糰子打了個呵欠，又被書頁上的亮字吸引住。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"滄"},{"r":1,"c":0,"char":"海"},{"r":2,"c":0,"char":"一"},{"r":2,"c":1,"char":"葉"},{"r":2,"c":2,"char":"知"},{"r":2,"c":3,"char":"秋"},{"r":3,"c":0,"char":"粟"}],"slots":[{"idiomId":"yi-ye-zhi-qiu","row":2,"col":0,"dir":"h","blanks":[1]},{"idiomId":"cang-hai-yi-su","row":0,"col":0,"dir":"v","blanks":[1,3]}],"bank":["葉","海","粟","廢"],"hintLimit":3},{"id":24,"chapter":3,"mode":"fill","title":"第 4 課：月照靈珠","story":"月光把硯台照成銀色，阿墨執筆輕點：「字要放啱位，句先會通順喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":3,"char":"坐"},{"r":1,"c":3,"char":"井"},{"r":2,"c":3,"char":"觀"},{"r":3,"c":0,"char":"人"},{"r":3,"c":1,"char":"定"},{"r":3,"c":2,"char":"勝"},{"r":3,"c":3,"char":"天"}],"slots":[{"idiomId":"zuo-jing-guan-tian","row":0,"col":3,"dir":"v","blanks":[0]},{"idiomId":"ren-ding-sheng-tian","row":3,"col":0,"dir":"h","blanks":[0,2]}],"bank":["坐","勝","櫪","人"],"hintLimit":3},{"id":25,"chapter":3,"mode":"chain","title":"第 5 課：墨香伴月","story":"阿墨翻開古卷，靈珠的光沿着文字流動：一句接一句，光芒就越來越盛。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"虎"},{"r":0,"c":1,"char":"口"},{"r":0,"c":2,"char":"餘"},{"r":0,"c":3,"char":"生"},{"r":1,"c":0,"char":"生"},{"r":1,"c":1,"char":"龍"},{"r":1,"c":2,"char":"活"},{"r":1,"c":3,"char":"虎"},{"r":2,"c":0,"char":"虎"},{"r":2,"c":1,"char":"頭"},{"r":2,"c":2,"char":"蛇"},{"r":2,"c":3,"char":"尾"},{"r":3,"c":0,"char":"尾"},{"r":3,"c":1,"char":"大"},{"r":3,"c":2,"char":"不"},{"r":3,"c":3,"char":"掉"}],"slots":[{"idiomId":"hu-kou-yu-sheng","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"sheng-long-huo-hu","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"hu-tou-she-wei","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"wei-da-bu-diao","row":3,"col":0,"dir":"h","blanks":[1,3]}],"bank":["龍","蛇","掉","頭","活","大","親"],"hintLimit":3},{"id":26,"chapter":3,"mode":"fill","title":"第 6 課：窗前一課","story":"月光把硯台照成銀色，阿墨執筆輕點：「字要放啱位，句先會通順喵。」","rows":4,"cols":6,"cells":[{"r":0,"c":2,"char":"應"},{"r":1,"c":2,"char":"有"},{"r":1,"c":3,"char":"條"},{"r":1,"c":4,"char":"不"},{"r":1,"c":5,"char":"紊"},{"r":2,"c":2,"char":"盡"},{"r":3,"c":0,"char":"有"},{"r":3,"c":1,"char":"始"},{"r":3,"c":2,"char":"有"},{"r":3,"c":3,"char":"終"}],"slots":[{"idiomId":"you-shi-you-zhong","row":3,"col":0,"dir":"h","blanks":[1]},{"idiomId":"ying-you-jin-you","row":0,"col":2,"dir":"v","blanks":[0]},{"idiomId":"you-tiao-bu-wen","row":1,"col":2,"dir":"h","blanks":[1,2,3]}],"bank":["不","紊","始","囊","應","條"],"hintLimit":3},{"id":27,"chapter":3,"mode":"fill","title":"第 7 課：月華解字","story":"月光把硯台照成銀色，阿墨執筆輕點：「字要放啱位，句先會通順喵。」","rows":4,"cols":6,"cells":[{"r":0,"c":3,"char":"秀"},{"r":1,"c":2,"char":"世"},{"r":1,"c":3,"char":"外"},{"r":1,"c":4,"char":"桃"},{"r":1,"c":5,"char":"源"},{"r":2,"c":3,"char":"慧"},{"r":3,"c":0,"char":"樂"},{"r":3,"c":1,"char":"在"},{"r":3,"c":2,"char":"其"},{"r":3,"c":3,"char":"中"}],"slots":[{"idiomId":"shi-wai-tao-yuan","row":1,"col":2,"dir":"h","blanks":[1,3]},{"idiomId":"xiu-wai-hui-zhong","row":0,"col":3,"dir":"v","blanks":[0,1]},{"idiomId":"le-zai-qi-zhong","row":3,"col":0,"dir":"h","blanks":[0,2]}],"bank":["七","樂","外","源","秀","其"],"hintLimit":3},{"id":28,"chapter":3,"mode":"fill","title":"第 8 課：古籍微光","story":"窗外蟲鳴陣陣，糰子打了個呵欠，又被書頁上的亮字吸引住。","rows":5,"cols":4,"cells":[{"r":0,"c":3,"char":"任"},{"r":1,"c":2,"char":"夸"},{"r":1,"c":3,"char":"重"},{"r":2,"c":2,"char":"父"},{"r":2,"c":3,"char":"道"},{"r":3,"c":0,"char":"慎"},{"r":3,"c":1,"char":"終"},{"r":3,"c":2,"char":"追"},{"r":3,"c":3,"char":"遠"},{"r":4,"c":2,"char":"日"}],"slots":[{"idiomId":"kua-fu-zhui-ri","row":1,"col":2,"dir":"v","blanks":[2]},{"idiomId":"shen-zhong-zhui-yuan","row":3,"col":0,"dir":"h","blanks":[0,2]},{"idiomId":"ren-zhong-dao-yuan","row":0,"col":3,"dir":"v","blanks":[0,1,2]}],"bank":["追","道","蜉","慎","重","任"],"hintLimit":3},{"id":29,"chapter":3,"mode":"fill","title":"第 9 課：夜闌成語","story":"窗外蟲鳴陣陣，糰子打了個呵欠，又被書頁上的亮字吸引住。","rows":4,"cols":6,"cells":[{"r":0,"c":0,"char":"花"},{"r":0,"c":1,"char":"容"},{"r":0,"c":2,"char":"月"},{"r":0,"c":3,"char":"貌"},{"r":1,"c":2,"char":"白"},{"r":2,"c":2,"char":"風"},{"r":2,"c":3,"char":"調"},{"r":2,"c":4,"char":"雨"},{"r":2,"c":5,"char":"順"},{"r":3,"c":2,"char":"清"}],"slots":[{"idiomId":"feng-tiao-yu-shun","row":2,"col":2,"dir":"h","blanks":[2,3]},{"idiomId":"yue-bai-feng-qing","row":0,"col":2,"dir":"v","blanks":[0,3]},{"idiomId":"hua-rong-yue-mao","row":0,"col":0,"dir":"h","blanks":[0,2]}],"bank":["花","直","順","月","清","雨"],"hintLimit":3},{"id":30,"chapter":3,"mode":"chain","title":"第 10 課：月圓珠現","story":"月下書齋最深一層，古籍圍成一圈，中間的靈珠微微發亮。阿墨說：「呢個係月下最後一課喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"一"},{"r":0,"c":1,"char":"意"},{"r":0,"c":2,"char":"孤"},{"r":0,"c":3,"char":"行"},{"r":1,"c":0,"char":"行"},{"r":1,"c":1,"char":"雲"},{"r":1,"c":2,"char":"流"},{"r":1,"c":3,"char":"水"},{"r":2,"c":0,"char":"水"},{"r":2,"c":1,"char":"落"},{"r":2,"c":2,"char":"石"},{"r":2,"c":3,"char":"出"},{"r":3,"c":0,"char":"出"},{"r":3,"c":1,"char":"類"},{"r":3,"c":2,"char":"拔"},{"r":3,"c":3,"char":"萃"}],"slots":[{"idiomId":"yi-yi-gu-xing","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"xing-yun-liu-shui","row":1,"col":0,"dir":"h","blanks":[2]},{"idiomId":"shui-luo-shi-chu","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"chu-lei-ba-cui","row":3,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["類","落","萃","流","石","渭","拔"],"hintLimit":3},{"id":31,"chapter":4,"mode":"fill","title":"第 1 課：雪落溫泉","story":"溫泉邊的水聲答答，糰子把字卡排在石頭上，一邊抖一邊填。","rows":5,"cols":4,"cells":[{"r":0,"c":3,"char":"大"},{"r":1,"c":0,"char":"大"},{"r":1,"c":1,"char":"吃"},{"r":1,"c":2,"char":"一"},{"r":1,"c":3,"char":"驚"},{"r":2,"c":0,"char":"公"},{"r":2,"c":3,"char":"小"},{"r":3,"c":0,"char":"無"},{"r":3,"c":3,"char":"怪"},{"r":4,"c":0,"char":"私"}],"slots":[{"idiomId":"da-chi-yi-jing","row":1,"col":0,"dir":"h","blanks":[1,2,3]},{"idiomId":"da-jing-xiao-guai","row":0,"col":3,"dir":"v","blanks":[1,2]},{"idiomId":"da-gong-wu-si","row":1,"col":0,"dir":"v","blanks":[3]}],"bank":["隔","一","汀","小","驚","吃","私"],"hintLimit":2},{"id":32,"chapter":4,"mode":"fill","title":"第 2 課：白雪山碑","story":"阿墨捧着熱茶，指着霧氣中的石碑：「字就藏在雪裏，慢慢睇就見到喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"龍"},{"r":0,"c":1,"char":"飛"},{"r":0,"c":2,"char":"鳳"},{"r":0,"c":3,"char":"舞"},{"r":1,"c":0,"char":"騰"},{"r":2,"c":0,"char":"虎"},{"r":2,"c":1,"char":"背"},{"r":2,"c":2,"char":"熊"},{"r":2,"c":3,"char":"腰"},{"r":3,"c":0,"char":"躍"}],"slots":[{"idiomId":"long-teng-hu-yue","row":0,"col":0,"dir":"v","blanks":[1]},{"idiomId":"hu-bei-xiong-yao","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"long-fei-feng-wu","row":0,"col":0,"dir":"h","blanks":[1,3]}],"bank":["舞","騰","背","是","熊","沆","飛"],"hintLimit":2},{"id":33,"chapter":4,"mode":"fill","title":"第 3 課：霧中辨字","story":"溫泉邊的水聲答答，糰子把字卡排在石頭上，一邊抖一邊填。","rows":7,"cols":4,"cells":[{"r":0,"c":1,"char":"積"},{"r":1,"c":1,"char":"少"},{"r":2,"c":0,"char":"行"},{"r":2,"c":1,"char":"成"},{"r":2,"c":2,"char":"於"},{"r":2,"c":3,"char":"思"},{"r":3,"c":1,"char":"多"},{"r":4,"c":1,"char":"多"},{"r":5,"c":1,"char":"益"},{"r":6,"c":1,"char":"善"}],"slots":[{"idiomId":"ji-shao-cheng-duo","row":0,"col":1,"dir":"v","blanks":[0,3]},{"idiomId":"xing-cheng-yu-si","row":2,"col":0,"dir":"h","blanks":[2,3]},{"idiomId":"duo-duo-yi-shan","row":3,"col":1,"dir":"v","blanks":[0,2]}],"bank":["思","多","於","事","益","人","積"],"hintLimit":2},{"id":34,"chapter":4,"mode":"fill","title":"第 4 課：溫泉暖語","story":"阿墨捧着熱茶，指着霧氣中的石碑：「字就藏在雪裏，慢慢睇就見到喵。」","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"大"},{"r":1,"c":0,"char":"驚"},{"r":1,"c":1,"char":"心"},{"r":1,"c":2,"char":"動"},{"r":1,"c":3,"char":"魄"},{"r":2,"c":0,"char":"小"},{"r":2,"c":1,"char":"灰"},{"r":3,"c":0,"char":"怪"},{"r":3,"c":1,"char":"意"},{"r":4,"c":1,"char":"冷"}],"slots":[{"idiomId":"jing-xin-dong-po","row":1,"col":0,"dir":"h","blanks":[2,3]},{"idiomId":"xin-hui-yi-leng","row":1,"col":1,"dir":"v","blanks":[3]},{"idiomId":"da-jing-xiao-guai","row":0,"col":0,"dir":"v","blanks":[0,3]}],"bank":["雪","動","螳","怪","魄","冷","大"],"hintLimit":2},{"id":35,"chapter":4,"mode":"chain","title":"第 5 課：雪花拼句","story":"糰子把凍僵的貓爪呵暖，繼續把成語一句一句接落去。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"水"},{"r":0,"c":1,"char":"漲"},{"r":0,"c":2,"char":"船"},{"r":0,"c":3,"char":"高"},{"r":1,"c":0,"char":"高"},{"r":1,"c":1,"char":"山"},{"r":1,"c":2,"char":"流"},{"r":1,"c":3,"char":"水"},{"r":2,"c":0,"char":"水"},{"r":2,"c":1,"char":"落"},{"r":2,"c":2,"char":"石"},{"r":2,"c":3,"char":"出"},{"r":3,"c":0,"char":"出"},{"r":3,"c":1,"char":"奇"},{"r":3,"c":2,"char":"制"},{"r":3,"c":3,"char":"勝"}],"slots":[{"idiomId":"shui-zhang-chuan-gao","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"gao-shan-liu-shui","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shui-luo-shi-chu","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"chu-qi-zhi-sheng","row":3,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["勝","石","中","流","制","山","於","落","奇"],"hintLimit":2},{"id":36,"chapter":4,"mode":"fill","title":"第 6 課：山頂石碑","story":"雪山溫泉冒着白煙，石碑上結了一層薄霜。糰子用肉球抹開霜花，露出缺字的碑文。","rows":4,"cols":7,"cells":[{"r":0,"c":0,"char":"良"},{"r":0,"c":1,"char":"藥"},{"r":0,"c":2,"char":"苦"},{"r":0,"c":3,"char":"口"},{"r":0,"c":4,"char":"蜜"},{"r":0,"c":5,"char":"腹"},{"r":0,"c":6,"char":"劍"},{"r":1,"c":3,"char":"誅"},{"r":2,"c":3,"char":"筆"},{"r":3,"c":3,"char":"伐"}],"slots":[{"idiomId":"liang-yao-ku-kou","row":0,"col":0,"dir":"h","blanks":[2]},{"idiomId":"kou-zhu-bi-fa","row":0,"col":3,"dir":"v","blanks":[2,3]},{"idiomId":"kou-mi-fu-jian","row":0,"col":3,"dir":"h","blanks":[1,2]}],"bank":["一","屍","伐","筆","苦","腹","蜜"],"hintLimit":2},{"id":37,"chapter":4,"mode":"fill","title":"第 7 課：熱湯書聲","story":"阿墨捧着熱茶，指着霧氣中的石碑：「字就藏在雪裏，慢慢睇就見到喵。」","rows":4,"cols":7,"cells":[{"r":0,"c":0,"char":"一"},{"r":0,"c":1,"char":"諾"},{"r":0,"c":2,"char":"千"},{"r":0,"c":3,"char":"金"},{"r":0,"c":4,"char":"蟬"},{"r":0,"c":5,"char":"脫"},{"r":0,"c":6,"char":"殼"},{"r":1,"c":0,"char":"視"},{"r":2,"c":0,"char":"同"},{"r":3,"c":0,"char":"仁"}],"slots":[{"idiomId":"yi-nuo-qian-jin","row":0,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"jin-chan-tuo-qiao","row":0,"col":3,"dir":"h","blanks":[1]},{"idiomId":"yi-shi-tong-ren","row":0,"col":0,"dir":"v","blanks":[1,3]}],"bank":["決","桃","視","仁","諾","蟬","千"],"hintLimit":2},{"id":38,"chapter":4,"mode":"fill","title":"第 8 課：雪徑貓蹤","story":"雪山溫泉冒着白煙，石碑上結了一層薄霜。糰子用肉球抹開霜花，露出缺字的碑文。","rows":5,"cols":4,"cells":[{"r":0,"c":2,"char":"見"},{"r":1,"c":2,"char":"義"},{"r":1,"c":3,"char":"豁"},{"r":2,"c":2,"char":"勇"},{"r":2,"c":3,"char":"然"},{"r":3,"c":0,"char":"金"},{"r":3,"c":1,"char":"石"},{"r":3,"c":2,"char":"為"},{"r":3,"c":3,"char":"開"},{"r":4,"c":3,"char":"朗"}],"slots":[{"idiomId":"huo-ran-kai-lang","row":1,"col":3,"dir":"v","blanks":[0,3]},{"idiomId":"jin-shi-wei-kai","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"jian-yi-yong-wei","row":0,"col":2,"dir":"v","blanks":[1,3]}],"bank":["龍","石","為","豁","朗","盲","義"],"hintLimit":2},{"id":39,"chapter":4,"mode":"fill","title":"第 9 課：冰晶文字","story":"阿墨捧着熱茶，指着霧氣中的石碑：「字就藏在雪裏，慢慢睇就見到喵。」","rows":4,"cols":6,"cells":[{"r":0,"c":0,"char":"堂"},{"r":0,"c":1,"char":"堂"},{"r":0,"c":2,"char":"正"},{"r":0,"c":3,"char":"正"},{"r":1,"c":3,"char":"大"},{"r":2,"c":3,"char":"光"},{"r":3,"c":2,"char":"月"},{"r":3,"c":3,"char":"明"},{"r":3,"c":4,"char":"星"},{"r":3,"c":5,"char":"稀"}],"slots":[{"idiomId":"tang-tang-zheng-zheng","row":0,"col":0,"dir":"h","blanks":[0]},{"idiomId":"zheng-da-guang-ming","row":0,"col":3,"dir":"v","blanks":[1,2,3]},{"idiomId":"yue-ming-xing-xi","row":3,"col":2,"dir":"h","blanks":[1,2]}],"bank":["明","光","惡","星","金","堂","大"],"hintLimit":2},{"id":40,"chapter":4,"mode":"chain","title":"第 10 課：雪融珠明","story":"雪山溫泉的山頂，石碑被雪覆蓋，只露出幾個字。糰子要用一路所學，把碑文補完先落得山。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"一"},{"r":0,"c":1,"char":"字"},{"r":0,"c":2,"char":"千"},{"r":0,"c":3,"char":"金"},{"r":1,"c":0,"char":"金"},{"r":1,"c":1,"char":"戈"},{"r":1,"c":2,"char":"鐵"},{"r":1,"c":3,"char":"馬"},{"r":2,"c":0,"char":"馬"},{"r":2,"c":1,"char":"到"},{"r":2,"c":2,"char":"成"},{"r":2,"c":3,"char":"功"},{"r":3,"c":0,"char":"功"},{"r":3,"c":1,"char":"成"},{"r":3,"c":2,"char":"身"},{"r":3,"c":3,"char":"退"}],"slots":[{"idiomId":"yi-zi-qian-jin","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"jin-ge-tie-ma","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"ma-dao-cheng-gong","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"gong-cheng-shen-tui","row":3,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["山","退","身","鐵","戈","成","再","成","到"],"hintLimit":2},{"id":41,"chapter":5,"mode":"fill","title":"第 1 課：燈塔照字","story":"海邊燈塔一閃一閃，漁夫貓在岸邊補網，順便考糰子幾個成語。糰子盯着濕漉漉的石板努力想。","rows":4,"cols":4,"cells":[{"r":0,"c":1,"char":"出"},{"r":0,"c":2,"char":"夜"},{"r":1,"c":1,"char":"其"},{"r":1,"c":2,"char":"郎"},{"r":2,"c":0,"char":"情"},{"r":2,"c":1,"char":"不"},{"r":2,"c":2,"char":"自"},{"r":2,"c":3,"char":"禁"},{"r":3,"c":1,"char":"意"},{"r":3,"c":2,"char":"大"}],"slots":[{"idiomId":"qing-bu-zi-jin","row":2,"col":0,"dir":"h","blanks":[2,3]},{"idiomId":"chu-qi-bu-yi","row":0,"col":1,"dir":"v","blanks":[0,1,3]},{"idiomId":"ye-lang-zi-da","row":0,"col":2,"dir":"v","blanks":[2]}],"bank":["自","艾","坐","禁","出","致","意","其"],"hintLimit":2},{"id":42,"chapter":5,"mode":"fill","title":"第 2 課：海浪接句","story":"海邊燈塔一閃一閃，漁夫貓在岸邊補網，順便考糰子幾個成語。糰子盯着濕漉漉的石板努力想。","rows":4,"cols":7,"cells":[{"r":0,"c":0,"char":"膾"},{"r":0,"c":1,"char":"炙"},{"r":0,"c":2,"char":"人"},{"r":0,"c":3,"char":"口"},{"r":0,"c":4,"char":"是"},{"r":0,"c":5,"char":"心"},{"r":0,"c":6,"char":"非"},{"r":1,"c":5,"char":"花"},{"r":2,"c":5,"char":"怒"},{"r":3,"c":5,"char":"放"}],"slots":[{"idiomId":"xin-hua-nu-fang","row":0,"col":5,"dir":"v","blanks":[1,2]},{"idiomId":"kou-shi-xin-fei","row":0,"col":3,"dir":"h","blanks":[0,3]},{"idiomId":"kuai-zhi-ren-kou","row":0,"col":0,"dir":"h","blanks":[2,3]}],"bank":["怒","素","口","人","非","槍","窮","花"],"hintLimit":2},{"id":43,"chapter":5,"mode":"fill","title":"第 3 課：漁火夜話","story":"浪花拍上石灘，帶來幾張濕透的字卡。阿墨說：「睇清楚字嘅位置，先擺得啱喵。」","rows":5,"cols":4,"cells":[{"r":0,"c":3,"char":"莫"},{"r":1,"c":2,"char":"驚"},{"r":1,"c":3,"char":"逆"},{"r":2,"c":2,"char":"弓"},{"r":2,"c":3,"char":"之"},{"r":3,"c":0,"char":"貧"},{"r":3,"c":1,"char":"賤"},{"r":3,"c":2,"char":"之"},{"r":3,"c":3,"char":"交"},{"r":4,"c":2,"char":"鳥"}],"slots":[{"idiomId":"jing-gong-zhi-niao","row":1,"col":2,"dir":"v","blanks":[0,3]},{"idiomId":"pin-jian-zhi-jiao","row":3,"col":0,"dir":"h","blanks":[0,1]},{"idiomId":"mo-ni-zhi-jiao","row":0,"col":3,"dir":"v","blanks":[0]}],"bank":["莫","堂","功","驚","貧","位","鳥","賤"],"hintLimit":2},{"id":44,"chapter":5,"mode":"fill","title":"第 4 課：潮聲誦文","story":"浪花拍上石灘，帶來幾張濕透的字卡。阿墨說：「睇清楚字嘅位置，先擺得啱喵。」","rows":5,"cols":4,"cells":[{"r":0,"c":2,"char":"水"},{"r":1,"c":0,"char":"上"},{"r":1,"c":2,"char":"到"},{"r":2,"c":0,"char":"行"},{"r":2,"c":2,"char":"渠"},{"r":3,"c":0,"char":"下"},{"r":3,"c":1,"char":"筆"},{"r":3,"c":2,"char":"成"},{"r":3,"c":3,"char":"章"},{"r":4,"c":0,"char":"效"}],"slots":[{"idiomId":"shui-dao-qu-cheng","row":0,"col":2,"dir":"v","blanks":[0,3]},{"idiomId":"xia-bi-cheng-zhang","row":3,"col":0,"dir":"h","blanks":[1,2,3]},{"idiomId":"shang-xing-xia-xiao","row":1,"col":0,"dir":"v","blanks":[1]}],"bank":["章","成","水","底","筆","鮒","闊","行"],"hintLimit":2},{"id":45,"chapter":5,"mode":"chain","title":"第 5 課：海風翻頁","story":"燈塔下的石階濕滑，糰子小心翼翼，把成語一句接一句排上階梯。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"積"},{"r":0,"c":1,"char":"土"},{"r":0,"c":2,"char":"成"},{"r":0,"c":3,"char":"山"},{"r":1,"c":0,"char":"山"},{"r":1,"c":1,"char":"明"},{"r":1,"c":2,"char":"水"},{"r":1,"c":3,"char":"秀"},{"r":2,"c":0,"char":"秀"},{"r":2,"c":1,"char":"外"},{"r":2,"c":2,"char":"慧"},{"r":2,"c":3,"char":"中"},{"r":3,"c":0,"char":"中"},{"r":3,"c":1,"char":"流"},{"r":3,"c":2,"char":"砥"},{"r":3,"c":3,"char":"柱"}],"slots":[{"idiomId":"ji-tu-cheng-shan","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"shan-ming-shui-xiu","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"xiu-wai-hui-zhong","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"zhong-liu-di-zhu","row":3,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["效","晚","鄲","慧","外","柱","砥","明","流","水"],"hintLimit":2},{"id":46,"chapter":5,"mode":"fill","title":"第 6 課：燈塔守句","story":"浪花拍上石灘，帶來幾張濕透的字卡。阿墨說：「睇清楚字嘅位置，先擺得啱喵。」","rows":5,"cols":4,"cells":[{"r":0,"c":2,"char":"一"},{"r":1,"c":0,"char":"海"},{"r":1,"c":2,"char":"敗"},{"r":2,"c":0,"char":"闊"},{"r":2,"c":2,"char":"塗"},{"r":3,"c":0,"char":"天"},{"r":3,"c":1,"char":"翻"},{"r":3,"c":2,"char":"地"},{"r":3,"c":3,"char":"覆"},{"r":4,"c":0,"char":"空"}],"slots":[{"idiomId":"hai-kuo-tian-kong","row":1,"col":0,"dir":"v","blanks":[1,3]},{"idiomId":"tian-fan-di-fu","row":3,"col":0,"dir":"h","blanks":[2,3]},{"idiomId":"yi-bai-tu-di","row":0,"col":2,"dir":"v","blanks":[0,2,3]}],"bank":["相","禁","覆","塗","一","闊","仁","空","地"],"hintLimit":2},{"id":47,"chapter":5,"mode":"fill","title":"第 7 課：貝殼藏書","story":"海邊燈塔一閃一閃，漁夫貓在岸邊補網，順便考糰子幾個成語。糰子盯着濕漉漉的石板努力想。","rows":5,"cols":4,"cells":[{"r":0,"c":1,"char":"道"},{"r":1,"c":1,"char":"聽"},{"r":1,"c":2,"char":"死"},{"r":2,"c":0,"char":"半"},{"r":2,"c":1,"char":"途"},{"r":2,"c":2,"char":"而"},{"r":2,"c":3,"char":"廢"},{"r":3,"c":1,"char":"說"},{"r":3,"c":2,"char":"後"},{"r":4,"c":2,"char":"已"}],"slots":[{"idiomId":"ban-tu-er-fei","row":2,"col":0,"dir":"h","blanks":[0]},{"idiomId":"si-er-hou-yi","row":1,"col":2,"dir":"v","blanks":[2,3]},{"idiomId":"dao-ting-tu-shuo","row":0,"col":1,"dir":"v","blanks":[0,1,3]}],"bank":["已","聽","半","後","備","說","道","義","興"],"hintLimit":2},{"id":48,"chapter":5,"mode":"fill","title":"第 8 課：浪花成章","story":"燈塔的光掃過海面，糰子數着浪聲，一筆一筆把字填好。","rows":6,"cols":4,"cells":[{"r":0,"c":3,"char":"約"},{"r":1,"c":3,"char":"法"},{"r":2,"c":0,"char":"舉"},{"r":2,"c":1,"char":"一"},{"r":2,"c":2,"char":"反"},{"r":2,"c":3,"char":"三"},{"r":3,"c":1,"char":"丘"},{"r":3,"c":3,"char":"章"},{"r":4,"c":1,"char":"之"},{"r":5,"c":1,"char":"貉"}],"slots":[{"idiomId":"ju-yi-fan-san","row":2,"col":0,"dir":"h","blanks":[0,2]},{"idiomId":"yi-qiu-zhi-he","row":2,"col":1,"dir":"v","blanks":[1,2,3]},{"idiomId":"yue-fa-san-zhang","row":0,"col":3,"dir":"v","blanks":[0]}],"bank":["貉","丘","之","帷","反","約","舉","諾","定"],"hintLimit":2},{"id":49,"chapter":5,"mode":"fill","title":"第 9 課：海鷗傳語","story":"浪花拍上石灘，帶來幾張濕透的字卡。阿墨說：「睇清楚字嘅位置，先擺得啱喵。」","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"望"},{"r":0,"c":1,"char":"洋"},{"r":0,"c":2,"char":"興"},{"r":0,"c":3,"char":"嘆"},{"r":1,"c":2,"char":"致"},{"r":1,"c":3,"char":"為"},{"r":2,"c":2,"char":"勃"},{"r":2,"c":3,"char":"觀"},{"r":3,"c":2,"char":"勃"},{"r":3,"c":3,"char":"止"}],"slots":[{"idiomId":"xing-zhi-bo-bo","row":0,"col":2,"dir":"v","blanks":[1,3]},{"idiomId":"wang-yang-xing-tan","row":0,"col":0,"dir":"h","blanks":[0,1]},{"idiomId":"tan-wei-guan-zhi","row":0,"col":3,"dir":"v","blanks":[2,3]}],"bank":["止","東","焚","望","致","洋","勃","紅","觀"],"hintLimit":2},{"id":50,"chapter":5,"mode":"chain","title":"第 10 課：燈明珠現","story":"燈塔最頂層的房間，漁夫貓留下的最後一道謎題就刻在牆上。海風從窗口灌入，糰子抓緊字卡喵。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"一"},{"r":0,"c":1,"char":"字"},{"r":0,"c":2,"char":"千"},{"r":0,"c":3,"char":"金"},{"r":1,"c":0,"char":"金"},{"r":1,"c":1,"char":"枝"},{"r":1,"c":2,"char":"玉"},{"r":1,"c":3,"char":"葉"},{"r":2,"c":0,"char":"葉"},{"r":2,"c":1,"char":"公"},{"r":2,"c":2,"char":"好"},{"r":2,"c":3,"char":"龍"},{"r":3,"c":0,"char":"龍"},{"r":3,"c":1,"char":"潭"},{"r":3,"c":2,"char":"虎"},{"r":3,"c":3,"char":"穴"}],"slots":[{"idiomId":"yi-zi-qian-jin","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"jin-zhi-yu-ye","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"ye-gong-hao-long","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"long-tan-hu-xue","row":3,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["虎","厚","迴","好","公","穴","玉","潭","效","枝"],"hintLimit":2},{"id":51,"chapter":6,"mode":"fill","title":"第 1 課：星光排句","story":"流星劃過，糰子連忙許願：「希望今晚啲字都乖乖歸位！」惹得眾貓笑起來。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"小"},{"r":0,"c":1,"char":"心"},{"r":0,"c":2,"char":"翼"},{"r":0,"c":3,"char":"翼"},{"r":1,"c":0,"char":"國"},{"r":1,"c":1,"char":"直"},{"r":2,"c":0,"char":"寡"},{"r":2,"c":1,"char":"口"},{"r":3,"c":0,"char":"民"},{"r":3,"c":1,"char":"快"}],"slots":[{"idiomId":"xiao-xin-yi-yi","row":0,"col":0,"dir":"h","blanks":[2]},{"idiomId":"xiao-guo-gua-min","row":0,"col":0,"dir":"v","blanks":[1,2,3]},{"idiomId":"xin-zhi-kou-kuai","row":0,"col":1,"dir":"v","blanks":[1,3]}],"bank":["笑","快","翼","寡","恃","直","國","民","墜"],"hintLimit":2},{"id":52,"chapter":6,"mode":"fill","title":"第 2 課：夜空吟詩","story":"流星劃過，糰子連忙許願：「希望今晚啲字都乖乖歸位！」惹得眾貓笑起來。","rows":5,"cols":4,"cells":[{"r":0,"c":3,"char":"言"},{"r":1,"c":2,"char":"井"},{"r":1,"c":3,"char":"歸"},{"r":2,"c":2,"char":"底"},{"r":2,"c":3,"char":"於"},{"r":3,"c":0,"char":"秦"},{"r":3,"c":1,"char":"晉"},{"r":3,"c":2,"char":"之"},{"r":3,"c":3,"char":"好"},{"r":4,"c":2,"char":"蛙"}],"slots":[{"idiomId":"jing-di-zhi-wa","row":1,"col":2,"dir":"v","blanks":[0]},{"idiomId":"qin-jin-zhi-hao","row":3,"col":0,"dir":"h","blanks":[0,1]},{"idiomId":"yan-gui-yu-hao","row":0,"col":3,"dir":"v","blanks":[0,1,2]}],"bank":["途","秦","井","歸","言","晉","旁","食","於"],"hintLimit":2},{"id":53,"chapter":6,"mode":"fill","title":"第 3 課：星軌成章","story":"星空詩會開始了，貓貓圍坐草地，天上星星排成缺字的句子，等大家一齊補完。","rows":4,"cols":6,"cells":[{"r":0,"c":3,"char":"盲"},{"r":1,"c":2,"char":"三"},{"r":1,"c":3,"char":"人"},{"r":1,"c":4,"char":"成"},{"r":1,"c":5,"char":"虎"},{"r":2,"c":3,"char":"瞎"},{"r":3,"c":0,"char":"塞"},{"r":3,"c":1,"char":"翁"},{"r":3,"c":2,"char":"失"},{"r":3,"c":3,"char":"馬"}],"slots":[{"idiomId":"sai-weng-shi-ma","row":3,"col":0,"dir":"h","blanks":[0,2,3]},{"idiomId":"mang-ren-xia-ma","row":0,"col":3,"dir":"v","blanks":[2,3]},{"idiomId":"san-ren-cheng-hu","row":1,"col":2,"dir":"h","blanks":[0,2]}],"bank":["華","塞","頓","益","馬","失","成","三","瞎"],"hintLimit":2},{"id":54,"chapter":6,"mode":"fill","title":"第 4 課：草坪詩會","story":"阿墨仰頭數星，說每顆星都係一個字：「擺啱位，滿天就係一篇好文章喵。」","rows":4,"cols":7,"cells":[{"r":0,"c":3,"char":"枯"},{"r":0,"c":4,"char":"木"},{"r":0,"c":5,"char":"逢"},{"r":0,"c":6,"char":"春"},{"r":1,"c":0,"char":"緣"},{"r":1,"c":1,"char":"木"},{"r":1,"c":2,"char":"求"},{"r":1,"c":3,"char":"魚"},{"r":2,"c":3,"char":"之"},{"r":3,"c":3,"char":"肆"}],"slots":[{"idiomId":"yuan-mu-qiu-yu","row":1,"col":0,"dir":"h","blanks":[0,2]},{"idiomId":"ku-yu-zhi-si","row":0,"col":3,"dir":"v","blanks":[0,2,3]},{"idiomId":"ku-mu-feng-chun","row":0,"col":3,"dir":"h","blanks":[0,1]}],"bank":["求","爭","緣","木","肆","湖","之","亡","枯"],"hintLimit":2},{"id":55,"chapter":6,"mode":"chain","title":"第 5 課：流星許願","story":"星星一顆接一顆，連成一條銀河。糰子要順住星軌，把成語一句接一句串起來。","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"心"},{"r":0,"c":1,"char":"口"},{"r":0,"c":2,"char":"如"},{"r":0,"c":3,"char":"一"},{"r":1,"c":0,"char":"一"},{"r":1,"c":1,"char":"字"},{"r":1,"c":2,"char":"千"},{"r":1,"c":3,"char":"金"},{"r":2,"c":0,"char":"金"},{"r":2,"c":1,"char":"戈"},{"r":2,"c":2,"char":"鐵"},{"r":2,"c":3,"char":"馬"},{"r":3,"c":0,"char":"馬"},{"r":3,"c":1,"char":"到"},{"r":3,"c":2,"char":"成"},{"r":3,"c":3,"char":"功"},{"r":4,"c":0,"char":"功"},{"r":4,"c":1,"char":"成"},{"r":4,"c":2,"char":"身"},{"r":4,"c":3,"char":"退"}],"slots":[{"idiomId":"xin-kou-ru-yi","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"yi-zi-qian-jin","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"jin-ge-tie-ma","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"ma-dao-cheng-gong","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"gong-cheng-shen-tui","row":4,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["鐵","退","成","成","到","談","群","千","字","網","戈","身"],"hintLimit":2},{"id":56,"chapter":6,"mode":"fill","title":"第 6 課：銀河對句","story":"流星劃過，糰子連忙許願：「希望今晚啲字都乖乖歸位！」惹得眾貓笑起來。","rows":4,"cols":7,"cells":[{"r":0,"c":3,"char":"百"},{"r":1,"c":3,"char":"發"},{"r":1,"c":4,"char":"憤"},{"r":1,"c":5,"char":"忘"},{"r":1,"c":6,"char":"食"},{"r":2,"c":3,"char":"百"},{"r":3,"c":0,"char":"曳"},{"r":3,"c":1,"char":"尾"},{"r":3,"c":2,"char":"塗"},{"r":3,"c":3,"char":"中"}],"slots":[{"idiomId":"bai-fa-bai-zhong","row":0,"col":3,"dir":"v","blanks":[0,2]},{"idiomId":"ye-wei-tu-zhong","row":3,"col":0,"dir":"h","blanks":[0,1]},{"idiomId":"fa-fen-wang-shi","row":1,"col":3,"dir":"h","blanks":[2,3]}],"bank":["尾","瞻","百","瞪","食","百","曳","冬","忘"],"hintLimit":2},{"id":57,"chapter":6,"mode":"fill","title":"第 7 課：星垂平野","story":"阿墨仰頭數星，說每顆星都係一個字：「擺啱位，滿天就係一篇好文章喵。」","rows":4,"cols":6,"cells":[{"r":0,"c":3,"char":"得"},{"r":1,"c":2,"char":"嘔"},{"r":1,"c":3,"char":"心"},{"r":1,"c":4,"char":"瀝"},{"r":1,"c":5,"char":"血"},{"r":2,"c":3,"char":"應"},{"r":3,"c":0,"char":"上"},{"r":3,"c":1,"char":"下"},{"r":3,"c":2,"char":"其"},{"r":3,"c":3,"char":"手"}],"slots":[{"idiomId":"de-xin-ying-shou","row":0,"col":3,"dir":"v","blanks":[0,3]},{"idiomId":"ou-xin-li-xue","row":1,"col":2,"dir":"h","blanks":[0,3]},{"idiomId":"shang-xia-qi-shou","row":3,"col":0,"dir":"h","blanks":[0,2,3]}],"bank":["衛","作","血","上","添","得","手","其","嘔"],"hintLimit":2},{"id":58,"chapter":6,"mode":"fill","title":"第 8 課：星語連珠","story":"星空詩會開始了，貓貓圍坐草地，天上星星排成缺字的句子，等大家一齊補完。","rows":4,"cols":7,"cells":[{"r":0,"c":0,"char":"狼"},{"r":0,"c":1,"char":"子"},{"r":0,"c":2,"char":"野"},{"r":0,"c":3,"char":"心"},{"r":0,"c":4,"char":"口"},{"r":0,"c":5,"char":"如"},{"r":0,"c":6,"char":"一"},{"r":1,"c":3,"char":"甘"},{"r":2,"c":3,"char":"情"},{"r":3,"c":3,"char":"願"}],"slots":[{"idiomId":"xin-gan-qing-yuan","row":0,"col":3,"dir":"v","blanks":[2,3]},{"idiomId":"lang-zi-ye-xin","row":0,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"xin-kou-ru-yi","row":0,"col":3,"dir":"h","blanks":[2,3]}],"bank":["情","如","願","子","野","一","盾","弓","新"],"hintLimit":2},{"id":59,"chapter":6,"mode":"fill","title":"第 9 課：繁星入卷","story":"星空詩會開始了，貓貓圍坐草地，天上星星排成缺字的句子，等大家一齊補完。","rows":4,"cols":5,"cells":[{"r":0,"c":0,"char":"上"},{"r":0,"c":1,"char":"下"},{"r":0,"c":2,"char":"一"},{"r":0,"c":3,"char":"心"},{"r":1,"c":2,"char":"鼓"},{"r":2,"c":2,"char":"作"},{"r":3,"c":1,"char":"血"},{"r":3,"c":2,"char":"氣"},{"r":3,"c":3,"char":"方"},{"r":3,"c":4,"char":"剛"}],"slots":[{"idiomId":"yi-gu-zuo-qi","row":0,"col":2,"dir":"v","blanks":[2]},{"idiomId":"xue-qi-fang-gang","row":3,"col":1,"dir":"h","blanks":[0,2,3]},{"idiomId":"shang-xia-yi-xin","row":0,"col":0,"dir":"h","blanks":[0,1]}],"bank":["方","恐","血","燕","舊","剛","上","下","作"],"hintLimit":2},{"id":60,"chapter":6,"mode":"chain","title":"第 10 課：星聚珠成","story":"星空詩會的最後一首詩還未完成，眾貓都望着糰子。阿墨笑說：「今晚嘅壓軸，交畀你喵。」","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"眾"},{"r":0,"c":1,"char":"口"},{"r":0,"c":2,"char":"鑠"},{"r":0,"c":3,"char":"金"},{"r":1,"c":0,"char":"金"},{"r":1,"c":1,"char":"戈"},{"r":1,"c":2,"char":"鐵"},{"r":1,"c":3,"char":"馬"},{"r":2,"c":0,"char":"馬"},{"r":2,"c":1,"char":"到"},{"r":2,"c":2,"char":"成"},{"r":2,"c":3,"char":"功"},{"r":3,"c":0,"char":"功"},{"r":3,"c":1,"char":"成"},{"r":3,"c":2,"char":"身"},{"r":3,"c":3,"char":"退"},{"r":4,"c":0,"char":"退"},{"r":4,"c":1,"char":"避"},{"r":4,"c":2,"char":"三"},{"r":4,"c":3,"char":"舍"}],"slots":[{"idiomId":"zhong-kou-shuo-jin","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"jin-ge-tie-ma","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"ma-dao-cheng-gong","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"gong-cheng-shen-tui","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"tui-bi-san-she","row":4,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["避","三","成","舍","到","桃","豁","鐵","成","戈","衛","身"],"hintLimit":2},{"id":61,"chapter":7,"mode":"fill","title":"第 1 課：燈謎猜字","story":"紅燈籠高掛，阿墨在攤位前挑字卡，笑說：「猜燈謎同填字一樣，要眼利心細喵。」","rows":4,"cols":6,"cells":[{"r":0,"c":2,"char":"實"},{"r":1,"c":2,"char":"事"},{"r":1,"c":3,"char":"半"},{"r":1,"c":4,"char":"功"},{"r":1,"c":5,"char":"倍"},{"r":2,"c":2,"char":"求"},{"r":3,"c":0,"char":"唯"},{"r":3,"c":1,"char":"命"},{"r":3,"c":2,"char":"是"},{"r":3,"c":3,"char":"從"}],"slots":[{"idiomId":"shi-ban-gong-bei","row":1,"col":2,"dir":"h","blanks":[1,3]},{"idiomId":"shi-shi-qiu-shi","row":0,"col":2,"dir":"v","blanks":[2]},{"idiomId":"wei-ming-shi-cong","row":3,"col":0,"dir":"h","blanks":[0,1,3]}],"bank":["唯","土","八","倍","從","刮","半","求","命","咀"],"hintLimit":1},{"id":62,"chapter":7,"mode":"fill","title":"第 2 課：紅燈高掛","story":"燈會市集人山人海，猜燈謎的貓貓排成長龍。糰子擠到最前面，發現謎面是一句缺字的成語。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"風"},{"r":0,"c":2,"char":"兵"},{"r":1,"c":0,"char":"和"},{"r":1,"c":1,"char":"而"},{"r":1,"c":2,"char":"不"},{"r":1,"c":3,"char":"同"},{"r":2,"c":0,"char":"日"},{"r":2,"c":2,"char":"厭"},{"r":3,"c":0,"char":"麗"},{"r":3,"c":2,"char":"詐"}],"slots":[{"idiomId":"feng-he-ri-li","row":0,"col":0,"dir":"v","blanks":[0,1,2]},{"idiomId":"he-er-bu-tong","row":1,"col":0,"dir":"h","blanks":[0,1,3]},{"idiomId":"bing-bu-yan-zha","row":0,"col":2,"dir":"v","blanks":[3]}],"bank":["廢","詐","眥","而","同","風","容","日","和","秦"],"hintLimit":1},{"id":63,"chapter":7,"mode":"fill","title":"第 3 課：市集尋章","story":"糖葫蘆的甜味飄過來，糰子一邊流口水，一邊努力把字放回燈謎紙上。","rows":4,"cols":5,"cells":[{"r":0,"c":2,"char":"旁"},{"r":1,"c":1,"char":"呆"},{"r":1,"c":2,"char":"若"},{"r":1,"c":3,"char":"木"},{"r":1,"c":4,"char":"雞"},{"r":2,"c":0,"char":"仁"},{"r":2,"c":1,"char":"者"},{"r":2,"c":2,"char":"無"},{"r":2,"c":3,"char":"敵"},{"r":3,"c":2,"char":"人"}],"slots":[{"idiomId":"dai-ruo-mu-ji","row":1,"col":1,"dir":"h","blanks":[0,2]},{"idiomId":"pang-ruo-wu-ren","row":0,"col":2,"dir":"v","blanks":[0,2,3]},{"idiomId":"ren-zhe-wu-di","row":2,"col":0,"dir":"h","blanks":[0,2]}],"bank":["化","無","人","作","仁","大","旁","呆","木","樓"],"hintLimit":1},{"id":64,"chapter":7,"mode":"fill","title":"第 4 課：花燈造句","story":"糖葫蘆的甜味飄過來，糰子一邊流口水，一邊努力把字放回燈謎紙上。","rows":4,"cols":4,"cells":[{"r":0,"c":0,"char":"天"},{"r":0,"c":1,"char":"花"},{"r":0,"c":2,"char":"亂"},{"r":0,"c":3,"char":"墜"},{"r":1,"c":0,"char":"壤"},{"r":1,"c":1,"char":"紅"},{"r":2,"c":0,"char":"之"},{"r":2,"c":1,"char":"柳"},{"r":3,"c":0,"char":"別"},{"r":3,"c":1,"char":"綠"}],"slots":[{"idiomId":"hua-hong-liu-lv","row":0,"col":1,"dir":"v","blanks":[0,2]},{"idiomId":"tian-hua-luan-zhui","row":0,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"tian-rang-zhi-bie","row":0,"col":0,"dir":"v","blanks":[1,2,3]}],"bank":["別","花","之","任","柳","亂","暖","壤","門","巴"],"hintLimit":1},{"id":65,"chapter":7,"mode":"chain","title":"第 5 課：舞獅聽文","story":"花燈一盞接一盞，燈謎一句接一句。糰子沿着燈串走，把成語逐句接好。","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"若"},{"r":0,"c":1,"char":"有"},{"r":0,"c":2,"char":"若"},{"r":0,"c":3,"char":"無"},{"r":1,"c":0,"char":"無"},{"r":1,"c":1,"char":"中"},{"r":1,"c":2,"char":"生"},{"r":1,"c":3,"char":"有"},{"r":2,"c":0,"char":"有"},{"r":2,"c":1,"char":"求"},{"r":2,"c":2,"char":"必"},{"r":2,"c":3,"char":"應"},{"r":3,"c":0,"char":"應"},{"r":3,"c":1,"char":"有"},{"r":3,"c":2,"char":"盡"},{"r":3,"c":3,"char":"有"},{"r":4,"c":0,"char":"有"},{"r":4,"c":1,"char":"勇"},{"r":4,"c":2,"char":"無"},{"r":4,"c":3,"char":"謀"}],"slots":[{"idiomId":"ruo-you-ruo-wu","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"wu-zhong-sheng-you","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"you-qiu-bi-ying","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"ying-you-jin-you","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"you-yong-wu-mou","row":4,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["勇","盡","游","興","謀","生","曠","鈴","中","有","必","無","求"],"hintLimit":1},{"id":66,"chapter":7,"mode":"fill","title":"第 6 課：糖葫蘆字","story":"糖葫蘆的甜味飄過來，糰子一邊流口水，一邊努力把字放回燈謎紙上。","rows":4,"cols":6,"cells":[{"r":0,"c":2,"char":"有"},{"r":0,"c":3,"char":"口"},{"r":0,"c":4,"char":"皆"},{"r":0,"c":5,"char":"碑"},{"r":1,"c":2,"char":"教"},{"r":2,"c":0,"char":"攻"},{"r":2,"c":1,"char":"其"},{"r":2,"c":2,"char":"無"},{"r":2,"c":3,"char":"備"},{"r":3,"c":2,"char":"類"}],"slots":[{"idiomId":"you-jiao-wu-lei","row":0,"col":2,"dir":"v","blanks":[0,1,3]},{"idiomId":"you-kou-jie-bei","row":0,"col":2,"dir":"h","blanks":[0,1]},{"idiomId":"gong-qi-wu-bei","row":2,"col":0,"dir":"h","blanks":[0,1]}],"bank":["畫","暇","類","法","有","教","其","攻","口","蚍"],"hintLimit":1},{"id":67,"chapter":7,"mode":"fill","title":"第 7 課：燈會聯句","story":"糖葫蘆的甜味飄過來，糰子一邊流口水，一邊努力把字放回燈謎紙上。","rows":7,"cols":4,"cells":[{"r":0,"c":1,"char":"盲"},{"r":1,"c":1,"char":"人"},{"r":2,"c":1,"char":"瞎"},{"r":3,"c":0,"char":"龍"},{"r":3,"c":1,"char":"馬"},{"r":3,"c":2,"char":"精"},{"r":3,"c":3,"char":"神"},{"r":4,"c":1,"char":"首"},{"r":5,"c":1,"char":"是"},{"r":6,"c":1,"char":"瞻"}],"slots":[{"idiomId":"long-ma-jing-shen","row":3,"col":0,"dir":"h","blanks":[0,3]},{"idiomId":"ma-shou-shi-zhan","row":3,"col":1,"dir":"v","blanks":[2,3]},{"idiomId":"mang-ren-xia-ma","row":0,"col":1,"dir":"v","blanks":[0,2]}],"bank":["達","盲","瞎","龍","瞻","螳","巧","神","傅","是"],"hintLimit":1},{"id":68,"chapter":7,"mode":"fill","title":"第 8 課：猜謎貓群","story":"糖葫蘆的甜味飄過來，糰子一邊流口水，一邊努力把字放回燈謎紙上。","rows":4,"cols":5,"cells":[{"r":0,"c":2,"char":"皓"},{"r":1,"c":0,"char":"日"},{"r":1,"c":1,"char":"新"},{"r":1,"c":2,"char":"月"},{"r":1,"c":3,"char":"異"},{"r":2,"c":2,"char":"千"},{"r":3,"c":1,"char":"下"},{"r":3,"c":2,"char":"里"},{"r":3,"c":3,"char":"巴"},{"r":3,"c":4,"char":"人"}],"slots":[{"idiomId":"ri-xin-yue-yi","row":1,"col":0,"dir":"h","blanks":[0,1,3]},{"idiomId":"hao-yue-qian-li","row":0,"col":2,"dir":"v","blanks":[3]},{"idiomId":"xia-li-ba-ren","row":3,"col":1,"dir":"h","blanks":[1,2,3]}],"bank":["若","新","巴","里","章","異","魑","安","日","人"],"hintLimit":1},{"id":69,"chapter":7,"mode":"fill","title":"第 9 課：燈影書香","story":"燈會市集人山人海，猜燈謎的貓貓排成長龍。糰子擠到最前面，發現謎面是一句缺字的成語。","rows":4,"cols":7,"cells":[{"r":0,"c":3,"char":"兵"},{"r":1,"c":3,"char":"不"},{"r":1,"c":4,"char":"亦"},{"r":1,"c":5,"char":"樂"},{"r":1,"c":6,"char":"乎"},{"r":2,"c":0,"char":"學"},{"r":2,"c":1,"char":"而"},{"r":2,"c":2,"char":"不"},{"r":2,"c":3,"char":"厭"},{"r":3,"c":3,"char":"詐"}],"slots":[{"idiomId":"bu-yi-le-hu","row":1,"col":3,"dir":"h","blanks":[1,2,3]},{"idiomId":"bing-bu-yan-zha","row":0,"col":3,"dir":"v","blanks":[0]},{"idiomId":"xue-er-bu-yan","row":2,"col":0,"dir":"h","blanks":[1,2]}],"bank":["後","翁","不","徙","而","乎","完","亦","樂","兵"],"hintLimit":1},{"id":70,"chapter":7,"mode":"chain","title":"第 10 課：元宵珠圓","story":"燈會尾聲，最大的一盞花燈仍未亮起，燈謎紙上滿是空白。阿墨說解開它就係今晚嘅壓軸喵。","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"心"},{"r":0,"c":1,"char":"口"},{"r":0,"c":2,"char":"如"},{"r":0,"c":3,"char":"一"},{"r":1,"c":0,"char":"一"},{"r":1,"c":1,"char":"字"},{"r":1,"c":2,"char":"千"},{"r":1,"c":3,"char":"金"},{"r":2,"c":0,"char":"金"},{"r":2,"c":1,"char":"枝"},{"r":2,"c":2,"char":"玉"},{"r":2,"c":3,"char":"葉"},{"r":3,"c":0,"char":"葉"},{"r":3,"c":1,"char":"公"},{"r":3,"c":2,"char":"好"},{"r":3,"c":3,"char":"龍"},{"r":4,"c":0,"char":"龍"},{"r":4,"c":1,"char":"潭"},{"r":4,"c":2,"char":"虎"},{"r":4,"c":3,"char":"穴"}],"slots":[{"idiomId":"xin-kou-ru-yi","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"yi-zi-qian-jin","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"jin-zhi-yu-ye","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"ye-gong-hao-long","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"long-tan-hu-xue","row":4,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["枝","玄","公","玉","位","字","潭","穴","偷","千","虎","好","香"],"hintLimit":1},{"id":71,"chapter":8,"mode":"fill","title":"第 1 課：雨後青苔","story":"雨後石巷反着光，屋簷滴水答答。青苔爬滿牆角，石板上的字卻格外清楚。","rows":4,"cols":5,"cells":[{"r":0,"c":0,"char":"再"},{"r":0,"c":1,"char":"衰"},{"r":0,"c":2,"char":"三"},{"r":0,"c":3,"char":"竭"},{"r":1,"c":2,"char":"思"},{"r":2,"c":1,"char":"群"},{"r":2,"c":2,"char":"而"},{"r":2,"c":3,"char":"不"},{"r":2,"c":4,"char":"黨"},{"r":3,"c":2,"char":"行"}],"slots":[{"idiomId":"san-si-er-xing","row":0,"col":2,"dir":"v","blanks":[1,2,3]},{"idiomId":"zai-shuai-san-jie","row":0,"col":0,"dir":"h","blanks":[0,1,3]},{"idiomId":"qun-er-bu-dang","row":2,"col":1,"dir":"h","blanks":[0,1]}],"bank":["再","東","行","潔","思","衰","龍","而","竭","臨","皓","群"],"hintLimit":1},{"id":72,"chapter":8,"mode":"fill","title":"第 2 課：石巷聽雨","story":"糰子撐着小傘，跳過水氹，替阿墨把濕石板上的字卡擺好。","rows":5,"cols":4,"cells":[{"r":0,"c":2,"char":"付"},{"r":1,"c":0,"char":"不"},{"r":1,"c":1,"char":"虞"},{"r":1,"c":2,"char":"之"},{"r":1,"c":3,"char":"譽"},{"r":2,"c":0,"char":"恥"},{"r":2,"c":2,"char":"一"},{"r":3,"c":0,"char":"下"},{"r":3,"c":2,"char":"炬"},{"r":4,"c":0,"char":"問"}],"slots":[{"idiomId":"bu-chi-xia-wen","row":1,"col":0,"dir":"v","blanks":[1,3]},{"idiomId":"bu-yu-zhi-yu","row":1,"col":0,"dir":"h","blanks":[1,2,3]},{"idiomId":"fu-zhi-yi-ju","row":0,"col":2,"dir":"v","blanks":[1,2,3]}],"bank":["虞","敬","一","輒","問","譽","恥","厚","炬","白","厭","之"],"hintLimit":1},{"id":73,"chapter":8,"mode":"fill","title":"第 3 課：滴答成句","story":"糰子撐着小傘，跳過水氹，替阿墨把濕石板上的字卡擺好。","rows":4,"cols":4,"cells":[{"r":0,"c":3,"char":"決"},{"r":1,"c":0,"char":"百"},{"r":1,"c":1,"char":"戰"},{"r":1,"c":2,"char":"百"},{"r":1,"c":3,"char":"勝"},{"r":2,"c":3,"char":"千"},{"r":3,"c":0,"char":"拒"},{"r":3,"c":1,"char":"人"},{"r":3,"c":2,"char":"千"},{"r":3,"c":3,"char":"里"}],"slots":[{"idiomId":"bai-zhan-bai-sheng","row":1,"col":0,"dir":"h","blanks":[0,1,3]},{"idiomId":"jue-sheng-qian-li","row":0,"col":3,"dir":"v","blanks":[0,1]},{"idiomId":"ju-ren-qian-li","row":3,"col":0,"dir":"h","blanks":[0,1,2]}],"bank":["禍","戰","拒","勝","照","百","虞","啞","千","采","人","決"],"hintLimit":1},{"id":74,"chapter":8,"mode":"fill","title":"第 4 課：傘下讀書","story":"糰子撐着小傘，跳過水氹，替阿墨把濕石板上的字卡擺好。","rows":4,"cols":7,"cells":[{"r":0,"c":3,"char":"目"},{"r":0,"c":4,"char":"不"},{"r":0,"c":5,"char":"暇"},{"r":0,"c":6,"char":"給"},{"r":1,"c":0,"char":"鑿"},{"r":1,"c":1,"char":"壁"},{"r":1,"c":2,"char":"偷"},{"r":1,"c":3,"char":"光"},{"r":2,"c":3,"char":"如"},{"r":3,"c":3,"char":"炬"}],"slots":[{"idiomId":"zao-bi-tou-guang","row":1,"col":0,"dir":"h","blanks":[1,3]},{"idiomId":"mu-guang-ru-ju","row":0,"col":3,"dir":"v","blanks":[1,2,3]},{"idiomId":"mu-bu-xia-ji","row":0,"col":3,"dir":"h","blanks":[1,2,3]}],"bank":["給","光","吃","不","壁","如","膽","暇","拾","炬","忙","薦"],"hintLimit":1},{"id":75,"chapter":8,"mode":"chain","title":"第 5 課：雨簾藏字","story":"石巷盡頭有塊老石碑，刻住一疊成語，尾字連住下一句開頭，一直延伸到巷口。","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"積"},{"r":0,"c":1,"char":"土"},{"r":0,"c":2,"char":"成"},{"r":0,"c":3,"char":"山"},{"r":1,"c":0,"char":"山"},{"r":1,"c":1,"char":"明"},{"r":1,"c":2,"char":"水"},{"r":1,"c":3,"char":"秀"},{"r":2,"c":0,"char":"秀"},{"r":2,"c":1,"char":"外"},{"r":2,"c":2,"char":"慧"},{"r":2,"c":3,"char":"中"},{"r":3,"c":0,"char":"中"},{"r":3,"c":1,"char":"庸"},{"r":3,"c":2,"char":"之"},{"r":3,"c":3,"char":"道"},{"r":4,"c":0,"char":"道"},{"r":4,"c":1,"char":"不"},{"r":4,"c":2,"char":"拾"},{"r":4,"c":3,"char":"遺"}],"slots":[{"idiomId":"ji-tu-cheng-shan","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"shan-ming-shui-xiu","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"xiu-wai-hui-zhong","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"zhong-yong-zhi-dao","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"dao-bu-shi-yi","row":4,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["拾","庸","玉","外","遺","星","俱","傑","明","慧","之","水","不","疑"],"hintLimit":1},{"id":76,"chapter":8,"mode":"fill","title":"第 6 課：屋簷水聲","story":"雨後石巷反着光，屋簷滴水答答。青苔爬滿牆角，石板上的字卻格外清楚。","rows":5,"cols":6,"cells":[{"r":0,"c":1,"char":"隔"},{"r":1,"c":1,"char":"岸"},{"r":1,"c":2,"char":"刮"},{"r":2,"c":1,"char":"觀"},{"r":2,"c":2,"char":"目"},{"r":2,"c":3,"char":"光"},{"r":2,"c":4,"char":"如"},{"r":2,"c":5,"char":"炬"},{"r":3,"c":0,"char":"薪"},{"r":3,"c":1,"char":"火"},{"r":3,"c":2,"char":"相"},{"r":3,"c":3,"char":"傳"},{"r":4,"c":2,"char":"看"}],"slots":[{"idiomId":"gua-mu-xiang-kan","row":1,"col":2,"dir":"v","blanks":[0,1,3]},{"idiomId":"xin-huo-xiang-chuan","row":3,"col":0,"dir":"h","blanks":[1,3]},{"idiomId":"ge-an-guan-huo","row":0,"col":1,"dir":"v","blanks":[1,2,3]},{"idiomId":"mu-guang-ru-ju","row":2,"col":2,"dir":"h","blanks":[0,2,3]}],"bank":["八","目","方","飯","晉","如","炬","觀","看","岸","傳","炙","火","刮"],"hintLimit":1},{"id":77,"chapter":8,"mode":"fill","title":"第 7 課：濕石刻文","story":"雨後石巷反着光，屋簷滴水答答。青苔爬滿牆角，石板上的字卻格外清楚。","rows":6,"cols":4,"cells":[{"r":0,"c":3,"char":"項"},{"r":1,"c":2,"char":"禍"},{"r":1,"c":3,"char":"莊"},{"r":2,"c":0,"char":"聞"},{"r":2,"c":1,"char":"雞"},{"r":2,"c":2,"char":"起"},{"r":2,"c":3,"char":"舞"},{"r":3,"c":1,"char":"鳴"},{"r":3,"c":2,"char":"蕭"},{"r":3,"c":3,"char":"劍"},{"r":4,"c":1,"char":"狗"},{"r":4,"c":2,"char":"牆"},{"r":5,"c":1,"char":"盜"}],"slots":[{"idiomId":"wen-ji-qi-wu","row":2,"col":0,"dir":"h","blanks":[0,3]},{"idiomId":"huo-qi-xiao-qiang","row":1,"col":2,"dir":"v","blanks":[0,2,3]},{"idiomId":"xiang-zhuang-wu-jian","row":0,"col":3,"dir":"v","blanks":[0,2,3]},{"idiomId":"ji-ming-gou-dao","row":2,"col":1,"dir":"v","blanks":[1,3]}],"bank":["舞","牆","庖","項","盜","蕭","禍","劍","聞","土","伏","解","鳴","收"],"hintLimit":1},{"id":78,"chapter":8,"mode":"fill","title":"第 8 課：雨停尋句","story":"糰子撐着小傘，跳過水氹，替阿墨把濕石板上的字卡擺好。","rows":6,"cols":4,"cells":[{"r":0,"c":3,"char":"小"},{"r":1,"c":1,"char":"秋"},{"r":1,"c":3,"char":"國"},{"r":2,"c":0,"char":"曲"},{"r":2,"c":1,"char":"高"},{"r":2,"c":2,"char":"和"},{"r":2,"c":3,"char":"寡"},{"r":3,"c":0,"char":"突"},{"r":3,"c":1,"char":"氣"},{"r":3,"c":3,"char":"民"},{"r":4,"c":0,"char":"徙"},{"r":4,"c":1,"char":"爽"},{"r":5,"c":0,"char":"薪"}],"slots":[{"idiomId":"qiu-gao-qi-shuang","row":1,"col":1,"dir":"v","blanks":[2,3]},{"idiomId":"qu-gao-he-gua","row":2,"col":0,"dir":"h","blanks":[0,2]},{"idiomId":"qu-tu-xi-xin","row":2,"col":0,"dir":"v","blanks":[0,2,3]},{"idiomId":"xiao-guo-gua-min","row":0,"col":3,"dir":"v","blanks":[0,1,3]}],"bank":["飯","爽","鬻","薪","教","氣","民","和","小","彈","國","徙","可","曲"],"hintLimit":1},{"id":79,"chapter":8,"mode":"fill","title":"第 9 課：苔痕成語","story":"雨後石巷反着光，屋簷滴水答答。青苔爬滿牆角，石板上的字卻格外清楚。","rows":4,"cols":6,"cells":[{"r":0,"c":3,"char":"青"},{"r":1,"c":0,"char":"人"},{"r":1,"c":1,"char":"才"},{"r":1,"c":2,"char":"輩"},{"r":1,"c":3,"char":"出"},{"r":2,"c":2,"char":"疲"},{"r":2,"c":3,"char":"於"},{"r":2,"c":4,"char":"奔"},{"r":2,"c":5,"char":"命"},{"r":3,"c":1,"char":"篳"},{"r":3,"c":2,"char":"路"},{"r":3,"c":3,"char":"藍"},{"r":3,"c":4,"char":"縷"}],"slots":[{"idiomId":"qing-chu-yu-lan","row":0,"col":3,"dir":"v","blanks":[0,1,2]},{"idiomId":"pi-yu-ben-ming","row":2,"col":2,"dir":"h","blanks":[1,2]},{"idiomId":"bi-lu-lan-lv","row":3,"col":1,"dir":"h","blanks":[0,1,3]},{"idiomId":"ren-cai-bei-chu","row":1,"col":0,"dir":"h","blanks":[0,2,3]}],"bank":["奔","兵","人","撼","冬","輩","業","路","縷","出","於","青","自","篳"],"hintLimit":1},{"id":80,"chapter":8,"mode":"chain","title":"第 10 課：雨霽珠明","story":"雨後石巷的盡頭，老石碑上的字被雨水沖得模糊。糰子要用一路記住的成語，把碑文重新填好。","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"三"},{"r":0,"c":1,"char":"人"},{"r":0,"c":2,"char":"成"},{"r":0,"c":3,"char":"虎"},{"r":1,"c":0,"char":"虎"},{"r":1,"c":1,"char":"口"},{"r":1,"c":2,"char":"餘"},{"r":1,"c":3,"char":"生"},{"r":2,"c":0,"char":"生"},{"r":2,"c":1,"char":"龍"},{"r":2,"c":2,"char":"活"},{"r":2,"c":3,"char":"虎"},{"r":3,"c":0,"char":"虎"},{"r":3,"c":1,"char":"頭"},{"r":3,"c":2,"char":"蛇"},{"r":3,"c":3,"char":"尾"},{"r":4,"c":0,"char":"尾"},{"r":4,"c":1,"char":"大"},{"r":4,"c":2,"char":"不"},{"r":4,"c":3,"char":"掉"}],"slots":[{"idiomId":"san-ren-cheng-hu","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"hu-kou-yu-sheng","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"sheng-long-huo-hu","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"hu-tou-she-wei","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"wei-da-bu-diao","row":4,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["掉","學","蛇","口","餘","不","舊","蜉","拱","頭","大","龍","活","玄"],"hintLimit":1},{"id":81,"chapter":9,"mode":"fill","title":"第 1 課：雲海書樓","story":"白雲從窗外飄過，糰子伸手想捉，卻只捉到一張字卡。","rows":5,"cols":4,"cells":[{"r":0,"c":0,"char":"決"},{"r":0,"c":1,"char":"勝"},{"r":0,"c":2,"char":"千"},{"r":0,"c":3,"char":"里"},{"r":1,"c":2,"char":"鈞"},{"r":1,"c":3,"char":"血"},{"r":2,"c":0,"char":"沆"},{"r":2,"c":1,"char":"瀣"},{"r":2,"c":2,"char":"一"},{"r":2,"c":3,"char":"氣"},{"r":3,"c":2,"char":"髮"},{"r":3,"c":3,"char":"方"},{"r":4,"c":3,"char":"剛"}],"slots":[{"idiomId":"qian-jun-yi-fa","row":0,"col":2,"dir":"v","blanks":[1,2,3]},{"idiomId":"hang-xie-yi-qi","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"jue-sheng-qian-li","row":0,"col":0,"dir":"h","blanks":[0,3]},{"idiomId":"xue-qi-fang-gang","row":1,"col":3,"dir":"v","blanks":[0,2,3]}],"bank":["紙","瀣","髮","齊","血","曝","剛","決","雲","里","一","方","聲","鈞"],"hintLimit":1},{"id":82,"chapter":9,"mode":"fill","title":"第 2 課：翻雲閱卷","story":"白雲從窗外飄過，糰子伸手想捉，卻只捉到一張字卡。","rows":4,"cols":5,"cells":[{"r":0,"c":0,"char":"精"},{"r":0,"c":2,"char":"城"},{"r":1,"c":0,"char":"益"},{"r":1,"c":1,"char":"胯"},{"r":1,"c":2,"char":"下"},{"r":1,"c":3,"char":"之"},{"r":1,"c":4,"char":"辱"},{"r":2,"c":0,"char":"求"},{"r":2,"c":1,"char":"全"},{"r":2,"c":2,"char":"之"},{"r":2,"c":3,"char":"毀"},{"r":3,"c":0,"char":"精"},{"r":3,"c":2,"char":"盟"}],"slots":[{"idiomId":"jing-yi-qiu-jing","row":0,"col":0,"dir":"v","blanks":[0,1,3]},{"idiomId":"qiu-quan-zhi-hui","row":2,"col":0,"dir":"h","blanks":[1,2,3]},{"idiomId":"cheng-xia-zhi-meng","row":0,"col":2,"dir":"v","blanks":[0,2]},{"idiomId":"kua-xia-zhi-ru","row":1,"col":1,"dir":"h","blanks":[0,3]}],"bank":["賣","牛","益","之","洋","胯","啞","毀","精","城","精","全","底","辱"],"hintLimit":1},{"id":83,"chapter":9,"mode":"fill","title":"第 3 課：雲端對句","story":"雲端書樓浮在雲海之上，書頁被風吹得獵獵作響。糰子踏着雲梯，一層一層往上填字。","rows":6,"cols":6,"cells":[{"r":0,"c":2,"char":"指"},{"r":1,"c":2,"char":"鹿"},{"r":2,"c":0,"char":"以"},{"r":2,"c":1,"char":"鄰"},{"r":2,"c":2,"char":"為"},{"r":2,"c":3,"char":"壑"},{"r":3,"c":0,"char":"暴"},{"r":3,"c":2,"char":"馬"},{"r":3,"c":3,"char":"革"},{"r":3,"c":4,"char":"裹"},{"r":3,"c":5,"char":"屍"},{"r":4,"c":0,"char":"易"},{"r":5,"c":0,"char":"暴"}],"slots":[{"idiomId":"zhi-lu-wei-ma","row":0,"col":2,"dir":"v","blanks":[1,2]},{"idiomId":"yi-lin-wei-he","row":2,"col":0,"dir":"h","blanks":[1,2,3]},{"idiomId":"yi-bao-yi-bao","row":2,"col":0,"dir":"v","blanks":[1,2,3]},{"idiomId":"ma-ge-guo-shi","row":3,"col":2,"dir":"h","blanks":[2,3]}],"bank":["暴","月","代","尾","易","火","鄰","為","壑","裹","屍","鹿","暴","翻"],"hintLimit":1},{"id":84,"chapter":9,"mode":"fill","title":"第 4 課：書樓高處","story":"白雲從窗外飄過，糰子伸手想捉，卻只捉到一張字卡。","rows":7,"cols":4,"cells":[{"r":0,"c":3,"char":"螓"},{"r":1,"c":3,"char":"首"},{"r":2,"c":2,"char":"各"},{"r":2,"c":3,"char":"蛾"},{"r":3,"c":2,"char":"自"},{"r":3,"c":3,"char":"眉"},{"r":4,"c":0,"char":"金"},{"r":4,"c":1,"char":"石"},{"r":4,"c":2,"char":"為"},{"r":4,"c":3,"char":"開"},{"r":5,"c":2,"char":"政"},{"r":5,"c":3,"char":"眼"},{"r":6,"c":3,"char":"笑"}],"slots":[{"idiomId":"mei-kai-yan-xiao","row":3,"col":3,"dir":"v","blanks":[2,3]},{"idiomId":"jin-shi-wei-kai","row":4,"col":0,"dir":"h","blanks":[0,1,2]},{"idiomId":"ge-zi-wei-zheng","row":2,"col":2,"dir":"v","blanks":[2,3]},{"idiomId":"qin-shou-e-mei","row":0,"col":3,"dir":"v","blanks":[0,1,2]}],"bank":["雨","題","眼","石","螓","金","政","怙","負","蛾","誨","首","為","笑"],"hintLimit":1},{"id":85,"chapter":9,"mode":"chain","title":"第 5 課：雲梯拾字","story":"雲海翻湧，阿墨扶穩書架：「接龍要穩，唔好急，一句接好先想下一句喵。」","rows":6,"cols":4,"cells":[{"r":0,"c":0,"char":"眾"},{"r":0,"c":1,"char":"口"},{"r":0,"c":2,"char":"鑠"},{"r":0,"c":3,"char":"金"},{"r":1,"c":0,"char":"金"},{"r":1,"c":1,"char":"玉"},{"r":1,"c":2,"char":"滿"},{"r":1,"c":3,"char":"堂"},{"r":2,"c":0,"char":"堂"},{"r":2,"c":1,"char":"堂"},{"r":2,"c":2,"char":"正"},{"r":2,"c":3,"char":"正"},{"r":3,"c":0,"char":"正"},{"r":3,"c":1,"char":"襟"},{"r":3,"c":2,"char":"危"},{"r":3,"c":3,"char":"坐"},{"r":4,"c":0,"char":"坐"},{"r":4,"c":1,"char":"井"},{"r":4,"c":2,"char":"觀"},{"r":4,"c":3,"char":"天"},{"r":5,"c":0,"char":"天"},{"r":5,"c":1,"char":"翻"},{"r":5,"c":2,"char":"地"},{"r":5,"c":3,"char":"覆"}],"slots":[{"idiomId":"zhong-kou-shuo-jin","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"jin-yu-man-tang","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"tang-tang-zheng-zheng","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"zheng-jin-wei-zuo","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"zuo-jing-guan-tian","row":4,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"tian-fan-di-fu","row":5,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["井","危","滿","螂","襟","假","正","觀","覆","翻","玉","堂","竭","倦","炭","地"],"hintLimit":1},{"id":86,"chapter":9,"mode":"fill","title":"第 6 課：霧海藏書","story":"白雲從窗外飄過，糰子伸手想捉，卻只捉到一張字卡。","rows":5,"cols":4,"cells":[{"r":0,"c":3,"char":"東"},{"r":1,"c":0,"char":"雲"},{"r":1,"c":1,"char":"行"},{"r":1,"c":2,"char":"雨"},{"r":1,"c":3,"char":"施"},{"r":2,"c":0,"char":"蒸"},{"r":2,"c":1,"char":"色"},{"r":2,"c":3,"char":"效"},{"r":3,"c":0,"char":"霞"},{"r":3,"c":1,"char":"匆"},{"r":3,"c":3,"char":"顰"},{"r":4,"c":0,"char":"蔚"},{"r":4,"c":1,"char":"匆"}],"slots":[{"idiomId":"dong-shi-xiao-pin","row":0,"col":3,"dir":"v","blanks":[0,1,3]},{"idiomId":"yun-xing-yu-shi","row":1,"col":0,"dir":"h","blanks":[0,2,3]},{"idiomId":"yun-zheng-xia-wei","row":1,"col":0,"dir":"v","blanks":[0,1,3]},{"idiomId":"xing-se-cong-cong","row":1,"col":1,"dir":"v","blanks":[1,2,3]}],"bank":["雲","匆","蒸","施","東","碧","匆","謀","豁","色","無","顰","七","雨","蔚"],"hintLimit":1},{"id":87,"chapter":9,"mode":"fill","title":"第 7 課：雲上課堂","story":"雲端書樓浮在雲海之上，書頁被風吹得獵獵作響。糰子踏着雲梯，一層一層往上填字。","rows":4,"cols":7,"cells":[{"r":0,"c":5,"char":"怙"},{"r":1,"c":2,"char":"不"},{"r":1,"c":3,"char":"念"},{"r":1,"c":4,"char":"舊"},{"r":1,"c":5,"char":"惡"},{"r":2,"c":0,"char":"鶴"},{"r":2,"c":1,"char":"立"},{"r":2,"c":2,"char":"雞"},{"r":2,"c":3,"char":"群"},{"r":2,"c":4,"char":"而"},{"r":2,"c":5,"char":"不"},{"r":2,"c":6,"char":"黨"},{"r":3,"c":5,"char":"悛"}],"slots":[{"idiomId":"he-li-ji-qun","row":2,"col":0,"dir":"h","blanks":[0,1,2]},{"idiomId":"qun-er-bu-dang","row":2,"col":3,"dir":"h","blanks":[2,3]},{"idiomId":"hu-e-bu-quan","row":0,"col":5,"dir":"v","blanks":[0,2,3]},{"idiomId":"bu-nian-jiu-e","row":1,"col":2,"dir":"h","blanks":[0,1,2]}],"bank":["舊","卑","怙","雞","不","念","說","立","四","蛙","十","不","悛","黨","鶴"],"hintLimit":1},{"id":88,"chapter":9,"mode":"fill","title":"第 8 課：書頁生雲","story":"白雲從窗外飄過，糰子伸手想捉，卻只捉到一張字卡。","rows":5,"cols":5,"cells":[{"r":0,"c":2,"char":"草"},{"r":1,"c":0,"char":"若"},{"r":1,"c":1,"char":"墓"},{"r":1,"c":2,"char":"木"},{"r":1,"c":3,"char":"已"},{"r":1,"c":4,"char":"拱"},{"r":2,"c":0,"char":"有"},{"r":2,"c":1,"char":"口"},{"r":2,"c":2,"char":"皆"},{"r":2,"c":3,"char":"碑"},{"r":3,"c":0,"char":"若"},{"r":3,"c":2,"char":"兵"},{"r":4,"c":0,"char":"無"}],"slots":[{"idiomId":"cao-mu-jie-bing","row":0,"col":2,"dir":"v","blanks":[0,2,3]},{"idiomId":"mu-mu-yi-gong","row":1,"col":1,"dir":"h","blanks":[0,2,3]},{"idiomId":"you-kou-jie-bei","row":2,"col":0,"dir":"h","blanks":[1,2,3]},{"idiomId":"ruo-you-ruo-wu","row":1,"col":0,"dir":"v","blanks":[2,3]}],"bank":["狼","蹄","若","亦","皆","已","無","墓","碑","牛","口","兵","拱","安","草"],"hintLimit":1},{"id":89,"chapter":9,"mode":"fill","title":"第 9 課：雲開見句","story":"雲端書樓浮在雲海之上，書頁被風吹得獵獵作響。糰子踏着雲梯，一層一層往上填字。","rows":4,"cols":5,"cells":[{"r":0,"c":1,"char":"目"},{"r":0,"c":2,"char":"光"},{"r":0,"c":3,"char":"如"},{"r":0,"c":4,"char":"炬"},{"r":1,"c":0,"char":"為"},{"r":1,"c":1,"char":"淵"},{"r":1,"c":2,"char":"驅"},{"r":1,"c":3,"char":"魚"},{"r":2,"c":1,"char":"探"},{"r":2,"c":2,"char":"驪"},{"r":2,"c":3,"char":"得"},{"r":2,"c":4,"char":"珠"},{"r":3,"c":3,"char":"水"}],"slots":[{"idiomId":"ru-yu-de-shui","row":0,"col":3,"dir":"v","blanks":[2,3]},{"idiomId":"wei-yuan-qu-yu","row":1,"col":0,"dir":"h","blanks":[0,1,2]},{"idiomId":"tan-li-de-zhu","row":2,"col":1,"dir":"h","blanks":[1,2,3]},{"idiomId":"mu-guang-ru-ju","row":0,"col":1,"dir":"h","blanks":[0,1,3]}],"bank":["淵","水","得","炬","驅","山","珠","畏","驪","好","為","否","光","徑","目"],"hintLimit":1},{"id":90,"chapter":9,"mode":"chain","title":"第 10 課：雲深珠亮","story":"雲端書樓最高一層，書架圍成圓環，阿墨把最後一本書放到糰子面前：「溫習完就可以上山頂喵。」","rows":6,"cols":4,"cells":[{"r":0,"c":0,"char":"甚"},{"r":0,"c":1,"char":"囂"},{"r":0,"c":2,"char":"塵"},{"r":0,"c":3,"char":"上"},{"r":1,"c":0,"char":"上"},{"r":1,"c":1,"char":"善"},{"r":1,"c":2,"char":"若"},{"r":1,"c":3,"char":"水"},{"r":2,"c":0,"char":"水"},{"r":2,"c":1,"char":"漲"},{"r":2,"c":2,"char":"船"},{"r":2,"c":3,"char":"高"},{"r":3,"c":0,"char":"高"},{"r":3,"c":1,"char":"山"},{"r":3,"c":2,"char":"流"},{"r":3,"c":3,"char":"水"},{"r":4,"c":0,"char":"水"},{"r":4,"c":1,"char":"落"},{"r":4,"c":2,"char":"石"},{"r":4,"c":3,"char":"出"},{"r":5,"c":0,"char":"出"},{"r":5,"c":1,"char":"生"},{"r":5,"c":2,"char":"入"},{"r":5,"c":3,"char":"死"}],"slots":[{"idiomId":"shen-xiao-chen-shang","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"shang-shan-ruo-shui","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shui-zhang-chuan-gao","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"gao-shan-liu-shui","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shui-luo-shi-chu","row":4,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"chu-sheng-ru-si","row":5,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["漲","死","入","簇","流","落","旁","生","若","走","編","善","嘆","石","船","山"],"hintLimit":1},{"id":91,"chapter":10,"mode":"fill","title":"第 1 課：成語之巔","story":"頂峰的石碑刻滿一路走來的成語，阿墨說：「填好呢幾句，靈珠就會醒喵。」","rows":7,"cols":4,"cells":[{"r":0,"c":2,"char":"川"},{"r":1,"c":2,"char":"流"},{"r":2,"c":0,"char":"四"},{"r":2,"c":1,"char":"體"},{"r":2,"c":2,"char":"不"},{"r":2,"c":3,"char":"勤"},{"r":3,"c":0,"char":"望"},{"r":3,"c":1,"char":"峰"},{"r":3,"c":2,"char":"息"},{"r":3,"c":3,"char":"心"},{"r":4,"c":0,"char":"塵"},{"r":5,"c":0,"char":"莫"},{"r":6,"c":0,"char":"及"}],"slots":[{"idiomId":"chuan-liu-bu-xi","row":0,"col":2,"dir":"v","blanks":[0,1]},{"idiomId":"si-ti-bu-qin","row":2,"col":0,"dir":"h","blanks":[0,1,3]},{"idiomId":"wang-feng-xi-xin","row":3,"col":0,"dir":"h","blanks":[0,1,3]},{"idiomId":"wang-chen-mo-ji","row":3,"col":0,"dir":"v","blanks":[0,2,3]}],"bank":["流","望","體","卷","心","別","及","四","鑠","翁","郢","川","莫","勤","滄","峰"],"hintLimit":1},{"id":92,"chapter":10,"mode":"fill","title":"第 2 課：頂峰一課","story":"雲在腳下流動，糰子深吸一口氣，覺得自己好像長高了一點。","rows":6,"cols":4,"cells":[{"r":0,"c":3,"char":"乘"},{"r":1,"c":0,"char":"運"},{"r":1,"c":1,"char":"斤"},{"r":1,"c":2,"char":"成"},{"r":1,"c":3,"char":"風"},{"r":2,"c":0,"char":"牢"},{"r":2,"c":1,"char":"不"},{"r":2,"c":2,"char":"可"},{"r":2,"c":3,"char":"破"},{"r":3,"c":1,"char":"虞"},{"r":3,"c":3,"char":"浪"},{"r":4,"c":1,"char":"之"},{"r":5,"c":1,"char":"譽"}],"slots":[{"idiomId":"cheng-feng-po-lang","row":0,"col":3,"dir":"v","blanks":[0,2,3]},{"idiomId":"lao-bu-ke-po","row":2,"col":0,"dir":"h","blanks":[0,2,3]},{"idiomId":"yun-jin-cheng-feng","row":1,"col":0,"dir":"h","blanks":[0,2]},{"idiomId":"bu-yu-zhi-yu","row":2,"col":1,"dir":"v","blanks":[1,2,3]}],"bank":["成","牢","可","虞","運","目","破","美","之","浪","囂","清","乘","智","譽","碑"],"hintLimit":1},{"id":93,"chapter":10,"mode":"fill","title":"第 3 課：靈珠綻放","story":"穿過雲層，成語之巔就在眼前。山風很大，糰子按住帽子，把最後幾塊石碑上的字補好。","rows":7,"cols":4,"cells":[{"r":0,"c":0,"char":"俾"},{"r":1,"c":0,"char":"晝"},{"r":2,"c":0,"char":"作"},{"r":3,"c":0,"char":"夜"},{"r":4,"c":0,"char":"以"},{"r":4,"c":1,"char":"鄰"},{"r":4,"c":2,"char":"為"},{"r":4,"c":3,"char":"壑"},{"r":5,"c":0,"char":"繼"},{"r":6,"c":0,"char":"日"},{"r":6,"c":1,"char":"上"},{"r":6,"c":2,"char":"三"},{"r":6,"c":3,"char":"竿"}],"slots":[{"idiomId":"ye-yi-ji-ri","row":3,"col":0,"dir":"v","blanks":[0,2,3]},{"idiomId":"bi-zhou-zuo-ye","row":0,"col":0,"dir":"v","blanks":[1,2,3]},{"idiomId":"ri-shang-san-gan","row":6,"col":0,"dir":"h","blanks":[0,2,3]},{"idiomId":"yi-lin-wei-he","row":4,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["鄰","攻","繼","竿","刻","戰","壑","日","疲","好","夜","晝","涯","作","為","三"],"hintLimit":1},{"id":94,"chapter":10,"mode":"fill","title":"第 4 課：山高句長","story":"頂峰的石碑刻滿一路走來的成語，阿墨說：「填好呢幾句，靈珠就會醒喵。」","rows":4,"cols":5,"cells":[{"r":0,"c":0,"char":"尾"},{"r":0,"c":1,"char":"大"},{"r":0,"c":2,"char":"不"},{"r":0,"c":3,"char":"掉"},{"r":0,"c":4,"char":"罄"},{"r":1,"c":1,"char":"勢"},{"r":1,"c":2,"char":"如"},{"r":1,"c":3,"char":"破"},{"r":1,"c":4,"char":"竹"},{"r":2,"c":1,"char":"所"},{"r":2,"c":4,"char":"難"},{"r":3,"c":1,"char":"趨"},{"r":3,"c":4,"char":"書"}],"slots":[{"idiomId":"shi-ru-po-zhu","row":1,"col":1,"dir":"h","blanks":[0,2]},{"idiomId":"qing-zhu-nan-shu","row":0,"col":4,"dir":"v","blanks":[0,2,3]},{"idiomId":"da-shi-suo-qu","row":0,"col":1,"dir":"v","blanks":[1,2,3]},{"idiomId":"wei-da-bu-diao","row":0,"col":0,"dir":"h","blanks":[0,2,3]}],"bank":["趨","衣","書","兩","勢","罄","所","餐","難","野","破","尾","掉","蜃","怒","不"],"hintLimit":1},{"id":95,"chapter":10,"mode":"chain","title":"第 5 課：最後考驗","story":"最後一段山路是成語砌成的階梯，每級都以尾字連住下一級，一直通往山頂。","rows":6,"cols":4,"cells":[{"r":0,"c":0,"char":"跋"},{"r":0,"c":1,"char":"前"},{"r":0,"c":2,"char":"躓"},{"r":0,"c":3,"char":"後"},{"r":1,"c":0,"char":"後"},{"r":1,"c":1,"char":"來"},{"r":1,"c":2,"char":"居"},{"r":1,"c":3,"char":"上"},{"r":2,"c":0,"char":"上"},{"r":2,"c":1,"char":"善"},{"r":2,"c":2,"char":"若"},{"r":2,"c":3,"char":"水"},{"r":3,"c":0,"char":"水"},{"r":3,"c":1,"char":"漲"},{"r":3,"c":2,"char":"船"},{"r":3,"c":3,"char":"高"},{"r":4,"c":0,"char":"高"},{"r":4,"c":1,"char":"山"},{"r":4,"c":2,"char":"流"},{"r":4,"c":3,"char":"水"},{"r":5,"c":0,"char":"水"},{"r":5,"c":1,"char":"天"},{"r":5,"c":2,"char":"一"},{"r":5,"c":3,"char":"色"}],"slots":[{"idiomId":"ba-qian-zhi-hou","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"hou-lai-ju-shang","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shang-shan-ruo-shui","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shui-zhang-chuan-gao","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"gao-shan-liu-shui","row":4,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shui-tian-yi-se","row":5,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["一","色","流","株","要","理","居","船","山","連","來","死","天","善","瓶","漲","若"],"hintLimit":1},{"id":96,"chapter":10,"mode":"fill","title":"第 6 課：雲端決戰","story":"頂峰的石碑刻滿一路走來的成語，阿墨說：「填好呢幾句，靈珠就會醒喵。」","rows":5,"cols":5,"cells":[{"r":0,"c":1,"char":"天"},{"r":0,"c":2,"char":"壤"},{"r":0,"c":3,"char":"之"},{"r":0,"c":4,"char":"別"},{"r":1,"c":1,"char":"涯"},{"r":1,"c":2,"char":"涸"},{"r":2,"c":1,"char":"海"},{"r":2,"c":2,"char":"轍"},{"r":3,"c":0,"char":"蝸"},{"r":3,"c":1,"char":"角"},{"r":3,"c":2,"char":"之"},{"r":3,"c":3,"char":"爭"},{"r":4,"c":2,"char":"鮒"}],"slots":[{"idiomId":"tian-ya-hai-jiao","row":0,"col":1,"dir":"v","blanks":[1,2,3]},{"idiomId":"wo-jiao-zhi-zheng","row":3,"col":0,"dir":"h","blanks":[0,1,3]},{"idiomId":"he-zhe-zhi-fu","row":1,"col":2,"dir":"v","blanks":[1,3]},{"idiomId":"tian-rang-zhi-bie","row":0,"col":1,"dir":"h","blanks":[1,2,3]}],"bank":["角","趙","潔","蝸","綠","別","鮒","暇","海","轍","涯","壤","爭","賤","之","深"],"hintLimit":1},{"id":97,"chapter":10,"mode":"fill","title":"第 7 課：集句成山","story":"雲在腳下流動，糰子深吸一口氣，覺得自己好像長高了一點。","rows":6,"cols":4,"cells":[{"r":0,"c":1,"char":"怙"},{"r":1,"c":0,"char":"郢"},{"r":1,"c":1,"char":"惡"},{"r":2,"c":0,"char":"書"},{"r":2,"c":1,"char":"不"},{"r":2,"c":2,"char":"盡"},{"r":2,"c":3,"char":"言"},{"r":3,"c":0,"char":"燕"},{"r":3,"c":1,"char":"悛"},{"r":3,"c":3,"char":"而"},{"r":4,"c":0,"char":"說"},{"r":4,"c":3,"char":"有"},{"r":5,"c":3,"char":"信"}],"slots":[{"idiomId":"yan-er-you-xin","row":2,"col":3,"dir":"v","blanks":[1,2,3]},{"idiomId":"shu-bu-jin-yan","row":2,"col":0,"dir":"h","blanks":[0,1,2]},{"idiomId":"hu-e-bu-quan","row":0,"col":1,"dir":"v","blanks":[0,1,2]},{"idiomId":"ying-shu-yan-shuo","row":1,"col":0,"dir":"v","blanks":[1,2,3]}],"bank":["信","盡","調","惡","說","蜃","狗","散","川","有","書","不","而","盲","燕","怙"],"hintLimit":1},{"id":98,"chapter":10,"mode":"fill","title":"第 8 課：珠光滿路","story":"穿過雲層，成語之巔就在眼前。山風很大，糰子按住帽子，把最後幾塊石碑上的字補好。","rows":7,"cols":5,"cells":[{"r":0,"c":3,"char":"行"},{"r":1,"c":3,"char":"成"},{"r":2,"c":3,"char":"於"},{"r":3,"c":1,"char":"樂"},{"r":3,"c":2,"char":"不"},{"r":3,"c":3,"char":"思"},{"r":3,"c":4,"char":"蜀"},{"r":4,"c":2,"char":"虞"},{"r":5,"c":0,"char":"蝸"},{"r":5,"c":1,"char":"角"},{"r":5,"c":2,"char":"之"},{"r":5,"c":3,"char":"爭"},{"r":6,"c":2,"char":"譽"}],"slots":[{"idiomId":"le-bu-si-shu","row":3,"col":1,"dir":"h","blanks":[0,2,3]},{"idiomId":"bu-yu-zhi-yu","row":3,"col":2,"dir":"v","blanks":[1,2,3]},{"idiomId":"wo-jiao-zhi-zheng","row":5,"col":0,"dir":"h","blanks":[0,2,3]},{"idiomId":"xing-cheng-yu-si","row":0,"col":3,"dir":"v","blanks":[0,1,3]}],"bank":["虞","之","極","蝸","成","雁","錦","蜀","否","思","譽","樂","行","爭","炙","大"],"hintLimit":1},{"id":99,"chapter":10,"mode":"fill","title":"第 9 課：登頂對句","story":"穿過雲層，成語之巔就在眼前。山風很大，糰子按住帽子，把最後幾塊石碑上的字補好。","rows":6,"cols":6,"cells":[{"r":0,"c":3,"char":"青"},{"r":1,"c":3,"char":"梅"},{"r":2,"c":1,"char":"拒"},{"r":2,"c":2,"char":"罄"},{"r":2,"c":3,"char":"竹"},{"r":2,"c":4,"char":"難"},{"r":2,"c":5,"char":"書"},{"r":3,"c":0,"char":"盲"},{"r":3,"c":1,"char":"人"},{"r":3,"c":2,"char":"瞎"},{"r":3,"c":3,"char":"馬"},{"r":4,"c":1,"char":"千"},{"r":5,"c":1,"char":"里"}],"slots":[{"idiomId":"qing-mei-zhu-ma","row":0,"col":3,"dir":"v","blanks":[0,1,2]},{"idiomId":"mang-ren-xia-ma","row":3,"col":0,"dir":"h","blanks":[0,2]},{"idiomId":"ju-ren-qian-li","row":2,"col":1,"dir":"v","blanks":[0,2,3]},{"idiomId":"qing-zhu-nan-shu","row":2,"col":2,"dir":"h","blanks":[1,2,3]}],"bank":["睚","糟","辱","八","梅","千","盲","書","秋","里","青","拒","瞎","竹","容","難"],"hintLimit":1},{"id":100,"chapter":10,"mode":"chain","title":"第 10 課：貓語成章","story":"穿過雲層，阿墨與糰子終於站在成語之巔。十個場景的靈珠在腳下亮起，最後一串成語接好，整個貓貓世界都會亮起來喵！","rows":6,"cols":4,"cells":[{"r":0,"c":0,"char":"狼"},{"r":0,"c":1,"char":"子"},{"r":0,"c":2,"char":"野"},{"r":0,"c":3,"char":"心"},{"r":1,"c":0,"char":"心"},{"r":1,"c":1,"char":"口"},{"r":1,"c":2,"char":"如"},{"r":1,"c":3,"char":"一"},{"r":2,"c":0,"char":"一"},{"r":2,"c":1,"char":"意"},{"r":2,"c":2,"char":"孤"},{"r":2,"c":3,"char":"行"},{"r":3,"c":0,"char":"行"},{"r":3,"c":1,"char":"雲"},{"r":3,"c":2,"char":"流"},{"r":3,"c":3,"char":"水"},{"r":4,"c":0,"char":"水"},{"r":4,"c":1,"char":"漲"},{"r":4,"c":2,"char":"船"},{"r":4,"c":3,"char":"高"},{"r":5,"c":0,"char":"高"},{"r":5,"c":1,"char":"枕"},{"r":5,"c":2,"char":"無"},{"r":5,"c":3,"char":"憂"}],"slots":[{"idiomId":"lang-zi-ye-xin","row":0,"col":0,"dir":"h","blanks":[]},{"idiomId":"xin-kou-ru-yi","row":1,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"yi-yi-gu-xing","row":2,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"xing-yun-liu-shui","row":3,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"shui-zhang-chuan-gao","row":4,"col":0,"dir":"h","blanks":[1,2]},{"idiomId":"gao-zhen-wu-you","row":5,"col":0,"dir":"h","blanks":[1,2,3]}],"bank":["流","懸","口","憂","孤","耳","如","船","枕","無","日","螂","舟","漲","意","牛","雲"],"hintLimit":1}]`),n=[{id:1,name:`櫻花小徑`,scene:`garden`,blurb:`春日櫻花開滿山徑，阿墨的成語私塾就藏在花樹下。糰子在這裏認識第一個成語。`,accent:`#f4a7bb`},{id:2,name:`竹林迷宮`,scene:`bamboo`,blurb:`風吹竹葉沙沙作響，迷宮裏的字句隨風飄動，要靜下心才能接得上下句。`,accent:`#78a878`},{id:3,name:`月下書齋`,scene:`moon`,blurb:`月色灑進書齋，古籍自動翻頁，傳說中的成語靈珠在書頁間閃閃發亮。`,accent:`#8f9fd6`},{id:4,name:`雪山溫泉`,scene:`snow`,blurb:`雪山頂上霧氣繚繞，溫泉邊的石碑刻着古人的智慧，要細心才能看清每一筆。`,accent:`#a7c7e7`},{id:5,name:`海邊燈塔`,scene:`sea`,blurb:`海浪拍岸，燈塔的光一閃一閃，漁夫貓說成語就像燈塔，能照亮迷路的人。`,accent:`#6fb0c9`},{id:6,name:`星空詩會`,scene:`stars`,blurb:`夜幕低垂，貓貓們圍坐草地吟詩，星星排成一句句成語，等待有人讀出聲來。`,accent:`#7d7fc4`},{id:7,name:`燈會市集`,scene:`festival`,blurb:`紅燈籠高掛，市集熱鬧非常，猜燈謎的貓貓排成長龍，成語就是最受歡迎的謎題。`,accent:`#e8867a`},{id:8,name:`雨後石巷`,scene:`rain`,blurb:`雨後青石巷反着光，屋簷滴水答答，阿墨說：成語要像雨後青苔，慢慢浸出來。`,accent:`#8aa39b`},{id:9,name:`雲端書樓`,scene:`cloud`,blurb:`書樓浮在雲海之上，每一層都藏着一批成語典籍，糰子要在這裏溫習所學。`,accent:`#b8a7d6`},{id:10,name:`成語之巔`,scene:`summit`,blurb:`穿過雲層，終於來到成語之巔。最後的考驗就在眼前，成語靈珠將在頂峰綻放光芒。`,accent:`#e8b64c`}],r=e,i=t,a=n;new Map(r.map(e=>[e.id,e])),i.length;var o={click:[{freq:523.25,dur:.06,type:`sine`,gain:.12}],flip:[{freq:392,dur:.06,type:`triangle`,gain:.1}],place:[{freq:440,dur:.09,type:`triangle`,gain:.12}],correct:[{freq:659.25,dur:.12,type:`sine`,gain:.14},{freq:783.99,dur:.16,when:.08,type:`sine`,gain:.14}],wrong:[{freq:196,dur:.16,type:`sawtooth`,gain:.09},{freq:146.83,dur:.2,when:.12,type:`sawtooth`,gain:.08}],hint:[{freq:880,dur:.08,type:`sine`,gain:.12},{freq:1174.66,dur:.12,when:.06,type:`sine`,gain:.1}],star:[{freq:1046.5,dur:.1,type:`sine`,gain:.1},{freq:1318.5,dur:.14,when:.07,type:`sine`,gain:.09}],clear:[{freq:523.25,dur:.14,type:`sine`,gain:.13},{freq:659.25,dur:.14,when:.12,type:`sine`,gain:.13},{freq:783.99,dur:.14,when:.24,type:`sine`,gain:.13},{freq:1046.5,dur:.3,when:.36,type:`sine`,gain:.14}]},s=new class{ctx=null;enabled=!0;init(){if(typeof window<`u`){if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{return}}this.ctx.state===`suspended`&&this.ctx.resume().catch(()=>void 0)}}setEnabled(e){this.enabled=e,e&&this.init()}play(e){if(!this.enabled)return;this.init();let t=this.ctx;if(!t)return;let n=o[e];if(!n)return;let r=t.currentTime+.01;for(let e of n){let n=r+(e.when??0),i=t.createOscillator(),a=t.createGain();i.type=e.type??`sine`,i.frequency.setValueAtTime(e.freq,n);let o=e.gain??.1;a.gain.setValueAtTime(1e-4,n),a.gain.exponentialRampToValueAtTime(o,n+.012),a.gain.exponentialRampToValueAtTime(1e-4,n+e.dur),i.connect(a).connect(t.destination),i.start(n),i.stop(n+e.dur+.02)}}fanfare(){if(!this.enabled)return;this.init();let e=this.ctx;e&&[523.25,659.25,783.99,1046.5,880,1046.5].forEach((t,n)=>{let r=e.currentTime+.01+n*.14,i=e.createOscillator(),a=e.createGain();i.type=`sine`,i.frequency.setValueAtTime(t,r),a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(.13,r+.02),a.gain.exponentialRampToValueAtTime(1e-4,r+.32),i.connect(a).connect(e.destination),i.start(r),i.stop(r+.36)})}},c=`cat-idioms-save-v1`;function l(){return{version:1,levels:{},collected:[],settings:{sound:!0,reducedMotion:!1},seenChapters:[],tutorialSeen:!1}}function u(e){return typeof e==`object`&&!!e}function d(){let e=l();try{if(typeof localStorage>`u`)return e;let t=localStorage.getItem(c);if(!t)return e;let n=JSON.parse(t);if(!u(n)||n.version!==1)return e;let r={};if(u(n.levels))for(let[e,t]of Object.entries(n.levels)){if(!u(t))continue;let n=Number(t.stars);!Number.isFinite(n)||n<=0||(r[e]={stars:Math.min(3,Math.max(1,Math.round(n))),mistakes:Number(t.mistakes)||0,hints:Number(t.hints)||0,clearedAt:Number(t.clearedAt)||Date.now()})}let i=u(n.settings)?n.settings:{},a={sound:i.sound!==!1,reducedMotion:i.reducedMotion===!0},o=Array.isArray(n.collected)?n.collected.filter(e=>typeof e==`string`):[],s=Array.isArray(n.seenChapters)?n.seenChapters.map(Number).filter(e=>Number.isInteger(e)):[];return{version:1,levels:r,collected:[...new Set(o)],settings:a,seenChapters:[...new Set(s)],tutorialSeen:n.tutorialSeen===!0}}catch{return e}}function f(e){try{if(typeof localStorage>`u`)return;localStorage.setItem(c,JSON.stringify(e))}catch{}}function p(){try{typeof localStorage<`u`&&localStorage.removeItem(c)}catch{}return l()}function m(e,t){return e.levels[String(t)]}function h(e,t){return t<=1||(m(e,t-1)?.stars??0)>0}function g(e,t){if(t<=0)return 1;let n=1;for(let r=1;r<=t&&h(e,r);r+=1)n=r;return n}function ee(e){return Object.values(e.levels).reduce((e,t)=>e+t.stars,0)}function te(e){return Object.values(e.levels).filter(e=>e.stars>0).length}function ne(e,t,n,r,i,a=[]){let o=String(t),s=e.levels[o],c=Math.min(3,Math.max(1,Math.round(n)));return e.levels[o]={stars:s?Math.max(s.stars,c):c,mistakes:s?Math.min(s.mistakes,r):r,hints:s?Math.min(s.hints,i):i,clearedAt:Date.now()},re(e,a),f(e),e}function re(e,t){let n=new Set(e.collected);for(let e of t)n.add(e);return e.collected=[...n],e}function ie(e,t){return e.settings={...e.settings,...t},f(e),e}function ae(e,t){return e.seenChapters.includes(t)||(e.seenChapters.push(t),f(e)),e}function oe(e){return e.tutorialSeen||(e.tutorialSeen=!0,f(e)),e}var _=`#/home`,v=`#/map`,se=`#/codex`,ce=`#/settings`,le=e=>`#/game/${e}`;function y(e){let t=(e||``).replace(/^#/,``).split(`?`)[0].split(`/`).filter(e=>e.length>0);if(t.length===0)return{name:`home`};switch(t[0]){case`home`:return{name:`home`};case`map`:return{name:`map`};case`codex`:return{name:`codex`};case`settings`:return{name:`settings`};case`game`:{let e=Number(t[1]);return!Number.isInteger(e)||e<1?{name:`home`}:{name:`game`,levelId:e}}default:return{name:`home`}}}function b(e){return e.startsWith(`#`)?e:`#${e}`}function x(e){let t=b(e);window.location.hash===t?window.dispatchEvent(new HashChangeEvent(`hashchange`)):window.location.hash=t}function S(e){let t=b(e);window.history.replaceState(null,``,t),window.dispatchEvent(new HashChangeEvent(`hashchange`))}var ue=class{onChange;boundHandler=null;constructor(e){this.onChange=e}start(){window.location.hash||window.history.replaceState(null,``,_),this.boundHandler||(this.boundHandler=()=>this.onChange(y(window.location.hash)),window.addEventListener(`hashchange`,this.boundHandler)),this.onChange(y(window.location.hash))}stop(){this.boundHandler&&=(window.removeEventListener(`hashchange`,this.boundHandler),null)}},C=[`idle`,`happy`,`sad`,`think`,`celebrate`,`wink`,`sleep`],de={amo:{fur:`#454f48`,furDark:`#333b36`,furLight:`#5e6a60`,belly:`#f6ecdd`,muzzle:`#f9f1e4`,paw:`#4d5850`,pad:`#eda9b7`,scarf:`#6f9c76`,scarfDark:`#4f7a58`,scarfLight:`#8fb995`,ear:`#e5a6b4`,eye:`#e8b64c`,eyeDark:`#c9932f`,whisker:`#f3ead9`,ink:`#26302a`,blush:`#f4a7bb`,shadow:`#2f3a2f`},dango:{fur:`#eda964`,furDark:`#cd8340`,furLight:`#f6c58c`,belly:`#fff3e2`,muzzle:`#fff6ea`,paw:`#fff3e2`,pad:`#f2a9b6`,scarf:`#ef9fb6`,scarfDark:`#e07e9c`,scarfLight:`#ffc2d2`,ear:`#f7b7cb`,eye:`#74a87c`,eyeDark:`#4f7a58`,whisker:`#fff8ec`,ink:`#5b4634`,blush:`#f4a7bb`,shadow:`#8a5a33`}},fe={amo:`黑貓店長阿墨`,dango:`橘虎斑小貓糰子`},pe={idle:`神情平靜`,happy:`開心笑瞇瞇`,sad:`傷心垂耳`,think:`托腮沉思`,celebrate:`舉爪慶祝`,wink:`俏皮眨眼`,sleep:`安穩熟睡`},w=96,T=144,E=106,me=128;function he(e){return e.replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function D(e,t,n){let r=n*.3;return`M${e} ${t-n} L${e+r} ${t-r} L${e+n} ${t} L${e+r} ${t+r} L${e} ${t+n} L${e-r} ${t+r} L${e-n} ${t} L${e-r} ${t-r} Z`}function ge(e,t,n){return`M${e} ${t+n*.62} C${e-n*1.06} ${t-n*.08} ${e-n*.94} ${t-n*1.16} ${e} ${t-n*.5} C${e+n*.94} ${t-n*1.16} ${e+n*1.06} ${t-n*.08} ${e} ${t+n*.62} Z`}function O(e,t,n,r,i=!1){let a=r?14:12.5,o=r?16:14,s=r?10.6:8.8,c=r?5.6:4.7,l=r?8.4:7,u=i?-2.6:0;return`
        <ellipse cx="${e}" cy="${t}" rx="${a}" ry="${o}" fill="#fffdf8" stroke="${n.furDark}" stroke-width="1.4"/>
        <circle cx="${e}" cy="${t+u}" r="${s}" fill="${n.eye}" stroke="${n.eyeDark}" stroke-width="0.9"/>
        <ellipse cx="${e}" cy="${t+u+.8}" rx="${c}" ry="${l}" fill="${n.ink}"/>
        <circle cx="${e-3.6}" cy="${t-(i?.4:4.6)}" r="${r?4:3.2}" fill="#fffdf8"/>
        <circle cx="${e+3.9}" cy="${t+(i?3.4:5)}" r="1.7" fill="#fffdf8" opacity="0.85"/>`}function _e(e,t,n){return`
        <g class="cat-eye">
          ${O(e,t,n,!1)}
          <path d="M${e-15} ${t-1} Q${e} ${t-12} ${e+15} ${t-1} L${e+15} ${t-28} L${e-15} ${t-28} Z" fill="${n.fur}"/>
          <path d="M${e-14} ${t-1} Q${e} ${t-11} ${e+14} ${t-1}" stroke="${n.ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
          <path d="M${e+12} ${t-4} l6 -4" stroke="${n.ink}" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>
        </g>`}function ve(e,t,n){return`
        <path d="M${e-11.5} ${t+1.5} Q${e} ${t-13} ${e+11.5} ${t+1.5}" stroke="${n.ink}" stroke-width="5.2" fill="none" stroke-linecap="round"/>`}function ye(e,t,n){return`
        <path d="M${e-11} ${t-1.5} Q${e} ${t+8.5} ${e+11} ${t-1.5}" stroke="${n.ink}" stroke-width="4.6" fill="none" stroke-linecap="round"/>
        <path d="M${e-12.5} ${t-1.5} l-4 -3" stroke="${n.ink}" stroke-width="2.2" stroke-linecap="round" opacity="0.7"/>`}function be(e,t,n){return`
        <path d="M${e-11} ${t+1} Q${e} ${t-12} ${e+11} ${t+1}" stroke="${n.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M${e+12} ${t-2} l5 -4" stroke="${n.ink}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M${e+12.5} ${t+2} l5 -0.5" stroke="${n.ink}" stroke-width="2.4" stroke-linecap="round"/>`}function xe(e,t){switch(e){case`happy`:case`celebrate`:return`
        <path d="M107 137 Q120 141 133 137 Q129 155 120 155 Q111 155 107 137 Z" fill="#965050"/>
        <ellipse cx="120" cy="151" rx="6.6" ry="4" fill="#f4a7bb"/>
        <path d="M113.5 139 Q120 142 126.5 139" stroke="#d98a8a" stroke-width="1.4" fill="none" opacity="0.8"/>`;case`sad`:return`<path d="M111 145 Q115 139 120 143 Q125 147 129 140" stroke="${t.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;case`think`:return`<path d="M113 141 Q120 143.5 127 140" stroke="${t.ink}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;case`wink`:return`<path d="M110 140 Q120 146 132 136" stroke="${t.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;case`sleep`:return`<path d="M115 140 Q120 144 125 140" stroke="${t.ink}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;default:return`<path d="M120 138 Q116 144 111 140.5 M120 138 Q124 144 129 140.5" stroke="${t.ink}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`}}function Se(e,t){let n=e===`dango`?`<path d="M184 198 q10 2 15 9 M196 180 q7 1 10 6" stroke="${t.furDark}" stroke-width="4.4" fill="none" stroke-linecap="round" opacity="0.55"/>`:``;return`
      <g class="cat-tail">
        <path d="M158 207 C198 214 217 188 207 162 C202 147 186 143 179 154 C174 163 181 172 190 168" fill="none" stroke="${t.fur}" stroke-width="17" stroke-linecap="round"/>
        ${n}
      </g>`}function Ce(e,t){let n=`stroke="${t.furDark}" stroke-width="1.8" stroke-linecap="round" opacity="0.5"`;return`
      <g class="cat-paw cat-paw--l">
        <ellipse cx="97" cy="226" rx="16" ry="10.5" fill="${t.paw}" stroke="${t.furDark}" stroke-width="1.1" opacity="0.98"/>
        <path d="M91.5 231 v-5.5 M97 231.5 v-6 M102.5 231 v-5.5" ${n}/>
      </g>
      <g class="cat-paw cat-paw--r">
        <ellipse cx="143" cy="226" rx="16" ry="10.5" fill="${t.paw}" stroke="${t.furDark}" stroke-width="1.1" opacity="0.98"/>
        <path d="M137.5 231 v-5.5 M143 231.5 v-6 M148.5 231 v-5.5" ${n}/>
      </g>`}function we(e){let t=(t,n,r)=>`
        <ellipse cx="${t}" cy="${n+3}" rx="5" ry="4" fill="${e.pad}"/>
        <circle cx="${t-6*r}" cy="${n-7}" r="2.6" fill="${e.pad}"/>
        <circle cx="${t}" cy="${n-9}" r="2.6" fill="${e.pad}"/>
        <circle cx="${t+6*r}" cy="${n-7}" r="2.6" fill="${e.pad}"/>`;return`
      <g class="cat-paw cat-paw--l cat-paw--raised">
        <path d="M84 192 C64 188 49 172 46 152" stroke="${e.fur}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <ellipse cx="43" cy="142" rx="14" ry="12.5" fill="${e.paw}" stroke="${e.furDark}" stroke-width="1.2" transform="rotate(-20 43 142)"/>
        ${t(43,142,1)}
      </g>
      <g class="cat-paw cat-paw--r cat-paw--raised">
        <path d="M156 192 C176 188 191 172 194 152" stroke="${e.fur}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <ellipse cx="197" cy="142" rx="14" ry="12.5" fill="${e.paw}" stroke="${e.furDark}" stroke-width="1.2" transform="rotate(20 197 142)"/>
        ${t(197,142,-1)}
      </g>`}function Te(e){return`
      <g class="cat-paw cat-paw--chin">
        <path d="M157 198 C166 186 165 173 157 166" stroke="${e.fur}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <ellipse cx="152" cy="159" rx="12.5" ry="11.5" fill="${e.paw}" stroke="${e.furDark}" stroke-width="1.2" transform="rotate(-12 152 159)"/>
        <ellipse cx="152" cy="161" rx="4.8" ry="3.8" fill="${e.pad}"/>
        <circle cx="146.5" cy="154.5" r="2.3" fill="${e.pad}"/>
        <circle cx="152" cy="153" r="2.3" fill="${e.pad}"/>
        <circle cx="157.5" cy="154.5" r="2.3" fill="${e.pad}"/>
      </g>`}function Ee(e){return`
      <g class="cat-glasses" fill="none" stroke="#e8b64c" stroke-width="2.6" opacity="0.95">
        <circle cx="${w}" cy="${E}" r="20.5"/>
        <circle cx="${T}" cy="${E}" r="20.5"/>
        <path d="M116.5 101.5 Q120 98 123.5 101.5"/>
        <path d="M85 96.5 l6.5 6.5 M133 96.5 l6.5 6.5" stroke="#fffdf8" stroke-width="2" opacity="0.5"/>
      </g>`}function De(e){return`
        <g class="cat-ear cat-ear--l">
          <path d="M68 66 C62 46 56 26 58 19 C60 13 68 15 74 20 C88 31 100 40 106 46 C92 56 79 62 68 66 Z" fill="${e.fur}"/>
          <path d="M72 57 C68 42 64 28 65 23 C67 20 72 22 76 25 C86 35 95 42 99 46 C89 52 79 56 72 57 Z" fill="${e.ear}" opacity="0.95"/>
        </g>
        <g class="cat-ear cat-ear--r">
          <path d="M172 66 C178 46 184 26 182 19 C180 13 172 15 166 20 C152 31 140 40 134 46 C148 56 161 62 172 66 Z" fill="${e.fur}"/>
          <path d="M168 57 C172 42 176 28 175 23 C173 20 168 22 164 25 C154 35 145 42 141 46 C151 52 161 56 168 57 Z" fill="${e.ear}" opacity="0.95"/>
        </g>`}function Oe(e,t,n){let r=e===`amo`,i=e===`dango`,a=i||t===`sad`,o=i?`
        <g class="cat-stripes" stroke="${n.furDark}" stroke-width="5.2" stroke-linecap="round" fill="none" opacity="0.85">
          <path d="M107 56 Q104 68 108 77"/>
          <path d="M120 52 V76"/>
          <path d="M133 56 Q136 68 132 77"/>
          <path d="M62 88 Q53 92 50 100"/>
          <path d="M178 88 Q187 92 190 100"/>
        </g>`:`
        <ellipse cx="94" cy="70" rx="28" ry="15" fill="${n.furLight}" opacity="0.4" transform="rotate(-16 94 70)"/>`,s=i?`
        <path class="cat-ahoge" d="M126 48 C132 31 147 28 147 39 C147 47 138 49 134 43" fill="none" stroke="${n.fur}" stroke-width="5" stroke-linecap="round"/>`:``,c=``;c=t===`happy`||t===`celebrate`?`${ve(w,E,n)}${ve(T,E,n)}`:t===`sleep`?`${ye(w,E,n)}${ye(T,E,n)}`:t===`wink`?`${O(w,E,n,a)}${be(T,E,n)}`:t===`think`?`${O(w,E,n,a,!0)}${O(T,E,n,a,!0)}`:t===`sad`?`${O(w,E,n,!0)}${O(T,E,n,!0)}`:r?`${_e(w,E,n)}${_e(T,E,n)}`:`${O(w,E,n,!0)}${O(T,E,n,!0)}`;let l=t===`sad`?`
        <g stroke="${n.ink}" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="0.8">
          <path d="M81 86 Q92 80 104 83"/>
          <path d="M159 86 Q148 80 136 83"/>
        </g>`:t===`think`?`
        <g stroke="${n.ink}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7">
          <path d="M82 84 Q93 79 104 83"/>
          <path d="M158 80 Q147 72 136 77"/>
        </g>`:``,u=r?Ee(n):``,d=t===`happy`||t===`celebrate`||t===`wink`||i&&t===`idle`?`
        <g class="cat-blush" fill="${n.blush}" opacity="${i&&t===`idle`?`0.32`:`0.5`}">
          <ellipse cx="75" cy="127" rx="10.5" ry="5.5"/>
          <ellipse cx="165" cy="127" rx="10.5" ry="5.5"/>
        </g>`:``,f=t===`happy`||t===`celebrate`?`<path d="M125 143 l4 5 l3.5 -6 Z" fill="#fffdf8" opacity="0.95"/>`:``,p=`
        <g class="cat-blink">
          ${c}
        </g>`;return`
      <g class="cat-head">
        ${De(n)}
        <ellipse cx="120" cy="108" rx="70" ry="62" fill="${n.fur}"/>
        ${o}
        ${s}
        <ellipse cx="120" cy="136" rx="31" ry="23" fill="${n.muzzle}" opacity="0.97"/>
        <g class="cat-face">
          ${l}
          ${p}
          ${u}
          <path d="M113 ${me} Q120 123 127 ${me} Q120 136 113 ${me} Z" fill="#e58a94"/>
          ${xe(t,n)}
          ${f}
          ${d}
          <g class="cat-whiskers" stroke="${n.whisker}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.9">
            <path d="M92 131 C80 128 69 125 59 122"/>
            <path d="M92 138 C80 138 69 139 59 141"/>
            <path d="M148 131 C160 128 171 125 181 122"/>
            <path d="M148 138 C160 138 171 139 181 141"/>
          </g>
        </g>
      </g>`}function ke(e,t){let n=e===`amo`?`
        <circle cx="72" cy="219" r="5.4" fill="#e8b64c"/>
        <circle cx="72" cy="219" r="2.2" fill="#f7de9a"/>
        <path d="M72 224 v2.5" stroke="#c9932f" stroke-width="1.6" stroke-linecap="round"/>`:`
        <g class="cat-bow" fill="${t.scarfDark}">
          <path d="M98 180 C88 171 79 174 81.5 183 C84 191 93 188 98 184 C103 188 112 191 114.5 183 C117 174 108 171 98 180 Z"/>
          <circle cx="98" cy="181" r="4.4" fill="${t.scarfLight}"/>
        </g>`;return`
      <g class="cat-scarf">
        <path d="M77 156 Q120 184 163 156 L166 173 Q120 202 74 173 Z" fill="${t.scarf}"/>
        <path d="M75 169 Q120 198 165 169" stroke="${t.scarfDark}" stroke-width="3" fill="none" opacity="0.55"/>
        <ellipse cx="98" cy="180" rx="10.5" ry="8.5" fill="${t.scarfDark}"/>
        <g class="cat-scarf-end">
          <path d="M92 184 C88 202 80 214 69 221 C86 223 99 208 105 192 Z" fill="${t.scarf}"/>
          <path d="M96 187 C94 201 90 209 84 216" stroke="${t.scarfDark}" stroke-width="3" fill="none" opacity="0.45"/>
        </g>
        ${e===`amo`?n:``}
      </g>`}function Ae(e,t){switch(t){case`happy`:return`
      <g class="cat-emotes">
        <path class="cat-heart" d="${ge(196,60,12)}" fill="#f4a7bb"/>
        <path class="cat-sparkle" d="${D(57,80,9)}" fill="#e8b64c"/>
        <path class="cat-sparkle" d="${D(205,106,6)}" fill="#f4a7bb"/>
        <path class="cat-sparkle" d="${D(46,176,5)}" fill="#e8b64c" opacity="0.9"/>
      </g>`;case`celebrate`:return`
      <g class="cat-emotes">
        <path class="cat-sparkle" d="${D(45,88,11)}" fill="#e8b64c"/>
        <path class="cat-sparkle" d="${D(198,78,12)}" fill="#f4a7bb"/>
        <path class="cat-sparkle" d="${D(214,128,7)}" fill="#8f9fd6"/>
        <path class="cat-sparkle" d="${D(28,134,6)}" fill="#78a878"/>
        <circle class="cat-confetti-dot" cx="58" cy="52" r="3" fill="#f4a7bb"/>
        <circle class="cat-confetti-dot" cx="184" cy="40" r="2.6" fill="#e8b64c"/>
        <circle class="cat-confetti-dot" cx="222" cy="98" r="2.6" fill="#78a878"/>
        <circle class="cat-confetti-dot" cx="20" cy="108" r="2.4" fill="#8f9fd6"/>
      </g>`;case`sad`:return`
      <g class="cat-emotes cat-tears">
        <path class="cat-tear" d="M87 121 C82 130 81 136 87 139 C93 136 92 130 87 121 Z" fill="#a6cfe8" opacity="0.95"/>
        <path class="cat-tear cat-tear--2" d="M137 128 C133 135 132 140 137 142 C142 140 141 135 137 128 Z" fill="#a6cfe8" opacity="0.85"/>
      </g>`;case`think`:return`
      <g class="cat-think">
        <circle cx="174" cy="62" r="4.4" fill="#fffdf8" stroke="${e===`amo`?`#6f9c76`:`#e07e9c`}" stroke-width="2"/>
        <circle cx="186" cy="48" r="6.4" fill="#fffdf8" stroke="${e===`amo`?`#6f9c76`:`#e07e9c`}" stroke-width="2"/>
        <ellipse cx="210" cy="26" rx="19" ry="13.5" fill="#fffdf8" stroke="${e===`amo`?`#6f9c76`:`#e07e9c`}" stroke-width="2"/>
        <g fill="${e===`amo`?`#4f7a58`:`#b4655f`}">
          <circle cx="202" cy="26" r="1.9"/>
          <circle cx="210" cy="26" r="1.9"/>
          <circle cx="218" cy="26" r="1.9"/>
        </g>
      </g>`;case`wink`:return`
      <g class="cat-emotes">
        <path class="cat-sparkle" d="${D(184,72,10)}" fill="#e8b64c"/>
        <path class="cat-heart" d="${ge(206,100,7)}" fill="#f4a7bb"/>
      </g>`;case`sleep`:return`
      <g class="cat-emotes cat-zzz" fill="none" stroke="${e===`amo`?`#5e6a60`:`#b3763d`}" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
        <path d="M183 66 h15 l-15 13 h15" stroke-width="4"/>
        <path d="M204 40 h11 l-11 10 h11" stroke-width="3.2"/>
        <path d="M219 20 h8 l-8 7 h8" stroke-width="2.6"/>
      </g>`;default:return``}}function k(e,t=`idle`,n={}){let r=e===`amo`?`amo`:`dango`,i=de[r],a=C.includes(t)?t:`idle`,o=n.size,s=typeof o==`number`&&Number.isFinite(o)&&o>0?Math.round(o):160,c=n.className?` ${he(n.className)}`:``,l=n.ariaLabel??`${fe[r]}，${pe[a]}`,u=n.decorative?`aria-hidden="true" focusable="false"`:`role="img" aria-label="${he(l)}" focusable="false"`,d=a===`idle`||a===`think`,f=a===`celebrate`,p=a===`think`,m=r===`dango`?`<path d="M75 173 q10 5 12 14 M165 173 q-10 5 -12 14" stroke="${i.furDark}" stroke-width="4.6" fill="none" stroke-linecap="round" opacity="0.5"/>`:``,h=f?we(i):Ce(r,i);return`
<svg class="cat-svg cat-${r} mood-${a}${d?` cat-eyes-open`:``}${c}" viewBox="0 0 240 240" width="${s}" height="${s}" ${u} data-character="${r}" data-mood="${a}" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="cat-shadow" cx="120" cy="231" rx="64" ry="8.5" fill="${i.shadow}" opacity="0.16"/>
  <g class="cat-body">
    ${Se(r,i)}
    <g class="cat-breathe">
      <ellipse cx="120" cy="197" rx="52" ry="46" fill="${i.fur}"/>
      <ellipse cx="120" cy="207" rx="33" ry="29" fill="${i.belly}" opacity="0.96"/>
      ${m}
      ${h}
      ${Oe(r,a,i)}
      ${p?Te(i):``}
      ${ke(r,i)}
    </g>
    ${Ae(r,a)}
  </g>
</svg>`}var je={petal:`petal-layer`,confetti:`confetti-layer`,firefly:`firefly-layer`,snow:`snow-layer`,rain:`rain-layer`,star:`star-layer`,cinematic:`cinematic-layer`},Me=[`petal--pink`,`petal--blush`,`petal--cream`,`petal--rose`];function Ne(){try{if(typeof window>`u`||typeof document>`u`)return!1;if(typeof window.matchMedia==`function`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return!0;let e=document.documentElement;return e.classList.contains(`reduced-motion`)||e.dataset.reducedMotion===`true`?!0:document.body?.classList.contains(`reduced-motion`)??!1}catch{return!1}}function A(e,t){return e+Math.random()*(t-e)}function Pe(e){return e[Math.floor(Math.random()*e.length)]}function Fe(e,t,n,r){return typeof e!=`number`||!Number.isFinite(e)?t:Math.max(n,Math.min(r,Math.round(e)))}function Ie(e,t){let n=je[t];for(let t of Array.from(e.children))if(t.classList.contains(n))return t;return null}function Le(e,t){if(typeof document>`u`)return null;let n=Ie(e,t);if(n)return n;let r=document.createElement(`div`);return r.className=`fx-layer ${je[t]}`,r.setAttribute(`aria-hidden`,`true`),r.dataset.fx=t,e.classList.add(`fx-host`),e.appendChild(r),r}function Re(e,t=14){if(!e||Ne())return;let n=Le(e,`petal`);if(!n||n.childElementCount>0)return;let r=Fe(t,14,6,28),i=document.createDocumentFragment();for(let e=0;e<r;e+=1){let e=document.createElement(`span`);e.className=`petal ${Pe(Me)}`,e.style.left=`${A(-4,100).toFixed(1)}%`,e.style.setProperty(`--petal-size`,`${A(6,12).toFixed(1)}px`),e.style.setProperty(`--petal-drift`,`${A(-90,90).toFixed(0)}px`),e.style.setProperty(`--petal-sway`,`${A(-26,26).toFixed(0)}px`),e.style.setProperty(`--petal-spin`,`${A(160,520).toFixed(0)}deg`),e.style.animationDuration=`${A(8,16).toFixed(1)}s`,e.style.animationDelay=`-${A(0,14).toFixed(1)}s`,e.style.setProperty(`--petal-opacity`,`${A(.5,.95).toFixed(2)}`),i.appendChild(e)}n.appendChild(i)}function ze(e){if(!e||Ne())return;let t=Le(e,`confetti`);if(!t)return;let n=[`#f4a7bb`,`#e88aa8`,`#78a878`,`#4f7a58`,`#e8b64c`,`#8f9fd6`,`#fffdf8`],r=document.createDocumentFragment();for(let e=0;e<30;e+=1){let t=document.createElement(`span`);t.className=`confetti confetti--${e%3==0?`ribbon`:e%3==1?`square`:`round`}`,t.style.left=`${A(18,82).toFixed(1)}%`,t.style.top=`${A(20,45).toFixed(1)}%`,t.style.background=n[e%n.length],t.style.setProperty(`--dx`,`${A(-54,54).toFixed(0)}vw`),t.style.setProperty(`--dy`,`${A(-22,8).toFixed(0)}vh`),t.style.setProperty(`--rot`,`${A(-540,540).toFixed(0)}deg`),t.style.setProperty(`--piece-w`,`${A(7,12).toFixed(0)}px`),t.style.setProperty(`--piece-h`,`${A(10,18).toFixed(0)}px`),t.style.animationDelay=`${A(0,.18).toFixed(2)}s`,r.appendChild(t)}for(t.appendChild(r);t.childElementCount>90;)t.firstElementChild?.remove();window.setTimeout(()=>{t.querySelectorAll(`.confetti`).forEach(e=>e.remove())},2400)}var Be=[`garden`,`bamboo`,`moon`,`snow`,`sea`,`stars`,`festival`,`rain`,`cloud`,`summit`];function j(e){return Math.round(e*10)/10}function M(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function N(e,t,n=!0){let r=t.map(([e,t,n])=>`<stop offset="${e}" stop-color="${t}"${n===void 0?``:` stop-opacity="${n}"`}/>`).join(``);return`<linearGradient id="${e}" x1="0" y1="${n?0:.5}" x2="${+!n}" y2="${n?1:.5}">${r}</linearGradient>`}function P(e,t){return`<radialGradient id="${e}">${t.map(([e,t,n])=>`<stop offset="${e}" stop-color="${t}"${n===void 0?``:` stop-opacity="${n}"`}/>`).join(``)}</radialGradient>`}function F(e){return` style="animation-delay:-${j(Math.abs(e))}s"`}function Ve(e,t,n={}){let r=M(t),i=n.width??800,a=n.minY??8,o=n.maxY??300,s=n.color??`#fdf6ec`,c=n.animated??0,l=n.maxRadius??1.9,u=``;for(let t=0;t<e;t+=1){let e=j(r()*i),n=j(a+r()*(o-a)),d=j(.6+r()*(l-.6)),f=j(.35+r()*.55),p=t<c,m=p?`scene-star scene-star--twinkle`:`scene-star`,h=p?F(r()*5):``;u+=`<circle class="${m}" cx="${e}" cy="${n}" r="${d}" fill="${s}" opacity="${f}"${h}/>`}return u}function I(e,t,n,r,i,a=`scene-cloud-puff`,o=0){return`
    <g transform="translate(${e} ${t}) scale(${n})" opacity="${i}">
      <g class="${a}"${F(o)}>
        <ellipse cx="0" cy="0" rx="78" ry="24" fill="${r}"/>
        <circle cx="-42" cy="-12" r="25" fill="${r}"/>
        <circle cx="4" cy="-22" r="33" fill="${r}"/>
        <circle cx="46" cy="-8" r="21" fill="${r}"/>
      </g>
    </g>`}function L(e,t,n,r,i){return`
    <g transform="translate(${j(e)} ${j(t)}) rotate(${j(n)})">
      <path class="scene-petal" d="M0 0 C-4 -2 -5.2 -6 -2.6 -8.6 C-1 -9.6 0 -8 0 -8 C0 -8 1 -9.6 2.6 -8.6 C5.2 -6 4 -2 0 0 Z" fill="${r}"${F(i)}/>
    </g>`}function He(e){let t=M(e.seed),n=e.scale??1,r=e.flip?-1:1,i=e.dense?11:8,a=[`#f7c1d0`,`#f4a7bb`,`#fce0e8`,`#efb1c4`,`#fbd3de`],o=()=>a[Math.floor(t()*a.length)]??`#f4a7bb`,s=``;for(let n=0;n<i;n+=1){let n=j((t()*2-1)*(e.dense?92:76)),r=j(-42-t()*(e.dense?124:106)),i=j(13+t()*15);s+=`<circle cx="${n}" cy="${r}" r="${i}" fill="${o()}" opacity="${j(.78+t()*.2)}"/>`;for(let e=0;e<3;e+=1){let e=j((t()*2-1)*i*.95),a=j((t()*2-1)*i*.62);s+=`<circle cx="${j(n+e)}" cy="${j(r+a)}" r="${j(i*(.4+t()*.3))}" fill="${o()}" opacity="0.92"/>`}s+=`<circle cx="${j(n-i*.25)}" cy="${j(r-i*.3)}" r="${j(i*.2)}" fill="#fff4f7" opacity="0.7"/>`}for(let n=0;n<4;n+=1){let n=j((t()*2-1)*(e.dense?110:92)),r=j(-20-t()*(e.dense?130:110));s+=`<ellipse cx="${n}" cy="${r}" rx="4" ry="2.4" fill="${o()}" transform="rotate(${j(t()*180)} ${n} ${r})" opacity="0.85"/>`}return`
    <g transform="translate(${e.x} ${e.y}) scale(${n*r} ${n})">
      <path d="M0 0 C-3 -34 -9 -62 -5 -88 C-2 -108 5 -118 13 -132" fill="none" stroke="#7c5a4d" stroke-width="11" stroke-linecap="round"/>
      <path d="M-4 -74 C-24 -88 -40 -94 -58 -100" fill="none" stroke="#7c5a4d" stroke-width="7" stroke-linecap="round"/>
      <path d="M2 -96 C18 -108 30 -118 44 -122" fill="none" stroke="#7c5a4d" stroke-width="7" stroke-linecap="round"/>
      <path d="M-1 -54 C-16 -60 -28 -62 -38 -58" fill="none" stroke="#7c5a4d" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M9 -118 C20 -128 32 -132 44 -132" fill="none" stroke="#7c5a4d" stroke-width="4" stroke-linecap="round"/>
      ${s}
    </g>`}function R(e,t,n,r,i={}){let a=i.lean??0,o=i.nodes??7,s=i.opacity??1,c=i.highlight??`#dcebd0`,l=``;for(let e=1;e<o;e+=1){let r=-t+t/o*e;l+=`<line x1="${-n/2}" y1="${j(r)}" x2="${n/2}" y2="${j(r)}" stroke="#5f7f5b" stroke-width="2.4" opacity="0.55"/>`}return`
    <g transform="translate(${e} 452) rotate(${a})" opacity="${s}">
      <rect x="${-n/2}" y="${-t}" width="${n}" height="${t}" rx="${n/2}" fill="${r}"/>
      ${l}
      <rect x="${-n/2+3}" y="${-t+6}" width="${Math.max(2,n*.16)}" height="${t-12}" rx="${n*.08}" fill="${c}" opacity="0.35"/>
    </g>`}function z(e,t,n,r,i=0,a=.9){return`
    <g transform="translate(${e} ${t}) rotate(${i}) scale(${n})" fill="${r}" opacity="${a}">
      <path d="M0 0 C20 -8 44 -10 64 -4 C42 4 20 6 0 0 Z"/>
      <path d="M-6 10 C8 22 26 30 44 30 C30 18 12 8 -6 10 Z"/>
      <path d="M-14 2 C-28 14 -38 28 -40 42 C-24 34 -14 20 -14 2 Z"/>
    </g>`}function B(e,t,n,r,i=`#f7fbff`){return`
    <g transform="translate(${e} ${t}) scale(${n})">
      <rect x="-5" y="-26" width="10" height="28" fill="#5d4a3e"/>
      <path d="M0 -118 L38 -54 L-38 -54 Z" fill="${r}"/>
      <path d="M0 -92 L46 -22 L-46 -22 Z" fill="${r}"/>
      <path d="M0 -64 L52 12 L-52 12 Z" fill="${r}"/>
      <path d="M0 -118 L24 -78 Q2 -70 -24 -78 Z" fill="${i}" opacity="0.95"/>
      <path d="M0 -92 L29 -52 Q2 -44 -29 -52 Z" fill="${i}" opacity="0.92"/>
      <path d="M0 -64 L32 -22 Q2 -14 -32 -22 Z" fill="${i}" opacity="0.9"/>
    </g>`}function Ue(e,t,n=1){return`
    <g transform="translate(${e} ${t}) scale(${n})">
      <ellipse cx="0" cy="2" rx="26" ry="7" fill="#5f6b5a" opacity="0.25"/>
      <rect x="-20" y="-14" width="40" height="14" rx="4" fill="#b9ae97"/>
      <rect x="-6" y="-46" width="12" height="34" rx="3" fill="#c8bda6"/>
      <rect x="-17" y="-70" width="34" height="26" rx="5" fill="#c8bda6"/>
      <rect x="-11" y="-64" width="22" height="15" rx="3" fill="#f7dd9a"/>
      <path d="M-27 -70 L0 -92 L27 -70 Z" fill="#a99e88"/>
      <circle cx="0" cy="-92" r="5" fill="#c8bda6"/>
      <path d="M-20 -76 L-27 -70 M20 -76 L27 -70" stroke="#a99e88" stroke-width="4"/>
    </g>`}function V(e,t,n,r,i,a=0){return`
    <g transform="translate(${e} ${t}) scale(${n})">
      <g class="scene-lantern"${F(a)}>
        <line x1="0" y1="-18" x2="0" y2="-8" stroke="#6b4a35" stroke-width="2"/>
        <ellipse cx="0" cy="16" rx="26" ry="30" fill="${i}" opacity="0.3"/>
        <rect x="-17" y="-8" width="34" height="6" rx="2" fill="#7a4a33"/>
        <ellipse cx="0" cy="14" rx="18" ry="21" fill="${r}"/>
        <path d="M-13 5 Q-16 14 -13 23 M-5 1 Q-8 14 -5 27 M5 1 Q8 14 5 27 M13 5 Q16 14 13 23" stroke="#b4653f" stroke-width="1.6" fill="none" opacity="0.5"/>
        <rect x="-17" y="26" width="34" height="6" rx="2" fill="#7a4a33"/>
        <line x1="0" y1="32" x2="0" y2="42" stroke="#7a4a33" stroke-width="2"/>
      </g>
    </g>`}function We(e,t,n,r,i){return`
    <g transform="translate(${e} ${t}) scale(${n})">
      <path d="M-84 -8 Q-86 -52 -78 -54 L78 -54 Q86 -52 84 -8 L70 -8 Q72 -42 62 -42 L-62 -42 Q-72 -42 -70 -8 Z" fill="${i}"/>
      <path d="M-96 -56 Q0 -76 96 -56 L92 -42 Q0 -60 -92 -42 Z" fill="${r}"/>
      <rect x="-86" y="-84" width="172" height="12" rx="5" fill="${i}"/>
      <rect x="-62" y="-46" width="124" height="11" rx="4" fill="${r}"/>
      <rect x="-58" y="-42" width="12" height="94" rx="4" fill="${r}"/>
      <rect x="46" y="-42" width="12" height="94" rx="4" fill="${r}"/>
    </g>`}function H(e){let t=e.scale??1,n=e.fill??`#2a3448`,r=e.scarf??`transparent`,i=e.tailUp?`M72 80 C94 78 104 60 96 44 C92 36 84 38 86 46`:`M72 84 C92 92 102 104 96 116`;return`
    <g transform="translate(${e.x} ${e.y}) scale(${t})" fill="${n}">
      <circle cx="50" cy="36" r="25"/>
      <path d="M30 22 L25 2 L44 14 Z"/>
      <path d="M70 22 L75 2 L56 14 Z"/>
      <ellipse cx="50" cy="82" rx="29" ry="27"/>
      <path d="${i}" fill="none" stroke="${n}" stroke-width="9" stroke-linecap="round"/>
      <path d="M33 56 Q50 66 67 56" fill="none" stroke="${r}" stroke-width="7" stroke-linecap="round"/>
    </g>`}function U(e,t,n,r,i,a=0){return`
    <g transform="translate(${e} ${t}) rotate(${a}) scale(${n})" fill="${r}" opacity="${i}">
      <ellipse cx="0" cy="4" rx="6" ry="5"/>
      <circle cx="-7" cy="-5" r="3"/>
      <circle cx="0" cy="-8" r="3"/>
      <circle cx="7" cy="-5" r="3"/>
    </g>`}function W(e,t,n,r,i,a=`#6f9c76`){return`
    <g transform="translate(${e} ${t}) rotate(${r}) scale(${n})">
      <g class="scene-float-book"${F(i)}>
        <path d="M-26 -16 L0 -12 L26 -16 L26 14 L0 18 L-26 14 Z" fill="${a}"/>
        <path d="M-22 -12 L0 -9 L22 -12 L22 10 L0 13 L-22 10 Z" fill="#fdf6ec"/>
        <path d="M0 -9 V13" stroke="${a}" stroke-width="2" opacity="0.6"/>
        <path d="M-18 -5 H-6 M-18 0 H-6 M6 -5 H18 M6 0 H18" stroke="#c9b79a" stroke-width="1.4"/>
      </g>
    </g>`}function Ge(e,t,n,r,i=0,a=0){return`
    <g transform="translate(${e} ${t}) rotate(${i}) scale(${n})">
      <g class="scene-crane"${F(a)} fill="${r}">
        <path d="M-30 4 L0 -8 L30 4 L0 12 Z" opacity="0.9"/>
        <path d="M0 -8 L-8 -26 L2 -12 Z"/>
        <path d="M0 -8 L10 -25 L12 -10 Z"/>
        <path d="M-30 4 L-42 -2 L-28 10 Z" opacity="0.75"/>
      </g>
    </g>`}function Ke(e,t,n,r,i){let a=``;for(let e=0;e<12;e+=1){let t=Math.PI*2*e/12,n=34+e%3*8,i=j(Math.cos(t)*14),o=j(Math.sin(t)*14),s=j(Math.cos(t)*n),c=j(Math.sin(t)*n);a+=`<line x1="${i}" y1="${o}" x2="${s}" y2="${c}" stroke="${r}" stroke-width="2.4" stroke-linecap="round"/>`}return`
    <g transform="translate(${e} ${t}) scale(${n})">
      <g class="scene-firework"${F(i)}>
        <circle cx="0" cy="0" r="7" fill="${r}" opacity="0.9"/>
        ${a}
        <circle cx="-30" cy="-18" r="2" fill="${r}" opacity="0.7"/>
        <circle cx="32" cy="-24" r="2.4" fill="${r}" opacity="0.65"/>
        <circle cx="24" cy="30" r="1.8" fill="${r}" opacity="0.6"/>
      </g>
    </g>`}function qe(e,t,n,r,i){let a=``;for(let e=0;e<4;e+=1){let t=-76+e*38,n=e%2==0?r:i;a+=`<path d="M${t} -84 H${t+36} V-50 Q${t+18} -42 ${t} -50 Z" fill="${n}"/>`}return`
    <g transform="translate(${e} ${t}) scale(${n})">
      <ellipse cx="0" cy="12" rx="104" ry="11" fill="#2f2030" opacity="0.5"/>
      <!-- 支柱 -->
      <path d="M-86 8 V-98 M86 8 V-98" stroke="#4a3030" stroke-width="8" stroke-linecap="round"/>
      <!-- 屋頂 -->
      <rect x="-92" y="-120" width="184" height="9" rx="4" fill="#5a2f34"/>
      <path d="M-114 -94 Q-106 -114 -88 -114 H88 Q106 -114 114 -94 L106 -82 Q96 -100 80 -100 H-80 Q-96 -100 -106 -82 Z" fill="#7e3b3f"/>
      <path d="M-88 -114 H88 Q99 -114 107 -100 L99 -94 H-99 L-107 -100 Q-99 -114 -88 -114 Z" fill="#a15054"/>
      <path d="M-122 -90 Q-112 -100 -100 -90 M122 -90 Q112 -100 100 -90" fill="none" stroke="#c46a64" stroke-width="4" stroke-linecap="round"/>
      <!-- 暖光 -->
      <ellipse cx="0" cy="-80" rx="98" ry="15" fill="#ffd98a" opacity="0.24"/>
      <circle cx="-94" cy="-100" r="18" fill="#ffd98a" opacity="0.3"/>
      <circle cx="-94" cy="-100" r="5" fill="#f7dd9a"/>
      <circle cx="94" cy="-100" r="18" fill="#ffd98a" opacity="0.3"/>
      <circle cx="94" cy="-100" r="5" fill="#f7dd9a"/>
      <!-- 布簾＋貓爪紋 -->
      ${a}
      ${U(-2,-66,.9,`#fdf6ec`,.95)}
      <!-- 櫃檯 -->
      <rect x="-96" y="-28" width="192" height="13" rx="4" fill="#c99a63"/>
      <rect x="-90" y="-16" width="180" height="28" rx="4" fill="#5a3a3c"/>
      <path d="M-74 -16 V12 M-52 -16 V12 M-30 -16 V12 M-8 -16 V12 M14 -16 V12 M36 -16 V12 M58 -16 V12" stroke="#7e3b3f" stroke-width="2" opacity="0.8"/>
      <!-- 櫃上小食 -->
      <g transform="translate(-52 -34)">
        <path d="M0 12 V-18" stroke="#d9c07a" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="0" cy="-8" r="4.6" fill="#f4a7bb"/>
        <circle cx="0" cy="-16" r="4.6" fill="#fdf6ec"/>
        <circle cx="0" cy="-24" r="4.6" fill="#f7c1d0"/>
      </g>
      <g transform="translate(38 -34)">
        <rect x="-10" y="-14" width="9" height="26" rx="3" fill="#7e5257"/>
        <rect x="2" y="-8" width="9" height="20" rx="3" fill="#9c7440"/>
        <rect x="-10" y="-16" width="9" height="4" rx="2" fill="#f7dd9a"/>
      </g>
      <g fill="#f7dd9a" opacity="0.9">
        <circle cx="-72" cy="-36" r="3.4"/>
        <circle cx="70" cy="-38" r="3"/>
        <circle cx="16" cy="-36" r="2.6"/>
      </g>
    </g>`}function Je(){let e=`garden`;return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#fde7ef`],[.55,`#fdf1ea`],[1,`#fff8ec`]])}
    ${N(`scene-${e}-ground`,[[0,`#c3dcb0`],[1,`#9cc38d`]])}
    ${P(`scene-${e}-sun`,[[0,`#fffdf8`,.85],[1,`#fff8e8`,0]])}
    ${P(`scene-${e}-pond`,[[0,`#d3ece2`],[.7,`#a9d3c6`],[1,`#8fc2b8`]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  <circle cx="650" cy="86" r="128" fill="url(#scene-${e}-sun)"/>
  <circle cx="650" cy="86" r="48" fill="#fffdf8" opacity="0.72"/>

  <!-- 远景山丘 -->
  <path d="M0 306 Q140 246 300 272 T800 250 V450 H0 Z" fill="#d9e8c9"/>
  <path d="M0 336 Q180 292 360 316 T800 296 V450 H0 Z" fill="#c5dcb2"/>
  <path d="M0 372 Q220 332 420 350 T800 338 V450 H0 Z" fill="url(#scene-${e}-ground)"/>

  <!-- 鳥居 -->
  ${We(400,306,.92,`#d98d92`,`#b96f75`)}

  <!-- 櫻花樹（左／右） -->
  ${He({seed:11,x:86,y:420,scale:1.02,dense:!0})}
  ${He({seed:27,x:726,y:408,scale:.9,flip:!0})}

  <!-- 小徑（由闊到窄，引向鳥居） -->
  <path d="M292 450 Q352 408 396 372 Q426 348 434 336 L464 336 Q474 354 510 392 Q544 422 566 450 Z" fill="#f4e8d2" opacity="0.95"/>
  <path d="M292 450 Q352 408 396 372 Q426 348 434 336 M464 336 Q474 354 510 392 Q544 422 566 450" fill="none" stroke="#e7d6b9" stroke-width="3" opacity="0.65"/>
  <g fill="#e9d8bc" opacity="0.8">
    <ellipse cx="424" cy="422" rx="30" ry="7"/>
    <ellipse cx="482" cy="394" rx="24" ry="6"/>
    <ellipse cx="448" cy="366" rx="18" ry="4.6"/>
    <ellipse cx="450" cy="346" rx="13" ry="3.6"/>
  </g>
  <g fill="#d9c4a4" opacity="0.55">
    <ellipse cx="360" cy="438" rx="22" ry="5"/>
    <ellipse cx="520" cy="432" rx="18" ry="4.4"/>
  </g>

  <!-- 池塘邊長椅 ＋ 小貓 -->
  <g transform="translate(280 400)">
    <ellipse cx="0" cy="20" rx="38" ry="6" fill="#a9b79a" opacity="0.5"/>
    <rect x="-30" y="2" width="60" height="7" rx="3" fill="#a98460"/>
    <rect x="-24" y="-8" width="48" height="6" rx="3" fill="#c99a63"/>
    <path d="M-24 9 v13 M24 9 v13" stroke="#8d6a4a" stroke-width="4" stroke-linecap="round"/>
  </g>
  ${H({x:252,y:358,scale:.42,fill:`#6b5a4d`,scarf:`#6f9c76`})}

  <!-- 池塘 -->
  <ellipse cx="146" cy="399" rx="128" ry="42" fill="url(#scene-${e}-pond)"/>
  <ellipse cx="146" cy="399" rx="128" ry="42" fill="none" stroke="#f3ead7" stroke-width="6" opacity="0.75"/>
  <ellipse cx="104" cy="392" rx="26" ry="5" fill="#eaf6f0" opacity="0.6"/>
  <ellipse cx="196" cy="406" rx="18" ry="4" fill="#eaf6f0" opacity="0.5"/>
  <!-- 錦鯉 -->
  <g transform="translate(118 398) rotate(-8)">
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#f09a5c"/>
    <path d="M-14 0 L-26 -6 L-24 6 Z" fill="#f09a5c"/>
    <circle cx="9" cy="-1.5" r="1.4" fill="#5b4634"/>
  </g>
  <g transform="translate(186 408) rotate(12)">
    <ellipse cx="0" cy="0" rx="13" ry="5" fill="#fdf6ec"/>
    <path d="M-11 0 L-21 -5 L-19 5 Z" fill="#f7c1d0"/>
    <circle cx="7" cy="-1" r="1.2" fill="#5b4634"/>
  </g>

  <!-- 石燈籠同石頭 -->
  ${Ue(600,392,1.05)}
  <ellipse cx="676" cy="412" rx="26" ry="9" fill="#a9b79a"/>
  <ellipse cx="704" cy="418" rx="17" ry="6" fill="#b8c4a9"/>
  <ellipse cx="266" cy="330" rx="20" ry="7" fill="#b8c4a9"/>

  <!-- 草地小花草 -->
  <g stroke="#7f9f6d" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.8">
    <path d="M48 436 q-4 -12 1 -18 M54 438 q4 -10 9 -13"/>
    <path d="M712 440 q-5 -12 0 -19 M719 441 q5 -10 10 -14"/>
    <path d="M450 424 q-4 -10 1 -15 M457 425 q5 -8 9 -11"/>
  </g>
  <g fill="#f4a7bb" opacity="0.85">
    <circle cx="44" cy="418" r="3.4"/><circle cx="58" cy="426" r="2.6"/>
    <circle cx="716" cy="424" r="3.2"/><circle cx="454" cy="412" r="2.8"/>
  </g>

  <!-- 腳印 -->
  ${U(348,430,.9,`#d9c4a4`,.8,18)}
  ${U(384,404,.85,`#d9c4a4`,.75,26)}
  ${U(412,374,.8,`#d9c4a4`,.7,18)}

  <!-- 前景垂枝櫻花（框景） -->
  <g>
    <path d="M-10 18 C60 44 118 60 176 58" fill="none" stroke="#7c5a4d" stroke-width="7" stroke-linecap="round"/>
    <path d="M40 34 C34 52 28 66 20 76" fill="none" stroke="#7c5a4d" stroke-width="4" stroke-linecap="round"/>
    <path d="M118 54 C122 70 130 82 140 90" fill="none" stroke="#7c5a4d" stroke-width="4" stroke-linecap="round"/>
    <g>
      <circle cx="14" cy="12" r="24" fill="#f7c1d0"/><circle cx="42" cy="30" r="19" fill="#fce0e8"/><circle cx="72" cy="34" r="23" fill="#f4a7bb"/>
      <circle cx="104" cy="48" r="18" fill="#fbd3de"/><circle cx="132" cy="58" r="22" fill="#f7c1d0"/><circle cx="164" cy="52" r="16" fill="#fce0e8"/>
      <circle cx="24" cy="72" r="16" fill="#f4a7bb"/><circle cx="150" cy="88" r="15" fill="#f7c1d0"/>
      <circle cx="34" cy="20" r="9" fill="#fff4f7" opacity="0.75"/><circle cx="142" cy="48" r="8" fill="#fff4f7" opacity="0.7"/>
    </g>
    <path d="M800 30 C740 52 690 64 640 62" fill="none" stroke="#7c5a4d" stroke-width="6" stroke-linecap="round"/>
    <g>
      <circle cx="792" cy="20" r="20" fill="#fce0e8"/><circle cx="764" cy="34" r="17" fill="#f7c1d0"/><circle cx="730" cy="44" r="20" fill="#f4a7bb"/>
      <circle cx="700" cy="54" r="15" fill="#fbd3de"/><circle cx="664" cy="58" r="18" fill="#fce0e8"/>
      <circle cx="776" cy="44" r="8" fill="#fff4f7" opacity="0.7"/>
    </g>
  </g>

  <!-- 前景花草 -->
  <g stroke="#6f9568" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.85">
    <path d="M96 444 q-6 -18 2 -28 M108 448 q7 -16 14 -22 M118 446 q2 -14 8 -20"/>
    <path d="M624 440 q-6 -16 2 -24 M636 444 q7 -14 13 -19"/>
    <path d="M268 446 q-5 -14 2 -21 M278 449 q6 -12 12 -16"/>
  </g>
  <g fill="#fdf6ec" opacity="0.95">
    <circle cx="98" cy="414" r="4.2"/><circle cx="92" cy="420" r="3"/>
    <circle cx="630" cy="412" r="3.8"/>
  </g>
  <g fill="#f4a7bb" opacity="0.9">
    <circle cx="112" cy="424" r="3.4"/><circle cx="120" cy="430" r="2.6"/>
    <circle cx="644" cy="422" r="3.2"/><circle cx="272" cy="424" r="3"/>
  </g>

  <!-- 飄落櫻花 -->
  ${L(180,96,12,`#f7c1d0`,.4)}
  ${L(252,74,-22,`#f4a7bb`,2.1)}
  ${L(330,130,44,`#fce0e8`,3.6)}
  ${L(96,200,90,`#f7c1d0`,5.2)}
  ${L(560,120,8,`#f4a7bb`,1.2)}
  ${L(640,180,-34,`#fce0e8`,4.4)}
  ${L(700,92,52,`#f7c1d0`,2.8)}
  ${L(470,236,-12,`#f4a7bb`,6.1)}
  ${L(760,260,30,`#fce0e8`,3.1)}
  ${L(206,178,-40,`#f4a7bb`,4.8)}
  <g fill="#f7c1d0" opacity="0.85">
    <ellipse cx="300" cy="420" rx="4" ry="2.4" transform="rotate(-18 300 420)"/>
    <ellipse cx="470" cy="438" rx="3.4" ry="2" transform="rotate(24 470 438)"/>
    <ellipse cx="640" cy="432" rx="4" ry="2.2" transform="rotate(-8 640 432)"/>
    <ellipse cx="536" cy="330" rx="3.6" ry="2.1" transform="rotate(-20 536 330)"/>
  </g>`}function Ye(){let e=`bamboo`,t=``,n=M(101);for(let e=0;e<11;e+=1)t+=R(j(30+e*74+n()*30),j(300+n()*130),j(9+n()*8),`#b9d2a7`,{lean:j((n()-.5)*4),opacity:.55,nodes:8});let r=``,i=M(202);for(let e=0;e<7;e+=1)r+=R(j(60+e*118+i()*24),j(350+i()*90),j(16+i()*9),`#93b383`,{lean:j((i()-.5)*5),nodes:9});let a=``,o=M(303);for(let e=0;e<13;e+=1)a+=z(j(20+o()*760),j(20+o()*250),j(.45+o()*.6),o()>.5?`#7fa06f`:`#6f9568`,j((o()-.5)*60),j(.55+o()*.4));let s=``,c=M(404);for(let e=0;e<9;e+=1){let e=j(50+c()*700),t=j(180+c()*220);s+=`<g transform="translate(${e} ${t})">
      <circle cx="0" cy="0" r="8" fill="#f7e38a" opacity="0.16"/>
      <circle class="scene-firefly" cx="0" cy="0" r="2.6" fill="#f7e38a"${F(c()*6)}/>
    </g>`}return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#e4efdc`],[.6,`#f2f8ea`],[1,`#fbfdf5`]])}
    ${P(`scene-${e}-light`,[[0,`#fffef0`,.9],[1,`#fffef0`,0]])}
    ${N(`scene-${e}-path`,[[0,`#cfd8bd`],[1,`#aebd9c`]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  <circle cx="150" cy="60" r="150" fill="url(#scene-${e}-light)"/>
  <!-- 林間光柱 -->
  <g fill="#fffef0" opacity="0.15">
    <path d="M126 34 L216 34 L468 450 L396 450 Z"/>
    <path d="M264 14 L322 14 L610 450 L552 450 Z"/>
    <path d="M38 104 L92 104 L288 450 L238 450 Z"/>
  </g>

  <!-- 背景竹 -->
  ${t}
  <!-- 中景霧氣 -->
  <ellipse cx="400" cy="330" rx="480" ry="60" fill="#ffffff" opacity="0.34"/>
  <ellipse cx="220" cy="250" rx="360" ry="40" fill="#ffffff" opacity="0.22"/>
  <!-- 中景竹 -->
  ${r}
  ${a}

  <!-- 小徑（闊→窄，帶石階） -->
  <path d="M286 450 Q352 410 404 366 Q440 336 452 318 L474 316 Q486 338 516 374 Q552 412 580 450 Z" fill="url(#scene-${e}-path)" opacity="0.92"/>
  <path d="M286 450 Q352 410 404 366 Q440 336 452 318 M474 316 Q486 338 516 374 Q552 412 580 450" fill="none" stroke="#c3cfae" stroke-width="3" opacity="0.6"/>
  <g fill="#b3c19d" opacity="0.9">
    <ellipse cx="432" cy="426" rx="26" ry="6"/>
    <ellipse cx="470" cy="398" rx="21" ry="5"/>
    <ellipse cx="442" cy="372" rx="17" ry="4.2"/>
    <ellipse cx="452" cy="350" rx="13" ry="3.5"/>
    <ellipse cx="458" cy="334" rx="10" ry="3"/>
  </g>

  <!-- 石燈籠與石頭 -->
  ${Ue(620,380,1.1)}
  <ellipse cx="700" cy="408" rx="34" ry="12" fill="#8d9d7d"/>
  <ellipse cx="666" cy="420" rx="22" ry="8" fill="#a3b392"/>
  <ellipse cx="160" cy="404" rx="30" ry="10" fill="#94a483"/>
  <ellipse cx="128" cy="414" rx="18" ry="7" fill="#a3b392"/>

  <!-- 前景竹（左右框景） -->
  ${R(22,452,30,`#6f9568`,{nodes:10,lean:2})}
  ${R(70,430,22,`#7fa06f`,{nodes:9,lean:-2})}
  ${R(776,452,34,`#6f9568`,{nodes:10,lean:-2})}
  ${R(730,424,20,`#7fa06f`,{nodes:8,lean:3})}
  ${z(782,54,.75,`#6f9568`,8,.95)}
  ${z(36,36,.7,`#7fa06f`,-12,.95)}
  ${z(750,214,.55,`#6f9568`,26,.8)}
  <!-- 前景地面蕨葉 -->
  <g fill="#5f7f5b" opacity="0.75">
    <path d="M96 450 C118 424 150 414 178 418 C152 428 126 438 104 452 Z"/>
    <path d="M712 450 C690 426 660 418 634 422 C660 430 686 440 706 452 Z"/>
  </g>

  <!-- 石貓守護像 -->
  <g>
    <ellipse cx="556" cy="406" rx="42" ry="10" fill="#5f7f5b" opacity="0.32"/>
    <path d="M-28 34 H28 L22 18 H-22 Z" transform="translate(548 388)" fill="#aab89a"/>
    ${H({x:526,y:348,scale:.5,fill:`#9fae8d`,scarf:`#d96f6f`,tailUp:!0})}
    <circle cx="540" cy="400" r="7" fill="#7fa06f" opacity="0.6"/>
    <circle cx="566" cy="404" r="5" fill="#7fa06f" opacity="0.5"/>
  </g>
  <!-- 青苔石與落葉 -->
  <ellipse cx="676" cy="430" rx="30" ry="9" fill="#7fa06f" opacity="0.55"/>
  <g fill="#d9c07a" opacity="0.85">
    <path d="M320 436 C330 432 342 434 350 438 C340 442 328 441 320 436 Z"/>
    <path d="M476 442 C486 438 498 440 506 444 C496 448 484 447 476 442 Z"/>
    <path d="M522 414 C530 411 540 413 546 417 C538 420 528 419 522 414 Z"/>
  </g>

  <!-- 飄落竹葉 + 螢火蟲 -->
  <g class="scene-leaf"${F(1.4)}><path d="M210 120 C224 116 238 118 248 124 C234 130 220 128 210 120 Z" fill="#8fb083" opacity="0.85"/></g>
  <g class="scene-leaf"${F(4.2)}><path d="M600 60 C614 56 628 58 638 64 C624 70 610 68 600 60 Z" fill="#7fa06f" opacity="0.8"/></g>
  ${s}

  <!-- 腳印 -->
  ${U(430,430,.85,`#8b9c7a`,.55,20)}
  ${U(450,398,.8,`#8b9c7a`,.5,12)}
  ${U(468,366,.7,`#8b9c7a`,.45,22)}`}function Xe(){let e=`moon`;return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#1b2745`],[.55,`#33426b`],[1,`#586a96`]])}
    ${P(`scene-${e}-moonGlow`,[[0,`#fdf3d8`,.55],[1,`#fdf3d8`,0]])}
    ${P(`scene-${e}-windowGlow`,[[0,`#f7dd9a`,.65],[1,`#f7dd9a`,0]])}
    ${N(`scene-${e}-ground`,[[0,`#3c4868`],[1,`#2a3450`]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  ${Ve(46,901,{maxY:250,animated:12})}

  <!-- 月亮 -->
  <circle cx="612" cy="98" r="126" fill="url(#scene-${e}-moonGlow)"/>
  <circle cx="612" cy="98" r="58" fill="#fdf3d8"/>
  <circle cx="594" cy="82" r="9" fill="#efe3c2" opacity="0.8"/>
  <circle cx="628" cy="112" r="6" fill="#efe3c2" opacity="0.7"/>
  <circle cx="610" cy="126" r="4" fill="#efe3c2" opacity="0.6"/>

  <!-- 流星 -->
  <g class="scene-shooting"${F(3.2)}>
    <path d="M120 70 L206 44" stroke="#fdf6ec" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>
    <path d="M206 44 L214 41" stroke="#fdf6ec" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- 薄雲 -->
  ${I(180,190,1.5,`#7284ad`,.22,`scene-cloud-puff`,2.4)}
  ${I(560,240,1.1,`#7284ad`,.18,`scene-cloud-puff`,5.1)}
  ${I(420,60,.8,`#7284ad`,.14,`scene-cloud-puff`,8.3)}

  <!-- 左側竹林剪影 -->
  <g opacity="0.95">
    ${R(28,452,14,`#202a44`,{nodes:8,lean:-1.5,highlight:`#2b3a60`})}
    ${R(66,452,10,`#202a44`,{nodes:9,lean:1.2,highlight:`#2b3a60`})}
    ${R(104,452,8,`#202a44`,{nodes:8,lean:-1,highlight:`#2b3a60`})}
    ${z(142,130,.8,`#202a44`,6,.95)}
    ${z(76,96,.7,`#202a44`,-16,.9)}
    ${z(150,240,.55,`#202a44`,28,.85)}
  </g>

  <!-- 書齋 -->
  <g>
    <path d="M430 254 Q470 172 606 162 Q742 154 800 238 L800 254 Z" fill="#222b45"/>
    <path d="M448 246 Q490 184 608 176 Q726 168 780 240" fill="none" stroke="#46557c" stroke-width="4" opacity="0.7"/>
    <path d="M470 254 Q500 200 600 192 Q710 184 762 250" fill="#2c3552"/>
    <rect x="470" y="252" width="330" height="130" fill="#2e3550"/>
    <rect x="470" y="252" width="330" height="12" fill="#232a43"/>

    <!-- 窗格暖光 -->
    <circle cx="536" cy="308" r="86" fill="url(#scene-${e}-windowGlow)"/>
    <circle cx="676" cy="308" r="86" fill="url(#scene-${e}-windowGlow)"/>
    <rect x="500" y="278" width="74" height="66" rx="4" fill="#f3d78b" opacity="0.92"/>
    <rect x="638" y="278" width="74" height="66" rx="4" fill="#f3d78b" opacity="0.88"/>
    <g stroke="#9c7440" stroke-width="2" opacity="0.75">
      <path d="M500 300 H574 M500 322 H574 M518 278 V344 M537 278 V344 M556 278 V344"/>
      <path d="M638 300 H712 M638 322 H712 M656 278 V344 M675 278 V344 M694 278 V344"/>
    </g>
    <!-- 窗內貓影 -->
    <g fill="#6b4a33" opacity="0.75">
      <circle cx="548" cy="316" r="12"/>
      <path d="M538 312 L534 298 L546 306 Z"/>
      <path d="M558 312 L562 298 L550 306 Z"/>
      <ellipse cx="548" cy="338" rx="16" ry="14"/>
    </g>

    <!-- 屋簷下燈籠 -->
    ${V(478,268,.72,`#f2b45c`,`#ffd98a`,1.8)}
    ${V(792,262,.62,`#f2b45c`,`#ffd98a`,4.4)}

    <!-- 緣側（木廊） -->
    <rect x="440" y="382" width="360" height="18" fill="#463c37"/>
    <rect x="440" y="400" width="360" height="8" fill="#332c29"/>
    <path d="M440 382 H800" stroke="#6b5a4d" stroke-width="2" opacity="0.7"/>
    <!-- 書卷 -->
    <g transform="translate(612 366)">
      <path d="M-26 -8 L-2 -4 L22 -8 L22 6 L-2 10 L-26 6 Z" fill="#fdf6ec"/>
      <path d="M-2 -4 V10" stroke="#c9b79a" stroke-width="2"/>
      <path d="M-20 -2 H-8 M-20 2 H-8 M6 -2 H18 M6 2 H18" stroke="#c9b79a" stroke-width="1.3"/>
    </g>
    <!-- 緣側上的貓 -->
    ${Ge(742,340,.7,`#f4a7bb`,-8,2.2)}
    ${H({x:712,y:306,scale:.62,fill:`#1b2338`,scarf:`#6f9c76`,tailUp:!0})}
  </g>

  <!-- 地面＋參道 -->
  <path d="M0 420 Q200 386 400 402 T800 388 V450 H0 Z" fill="url(#scene-${e}-ground)"/>
  <path d="M226 450 Q310 424 400 414 Q470 406 528 404 L570 404 Q530 426 450 438 Q340 454 226 450 Z" fill="#4a587c" opacity="0.45"/>
  <g fill="#5e6e94" opacity="0.7">
    <ellipse cx="306" cy="442" rx="26" ry="6"/>
    <ellipse cx="356" cy="430" rx="23" ry="5.4"/>
    <ellipse cx="410" cy="421" rx="20" ry="4.8"/>
    <ellipse cx="462" cy="415" rx="17" ry="4.2"/>
    <ellipse cx="510" cy="410" rx="14" ry="3.6"/>
  </g>
  <g fill="#4a587c" opacity="0.6">
    <ellipse cx="190" cy="432" rx="40" ry="8"/>
    <ellipse cx="640" cy="434" rx="52" ry="9"/>
  </g>
  <path d="M0 440 Q300 416 800 436" stroke="#6b7ba3" stroke-width="2" fill="none" opacity="0.4"/>
  <!-- 參道旁石燈籠 -->
  ${Ue(268,392,.72)}
  ${U(336,440,.85,`#6b7ba3`,.5,16)}
  ${U(386,424,.8,`#6b7ba3`,.45,2)}
  ${U(438,414,.74,`#6b7ba3`,.4,18)}
  ${U(488,410,.68,`#6b7ba3`,.35,4)}

  <!-- 螢火蟲 -->
  <g transform="translate(220 300)"><circle r="7" fill="#f7e38a" opacity="0.15"/><circle class="scene-firefly" r="2.4" fill="#f7e38a"${F(.8)}/></g>
  <g transform="translate(332 350)"><circle r="6" fill="#f7e38a" opacity="0.14"/><circle class="scene-firefly" r="2" fill="#f7e38a"${F(3.1)}/></g>
  <g transform="translate(150 380)"><circle r="6" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2.2" fill="#f7e38a"${F(5.4)}/></g>`}function Ze(){let e=`snow`,t=``,n=M(707);for(let e=0;e<14;e+=1){let e=j(n()*800),r=j(n()*340),i=j(1.4+n()*2.4);t+=`<g transform="translate(${e} ${r})"><circle class="scene-snowflake" r="${i}" fill="#ffffff" opacity="${j(.55+n()*.4)}"${F(n()*8)}/></g>`}return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#c7dcef`],[.6,`#e8f3fb`],[1,`#f9fcff`]])}
    ${N(`scene-${e}-water`,[[0,`#cfe9ea`],[1,`#a9d4d9`]])}
    ${P(`scene-${e}-warm`,[[0,`#ffd98a`,.8],[1,`#ffd98a`,0]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  <circle cx="630" cy="82" r="120" fill="url(#scene-${e}-warm)" opacity="0.5"/>
  <circle cx="630" cy="82" r="40" fill="#fffdf8" opacity="0.85"/>

  <!-- 雪山 -->
  <path d="M0 300 L130 150 L236 250 L330 176 L470 306 L560 230 L700 322 L800 250 V450 H0 Z" fill="#b7cfe3"/>
  <path d="M130 150 L176 196 L150 204 L122 190 Z" fill="#f7fbff"/>
  <path d="M330 176 L372 216 L344 224 L318 210 Z" fill="#f7fbff"/>
  <path d="M560 230 L596 262 L572 268 L548 258 Z" fill="#f7fbff"/>
  <path d="M0 340 L120 250 L230 330 L340 270 L470 350 L600 292 L720 360 L800 320 V450 H0 Z" fill="#d8e8f2"/>

  <!-- 雪松 -->
  ${B(120,420,.95,`#5f7f6e`)}
  ${B(214,438,.65,`#6b8b78`)}
  ${B(700,430,.8,`#638372`)}
  ${B(76,400,.55,`#6b8b78`)}
  ${B(766,402,.62,`#5f7f6e`)}
  ${B(636,322,.42,`#6b8b78`)}
  <!-- 雪叢 -->
  <g fill="#fbfdff">
    <ellipse cx="330" cy="446" rx="44" ry="14"/>
    <circle cx="304" cy="438" r="18"/>
    <circle cx="342" cy="436" r="22"/>
    <circle cx="376" cy="442" r="15"/>
    <ellipse cx="822" cy="416" rx="34" ry="12"/>
  </g>
  <!-- 溫泉邊丹頂鶴 -->
  <g transform="translate(782 322)">
    <ellipse cx="0" cy="26" rx="18" ry="5" fill="#b7cfe3" opacity="0.5"/>
    <path d="M-8 4 V22 M8 4 V22" stroke="#8d6a4a" stroke-width="2.6"/>
    <ellipse cx="0" cy="0" rx="17" ry="11" fill="#fbfdff"/>
    <path d="M-10 -4 C-22 -16 -24 -34 -18 -44" stroke="#fbfdff" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <circle cx="-19" cy="-47" r="6.5" fill="#fbfdff"/>
    <path d="M-25 -47 l-9 3" stroke="#e8b64c" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="-19" cy="-51" r="2.6" fill="#d96f6f"/>
    <path d="M14 2 Q24 6 26 16" stroke="#fbfdff" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 溫泉池 -->
  <path d="M412 372 C446 344 518 334 590 338 C670 342 746 360 770 390 C788 412 758 432 698 440 C636 449 556 450 502 444 C448 438 412 420 406 400 C402 388 402 380 412 372 Z" fill="#eef7f9" opacity="0.95"/>
  <path d="M424 374 C456 352 522 344 590 348 C662 352 734 366 756 390 C772 408 746 424 694 432 C636 440 562 442 512 436 C464 430 430 414 424 398 C420 388 420 382 424 374 Z" fill="url(#scene-${e}-water)"/>
  <path d="M436 392 C464 372 524 364 592 366" fill="none" stroke="#e8f6f7" stroke-width="5" opacity="0.55" stroke-linecap="round"/>
  <ellipse cx="546" cy="386" rx="40" ry="7" fill="#e8f6f7" opacity="0.55"/>
  <ellipse cx="646" cy="414" rx="28" ry="5" fill="#e8f6f7" opacity="0.45"/>
  <ellipse cx="510" cy="424" rx="22" ry="4" fill="#e8f6f7" opacity="0.35"/>
  <!-- 池邊石頭 -->
  <g fill="#b7c3c6">
    <ellipse cx="414" cy="388" rx="24" ry="14"/>
    <ellipse cx="398" cy="404" rx="20" ry="12"/>
    <ellipse cx="410" cy="422" rx="18" ry="10"/>
    <ellipse cx="452" cy="434" rx="18" ry="9"/>
    <ellipse cx="506" cy="444" rx="20" ry="8"/>
    <ellipse cx="586" cy="448" rx="24" ry="8"/>
    <ellipse cx="664" cy="444" rx="20" ry="8"/>
    <ellipse cx="726" cy="432" rx="18" ry="9"/>
    <ellipse cx="762" cy="414" rx="20" ry="11"/>
    <ellipse cx="772" cy="392" rx="18" ry="12"/>
    <ellipse cx="466" cy="358" rx="20" ry="12"/>
    <ellipse cx="540" cy="346" rx="22" ry="11"/>
    <ellipse cx="626" cy="344" rx="20" ry="10"/>
    <ellipse cx="704" cy="350" rx="22" ry="12"/>
  </g>
  <g fill="#a9b8bd" opacity="0.8">
    <ellipse cx="430" cy="396" rx="12" ry="7"/>
    <ellipse cx="748" cy="376" rx="12" ry="8"/>
    <ellipse cx="610" cy="342" rx="10" ry="5"/>
  </g>
  <!-- 小木桶 -->
  <g transform="translate(474 428) rotate(-8)">
    <path d="M-13 -10 H13 L10 8 H-10 Z" fill="#b08055"/>
    <path d="M-13 -10 H13" stroke="#8d6a4a" stroke-width="3"/>
    <path d="M-11 -4 H11 M-10 2 H10" stroke="#8d6a4a" stroke-width="2" opacity="0.7"/>
  </g>
  <!-- 蒸氣 -->
  <g stroke="#ffffff" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.6">
    <path class="scene-steam" d="M520 372 C510 348 530 332 522 312"${F(.4)}/>
    <path class="scene-steam" d="M592 364 C582 336 604 322 596 298"${F(2.2)}/>
    <path class="scene-steam" d="M658 372 C650 348 668 334 660 314"${F(4.1)}/>
  </g>
  <g stroke="#ffffff" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.42">
    <path class="scene-steam" d="M466 370 C460 354 472 344 466 330"${F(1.5)}/>
    <path class="scene-steam" d="M706 362 C700 346 712 336 706 322"${F(3.4)}/>
    <path class="scene-steam" d="M560 360 C554 344 566 334 560 320"${F(5.2)}/>
  </g>

  <!-- 雪人貓 -->
  <g transform="translate(150 356)">
    <ellipse cx="0" cy="58" rx="56" ry="14" fill="#b7cfe3" opacity="0.5"/>
    <circle cx="0" cy="18" r="46" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <circle cx="0" cy="-32" r="34" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <path d="M-22 -52 L-30 -78 L-6 -62 Z" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <path d="M22 -52 L30 -78 L6 -62 Z" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <path d="M-12 -72 L-16 -84 L-4 -76 Z" fill="#f7b7cb"/>
    <path d="M12 -72 L16 -84 L4 -76 Z" fill="#f7b7cb"/>
    <circle cx="-12" cy="-34" r="3.4" fill="#4a3a2c"/>
    <circle cx="12" cy="-34" r="3.4" fill="#4a3a2c"/>
    <path d="M-5 -24 L0 -20 L5 -24 Z" fill="#f09a5c"/>
    <path d="M-10 -14 Q0 -6 10 -14" stroke="#5b4634" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M-28 0 Q0 10 28 0 L26 14 Q0 24 -26 14 Z" fill="#ef9fb6"/>
    <path d="M-12 10 L-18 34 L-4 30 Z" fill="#e07e9c"/>
    <path d="M-34 -14 L-58 -26 M34 -14 L58 -26" stroke="#8d6a4a" stroke-width="4" stroke-linecap="round"/>
    <path d="M-58 -26 L-66 -38 M-58 -26 L-48 -40 M58 -26 L66 -38 M58 -26 L48 -40" stroke="#8d6a4a" stroke-width="3" stroke-linecap="round"/>
    <path d="M-26 -6 Q-40 -16 -44 -30" stroke="#ef9fb6" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 木欄杆與紅燈籠 -->
  <g stroke="#8d6a4a" stroke-width="7" stroke-linecap="round">
    <path d="M268 450 V336 M340 450 V348 M400 450 V360"/>
    <path d="M260 348 H408 M264 368 H400"/>
  </g>
  <circle cx="296" cy="344" r="46" fill="url(#scene-${e}-warm)" opacity="0.45"/>
  ${V(296,318,.6,`#e8756b`,`#ffb4a0`,2.6)}
  <!-- 雪堆 -->
  <ellipse cx="46" cy="438" rx="58" ry="18" fill="#f7fbff" opacity="0.9"/>
  <ellipse cx="236" cy="450" rx="46" ry="14" fill="#f7fbff" opacity="0.85"/>
  <ellipse cx="780" cy="444" rx="40" ry="16" fill="#f7fbff" opacity="0.8"/>

  <!-- 足跡 -->
  ${U(296,432,.9,`#9fb8cf`,.85,-8)}
  ${U(326,412,.85,`#9fb8cf`,.8,12)}
  ${U(354,394,.8,`#9fb8cf`,.75,-14)}
  ${U(380,378,.75,`#9fb8cf`,.7,8)}

  ${t}`}function Qe(){return`
  <defs>
    ${N(`scene-sea-sky`,[[0,`#f9cfa8`],[.45,`#fbe4c8`],[.75,`#e9eef0`],[1,`#cfe6ee`]])}
    ${N(`scene-sea-sea`,[[0,`#a9cfd9`],[.5,`#7fb3c7`],[1,`#4f86a0`]])}
    ${P(`scene-sea-sun`,[[0,`#fff4d6`,.95],[1,`#ffd9a0`,0]])}
    ${N(`scene-sea-beam`,[[0,`#fff6d0`,.04],[1,`#fff6d0`,.72]],!1)}
    ${N(`scene-sea-sand`,[[0,`#f3e6ca`],[1,`#e5cf9f`]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-sea-sky)"/>
  <circle cx="600" cy="178" r="150" fill="url(#scene-sea-sun)"/>
  <circle cx="600" cy="178" r="46" fill="#fff4d8" opacity="0.95"/>
  <!-- 燈塔光柱（在雲後面，較自然） -->
  <g>
    <path class="scene-beam" d="M688 116 Q580 74 396 58 L396 172 Q580 158 688 124 Z" fill="#fff6d0" fill-opacity="0.5"/>
    <path class="scene-beam" d="M724 116 Q820 82 990 70 L990 170 Q820 156 724 124 Z" fill="#fff6d0" fill-opacity="0.34"/>
  </g>

  <!-- 雲 -->
  ${I(170,96,1.3,`#ffffff`,.55,`scene-cloud-puff`,3.2)}
  ${I(660,62,.9,`#ffffff`,.45,`scene-cloud-puff`,6.4)}
  ${I(390,130,.7,`#fff3e2`,.4,`scene-cloud-puff`,9.1)}

  <!-- 海 -->
  <rect x="0" y="248" width="800" height="202" fill="url(#scene-sea-sea)"/>
  <path d="M0 248 H800" stroke="#fdf0d4" stroke-width="3" opacity="0.7"/>
  <!-- 遠島 -->
  <path d="M20 252 Q90 228 160 244 Q116 252 74 254 Q44 254 20 252 Z" fill="#6f95a0" opacity="0.6"/>
  <!-- 夕陽倒影 -->
  <g fill="#ffe3b0" opacity="0.7">
    <path d="M570 264 H626 M560 276 H636 M552 288 H644 M562 300 H634 M572 312 H624 M584 324 H612"/>
  </g>
  <g stroke="#d9eef2" stroke-width="2.4" fill="none" opacity="0.6">
    <path class="scene-wave" d="M40 286 q28 -8 56 0 t56 0 t56 0"${F(1.2)}/>
    <path class="scene-wave" d="M420 306 q30 -8 60 0 t60 0"${F(3.4)}/>
    <path class="scene-wave" d="M150 338 q34 -9 68 0 t68 0 t68 0"${F(5.1)}/>
    <path class="scene-wave" d="M540 362 q36 -10 72 0 t72 0"${F(2.2)}/>
  </g>
  <path d="M0 300 Q120 292 240 300 T480 298 T800 302 V450 H0 Z" fill="#5f96aa" opacity="0.35"/>

  <!-- 帆船 -->
  <g transform="translate(178 236)">
    <path d="M-34 0 H34 L24 14 H-24 Z" fill="#4a3f3a"/>
    <path d="M0 -2 V-64" stroke="#4a3f3a" stroke-width="4"/>
    <path d="M4 -60 L40 -6 L4 -6 Z" fill="#fdf6ec"/>
    <path d="M-2 -54 L-28 -8 L-2 -8 Z" fill="#f4a7bb" opacity="0.9"/>
    <path d="M-24 18 Q0 24 24 18" stroke="#fdf0d4" stroke-width="3" fill="none" opacity="0.6"/>
  </g>

  <!-- 海鷗 -->
  <g stroke="#4a3f3a" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.8">
    <path d="M300 104 q10 -10 20 0 q10 -10 20 0"/>
    <path d="M352 128 q8 -8 16 0 q8 -8 16 0"/>
    <path d="M246 140 q7 -7 14 0 q7 -7 14 0"/>
  </g>

  <!-- 崖＋燈塔 -->
  <path d="M600 450 L620 300 Q660 260 720 270 L800 262 V450 Z" fill="#54625a"/>
  <path d="M620 300 Q660 260 720 270 L800 262 V300 Q720 296 660 320 L640 450 H600 Z" fill="#66756a"/>
  <g stroke="#46534c" stroke-width="2" opacity="0.5" fill="none">
    <path d="M632 334 Q700 320 800 326 M622 372 Q710 356 800 362 M616 412 Q700 398 800 402"/>
  </g>
  <g fill="#7d927f" opacity="0.8">
    <path d="M652 300 Q680 282 716 288 Q700 300 670 306 Z"/>
    <path d="M742 282 Q772 272 800 278 Q780 290 754 292 Z"/>
  </g>
  <!-- 燈塔光暈 -->
  <circle cx="706" cy="100" r="90" fill="#fff3c4" opacity="0.18"/>
  <g transform="translate(706 250)">
    <path d="M-26 0 L-16 -128 H16 L26 0 Z" fill="#fdf6ec"/>
    <path d="M-24 -30 L24 -30 L24 -52 L-24 -52 Z" fill="#d97a78"/>
    <path d="M-21 -82 L21 -82 L22 -104 L-22 -104 Z" fill="#d97a78"/>
    <path d="M-14 -128 H14 L20 -150 H-20 Z" fill="#fdf6ec"/>
    <rect x="-13" y="-150" width="26" height="22" rx="4" fill="#f7dd9a"/>
    <path d="M-18 -150 L0 -166 L18 -150 Z" fill="#7e5257"/>
    <circle cx="0" cy="-140" r="26" fill="#fff3c4" opacity="0.5"/>
    <circle cx="0" cy="-140" r="6" fill="#fffdf8" opacity="0.9"/>
    <path d="M-16 -128 H-24 M16 -128 H24" stroke="#7e5257" stroke-width="2.4"/>
    <path d="M-22 -120 Q-130 -156 -300 -186 L-300 -86 Q-130 -94 -22 -102 Z" fill="#fff6d0" opacity="0.38" class="scene-beam"/>
    <path d="M22 -120 Q130 -156 300 -186 L300 -86 Q130 -94 22 -102 Z" fill="#fff6d0" opacity="0.22"/>
    <rect x="-30" y="-6" width="60" height="10" rx="4" fill="#8a7f70"/>
    <rect x="-20" y="-40" width="10" height="16" rx="3" fill="#7e5257" opacity="0.55"/>
    <rect x="10" y="-64" width="10" height="14" rx="3" fill="#7e5257" opacity="0.45"/>
  </g>

  <!-- 沙灘＋岸邊浪花 -->
  <path d="M0 386 Q140 356 300 380 T620 372 L800 392 V450 H0 Z" fill="url(#scene-sea-sand)"/>
  <path d="M0 386 Q140 356 300 380 T620 372 L800 392" fill="none" stroke="#fff8e6" stroke-width="7" opacity="0.75"/>
  <path d="M0 396 Q140 368 300 390 T620 382 L800 402" fill="none" stroke="#e9f6f8" stroke-width="3" opacity="0.6"/>

  <!-- 木碼頭＋看海的貓 -->
  <g transform="translate(0 400)">
    <path d="M0 0 H190 L212 16 L0 20 Z" fill="#8a6a4c"/>
    <path d="M0 -8 H176 L158 2 H0 Z" fill="#a98460"/>
    <path d="M36 12 V52 M100 16 V58 M164 18 V50" stroke="#6b5138" stroke-width="7"/>
    <path d="M0 22 Q60 32 120 26 T212 20" stroke="#6b5138" stroke-width="3" fill="none" opacity="0.5"/>
    <path d="M0 6 H176" stroke="#c99a63" stroke-width="2" opacity="0.7"/>
  </g>
  ${H({x:128,y:356,scale:.58,fill:`#3d3230`,scarf:`#f4a7bb`,tailUp:!0})}

  <!-- 貝殼海星 -->
  <g fill="#f4a7bb" opacity="0.9">
    <path d="M300 422 q10 -12 20 0 q-10 10 -20 0 Z"/>
    <circle cx="340" cy="434" r="3"/>
  </g>
  <g transform="translate(470 430)" fill="#f09a5c">
    <path d="M0 -14 L5 -4 L16 -4 L7 3 L11 14 L0 7 L-11 14 L-7 3 L-16 -4 L-5 -4 Z"/>
  </g>
  <g fill="#fdf6ec" opacity="0.9">
    <ellipse cx="398" cy="408" rx="9" ry="6" transform="rotate(-16 398 408)"/>
    <ellipse cx="560" cy="418" rx="7" ry="5" transform="rotate(14 560 418)"/>
  </g>

  <!-- 腳印 -->
  ${U(272,428,.9,`#b99b6a`,.8,16)}
  ${U(308,414,.85,`#b99b6a`,.75,2)}
  ${U(344,404,.8,`#b99b6a`,.7,20)}
  ${U(382,412,.75,`#b99b6a`,.65,-6)}`}function $e(){let e=`stars`,t=``,n=M(1201);for(let e=0;e<6;e+=1){let e=j(150+n()*480),r=j(220+n()*120);t+=`
      <g transform="translate(${e} ${r})">
        <g class="scene-float-lantern"${F(n()*8)}>
          <ellipse cx="0" cy="0" rx="22" ry="26" fill="#ffd98a" opacity="0.16"/>
          <rect x="-7" y="-10" width="14" height="20" rx="6" fill="#f7d98a"/>
          <rect x="-4" y="-7" width="8" height="14" rx="4" fill="#fff3c4" opacity="0.9"/>
          <line x1="0" y1="10" x2="0" y2="18" stroke="#e8b64c" stroke-width="1.4" opacity="0.6"/>
        </g>
      </g>`}return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#141d38`],[.5,`#243357`],[1,`#4a5a8c`]])}
    ${N(`scene-${e}-millky`,[[0,`#7d8fc4`,0],[.5,`#c9d4ef`,.35],[1,`#7d8fc4`,0]])}
    ${N(`scene-${e}-hill`,[[0,`#2b3a5e`],[1,`#182138`]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>

  <!-- 銀河 -->
  <g transform="rotate(-16 400 240)">
    <ellipse cx="400" cy="240" rx="520" ry="96" fill="url(#scene-${e}-millky)"/>
    <ellipse cx="400" cy="240" rx="360" ry="46" fill="#c9d4ef" opacity="0.14"/>
    <ellipse cx="400" cy="240" rx="160" ry="22" fill="#e8eefc" opacity="0.12"/>
  </g>
  ${Ve(52,1501,{maxY:300,animated:14})}
  ${Ve(22,1602,{maxY:190,maxRadius:1.3,color:`#c9d4ef`})}

  <!-- 彎月 -->
  <g>
    <circle cx="664" cy="84" r="46" fill="#fdf3d8"/>
    <circle cx="646" cy="70" r="42" fill="#243357"/>
    <circle cx="664" cy="84" r="70" fill="#fdf3d8" opacity="0.08"/>
  </g>

  <!-- 星座連線 -->
  <g class="scene-constellation" stroke="#c9d4ef" stroke-width="1.6" fill="none" opacity="0.7">
    <path d="M120 96 L156 132 L144 176 L186 200 L228 170"/>
    <path d="M186 200 L232 228"/>
  </g>
  <g fill="#fdf6ec">
    <circle cx="120" cy="96" r="2.6"/><circle cx="156" cy="132" r="2.2"/><circle cx="144" cy="176" r="2.6"/>
    <circle cx="186" cy="200" r="3"/><circle cx="228" cy="170" r="2.2"/><circle cx="232" cy="228" r="2"/>
  </g>

  <!-- 流星 -->
  <g class="scene-shooting"${F(2.4)}>
    <path d="M300 70 L368 50" stroke="#fdf6ec" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  </g>
  <g class="scene-shooting"${F(7.6)}>
    <path d="M560 130 L620 114" stroke="#fdf6ec" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
  </g>

  <!-- 山丘與看星的貓 -->
  <path d="M0 366 Q160 318 340 346 Q540 380 800 336 V450 H0 Z" fill="url(#scene-${e}-hill)"/>
  <path d="M0 404 Q220 372 430 396 T800 380 V450 H0 Z" fill="#16203a" opacity="0.85"/>
  <!-- 詩會卷軸架 -->
  <g transform="translate(232 330)">
    <path d="M-4 0 V58 M64 0 V58" stroke="#3d4c72" stroke-width="4"/>
    <rect x="-14" y="-10" width="88" height="9" rx="4.5" fill="#8a7a68"/>
    <rect x="-14" y="42" width="88" height="9" rx="4.5" fill="#8a7a68"/>
    <rect x="-6" y="-2" width="72" height="46" rx="2" fill="#fdf6ec"/>
    <path d="M0 8 H54 M0 16 H42 M0 24 H50 M0 32 H36 M0 40 H46" stroke="#b9a98c" stroke-width="1.5"/>
    <circle cx="52" cy="34" r="6" fill="#e8756b"/>
    <path d="M49 31 l6 6 M55 31 l-6 6" stroke="#fdf6ec" stroke-width="1.2"/>
    <circle cx="-14" cy="-10" r="3" fill="#e8b64c"/>
    <circle cx="74" cy="-10" r="3" fill="#e8b64c"/>
    <circle cx="-14" cy="42" r="3" fill="#e8b64c"/>
    <circle cx="74" cy="42" r="3" fill="#e8b64c"/>
  </g>
  ${H({x:470,y:330,scale:.95,fill:`#141d33`,scarf:`#e07e9c`,tailUp:!0})}
  ${H({x:540,y:344,scale:.8,fill:`#1a2540`,scarf:`#4f7a58`})}
  <!-- 草叢 -->
  <g stroke="#3a4c72" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.9">
    <path d="M340 404 q-6 -16 0 -24 M350 406 q6 -14 12 -18"/>
    <path d="M660 396 q-6 -16 0 -24 M670 398 q6 -14 12 -18"/>
  </g>
  ${t}
  <!-- 螢火蟲 -->
  <g transform="translate(360 300)"><circle r="6" fill="#f7e38a" opacity="0.14"/><circle class="scene-firefly" r="2.2" fill="#f7e38a"${F(1.1)}/></g>
  <g transform="translate(600 250)"><circle r="5" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2" fill="#f7e38a"${F(3.9)}/></g>
  <g transform="translate(200 260)"><circle r="5" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2" fill="#f7e38a"${F(6.2)}/></g>`}function et(){let e=`festival`,t=[[`#f2b45c`,`#ffd98a`],[`#e8756b`,`#ffb4a0`],[`#f7d98a`,`#fff3c4`],[`#ef9fb6`,`#ffc9d8`]],n=``;for(let e=0;e<8;e+=1){let[r,i]=t[e%t.length];n+=V(64+e*96,96+Math.sin(e/7*Math.PI)*34,.62,r,i,e*.7)}let r=``;for(let e=0;e<6;e+=1){let[n,i]=t[(e+2)%t.length];r+=V(150+e*108,188+Math.sin(e/5*Math.PI)*22,.48,n,i,1.4+e*.9)}return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#3a2434`],[.55,`#6e3a45`],[1,`#a85a52`]])}
    ${P(`scene-${e}-horizon`,[[0,`#ffb46b`,.5],[1,`#ffb46b`,0]])}
    ${N(`scene-${e}-ground`,[[0,`#5a3a42`],[1,`#3d2830`]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  <ellipse cx="400" cy="336" rx="420" ry="150" fill="url(#scene-${e}-horizon)"/>
  ${Ve(30,2101,{maxY:200,color:`#ffe8c4`,animated:8,maxRadius:1.5})}

  <!-- 煙花 -->
  ${Ke(650,96,1.05,`#ffd98a`,.8)}
  ${Ke(462,62,.7,`#ffb4a0`,3.6)}
  ${Ke(742,180,.55,`#c9d4ef`,6.2)}

  <!-- 遠景屋頂 -->
  <g fill="#2f2030" opacity="0.9">
    <path d="M-20 340 L80 288 L180 340 Z"/>
    <path d="M620 344 L720 292 L820 344 Z"/>
    <path d="M230 350 L320 306 L410 350 Z"/>
  </g>

  <!-- 燈籠串 -->
  <path d="M-20 88 Q200 160 400 100 Q600 42 820 108" stroke="#3d2830" stroke-width="3" fill="none" opacity="0.8"/>
  <path d="M-20 210 Q220 268 420 222 Q620 178 820 232" stroke="#3d2830" stroke-width="2.4" fill="none" opacity="0.7"/>
  ${n}
  ${r}

  <!-- 中央貓貓大燈籠 -->
  <g transform="translate(400 190)">
    <g class="scene-lantern"${F(2.2)}>
      <line x1="0" y1="-118" x2="0" y2="-68" stroke="#7a4a33" stroke-width="2.6"/>
      <circle cx="0" cy="-120" r="4" fill="none" stroke="#7a4a33" stroke-width="2.4"/>
      <ellipse cx="0" cy="6" rx="74" ry="82" fill="#ffd98a" opacity="0.22"/>
      <path d="M-30 -52 L-56 -90 L-8 -66 Z" fill="#f2b45c"/>
      <path d="M30 -52 L56 -90 L8 -66 Z" fill="#f2b45c"/>
      <path d="M-24 -56 L-44 -82 L-12 -66 Z" fill="#f7d98a"/>
      <path d="M24 -56 L44 -82 L12 -66 Z" fill="#f7d98a"/>
      <ellipse cx="0" cy="0" rx="54" ry="62" fill="#f2b45c"/>
      <ellipse cx="0" cy="0" rx="46" ry="54" fill="#f7d98a"/>
      <rect x="-26" y="-68" width="52" height="9" rx="4" fill="#7a4a33"/>
      <g fill="#7a4a33">
        <ellipse cx="-18" cy="-6" rx="5" ry="7"/>
        <ellipse cx="18" cy="-6" rx="5" ry="7"/>
        <path d="M-6 14 L0 20 L6 14 Z"/>
        <path d="M-12 26 Q0 34 12 26" stroke="#7a4a33" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M-24 2 H-13 M13 2 H24" stroke="#7a4a33" stroke-width="2" opacity="0.6"/>
      </g>
      <path d="M-40 -44 Q-14 -58 0 -60 Q14 -58 40 -44" stroke="#e8a84c" stroke-width="2" fill="none" opacity="0.6"/>
      <g stroke="#e8a84c" stroke-width="1.6" opacity="0.5">
        <path d="M-42 -18 H42 M-46 0 H46 M-42 18 H42"/>
      </g>
      <rect x="-20" y="56" width="40" height="8" rx="3" fill="#7a4a33"/>
      <path d="M0 64 v12" stroke="#7a4a33" stroke-width="2.4"/>
      <circle cx="0" cy="80" r="4" fill="#e8756b"/>
    </g>
  </g>

  <!-- 攤位 -->
  ${qe(158,386,.95,`#8f5a5e`,`#f2b45c`)}
  ${qe(646,390,.95,`#6a5a7e`,`#ef9fb6`)}
  ${qe(404,404,.95,`#7e3b3f`,`#ffd98a`)}

  <!-- 地面 -->
  <path d="M0 402 Q200 380 400 396 T800 386 V450 H0 Z" fill="url(#scene-${e}-ground)"/>
  <g fill="#f2b45c" opacity="0.14">
    <ellipse cx="170" cy="424" rx="70" ry="14"/>
    <ellipse cx="642" cy="430" rx="66" ry="13"/>
    <ellipse cx="404" cy="436" rx="90" ry="16"/>
  </g>
  <g fill="#f7d98a" opacity="0.6">
    <circle cx="280" cy="420" r="2.4"/>
    <circle cx="520" cy="428" r="2"/>
    <circle cx="360" cy="440" r="1.8"/>
    <circle cx="700" cy="416" r="2.2"/>
  </g>
  <!-- 腳印 -->
  ${U(300,428,.9,`#2f2030`,.6,18)}
  ${U(338,412,.85,`#2f2030`,.55,6)}
  ${U(376,400,.8,`#2f2030`,.5,22)}`}function tt(){let e=`rain`,t=``,n=M(2601);for(let e=0;e<20;e+=1){let e=j(n()*820),r=j(n()*380-40),i=j(14+n()*18);t+=`<g transform="translate(${e} ${r})"><line class="scene-raindrop" x1="0" y1="0" x2="-4" y2="${i}" stroke="#eef6f4" stroke-width="1.8" stroke-linecap="round" opacity="${j(.3+n()*.35)}"${F(n()*2)}/></g>`}let r=[[392,314],[330,298],[258,278],[186,259],[114,239],[42,220]],i=``,a=``;for(let[e,t]of r)i+=`<path d="M0 ${e} L330 ${t}" />`,a+=`<path d="M800 ${e} L470 ${t}" />`;let o=``,s=``;for(let e of[70,140,210,280]){let t=j(-30+230*e/330),n=j(450-120*e/330);o+=`<path d="M${e} ${t} L${e} ${n}"/>`}for(let e of[730,660,590,520]){let t=j(-30+230*(800-e)/330),n=j(450-120*(800-e)/330);s+=`<path d="M${e} ${t} L${e} ${n}"/>`}return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#a9bbb7`],[.55,`#cdd9d5`],[1,`#e9f1ee`]])}
    ${N(`scene-${e}-wallL`,[[0,`#7f9187`],[1,`#a9b8ae`]])}
    ${N(`scene-${e}-wallR`,[[0,`#75877d`],[1,`#9fafa5`]])}
    ${N(`scene-${e}-ground`,[[0,`#8b9f96`],[1,`#6d8177`]])}
    ${P(`scene-${e}-lanternGlow`,[[0,`#ffd98a`,.8],[1,`#ffd98a`,0]])}
    ${P(`scene-${e}-windowGlow`,[[0,`#ffe9b0`,.7],[1,`#ffe9b0`,0]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  ${I(160,46,1.2,`#c8d5d1`,.5,`scene-cloud-puff`,2.8)}
  ${I(640,32,1,`#c8d5d1`,.42,`scene-cloud-puff`,6.1)}
  ${I(400,96,.7,`#d5e0dc`,.35,`scene-cloud-puff`,9.4)}

  <!-- 巷尾神社（消失點） -->
  <g>
    <rect x="326" y="140" width="148" height="192" fill="#544f44"/>
    <rect x="340" y="152" width="120" height="180" fill="#625c4e"/>
    <path d="M300 156 L400 108 L500 156 L492 172 L400 132 L308 172 Z" fill="#6b6352"/>
    <path d="M310 152 L400 116 L490 152" fill="none" stroke="#7d7460" stroke-width="3" opacity="0.8"/>
    <rect x="352" y="214" width="96" height="76" rx="3" fill="#f2d590"/>
    <circle cx="400" cy="252" r="86" fill="url(#scene-${e}-windowGlow)" opacity="0.5"/>
    <g stroke="#a98a55" stroke-width="2" opacity="0.75">
      <path d="M352 238 H448 M352 262 H448 M376 214 V290 M400 214 V290 M424 214 V290"/>
    </g>
    <rect x="344" y="290" width="112" height="9" rx="3" fill="#7d7460"/>
    <rect x="352" y="302" width="96" height="8" rx="3" fill="#8d8268"/>
    <rect x="332" y="312" width="136" height="20" rx="3" fill="#6b6352"/>
    <!-- 神社前小燈籠 -->
    <circle cx="338" cy="196" r="36" fill="url(#scene-${e}-lanternGlow)" opacity="0.55"/>
    <circle cx="338" cy="196" r="9" fill="#f2b45c"/>
    <circle cx="462" cy="196" r="36" fill="url(#scene-${e}-lanternGlow)" opacity="0.55"/>
    <circle cx="462" cy="196" r="9" fill="#f2b45c"/>
  </g>

  <!-- 兩側石牆（一點透視） -->
  <path d="M0 -30 L330 200 L330 330 L0 450 Z" fill="url(#scene-${e}-wallL)"/>
  <path d="M800 -30 L470 200 L470 330 L800 450 Z" fill="url(#scene-${e}-wallR)"/>
  <g stroke="#5f7167" stroke-width="2" fill="none" opacity="0.42">
    ${i}
    ${a}
  </g>
  <g stroke="#5f7167" stroke-width="1.6" fill="none" opacity="0.3">
    ${o}
    ${s}
  </g>
  <!-- 牆腳青苔 -->
  <path d="M0 436 Q120 414 246 396 Q300 388 330 340 L330 360 Q296 402 250 414 Q120 436 0 450 Z" fill="#7d927f" opacity="0.5"/>
  <path d="M800 436 Q680 414 554 396 Q500 388 470 340 L470 360 Q504 402 550 414 Q680 436 800 450 Z" fill="#758a78" opacity="0.45"/>

  <!-- 地面（石板路） -->
  <path d="M0 450 L330 330 L470 330 L800 450 Z" fill="url(#scene-${e}-ground)"/>
  <g stroke="#5d7067" stroke-width="1.6" opacity="0.3" fill="none">
    <path d="M80 450 L386 342 M180 450 L392 346 M300 450 L398 352 M500 450 L402 352 M620 450 L408 346 M720 450 L414 342"/>
    <path d="M60 424 Q400 390 740 424" opacity="0.7"/>
    <path d="M150 450 Q400 412 650 450" opacity="0.7"/>
  </g>

  <!-- 水窪＋倒影 -->
  <g>
    <ellipse cx="400" cy="414" rx="126" ry="20" fill="#cdded7" opacity="0.55"/>
    <ellipse cx="400" cy="414" rx="126" ry="20" fill="none" stroke="#e8f2ee" stroke-width="1.4" opacity="0.6"/>
    <ellipse cx="400" cy="410" rx="26" ry="6" fill="#ffe9b0" opacity="0.45"/>
    <ellipse cx="262" cy="438" rx="62" ry="11" fill="#c6d8d1" opacity="0.45"/>
    <ellipse cx="560" cy="436" rx="48" ry="9" fill="#c6d8d1" opacity="0.4"/>
    <ellipse cx="690" cy="430" rx="30" ry="7" fill="#f2d590" opacity="0.3"/>
    <g fill="none" stroke="#eef6f2" stroke-width="1.4">
      <ellipse class="scene-ripple" cx="400" cy="414" rx="20" ry="5"${F(.6)}/>
      <ellipse class="scene-ripple" cx="262" cy="438" rx="13" ry="3.4"${F(2.4)}/>
      <ellipse class="scene-ripple" cx="560" cy="436" rx="11" ry="3"${F(4.1)}/>
    </g>
  </g>

  <!-- 牆邊油紙傘 -->
  <g transform="translate(148 372) rotate(-16)">
    <ellipse cx="0" cy="62" rx="34" ry="7" fill="#5d7067" opacity="0.35"/>
    <path d="M-52 0 Q0 -58 52 0 Q28 9 0 4 Q-28 9 -52 0 Z" fill="#d96f6f"/>
    <path d="M-52 0 Q-28 7 0 4 Q28 7 52 0" fill="none" stroke="#b45555" stroke-width="3"/>
    <path d="M-26 -2 Q-13 4 0 3 Q13 4 26 -2" fill="none" stroke="#f7b7cb" stroke-width="2" opacity="0.7"/>
    <path d="M0 -44 V0" stroke="#8d5a3a" stroke-width="3"/>
    <path d="M0 0 V62 Q0 72 -10 72" fill="none" stroke="#8d5a3a" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- 牆上燈籠 -->
  ${V(690,306,.72,`#f2b45c`,`#ffd98a`,1.6)}
  <circle cx="690" cy="336" r="54" fill="url(#scene-${e}-lanternGlow)" opacity="0.32"/>

  <!-- 盆栽青苔 -->
  <g transform="translate(252 436)">
    <path d="M-17 0 H17 L13 24 H-13 Z" fill="#7d6b56"/>
    <path d="M-8 0 C-14 -22 -2 -34 4 -46 C12 -30 16 -16 8 0 Z" fill="#6f8f68"/>
    <path d="M-2 0 C-6 -14 2 -22 6 -30 C10 -20 10 -10 6 0 Z" fill="#8aa87d"/>
  </g>
  <g stroke="#7f9b8b" stroke-width="2" stroke-linecap="round" opacity="0.75">
    <path d="M282 446 q-4 -10 2 -15 M290 448 q6 -8 10 -10"/>
    <path d="M738 446 q-4 -10 2 -15"/>
  </g>
  <ellipse cx="566" cy="446" rx="28" ry="7" fill="#9fb0a5" opacity="0.7"/>
  <ellipse cx="600" cy="444" rx="16" ry="5" fill="#a9b8ae" opacity="0.7"/>

  <!-- 貓腳印（走向神社） -->
  ${U(352,436,.95,`#55655c`,.45,14)}
  ${U(380,414,.9,`#55655c`,.42,2)}
  ${U(404,394,.85,`#55655c`,.38,16)}
  ${U(424,372,.78,`#55655c`,.34,4)}

  <!-- 霧氣 -->
  <ellipse cx="400" cy="352" rx="300" ry="26" fill="#e9f1ee" opacity="0.3"/>
  <ellipse cx="300" cy="430" rx="220" ry="20" fill="#e9f1ee" opacity="0.22"/>
  ${t}`}function nt(){let e=`cloud`,t=M(3101),n=``;for(let e=0;e<9;e+=1)n+=I(j(-40+e*110+t()*40),j(340+t()*110),j(.9+t()*.8),e%2==0?`#ffffff`:`#e9e2f8`,j(.55+t()*.35),`scene-cloud-puff`,t()*10);return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#cfc6ea`],[.5,`#e6ddf5`],[1,`#f8f2ff`]])}
    ${N(`scene-${e}-tower`,[[0,`#8a7a68`],[1,`#5f5145`]])}
    ${P(`scene-${e}-sun`,[[0,`#fff8e8`,.9],[1,`#fff8e8`,0]])}
    ${P(`scene-${e}-win`,[[0,`#f7dd9a`,.7],[1,`#f7dd9a`,0]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  <circle cx="640" cy="80" r="150" fill="url(#scene-${e}-sun)"/>
  <circle cx="640" cy="80" r="44" fill="#fffdf8" opacity="0.8"/>
  ${Ve(24,3102,{maxY:220,color:`#fffdf8`,animated:6,maxRadius:1.4})}

  <!-- 浮空島（左） -->
  <g transform="translate(150 232)">
    <path d="M-74 0 Q0 -40 74 0 Q54 46 0 60 Q-54 46 -74 0 Z" fill="#b9a8d6"/>
    <path d="M-74 0 Q0 -40 74 0 L60 10 Q0 -24 -60 10 Z" fill="#cfc0e6"/>
    <path d="M-40 -4 L-4 -30 L32 -8 Z" fill="#6f8f7a"/>
    <path d="M-4 -30 V-64" stroke="#7d6b56" stroke-width="5"/>
    <path d="M-4 -58 Q-22 -74 -34 -70 M-4 -62 Q16 -82 34 -74" fill="none" stroke="#7d6b56" stroke-width="3" stroke-linecap="round"/>
    <g fill="#8aa87d">
      <circle cx="-34" cy="-76" r="16"/>
      <circle cx="-16" cy="-86" r="19"/>
      <circle cx="18" cy="-86" r="20"/>
      <circle cx="36" cy="-74" r="15"/>
      <circle cx="2" cy="-98" r="14" fill="#9dbb8e"/>
      <circle cx="-26" cy="-92" r="10" fill="#9dbb8e"/>
    </g>
    <circle cx="8" cy="-96" r="5" fill="#b8d0a6" opacity="0.8"/>
    <circle cx="-30" cy="-4" r="16" fill="#e9e2f8"/>
    <circle cx="20" cy="4" r="12" fill="#efeaf8"/>
  </g>

  <!-- 遠方小浮島 -->
  <g transform="translate(300 132)" opacity="0.7">
    <path d="M-26 0 Q0 -18 26 0 Q16 16 0 20 Q-16 16 -26 0 Z" fill="#c9bce2"/>
    <path d="M0 -2 V-20" stroke="#7d6b56" stroke-width="3"/>
    <circle cx="0" cy="-26" r="9" fill="#8aa87d"/>
  </g>

  <!-- 雲端書樓 -->
  <g transform="translate(556 132)">
    <ellipse cx="0" cy="286" rx="140" ry="34" fill="#b9a8d6" opacity="0.55"/>
    <!-- 基座浮石 -->
    <path d="M-112 240 Q0 206 112 240 Q84 292 0 310 Q-84 292 -112 240 Z" fill="#9d8cbe"/>
    <path d="M-112 240 Q0 206 112 240 L96 250 Q0 220 -96 250 Z" fill="#b9a8d6"/>
    <!-- 一樓 -->
    <rect x="-92" y="168" width="184" height="74" fill="url(#scene-${e}-tower)"/>
    <circle cx="0" cy="206" r="120" fill="url(#scene-${e}-win)" opacity="0.4"/>
    <rect x="-72" y="184" width="56" height="42" rx="3" fill="#f3d78b"/>
    <rect x="16" y="184" width="56" height="42" rx="3" fill="#f3d78b"/>
    <g stroke="#8a6a45" stroke-width="2" opacity="0.8">
      <path d="M-72 205 H-16 M-53 184 V226 M-34 184 V226 M16 205 H72 M35 184 V226 M54 184 V226"/>
    </g>
    <path d="M-108 168 L108 168 L92 148 L-92 148 Z" fill="#6f8f7a"/>
    <path d="M-108 168 L108 168 L104 176 L-104 176 Z" fill="#4f6a5c"/>
    <!-- 二樓 -->
    <rect x="-74" y="92" width="148" height="58" fill="url(#scene-${e}-tower)"/>
    <rect x="-56" y="106" width="42" height="32" rx="3" fill="#f3d78b"/>
    <rect x="14" y="106" width="42" height="32" rx="3" fill="#f3d78b"/>
    <g stroke="#8a6a45" stroke-width="2" opacity="0.8">
      <path d="M-56 122 H-14 M-40 106 V138 M14 122 H56 M30 106 V138"/>
    </g>
    <path d="M-90 92 L90 92 L74 74 L-74 74 Z" fill="#6f8f7a"/>
    <path d="M-90 92 L90 92 L86 100 L-86 100 Z" fill="#4f6a5c"/>
    <!-- 三樓塔尖 -->
    <rect x="-48" y="34" width="96" height="42" fill="url(#scene-${e}-tower)"/>
    <rect x="-30" y="46" width="60" height="22" rx="3" fill="#f3d78b"/>
    <path d="M-66 34 L66 34 L48 16 L-48 16 Z" fill="#6f8f7a"/>
    <path d="M-66 34 L66 34 L62 40 L-62 40 Z" fill="#4f6a5c"/>
    <path d="M0 16 V-14" stroke="#7d6b56" stroke-width="4"/>
    <circle cx="0" cy="-20" r="7" fill="#e8b64c"/>
    <!-- 窗內書架細節 -->
    <g opacity="0.9">
      <rect x="-70" y="192" width="6" height="26" fill="#d97a78"/>
      <rect x="-62" y="196" width="5" height="22" fill="#6f9c76"/>
      <rect x="-55" y="190" width="6" height="28" fill="#8f9fd6"/>
      <rect x="20" y="192" width="6" height="26" fill="#e8b64c"/>
      <rect x="28" y="196" width="5" height="22" fill="#d97a78"/>
    </g>
    <!-- 門前雲梯 -->
    <path d="M-112 246 Q-150 280 -168 330" stroke="#8d7f6a" stroke-width="4" fill="none"/>
    <path d="M-104 238 Q-142 272 -160 322" stroke="#8d7f6a" stroke-width="4" fill="none"/>
    <g stroke="#a89479" stroke-width="2.4">
      <path d="M-116 240 L-108 232 M-124 252 L-116 244 M-132 266 L-124 258 M-140 282 L-132 274 M-148 300 L-140 292"/>
    </g>
  </g>

  <!-- 漂浮書本與紙鶴 -->
  ${W(380,150,.9,-12,1.2,`#d97a78`)}
  ${W(706,300,.75,14,3.5,`#6f9c76`)}
  ${W(300,320,.6,-6,5.8,`#8f9fd6`)}
  ${W(660,90,.55,18,7.4,`#e8b64c`)}
  ${W(240,190,.5,10,2.6,`#e8756b`)}
  ${W(766,236,.45,-16,6.2,`#6f9c76`)}
  ${Ge(430,78,.9,`#f7c1d0`,-6,.8)}
  ${Ge(362,220,.6,`#ffffff`,10,3.3)}
  ${Ge(712,190,.55,`#c9d4ef`,-14,5.6)}
  ${Ge(196,148,.5,`#ffffff`,18,4.4)}

  <!-- 雲海 -->
  ${n}
  <g opacity="0.85">
    <ellipse cx="120" cy="430" rx="180" ry="40" fill="#ffffff" opacity="0.55"/>
    <ellipse cx="680" cy="440" rx="200" ry="44" fill="#ffffff" opacity="0.5"/>
    <ellipse cx="400" cy="464" rx="260" ry="46" fill="#f3edff" opacity="0.7"/>
  </g>
  <!-- 雲上讀成語的小貓 -->
  <g transform="translate(262 402)">
    <ellipse cx="0" cy="10" rx="92" ry="24" fill="#ffffff" opacity="0.9"/>
    <circle cx="-58" cy="-2" r="22" fill="#ffffff" opacity="0.9"/>
    <circle cx="52" cy="-4" r="26" fill="#ffffff" opacity="0.9"/>
  </g>
  ${H({x:226,y:344,scale:.56,fill:`#8a7a68`,scarf:`#6f9c76`})}
  ${W(292,388,.42,8,1.8,`#8f9fd6`)}
  <!-- 遠島 -->
  <g transform="translate(400 350)" opacity="0.7">
    <path d="M-30 0 Q0 -24 30 0 Q14 18 0 22 Q-14 18 -30 0 Z" fill="#b9a8d6"/>
    <path d="M0 -2 V-26" stroke="#7d6b56" stroke-width="3"/>
  </g>`}function rt(){let e=`summit`;return`
  <defs>
    ${N(`scene-${e}-sky`,[[0,`#8fb3de`],[.5,`#d9c8d8`],[1,`#fbe6bd`]])}
    ${P(`scene-${e}-sun`,[[0,`#fff6d8`,.9],[1,`#ffd9a0`,0]])}
    ${N(`scene-${e}-far`,[[0,`#a9c3df`],[1,`#c9d9ea`]])}
    ${N(`scene-${e}-mid`,[[0,`#7f9fbd`],[1,`#a3bcd4`]])}
    ${N(`scene-${e}-near`,[[0,`#5e7e98`],[1,`#46647c`]])}
    ${P(`scene-${e}-pearl`,[[0,`#fff6d8`,.85],[1,`#fff6d8`,0]])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${e}-sky)"/>
  <circle cx="400" cy="238" r="190" fill="url(#scene-${e}-sun)"/>
  <circle cx="400" cy="238" r="62" fill="#fff6d8" opacity="0.95"/>
  <!-- 曙光射線 -->
  <g opacity="0.28" fill="#fff3c4">
    <path d="M400 238 L120 0 L210 0 Z"/>
    <path d="M400 238 L330 0 L390 0 Z"/>
    <path d="M400 238 L470 0 L530 0 Z"/>
    <path d="M400 238 L690 0 L780 0 Z"/>
  </g>

  <!-- 雲海 -->
  ${I(150,320,1.7,`#fdf6ec`,.7,`scene-cloud-puff`,2.2)}
  ${I(600,330,1.5,`#fdf6ec`,.65,`scene-cloud-puff`,5.4)}
  ${I(380,360,1.9,`#fdf6ec`,.6,`scene-cloud-puff`,8.1)}

  <!-- 群山 -->
  <path d="M0 330 L120 200 L210 268 L320 170 L430 300 L540 210 L650 300 L760 224 L800 260 V450 H0 Z" fill="url(#scene-${e}-far)"/>
  <path d="M0 380 L110 284 L210 350 L330 246 L450 368 L570 286 L690 364 L800 300 V450 H0 Z" fill="url(#scene-${e}-mid)"/>
  <path d="M320 170 L366 218 L332 232 L306 208 Z" fill="#f2f7fc"/>
  <path d="M540 210 L578 250 L548 262 L520 246 Z" fill="#f2f7fc"/>

  <!-- 山頂平台 -->
  <path d="M226 450 L292 336 Q400 300 508 336 L574 450 Z" fill="url(#scene-${e}-near)"/>
  <path d="M292 336 Q400 300 508 336 L494 354 Q400 326 306 354 Z" fill="#6f8fa8"/>
  <!-- 石階 -->
  <g fill="#8a9fb2">
    <path d="M356 450 L368 420 H432 L444 450 Z"/>
    <path d="M372 416 L382 392 H418 L428 416 Z"/>
    <path d="M388 388 L396 368 H404 L412 388 Z"/>
  </g>
  <!-- 旗杆與旗 -->
  <g transform="translate(402 304)">
    <ellipse cx="0" cy="6" rx="34" ry="8" fill="#3f5a70" opacity="0.5"/>
    <path d="M0 0 V-126" stroke="#7d6b56" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="-132" r="6" fill="#e8b64c"/>
    <path class="scene-flag" d="M4 -120 Q52 -116 88 -102 Q54 -88 4 -86 Z" fill="#e88aa8"/>
    <circle cx="30" cy="-102" r="9" fill="#fdf6ec" opacity="0.9"/>
    <path d="M26 -102 q4 -5 8 0 q-4 5 -8 0 Z" fill="#e8b64c"/>
  </g>

  <!-- 成語靈珠 -->
  <circle cx="506" cy="150" r="58" fill="url(#scene-${e}-pearl)" opacity="0.85"/>
  <circle cx="506" cy="150" r="22" fill="#fff3c4" opacity="0.3"/>
  <circle cx="506" cy="150" r="10" fill="#fff3c4"/>
  <circle cx="503" cy="147" r="3.4" fill="#fffdf8"/>
  <ellipse cx="506" cy="150" rx="24" ry="8" fill="none" stroke="#e8b64c" stroke-width="1.6" opacity="0.55" transform="rotate(-18 506 150)"/>
  <circle class="scene-sparkle" cx="486" cy="124" r="2.6" fill="#fff6d8"${F(1.4)}/>
  <circle class="scene-sparkle" cx="530" cy="176" r="2.2" fill="#fff6d8"${F(4.2)}/>
  <!-- 成語之巔的貓貓 -->
  ${H({x:458,y:300,scale:1.05,fill:`#2a3448`,scarf:`#6f9c76`,tailUp:!0})}
  ${H({x:330,y:322,scale:.8,fill:`#33405a`,scarf:`#e07e9c`})}
  <!-- 貓腳印石階 -->
  ${U(420,414,.8,`#6f8fa8`,.6,-6)}
  ${U(404,390,.7,`#6f8fa8`,.55,8)}

  <!-- 飄浮光點 -->
  <g fill="#fff6d8">
    <circle class="scene-sparkle" cx="250" cy="300" r="2.6"${F(.8)}/>
    <circle class="scene-sparkle" cx="560" cy="270" r="2.2"${F(2.3)}/>
    <circle class="scene-sparkle" cx="470" cy="240" r="2"${F(3.9)}/>
    <circle class="scene-sparkle" cx="636" cy="190" r="2.4"${F(5.2)}/>
    <circle class="scene-sparkle" cx="196" cy="220" r="1.8"${F(6.6)}/>
  </g>
  <!-- 飛鳥 -->
  <g stroke="#46647c" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.7">
    <path d="M150 150 q9 -9 18 0 q9 -9 18 0"/>
    <path d="M660 120 q7 -7 14 0 q7 -7 14 0"/>
    <path d="M600 160 q6 -6 12 0 q6 -6 12 0"/>
  </g>`}var it={garden:Je,bamboo:Ye,moon:Xe,snow:Ze,sea:Qe,stars:$e,festival:et,rain:tt,cloud:nt,summit:rt};function at(e){let t=Be.includes(e)?e:`garden`,n=it[t];return`<svg class="chapter-scene scene-${t}" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${n()}</svg>`}function G(e){let t=document.createElement(`template`);t.innerHTML=e.trim();let n=t.content.firstElementChild;if(!(n instanceof HTMLElement))throw Error(`fromHtml: 冇有效 element`);return n}function K(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function q(e,t){let n=e.querySelector(t);if(!n)throw Error(`搵唔到 element：${t}`);return n}function ot(e,t){return Array.from(e.querySelectorAll(t))}var st=class{ids=new Set;after(e,t){let n=window.setTimeout(()=>{this.ids.delete(n),t()},e);return this.ids.add(n),n}clear(){for(let e of this.ids)window.clearTimeout(e);this.ids.clear()}};function ct(){try{return typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}catch{return!1}}function lt(e){typeof requestAnimationFrame==`function`?requestAnimationFrame(()=>e()):window.setTimeout(e,0)}function ut(e){return e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/[1-6]/g,``).replace(/\s+/g,``).trim()}function dt(e){return e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/\s+/g,` `).trim()}var ft=`xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"`;function J(e,t=``){return`<svg ${ft}${t?` class="${t}"`:``}>${e}</svg>`}function pt(e,t=``){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"${t?` class="${t}"`:``}>${e}</svg>`}var Y={back:J(`<path d="M15 5l-7 7 7 7"/>`),forward:J(`<path d="M9 5l7 7-7 7"/>`),up:J(`<path d="M12 19V5M5 12l7-7 7 7"/>`),close:J(`<path d="M6 6l12 12M18 6L6 18"/>`),check:J(`<path d="M4.5 12.5l5 5L19.5 6.5"/>`),hint:J(`<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2h5c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/>`),restart:J(`<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>`),soundOn:J(`<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>`),soundOff:J(`<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M16 9l5 6M21 9l-5 6"/>`),map:J(`<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>`),book:J(`<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>`),settings:J(`<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z"/>`),lock:J(`<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>`),search:J(`<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>`),paw:pt(`<path d="M8.2 4.1c1.2 0 2.1 1.4 2.1 3.1S9.4 10.3 8.2 10.3 6.1 8.9 6.1 7.2s.9-3.1 2.1-3.1zm7.6 0c1.2 0 2.1 1.4 2.1 3.1s-.9 3.1-2.1 3.1-2.1-1.4-2.1-3.1.9-3.1 2.1-3.1zM4.3 9.6c1.1 0 1.9 1.2 1.9 2.7s-.8 2.7-1.9 2.7-1.9-1.2-1.9-2.7.8-2.7 1.9-2.7zm15.4 0c1.1 0 1.9 1.2 1.9 2.7s-.8 2.7-1.9 2.7-1.9-1.2-1.9-2.7.8-2.7 1.9-2.7zM12 11.2c3 0 5.5 2.2 5.5 4.4 0 1.5-1.1 2.4-2.7 2.4-1 0-1.9-.4-2.8-.4s-1.8.4-2.8.4c-1.6 0-2.7-.9-2.7-2.4 0-2.2 2.5-4.4 5.5-4.4z"/>`),star:pt(`<path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z"/>`),sparkle:pt(`<path d="M12 2l1.8 5.4L19 9.2l-5.2 1.8L12 16.4l-1.8-5.4L5 9.2l5.2-1.8zM19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6L15.5 18.5l2.6-.9z"/>`),bookOpen:J(`<path d="M12 5.5C10.5 4 8.5 3.5 6 3.5H3v14h3c2.5 0 4.5.5 6 2 1.5-1.5 3.5-2 6-2h3v-14h-3c-2.5 0-4.5.5-6 2z"/><path d="M12 5.5v14"/>`),trash:J(`<path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>`),motion:J(`<path d="M3 8h9M3 12h12M3 16h7"/><path d="M17 7l4 5-4 5"/>`),trophy:J(`<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3"/><path d="M12 13v4M9 21h6M10 17h4l.5 4h-5z"/>`),heart:pt(`<path d="M12 21s-7.5-4.7-9.4-9A5.2 5.2 0 0 1 12 6.6 5.2 5.2 0 0 1 21.4 12C19.5 16.3 12 21 12 21z"/>`)};function mt(e){return e.save.settings.reducedMotion||ct()}function ht(e){let t=mt(e);return document.documentElement.classList.toggle(`reduced-motion`,t),t}function gt(e,t){ie(e.save,{sound:t}),e.audio.setEnabled(t)}function _t(e){let t=!e.save.settings.sound;return gt(e,t),t}function vt(e,t){return ie(e.save,{reducedMotion:t}),ht(e)}function X(e,t){try{e.audio.play(t)}catch{}}function yt(e){return mt(e)?`auto`:`smooth`}function bt(e,t=``){let n=Math.max(0,Math.min(1,Number.isFinite(e.value)?e.value:0)),r=Math.round(n*1e3)/10,i=e.ariaLabel??`進度 ${Math.round(r)}%`;return`
    <div class="progress${e.jade?` progress--jade`:``}${t?` ${t}`:``}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(r)}" aria-label="${i}">
      <div class="progress__fill" style="width: ${r}%"></div>
    </div>
  `}var xt=[`今日都一齊嚟收集成語靈珠喵～`,`阿墨話，識多啲成語就會變聰明啲喵！`,`準備好未？我哋出發去櫻花小徑啦喵～`];function St(e){let t=e.levels.length,n=ee(e.save),r=te(e.save),i=g(e.save,t),a=t>0?n/(t*3):0,o=r>0,s=xt[Math.floor(Math.random()*xt.length)],c=G(`
    <main class="screen home" data-testid="home-screen">
      <div class="home__layout">
        <section class="home__hero" aria-label="店長貓阿墨同小貓糰子喺櫻花庭園等你">
          <div class="home__hero-art" aria-hidden="true">
            <div class="home__scene">${at(`garden`)}</div>
            <span class="home__paw-trail"><span></span><span></span><span></span></span>
          </div>
          <p class="home__bubble">${s}</p>
          <div class="home__cats">
            <div class="home__cat home__cat--amo">${k(`amo`,`happy`,{className:`cat-hero-amo`})}</div>
            <div class="home__cat home__cat--dango">${k(`dango`,`wink`,{className:`cat-hero-dango`})}</div>
          </div>
        </section>
        <section class="home__panel">
          <div>
            <p class="kicker kicker--pink">${Y.paw} 喵～歡迎嚟到</p>
            <h1 class="home__title">貓咪成語<span class="home__title-accent">大冒險</span></h1>
            <p class="home__tagline">跟住店長貓阿墨同小貓糰子，喺十個和風庭園收集成語靈珠，一齊挑戰一百關喵。</p>
          </div>
          <div class="home__progress card card--paper" data-testid="home-progress">
            <div class="home__progress-head">
              <span class="home__progress-title">${Y.star} 冒險進度</span>
              <span class="badge badge--gold">已過 ${r} / ${t} 關</span>
            </div>
            ${bt({value:a,ariaLabel:`總星數進度 ${n} / ${t*3}`})}
            <div class="home__progress-stats">
              <span>總星數 <strong>${n}</strong> / ${t*3}</span>
              <span>下一站 <strong>第 ${i} 關</strong></span>
            </div>
          </div>
          <div class="home__actions">
            <button type="button" class="btn btn--pink btn--lg" data-testid="home-continue">
              ${Y.paw}<span>${o?`繼續第 ${i} 關`:`開始第 1 關`}</span>
            </button>
            <button type="button" class="btn btn--ghost btn--lg" data-testid="home-start">
              ${Y.map}<span>開始冒險</span>
            </button>
            <div class="home__links">
              <button type="button" class="btn btn--soft" data-testid="home-codex">
                ${Y.book}<span>成語圖鑑</span>
              </button>
              <button type="button" class="btn btn--soft" data-testid="home-settings">
                ${Y.settings}<span>設定</span>
              </button>
            </div>
          </div>
          <p class="home__credit">v1.0.1 · 貓貓製作 · 100% 離線可玩</p>
        </section>
      </div>
    </main>
  `),l=t=>{X(e,`click`),x(t)};q(c,`[data-testid="home-continue"]`).addEventListener(`click`,()=>{l(le(i))}),q(c,`[data-testid="home-start"]`).addEventListener(`click`,()=>{l(v)}),q(c,`[data-testid="home-codex"]`).addEventListener(`click`,()=>{l(se)}),q(c,`[data-testid="home-settings"]`).addEventListener(`click`,()=>{l(ce)});let u=q(c,`.home__hero`);return mt(e)||Re(u,12),{el:c,destroy(){}}}function Ct(e,t=!1){let n=Math.max(0,Math.min(3,Math.round(e))),r=``;for(let e=0;e<3;e+=1)r+=`<span class="result__star${e<n?``:` result__star--off`}" aria-hidden="true">★</span>`;return`<div class="result__stars${t?` is-instant`:``}" data-testid="result-stars" data-stars="${n}" role="img" aria-label="獲得 ${n} 星，滿分 3 星">${r}</div>`}function wt(e,t=3){let n=Math.max(0,Math.min(t,Math.round(e)));return`${`★`.repeat(n)}${`☆`.repeat(t-n)}`}var Tt=null,Et=3,Dt=new Set,Ot={info:`🐾`,success:`✓`,warn:`！`,gold:`★`};function kt(e){Tt=e}function At(){if(Tt){for(let e of Dt)window.clearTimeout(e);Dt.clear(),Tt.replaceChildren()}}function Z(e,t={}){let n=Tt;if(!n)return;let r=t.tone??`info`,i=document.createElement(`div`);i.className=`toast toast--${r}`,i.setAttribute(`role`,`status`);let a=document.createElement(`span`);a.className=`toast__icon`,a.setAttribute(`aria-hidden`,`true`),a.textContent=Ot[r];let o=document.createElement(`span`);for(o.textContent=e,i.append(a,o),n.append(i);n.childElementCount>Et;)n.firstElementChild?.remove();let s=t.duration??2600,c=window.setTimeout(()=>{Dt.delete(c),i.classList.add(`is-leaving`);let e=window.setTimeout(()=>{Dt.delete(e),i.remove()},260);Dt.add(e)},s);Dt.add(c)}function jt(e){let t=new Map;for(let n of e.chapters)t.set(n.id,[]);for(let n of e.levels){let e=t.get(n.chapter);e&&e.push(n)}for(let e of t.values())e.sort((e,t)=>e.id-t.id);return t}function Mt(e){for(let t of e.levels)if(h(e.save,t.id)&&!m(e.save,t.id))return t.id;return e.levels.length>0?e.levels[e.levels.length-1].id:1}function Nt(e,t){let n=0;for(let r of e)n+=m(t.save,r.id)?.stars??0;return n}function Pt(e,t,n){let r=m(n.save,e.id),i=h(n.save,e.id),a=(r?.stars??0)>0,o=e.id===t&&!a,s=[`level-btn`];a?s.push(`level-btn--cleared`):o?s.push(`level-btn--current`):i||s.push(`level-btn--locked`);let c=a?`已過關，獲得 ${r?.stars??0} 星`:o?`當前關卡`:i?`已解鎖`:`未解鎖`;return`
    <button type="button" class="${s.join(` `)}" data-testid="level-btn-${e.id}" data-level-id="${e.id}" aria-label="第 ${e.id} 關 ${K(e.title)}，${c}">
      <span class="level-btn__num">${e.id}</span>
      ${a?`<span class="level-btn__stars" aria-hidden="true">${wt(r?.stars??0)}</span>`:o?`<span class="level-btn__paw" aria-hidden="true">${Y.paw}</span>`:`<span class="level-btn__lock" aria-hidden="true">${Y.lock}</span>`}
    </button>
  `}function Ft(e,t,n,r){let i=t.some(e=>h(r.save,e.id)),a=t.filter(e=>(m(r.save,e.id)?.stars??0)>0).length,o=Nt(t,r),s=t.length*3;return`
    <section class="chapter card${i?``:` chapter--locked`}" data-testid="chapter-${e.id}" data-chapter-id="${e.id}">
      <div class="chapter__scene">
        ${at(e.scene)}
        <span class="chapter__scene-badge">第 ${e.id} 章</span>
        ${i?`<span class="chapter__scene-stars" aria-label="章節星數 ${o} / ${s}">★ ${o} / ${s}</span>`:`<span class="chapter__badge-lock" aria-hidden="true">${Y.lock}</span>`}
      </div>
      <div class="chapter__body">
        <div class="chapter__head">
          <h2 class="chapter__name">${K(e.name)}</h2>
          <span class="chapter__meta">已過 ${a} / ${t.length} 關</span>
        </div>
        <p class="chapter__blurb">${K(e.blurb)}</p>
        <div class="chapter__levels">
          ${t.map(e=>Pt(e,n,r)).join(``)}
        </div>
      </div>
    </section>
  `}function It(e){let t=jt(e),n=Mt(e),r=[...e.chapters].sort((e,t)=>e.id-t.id),i=ee(e.save),a=e.levels.length*3,o=e.levels.find(e=>e.id===n)?.chapter??r[0]?.id,s=G(`
    <main class="screen map" data-testid="map-screen">
      <header class="topbar">
        <button type="button" class="icon-btn" data-testid="map-back" aria-label="返回首頁">
          ${Y.back}
        </button>
        <h1 class="topbar__title">成語地圖</h1>
        <div class="topbar__side">
          <span class="badge badge--gold" data-testid="map-stars-total" aria-label="總星數 ${i} / ${a}">
            ★ ${i} / ${a}
          </span>
        </div>
      </header>
      <div class="map__intro">
        <p>十個和風場景、${e.levels.length} 個關卡，等住你同貓貓一齊探索喵～</p>
      </div>
      <div class="map__list">
        ${r.map(r=>Ft(r,t.get(r.id)??[],n,e)).join(``)}
      </div>
    </main>
  `);q(s,`[data-testid="map-back"]`).addEventListener(`click`,()=>{X(e,`click`),x(_)}),s.addEventListener(`click`,t=>{let n=t.target.closest(`[data-level-id]`);if(!n)return;let r=Number(n.dataset.levelId);Number.isInteger(r)&&(h(e.save,r)?(X(e,`click`),x(le(r))):(X(e,`click`),Z(`呢關仲未解鎖喎，完成前一關先啦喵～`,{tone:`warn`})))});let c=s;return requestAnimationFrame(()=>{c.querySelector(`[data-testid="chapter-${o}"]`)?.scrollIntoView({block:`center`,behavior:yt(e)})}),{el:s,destroy(){}}}var Q=(e,t)=>`${e}:${t}`;function Lt(e){let t=[];for(let n=0;n<4;n+=1)t.push(e.dir===`h`?Q(e.row,e.col+n):Q(e.row+n,e.col));return t}function Rt(e){let t=Lt(e);return e.blanks.map(e=>t[e])}function zt(e){let t=new Map;for(let n of e.cells)t.set(Q(n.r,n.c),n.char);return t}function Bt(e){let t=new Set;for(let n of e.slots)for(let e of Rt(n))t.add(e);return t}function Vt(e,t){return t.every(t=>(e.cells[t]?.char??``)!==``)}function Ht(e,t){let n=zt(e.level);return Lt(t).every(t=>e.cells[t]?.char===n.get(t))}function Ut(e,t){e.solved||e.words.every(e=>e.locked)&&(e.solved=!0,e.stars=Xt(e.mistakes,e.hintsUsed),t.push({type:`solved`,stars:e.stars}))}function Wt(e,t,n){let r=[];for(let n=0;n<e.words.length;n+=1){let i=e.words[n];i.locked||i.cells.some(e=>t.has(e))&&Vt(e,i.cells)&&r.push({index:n,word:i,correct:Ht(e,i.slot)})}for(let t of r)if(t.correct){for(let n of t.word.cells){let t=e.cells[n];t&&(t.locked=!0)}t.word.locked=!0,n.push({type:`word-correct`,slotIndex:t.index,idiomId:t.word.slot.idiomId,cells:[...t.word.cells]})}for(let t of r){if(t.correct)continue;e.mistakes+=1;let r=[];for(let n of t.word.cells){let t=e.cells[n];t&&t.source!==`given`&&!t.locked&&t.char!==``&&(t.char=``,t.source=`word`,delete t.bankIndex,r.push(n))}n.push({type:`word-wrong`,slotIndex:t.index,idiomId:t.word.slot.idiomId,cells:r,mistakes:e.mistakes})}Ut(e,n)}function Gt(e){let t=zt(e),n=Bt(e),r={};for(let i of e.cells){let e=Q(i.r,i.c);r[e]=n.has(e)?{char:``,locked:!1,source:`word`}:{char:t.get(e)??``,locked:!0,source:`given`}}return{level:e,cells:r,words:e.slots.map((e,t)=>({slotIndex:t,slot:e,cells:Lt(e),locked:e.blanks.length===0})),mistakes:0,hintsUsed:0,solved:!1,stars:0}}function Kt(e,t,n,r){let i=[];if(e.solved)return i;let a=e.cells[t];return!a||a.locked||a.char!==``||(a.char=n,a.source=`word`,a.bankIndex=r,i.push({type:`place`,key:t,char:n}),Wt(e,new Set([t]),i)),i}function qt(e,t){if(e.solved)return null;let n=e.cells[t];if(!n||n.locked||n.char===``)return null;let r=n.bankIndex??null;return n.char=``,n.source=`word`,delete n.bankIndex,r}function Jt(e){if(e.solved)return null;let t=[...Bt(e.level)].filter(t=>{let n=e.cells[t];return!!n&&!n.locked});if(t.length===0)return null;let n=t.filter(t=>e.cells[t].char===``);if(n.length===0)return null;let r=n[Math.floor(Math.random()*n.length)],i=zt(e.level).get(r)??``;if(!i)return null;let a=e.cells[r];a.char=i,a.locked=!0,a.source=`hint`,e.hintsUsed+=1;let o=Yt(e,r);o>=0&&(a.bankIndex=o);let s=[{type:`hint`,key:r,char:i}];return Wt(e,new Set([r]),s),{key:r,char:i,bankIndex:o,events:s}}function Yt(e,t){let n=zt(e.level).get(t)??``,r=new Set;for(let t of Object.values(e.cells))t.bankIndex!==void 0&&r.add(t.bankIndex);for(let t=0;t<e.level.bank.length;t+=1)if(e.level.bank[t]===n&&!r.has(t))return t;return-1}function Xt(e,t){return Math.max(1,3-(+(e>0)+ +(t>0)))}function Zt(e,t){let n=new Set,r=[],i=new Set,a=document.createElement(`div`);a.className=`bank`;let o=document.createElement(`div`);o.className=`bank__head`,o.innerHTML=`
    <span class="bank__title">${Y.paw} 字庫</span>
    <span class="bank__hint">點字卡放入選中嘅空格</span>
  `,a.append(o);let s=document.createElement(`div`);return s.className=`bank__grid`,a.append(s),e.bank.forEach((e,a)=>{let o=document.createElement(`button`);o.type=`button`,o.className=`bank-card`,o.dataset.testid=`bank-${a}`,o.dataset.index=String(a),o.textContent=e,o.setAttribute(`aria-label`,`字卡「${e}」`),o.addEventListener(`click`,()=>{if(n.has(a)){o.classList.remove(`bank-card--nudge`),o.offsetWidth,o.classList.add(`bank-card--nudge`);let e=window.setTimeout(()=>{o.classList.remove(`bank-card--nudge`),i.delete(e)},380);i.add(e)}else t(a)}),s.append(o),r.push(o)}),{el:a,sync(t){n.clear();for(let e of t)n.add(e);r.forEach((t,r)=>{let i=n.has(r);t.classList.toggle(`is-used`,i),t.setAttribute(`aria-label`,`字卡「${K(e.bank[r])}」${i?`（已使用）`:``}`)})},destroy(){for(let e of i)window.clearTimeout(e);i.clear()}}}function Qt(e,t){let n=new st,r=new Map,i=new Map;for(let t of e.cells)i.set(Q(t.r,t.c),t.char);let a=new Set,o=new Set;for(let t of e.slots)for(let e of Lt(t))o.has(e)?a.add(e):o.add(e);let s=document.createElement(`div`);e.mode===`chain`?s.className=`chain-board`:(s.className=`board`,s.style.setProperty(`--rows`,String(Math.max(1,e.rows))),s.style.setProperty(`--cols`,String(Math.max(1,e.cols)))),s.setAttribute(`role`,`group`),s.setAttribute(`aria-label`,e.mode===`chain`?`成語接龍棋盤`:`成語填字棋盤`);function c(e,n){let a=Q(e,n),o=i.get(a);if(o===void 0)return null;let s=document.createElement(`button`);s.type=`button`,s.className=`cell cell--blank`,s.dataset.key=a,s.dataset.testid=`cell-${e}-${n}`,s.setAttribute(`aria-label`,`第 ${e+1} 行第 ${n+1} 格`);let c=document.createElement(`span`);c.className=`cell-char`,c.setAttribute(`aria-hidden`,`true`),c.textContent=o;let l=document.createElement(`span`);return l.className=`cell-paw`,l.setAttribute(`aria-hidden`,`true`),s.append(c,l),s.addEventListener(`click`,()=>t(a)),r.set(a,{button:s,char:c}),s}if(e.mode===`chain`){let t=[...e.slots].sort((e,t)=>e.row-t.row);t.forEach((e,n)=>{let r=document.createElement(`div`);r.className=`chain-row`;for(let i=0;i<4;i+=1){let a=c(e.dir===`h`?e.row:e.row+i,e.dir===`h`?e.col+i:e.col);if(!a)continue;let o=i===0&&n>0,s=i===3&&n<t.length-1;(o||s)&&a.classList.add(`cell--chain-shared`),r.append(a)}if(s.append(r),n<t.length-1){let r=t[n+1],a=(r.dir,Q(r.row,r.col)),o=e.dir===`h`?Q(e.row,e.col+3):Q(e.row+3,e.col),c=i.get(a)??i.get(o)??``,l=document.createElement(`div`);l.className=`chain-join`,l.setAttribute(`aria-hidden`,`true`),l.innerHTML=`<span class="chain-join__line"></span><span class="chain-join__arrow">↓</span><span class="chain-join__char">${K(c)}</span><span class="chain-join__line"></span>`,s.append(l)}})}else for(let t=0;t<e.rows;t+=1)for(let n=0;n<e.cols;n+=1){let e=c(t,n);e&&(e.style.gridRow=String(t+1),e.style.gridColumn=String(n+1),a.has(Q(t,n))&&e.classList.add(`cell--junction`),s.append(e))}let l=0,u=0,d=null;function f(){let t=s.closest(`.board-panel`)??s.parentElement;if(!t)return;let n=getComputedStyle(t),r=t.clientWidth-(parseFloat(n.paddingLeft)||0)-(parseFloat(n.paddingRight)||0);if(r<=0)return;let i=e.mode===`chain`?4:Math.max(1,e.cols),a=getComputedStyle(s),o=parseFloat(a.columnGap||a.gap)||6;if(u<=0){let e=s.querySelector(`.cell`),t=e&&parseFloat(getComputedStyle(e).width)||0;u=t>0?Math.min(t,82):66}let c=u,d=Math.floor((r-o*(i-1))/i),f=Math.max(30,Math.min(c,d));if(window.innerWidth>=900){let t=e.mode===`chain`?Math.max(1,e.slots.length):Math.max(1,e.rows),n=document.querySelector(`.game__hud`),r=document.querySelector(`.game__bank-zone`),i=(n?.offsetHeight??66)+(r?.offsetHeight??150)+96,a=Math.floor((window.innerHeight-i-o*(t-1))/t);a>0&&(f=Math.max(30,Math.min(f,a)))}f!==l&&(l=f,s.style.setProperty(`--cell`,`${f}px`))}function p(){requestAnimationFrame(()=>{f(),requestAnimationFrame(f)})}typeof ResizeObserver<`u`&&(d=new ResizeObserver(()=>f()),d.observe(s));let m=()=>f();window.addEventListener(`resize`,m),p();function h(e,t){let n=new Set;for(let t of e.words)if(t.locked)for(let e of t.cells)n.add(e);for(let[i,a]of r){let r=e.cells[i];if(!r)continue;let{button:o,char:s}=a,[c,l]=i.split(`:`).map(Number);o.classList.toggle(`cell--given`,r.source===`given`),o.classList.toggle(`cell--blank`,r.char===``&&!r.locked),o.classList.toggle(`cell--filled`,r.char!==``&&r.source===`word`),o.classList.toggle(`cell--hint`,r.source===`hint`),o.classList.toggle(`cell--locked`,r.locked),o.classList.toggle(`cell--word-locked`,n.has(i)),o.classList.toggle(`cell--selected`,t===i),o.setAttribute(`aria-label`,`第 ${c+1} 行第 ${l+1} 格：${r.char||`空格`}${r.locked?`（已鎖定）`:``}`),s.textContent!==r.char&&(s.textContent=r.char)}}function g(e,t,i){for(let n of e){let e=r.get(n);e&&(e.button.classList.remove(t),e.button.offsetWidth,e.button.classList.add(t))}n.after(i,()=>{for(let n of e)r.get(n)?.button.classList.remove(t)})}return{el:s,fit(){f()},render:h,shake(e){g(e,`cell--shake`,520)},flash(e){g(e,`cell--flash`,640)},destroy(){n.clear(),d?.disconnect(),d=null,window.removeEventListener(`resize`,m)}}}var $t={amo:`阿墨`,dango:`糰子`};function en(e){let t=e.mood??`idle`,n=e.name??$t[e.character],r=[`cat-bubble`];return e.side===`right`&&r.push(`cat-bubble--right`),e.small&&r.push(`cat-bubble--sm`),e.extraClass&&r.push(e.extraClass),`
    <div class="${r.join(` `)}"${e.testId?` data-testid="${K(e.testId)}"`:``}>
      <div class="cat-bubble__cat" aria-hidden="true">
        ${k(e.character,t,{className:`cat-bubble-cat cat-${e.character}`})}
      </div>
      <div class="cat-bubble__body">
        <span class="cat-bubble__name">${K(n)}</span>
        <p class="cat-bubble__text">${K(e.text)}</p>
      </div>
    </div>
  `}var tn=`button:not([disabled]):not([aria-disabled="true"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`,nn=null,$=[],rn=!1;function an(e){nn=e}function on(){if(nn)return nn;let e=document.getElementById(`overlay-root`);if(e)return nn=e,e;let t=document.createElement(`div`);return t.id=`overlay-root`,t.className=`overlay-root`,document.body.append(t),nn=t,t}function sn(){document.documentElement.classList.toggle(`overlay-open`,$.length>0)}function cn(e){return e.querySelector(`[data-autofocus]`)||e.querySelector(tn)}function ln(e,t){let n=ot(t,tn).filter(e=>e.offsetParent!==null||e===document.activeElement);if(n.length===0){e.preventDefault(),t.focus();return}let r=n[0],i=n[n.length-1],a=document.activeElement;t.contains(a)?e.shiftKey&&a===r?(e.preventDefault(),i.focus()):!e.shiftKey&&a===i&&(e.preventDefault(),r.focus()):(e.preventDefault(),r.focus())}function un(e){if(e.closed)return;e.closed=!0,e.root.remove();let t=$.indexOf(e);t>=0&&$.splice(t,1),sn(),$.length===0&&mn(),e.options.onClose?.();let n=e.previousFocus;n instanceof HTMLElement&&n.isConnected&&n.focus({preventScroll:!0})}function dn(){return $[$.length-1]}function fn(e){let t=dn();t&&(e.key===`Escape`?t.options.dismissible!==!1&&(e.preventDefault(),e.stopPropagation(),un(t)):e.key===`Tab`&&ln(e,t.panel))}function pn(){rn||=(document.addEventListener(`keydown`,fn,!0),!0)}function mn(){rn&&=(document.removeEventListener(`keydown`,fn,!0),!1)}function hn(e){let t=on(),n=document.createElement(`div`);n.className=`overlay${e.className?` ${e.className}`:``}`,e.testId&&(n.dataset.testid=e.testId),n.setAttribute(`role`,`dialog`),n.setAttribute(`aria-modal`,`true`),n.setAttribute(`aria-label`,e.ariaLabel);let r=document.createElement(`div`);r.className=`overlay__backdrop`,r.setAttribute(`aria-hidden`,`true`);let i=document.createElement(`div`);if(i.className=`overlay__panel${e.wide?` overlay__panel--wide`:``}${e.flush?` overlay__panel--flush`:``}`,i.tabIndex=-1,i.innerHTML=e.content,n.append(r,i),t.append(n),e.closeButton){let e=document.createElement(`button`);e.type=`button`,e.className=`icon-btn icon-btn--plain overlay__close`,e.setAttribute(`aria-label`,`關閉`),e.innerHTML=Y.close,e.addEventListener(`click`,()=>o.close()),i.append(e)}let a={root:n,panel:i,options:e,previousFocus:document.activeElement,closed:!1};$.push(a),sn(),pn(),e.dismissible&&r.addEventListener(`click`,()=>un(a)),lt(()=>{if(a.closed)return;let e=cn(i);e?e.focus({preventScroll:!0}):i.focus({preventScroll:!0})});let o={el:n,panel:i,close:()=>un(a),isOpen:()=>!a.closed};return o}function gn(){for(let e of[...$].reverse())un(e)}function _n(){return $.length>0}function vn(e){let t=e.cancelLabel??`取消`,n=e.confirmLabel??`確認`,r=e.confirmTestId?` data-testid="${K(e.confirmTestId)}"`:``,i=e.cancelTestId?` data-testid="${K(e.cancelTestId)}"`:``,a=e.confirmFirst?` data-autofocus`:``,o=e.confirmFirst?``:` data-autofocus`,s=hn({ariaLabel:e.title,dismissible:!0,content:`
      <div class="confirm">
        <span class="confirm__icon" aria-hidden="true">${Y.trash}</span>
        <h2 class="confirm__title">${K(e.title)}</h2>
        <p class="confirm__message">${K(e.message)}</p>
        <div class="confirm__actions">
          <button type="button" class="btn btn--ghost" data-cancel${i}${o}>${K(t)}</button>
          <button type="button" class="btn ${e.danger===!1?`btn--primary`:`btn--danger`}" data-confirm${r}${a}>${K(n)}</button>
        </div>
      </div>
    `});return s.el.querySelector(`[data-cancel]`)?.addEventListener(`click`,()=>s.close()),s.el.querySelector(`[data-confirm]`)?.addEventListener(`click`,()=>{s.close(),e.onConfirm()}),s}function yn(e,t,n,r){let i=hn({testId:`chapter-intro`,ariaLabel:`第 ${t.id} 章：${t.name}`,dismissible:!1,flush:!0,content:`
      <div class="chapter-intro">
        <div class="chapter-intro__scene">
          ${at(t.scene)}
          <span class="chapter-intro__badge">第 ${t.id} 章</span>
        </div>
        <div class="chapter-intro__body">
          <h2 class="chapter-intro__name">${K(t.name)}</h2>
          <p class="chapter-intro__blurb">${K(t.blurb)}</p>
          <div class="chapter-intro__story">
            <div class="chapter-intro__story-cat" aria-hidden="true">
              ${k(`dango`,`think`,{size:54})}
            </div>
            <p>${K(n.story)}</p>
          </div>
          <button type="button" class="btn btn--primary btn--lg btn--wide" data-testid="chapter-intro-ok">
            ${Y.paw} 出發去第 ${n.id} 關！
          </button>
        </div>
      </div>
    `});return i.el.querySelector(`[data-testid="chapter-intro-ok"]`)?.addEventListener(`click`,()=>{X(e,`click`),i.close(),r()}),i}function bn(e){let t=e.cantonese??``;return typeof t==`string`?t.trim():``}function xn(e,t={}){let n=[`idiom-card`];t.compact&&n.push(`idiom-card--compact`),t.extraClass&&n.push(t.extraClass);let r=[];e.origin&&r.push(`<div><dt>出處</dt><dd>${K(e.origin)}</dd></div>`),e.sourceBook&&r.push(`<div><dt>典籍</dt><dd>${K(e.sourceBook)}</dd></div>`),e.example&&r.push(`<div><dt>例句</dt><dd>${K(e.example)}</dd></div>`);let i=e.tags&&e.tags.length>0?`<div class="idiom-card__tags">${e.tags.map(e=>`<span class="idiom-card__tag">${K(e)}</span>`).join(``)}</div>`:``,a=t.isNew?`<span class="idiom-card__collected">新收集</span>`:t.collected?`<span class="idiom-card__collected">${Y.check} 已收集</span>`:``,o=bn(e),s=`
    <div class="idiom-card__pron">
      <p class="idiom-card__pinyin" aria-label="普通話拼音：${K(e.pinyin)}">
        <span class="pron-badge" aria-hidden="true">普</span><span class="pron-text">${K(e.pinyin)}</span>
      </p>
      ${o?`<p class="idiom-card__pinyin idiom-card__pinyin--jyut" data-testid="result-idiom-jyutping-${e.id}" aria-label="粵拼：${K(o)}">
        <span class="pron-badge pron-badge--jyut" aria-hidden="true">粵</span><span class="pron-text">${K(o)}</span>
      </p>`:``}
    </div>
  `;return`
    <article class="${n.join(` `)}"${t.testId?` data-testid="${K(t.testId)}"`:``}>
      ${a}
      <h3 class="idiom-card__word">${K(e.word)}</h3>
      ${s}
      <p class="idiom-card__meaning">${K(e.meaning)}</p>
      ${r.length>0?`<dl class="idiom-card__meta">${r.join(``)}</dl>`:``}
      ${i}
    </article>
  `}function Sn(e,t,n,r){let i=mt(e),a=e.levels.find(e=>e.id===t.id+1),o=t.slots.map(t=>e.idioms.find(e=>e.id===t.idiomId)).filter(e=>!!e).map(e=>xn(e,{testId:`result-idiom-${e.id}`,compact:!0,collected:!0,isNew:n.newIdiomIds.has(e.id)})).join(``),s=a?`下一關：第 ${a.id} 關`:`全部完成！返回地圖`;At();let c=hn({testId:`result-overlay`,ariaLabel:`${t.title} 過關`,className:`overlay--result`,wide:!0,dismissible:!1,content:`
      <div class="result">
        <div class="result__head">
          <p class="result__kicker">${Y.sparkle} 關卡完成 ${Y.sparkle}</p>
          <h2 class="result__title">${t.title}</h2>
          ${Ct(n.stars,i)}
          <p class="result__meta">獲得 <b>${n.stars}</b> 星 · 錯誤 <b>${n.mistakes}</b> 次 · 提示 <b>${n.hints}</b> 次</p>
          <p class="result__collect">${Y.book} 本關 ${t.slots.length} 個成語已收入圖鑑</p>
        </div>
        <div class="result__cat" aria-hidden="true">
          ${k(`dango`,`celebrate`,{size:96})}
        </div>
        <div class="result__idioms">
          ${o}
        </div>
        <div class="result__actions">
          <button type="button" class="btn btn--primary btn--lg" data-next data-testid="next-level-btn">
            ${Y.forward}<span>${s}</span>
          </button>
          <button type="button" class="btn btn--ghost" data-testid="retry-btn">
            ${Y.restart}<span>再玩一次</span>
          </button>
          <button type="button" class="btn btn--ghost" data-testid="result-map-btn">
            ${Y.map}<span>返回地圖</span>
          </button>
        </div>
      </div>
    `});c.el.querySelector(`[data-next]`)?.addEventListener(`click`,()=>{X(e,`click`),r.onNext()}),c.el.querySelector(`[data-testid="retry-btn"]`)?.addEventListener(`click`,()=>{X(e,`click`),r.onRetry()}),c.el.querySelector(`[data-testid="result-map-btn"]`)?.addEventListener(`click`,()=>{X(e,`click`),r.onMap()});let l=[];if(!i){for(let t=0;t<n.stars;t+=1)l.push(window.setTimeout(()=>{X(e,`star`)},120+t*150));typeof ze==`function`&&window.setTimeout(()=>{c.isOpen()&&ze(c.panel)},80)}let u=c.close,d=()=>{for(let e of l)window.clearTimeout(e)};return c.close=()=>{d(),u()},c}function Cn(e,t){let n=hn({testId:`tutorial-overlay`,ariaLabel:`新手教學：點樣玩《貓咪成語大冒險》`,dismissible:!1,content:`
      <div class="tutorial">
        <div class="tutorial__cats" aria-hidden="true">
          ${k(`amo`,`happy`,{size:112})}
          ${k(`dango`,`wink`,{size:98})}
        </div>
        <h2 class="tutorial__title">點樣玩喵？</h2>
        <p class="tutorial__sub">阿墨同糰子會教你三個步驟，好簡單㗎喵～</p>
        <ol class="tutorial__steps">
          <li class="tutorial__step">
            <span class="tutorial__num" aria-hidden="true">1</span>
            <span class="tutorial__text">點棋盤上面嘅<b>空格</b>，再點下面字庫嘅<b>字卡</b>放字。</span>
          </li>
          <li class="tutorial__step">
            <span class="tutorial__num" aria-hidden="true">2</span>
            <span class="tutorial__text">一個成語填晒就會自動檢查：啱晒會<b>變綠鎖定</b>，錯咗會清空再嚟過。</span>
          </li>
          <li class="tutorial__step">
            <span class="tutorial__num" aria-hidden="true">3</span>
            <span class="tutorial__text">唔識可以用<b>提示</b>偷睇一個字，不過會少一粒星喵。</span>
          </li>
        </ol>
        <button type="button" class="btn btn--primary btn--lg btn--wide" data-testid="tutorial-ok">
          ${Y.paw} 明白喇，開始玩！
        </button>
      </div>
    `});return n.el.querySelector(`[data-testid="tutorial-ok"]`)?.addEventListener(`click`,()=>{X(e,`click`),n.close(),t()}),n}var wn=[`我哋一齊搵晒呢關嘅成語靈珠啦喵！`,`點空格、再點字卡，就可以放字上去喇喵～`],Tn=[`好叻呀！呢句成語啱晒喵～`,`叮！又收集到一個成語喇喵！`,`阿墨都讚你：呢句好準喵！`],En=[`哎呀，呢句唔啱喎⋯再睇清楚啲喵～`,`唔緊要，貓貓都會撳錯掣，再試過喵！`],Dn=`全部成語都搵晒喇！我哋成功咗喇喵～`;function On(e){return e[Math.floor(Math.random()*e.length)]}function kn(e,t){let n=e.chapters.find(e=>e.id===t.chapter),r=Math.max(0,t.hintLimit),i=new Map(e.idioms.map(e=>[e.id,e])),a=Gt(t),o=null,s=!1,c=!1,l=new Set,u=new Map,d=new st,f=null,p=null,m=null,h=e.save.settings.sound,g=G(`
    <main class="screen game" data-testid="game-screen" data-level-id="${t.id}" data-mode="${t.mode}">
      <header class="game__hud">
        <button type="button" class="icon-btn game__hud-back" data-testid="game-back" aria-label="返回成語地圖">
          ${Y.back}
        </button>
        <div class="game__hud-title">
          <span class="game__hud-chapter">第 ${t.chapter} 章 · ${K(n?.name??``)}</span>
          <h1 data-testid="game-title">${K(t.title)}</h1>
        </div>
        <div class="game__hud-actions">
          <button type="button" class="hint-btn" data-testid="hint-btn" aria-label="用提示">
            ${Y.hint}
            <span class="hint-btn__count" data-testid="hint-count">${r}</span>
          </button>
          <button type="button" class="icon-btn" data-testid="restart-btn" aria-label="重新開始呢一關">
            ${Y.restart}
          </button>
          <button type="button" class="icon-btn" data-testid="sound-btn" aria-label="${h?`關閉音效`:`開啟音效`}" aria-pressed="${h}">
            ${h?Y.soundOn:Y.soundOff}
          </button>
          <span class="game__hud-stat game__hud-stat--mistakes">
            <b data-testid="mistake-count">0</b><span class="game__hud-stat__label">錯</span>
          </span>
        </div>
      </header>

      <div class="game__layout">
        <aside class="game__aside">
          <div class="game__cat" data-cat-slot></div>
          <div class="game__story">
            <strong>成語小劇場</strong>
            ${K(t.story)}
          </div>
          <div class="game__words" data-word-chips aria-label="成語進度"></div>
        </aside>

        <div class="game__main">
          <div class="board-panel">
            <span class="board-panel__label">${t.mode===`chain`?`成語接龍`:`成語填字`}</span>
            <div class="board-mount" data-board></div>
          </div>
        </div>

        <div class="game__bank-zone">
          <div class="game__bank">
            <div data-bank></div>
            <p class="game__tip">
              點空格 → 點字卡 · 再點已填格可以攞返字卡 · <kbd>Esc</kbd> 返地圖
            </p>
          </div>
        </div>
      </div>
    </main>
  `),ee=q(g,`[data-board]`),te=q(g,`[data-bank]`),re=q(g,`[data-cat-slot]`),ie=q(g,`[data-word-chips]`),_=q(g,`[data-testid="hint-btn"]`),se=q(g,`[data-testid="hint-count"]`),ce=q(g,`[data-testid="mistake-count"]`),y=ce.closest(`.game__hud-stat`),b=q(g,`[data-testid="sound-btn"]`),S=Qt(t,D),ue=Zt(t,ge);ee.append(S.el),te.append(ue.el),S.fit();function C(e,t=`idle`,n=`dango`){re.innerHTML=en({character:n,mood:t,text:e})}function de(){let e=Math.max(0,r-a.hintsUsed);se.textContent=String(e),_.classList.toggle(`is-empty`,e<=0),_.setAttribute(`aria-label`,e>0?`用提示，仲有 ${e} 次`:`提示已經用晒`),ce.textContent=String(a.mistakes)}function fe(){y&&(y.classList.remove(`is-bumped`),y.offsetWidth,y.classList.add(`is-bumped`),d.after(500,()=>y.classList.remove(`is-bumped`)))}function pe(){let t=e.save.settings.sound;b.innerHTML=t?Y.soundOn:Y.soundOff,b.setAttribute(`aria-label`,t?`關閉音效`:`開啟音效`),b.setAttribute(`aria-pressed`,String(t)),b.classList.toggle(`is-active`,t)}function w(){ie.innerHTML=a.words.map((e,t)=>{let n=i.get(e.slot.idiomId);return e.locked?`
            <button type="button" class="word-chip is-locked" data-word-index="${t}" aria-label="成語 ${t+1} 已解鎖：${K(n?.word??``)}">
              <span class="word-chip__num" aria-hidden="true">${t+1}</span>
              ${K(n?.word??`????`)}
              <span class="word-chip__check" aria-hidden="true">${Y.check}</span>
            </button>
          `:`
          <button type="button" class="word-chip" data-word-index="${t}" aria-label="成語 ${t+1}，未完成">
            <span class="word-chip__num" aria-hidden="true">${t+1}</span>
            ▢▢▢▢
          </button>
        `}).join(``)}function T(){S.render(a,o),ue.sync(l),de(),w()}function E(e){let t=a.cells[e];return!(!t||t.locked||t.char!==``)}function me(){for(let e of a.words)if(!e.locked){for(let t of e.cells)if(E(t))return t}return null}function he(e){let t=a.words.find(t=>!t.locked&&t.cells.includes(e));if(!t)return null;for(let e of t.cells)if(E(e))return e;return null}function D(t){if(s||c)return;let n=a.cells[t];if(n){if(n.locked)X(e,`click`);else if(n.char!==``){let n=qt(a,t);if(n===null)return;l.delete(n),u.delete(t),o=t,X(e,`flip`),T()}else o!==t&&(o=t,S.render(a,o)),X(e,`click`)}}function ge(n){if(s||c||l.has(n))return;let r=t.bank[n];if(!r)return;let i=o&&E(o)?o:me();if(!i){Z(`冇空格可以放字喇喵～`,{tone:`info`});return}let d=Kt(a,i,r,n);d.some(e=>e.type===`place`)&&(l.add(n),u.set(i,n),X(e,`place`),o=he(i),T(),be(d))}function O(){if(s||c)return;if(a.hintsUsed>=r){X(e,`click`),Z(`提示用晒喇喵，靠你喇！`,{tone:`info`});return}let t=Jt(a);t?(t.bankIndex>=0&&l.add(t.bankIndex),u.delete(t.key),o=null,X(e,`hint`),C(`阿墨偷偷話你知：呢個字係「${t.char}」喵～`,`think`,`amo`),Z(`提示：呢格係「${t.char}」喵！`,{tone:`gold`,duration:2e3}),T(),S.flash([t.key]),be(t.events)):Z(`而家冇位需要提示喎喵～`,{tone:`info`})}function _e(t){let n=i.get(t.idiomId);X(e,`correct`),C(n?`「${n.word}」啱晒！${On(Tn)}`:On(Tn),`happy`),S.render(a,o),S.flash(t.cells),w(),n&&Z(`『${n.word}』啱晒喵！`,{tone:`success`,duration:1900})}function ve(t){X(e,`wrong`);for(let e of t.cells){let t=u.get(e);t!==void 0&&(l.delete(t),u.delete(e))}o=null,S.render(a,null),S.shake(t.cells),ue.sync(l),de(),w(),fe(),C(On(En),`sad`),Z(`唔啱喎，個成語清空咗，再試過喵～`,{tone:`warn`,duration:2100})}function ye(n){if(s)return;s=!0,o=null,S.render(a,null),w(),de();let r=t.slots.map(e=>e.idiomId),i=new Set(r.filter(t=>!e.save.collected.includes(t)));ne(e.save,t.id,n,a.mistakes,a.hintsUsed,r),e.persist(),X(e,`clear`),C(Dn,`celebrate`),Z(`過關喇喵！獲得 ${n} 星！`,{tone:`success`,duration:1800}),d.after(700,()=>{c||(e.audio.fanfare(),f=Sn(e,t,{stars:n,mistakes:a.mistakes,hints:a.hintsUsed,newIdiomIds:i},{onNext:()=>{f?.close(),f=null;let n=e.levels.find(e=>e.id===t.id+1);x(n?le(n.id):v)},onRetry:()=>{f?.close(),f=null,xe(!0),Z(`再嚟一次喵！`,{tone:`info`})},onMap:()=>{f?.close(),f=null,x(v)}}))})}function be(e){for(let t of e)switch(t.type){case`word-correct`:_e(t);break;case`word-wrong`:ve(t);break;case`solved`:ye(t.stars)}}function xe(n){f?.close(),f=null,d.clear(),a=Gt(t),l.clear(),u.clear(),o=null,s=!1,X(e,`click`),C(On(wn),`idle`),T(),n||Z(`重新開始呢一關喵！`,{tone:`info`})}function Se(){let t=_t(e);pe(),t&&X(e,`click`),Z(t?`音效開咗喵～`:`音效熄咗喵～`,{tone:`info`})}function Ce(){e.save.tutorialSeen||t.id!==1||c||(m=Cn(e,()=>{oe(e.save),e.persist(),m=null,C(On(wn),`happy`)}))}function we(){c||(!n||e.save.seenChapters.includes(n.id)?Ce():p=yn(e,n,t,()=>{ae(e.save,n.id),e.persist(),p=null,Ce()}))}q(g,`[data-testid="game-back"]`).addEventListener(`click`,()=>{X(e,`click`),x(v)}),q(g,`[data-testid="restart-btn"]`).addEventListener(`click`,()=>{s&&(f?.close(),f=null),xe(!1)}),_.addEventListener(`click`,O),b.addEventListener(`click`,Se),ie.addEventListener(`click`,t=>{if(s)return;let n=t.target.closest(`[data-word-index]`);if(!n)return;let r=Number(n.dataset.wordIndex),i=a.words[r];if(!i||i.locked)return;let c=i.cells.find(e=>E(e));c&&(o=c,S.render(a,o),X(e,`click`))});let Te=e=>{e.key===`Escape`&&(_n()||x(v))};return document.addEventListener(`keydown`,Te),pe(),C(On(wn),`idle`),w(),S.render(a,null),ue.sync(l),de(),d.after(90,we),{el:g,destroy(){c=!0,d.clear(),document.removeEventListener(`keydown`,Te),f?.close(),f=null,p?.close(),p=null,m?.close(),m=null,S.destroy(),ue.destroy()}}}var An={all:`全部`,collected:`已收集`,locked:`未收集`};function jn(e){let t=Math.max(0,Math.min(5,Math.round(e)));return`${`●`.repeat(t)}${`○`.repeat(5-t)}`}function Mn(e,t){let n=e.tags??[],r=n.length>0?n[0]:``,i=bn(e);return`
    <button type="button" class="codex-card${t?``:` codex-card--locked`}" data-testid="codex-item-${e.id}" data-idiom-id="${K(e.id)}" aria-label="${t?`成語 ${K(e.word)}，睇詳情`:`未收集成語，過關後解鎖`}">
      <span class="codex-card__word">${t?K(e.word):`？？？？`}</span>
      <span class="codex-card__pinyin">${t?K(e.pinyin):`未解鎖`}</span>
      ${t&&i?`<span class="codex-card__jyut" aria-label="粵拼：${K(i)}"><span class="pron-badge pron-badge--jyut pron-badge--tiny" aria-hidden="true">粵</span>${K(i)}</span>`:``}
      ${t?`<span class="codex-card__meaning">${K(e.meaning)}</span>`:`<span class="codex-card__lock">${Y.lock} 過關後解鎖</span>`}
      <span class="codex-card__foot">
        <span class="codex-card__tier" aria-hidden="true">${jn(e.tier)}</span>
        ${t&&r?`<span class="codex-card__tag">${K(r)}</span>`:``}
      </span>
    </button>
  `}function Nn(e){let t=(e.tags??[]).map(e=>`<span class="idiom-card__tag">${K(e)}</span>`).join(``),n=bn(e);return`
    <div class="codex-detail">
      <div class="codex-detail__head">
        <div>
          <div class="codex-detail__word">${K(e.word)}</div>
          <div class="codex-detail__pron">
            <div class="codex-detail__pinyin" aria-label="普通話拼音：${K(e.pinyin)}">
              <span class="pron-badge" aria-hidden="true">普</span>${K(e.pinyin)}
            </div>
            ${n?`<div class="codex-detail__pinyin codex-detail__pinyin--jyut" data-testid="codex-detail-jyutping" aria-label="粵拼：${K(n)}">
              <span class="pron-badge pron-badge--jyut" aria-hidden="true">粵</span>${K(n)}
            </div>`:``}
          </div>
        </div>
        <span class="codex-detail__stamp">${Y.paw} 已收集</span>
      </div>
      <div class="codex-detail__section">
        <h3>${Y.book} 釋義</h3>
        <p>${K(e.meaning)}</p>
      </div>
      <div class="codex-detail__section">
        <h3>${Y.bookOpen} 出處</h3>
        <p class="codex-detail__source">${K(e.origin||`出處待考`)}${e.sourceBook?`<br />${K(e.sourceBook)}`:``}</p>
      </div>
      ${e.example?`<div class="codex-detail__section"><h3>${Y.sparkle} 例句</h3><p class="codex-detail__example">${K(e.example)}</p></div>`:``}
      <div class="codex-detail__tags">
        ${t}
        <span class="badge badge--muted">難度 ${e.tier}</span>
      </div>
      <p class="codex-detail__tip">已收入成語圖鑑 · 繼續冒險可以收集更多成語喵～</p>
      <button type="button" class="btn btn--primary btn--wide" data-close data-autofocus>
        ${Y.check} 知道喇喵
      </button>
    </div>
  `}function Pn(e){let t=e.idioms.length,n=new Set(e.save.collected),r=`all`,i=``,a=null,o=G(`
    <main class="screen codex" data-testid="codex-screen">
      <header class="topbar">
        <button type="button" class="icon-btn" data-back aria-label="返回首頁">${Y.back}</button>
        <h1 class="topbar__title">成語圖鑑</h1>
        <div class="topbar__side">
          <span class="badge badge--pink">${Y.book} 收集</span>
        </div>
      </header>
      <div class="codex__toolbar">
        <div class="codex__search">
          <span class="codex__search-icon" aria-hidden="true">${Y.search}</span>
          <input type="search" data-testid="codex-search" placeholder="搵成語、拼音／粵拼或意思……" aria-label="搜尋成語（中文、普通話拼音或粵拼，聲調可省略）" autocomplete="off" />
          <button type="button" class="codex__clear" data-clear hidden aria-label="清除搜尋">
            ${Y.close}
          </button>
        </div>
        <div class="codex__filters" role="group" aria-label="篩選成語">
          ${Object.keys(An).map(e=>`<button type="button" class="chip${e===`all`?` is-active`:``}" data-filter="${e}" aria-pressed="${e===`all`}">${An[e]}</button>`).join(``)}
        </div>
      </div>
      <div class="codex__count-card card card--paper">
        <div class="codex__count-row">
          <span class="codex__count" data-testid="codex-count">已收集 ${n.size} / ${t} 條成語</span>
          <span class="codex__count-hint">過關自動收藏喵～</span>
        </div>
        ${bt({value:t>0?n.size/t:0,jade:!0,ariaLabel:`圖鑑收集進度 ${n.size} / ${t}`})}
      </div>
      <div class="codex__grid" data-grid></div>
      <div class="empty-state" data-empty hidden></div>
    </main>
  `),s=q(o,`[data-grid]`),c=q(o,`[data-empty]`),l=q(o,`[data-testid="codex-search"]`),u=q(o,`[data-clear]`),d=q(o,`.codex__filters`);function f(e){let t=n.has(e.id);if(r===`collected`&&!t||r===`locked`&&t)return!1;let a=dt(i);if(!a)return!0;let o=bn(e);if(dt(t?`${e.word} ${e.pinyin} ${o} ${e.meaning} ${(e.tags??[]).join(` `)}`:`${e.word} ${e.pinyin} ${o}`).includes(a))return!0;let s=ut(i);return o&&/[a-z]/.test(s)&&s.length>=2?ut(o).includes(s):!1}function p(){let e=r===`collected`?`仲未有收藏到成語喎，去過關收集啦喵～`:r===`locked`?`全部成語都收集晒喇，你好叻呀喵！`:`搵唔到相關成語，試下其他關鍵字喵～`;c.innerHTML=`
      <div class="empty-state__cat" aria-hidden="true">${k(`dango`,`think`)}</div>
      <p>${K(e)}</p>
    `}function m(){let t=e.idioms.filter(f),r=[...t.filter(e=>n.has(e.id)),...t.filter(e=>!n.has(e.id))];r.length===0?(s.hidden=!0,s.replaceChildren(),c.hidden=!1,p()):(c.hidden=!0,s.hidden=!1,s.innerHTML=r.map(e=>Mn(e,n.has(e.id))).join(``))}function h(t){X(e,`flip`),a?.close(),a=hn({testId:`codex-detail`,ariaLabel:`成語詳情：${t.word}`,dismissible:!0,closeButton:!1,content:Nn(t),onClose:()=>{a=null}}),a.el.querySelector(`[data-close]`)?.addEventListener(`click`,()=>{a?.close()})}return q(o,`[data-back]`).addEventListener(`click`,()=>{X(e,`click`),x(_)}),l.addEventListener(`input`,()=>{i=l.value,u.hidden=i.length===0,m()}),u.addEventListener(`click`,()=>{l.value=``,i=``,u.hidden=!0,m(),l.focus()}),d.addEventListener(`click`,t=>{let n=t.target.closest(`[data-filter]`);if(!n)return;let i=n.dataset.filter;if(i&&i in An){r=i;for(let e of ot(d,`[data-filter]`)){let t=e===n;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-pressed`,t?`true`:`false`)}X(e,`click`),m()}}),s.addEventListener(`click`,t=>{let r=t.target.closest(`[data-idiom-id]`);if(!r)return;let i=e.idioms.find(e=>e.id===r.dataset.idiomId);i&&(n.has(i.id)?h(i):(X(e,`click`),Z(`過關就會收集到呢個成語喵～`,{tone:`info`})))}),m(),{el:o,destroy(){a?.close(),a=null}}}function Fn(e){let t=null,n=e.save.settings.sound,r=e.save.settings.reducedMotion,i=G(`
    <main class="screen settings" data-testid="settings-screen">
      <header class="topbar">
        <button type="button" class="icon-btn" data-testid="settings-back" aria-label="返回首頁">
          ${Y.back}
        </button>
        <h1 class="topbar__title">設定</h1>
        <div class="topbar__side"></div>
      </header>
      <div class="settings__wrap">
        <section class="card settings__card card--paper" aria-label="遊戲設定">
          <div class="setting-row">
            <div class="setting-row__label">
              <h2>音效</h2>
              <p>貓貓叫聲、放字、提示同過關音樂（用 WebAudio 即時合成）。</p>
            </div>
            <label class="switch">
              <input type="checkbox" data-testid="settings-sound" ${n?`checked`:``} aria-label="音效開關" />
              <span class="switch__track" aria-hidden="true"></span>
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">
              <h2>減少動態效果</h2>
              <p>關閉櫻花花瓣、彈跳、彩紙同平滑捲動，適合容易暈浪嘅貓奴喵。</p>
            </div>
            <label class="switch">
              <input type="checkbox" data-testid="settings-motion" ${r?`checked`:``} aria-label="減少動態效果開關" />
              <span class="switch__track" aria-hidden="true"></span>
            </label>
          </div>
          <div class="setting-row setting-row--danger">
            <div class="setting-row__label">
              <h2>重置進度</h2>
              <p>清除晒所有星星、已過關卡同成語圖鑑收藏，冇得返轉頭喵。</p>
            </div>
            <button type="button" class="btn btn--danger btn--sm" data-testid="settings-reset">
              ${Y.trash} 重置進度
            </button>
          </div>
        </section>

        <section class="card settings__about card--paper" aria-label="關於">
          <h2>關於貓貓</h2>
          <div class="settings__cats" aria-hidden="true">
            ${k(`amo`,`wink`,{size:68})}
            ${k(`dango`,`happy`,{size:68})}
          </div>
          <p>《貓咪成語大冒險》— 跟住店長貓阿墨同小貓糰子，透過成語填字同接龍，收集一百關嘅成語靈珠。</p>
          <p>所有資料同音效都喺你部機度產生，唔會連去任何伺服器，搭地鐵冇網絡都玩到喵。</p>
          <div class="settings__version">
            <span class="badge badge--gold">v1.0.1</span>
            <span class="badge badge--muted">單機 · 離線可玩</span>
          </div>
          <p class="credit">貓貓角色：阿墨（黑貓店長）· 糰子（橘虎斑）｜由 DSH Agent Team 用愛心同成語整成。</p>
        </section>
      </div>
    </main>
  `),a=q(i,`[data-testid="settings-sound"]`),o=q(i,`[data-testid="settings-motion"]`);return a.addEventListener(`change`,()=>{gt(e,a.checked),a.checked&&e.audio.play(`click`),Z(a.checked?`音效開咗喇喵～`:`音效熄咗喇喵～`,{tone:a.checked?`success`:`info`})}),o.addEventListener(`change`,()=>{vt(e,o.checked),Z(o.checked?`已減少動態效果，耳仔舒服啲喵～`:`動態效果返嚟喇喵～`,{tone:`success`})}),q(i,`[data-testid="settings-reset"]`).addEventListener(`click`,()=>{e.audio.play(`click`),t?.close(),t=vn({title:`重置所有進度？`,message:`所有星星、已過關卡同成語圖鑑收藏都會清空，冇得返轉頭喵。你真係確定？`,confirmLabel:`確定重置`,cancelLabel:`唔好住`,confirmTestId:`reset-confirm`,cancelTestId:`reset-cancel`,danger:!0,onConfirm:()=>{let n=p();Object.assign(e.save,n),e.persist(),e.audio.setEnabled(n.settings.sound),ht(e),a.checked=n.settings.sound,o.checked=n.settings.reducedMotion,Z(`進度已重置，返首頁開始新冒險喵！`,{tone:`success`}),t=null}}),t.el.addEventListener(`click`,e=>{e.target.closest(`[data-cancel], [data-confirm]`)&&(t=null)})}),q(i,`[data-testid="settings-back"]`).addEventListener(`click`,()=>{e.audio.play(`click`),x(_)}),{el:i,destroy(){t?.close(),t=null}}}var In=`貓咪成語大冒險`,Ln=`
  <div class="app">
    <div class="app-bg" aria-hidden="true">
      <span class="bg-blob bg-blob--pink"></span>
      <span class="bg-blob bg-blob--jade"></span>
      <span class="bg-hill"></span>
    </div>
    <a class="skip-link" href="#screen-root" data-skip-link>跳去主要內容</a>
    <div id="screen-root" class="screen-root" tabindex="-1"></div>
    <div id="overlay-root" class="overlay-root"></div>
    <div id="toast-root" class="toast-root" role="status" aria-live="polite" aria-atomic="true"></div>
  </div>
`;function Rn(e,t){e.replaceChildren(G(Ln));let n=q(e,`#screen-root`),r=q(e,`#overlay-root`),i=q(e,`#toast-root`);an(r),kt(i),ht(t);let a=null;function o(e,t){switch(e.name){case`home`:document.title=`${In} · 貓貓成語填字接龍`;break;case`map`:document.title=`成語地圖 · ${In}`;break;case`codex`:document.title=`成語圖鑑 · ${In}`;break;case`settings`:document.title=`設定 · ${In}`;break;case`game`:document.title=`${t??`遊戲`} · ${In}`}}function s(e){a=e,n.replaceChildren(e.el),window.scrollTo({top:0,behavior:`auto`})}function c(e){switch(gn(),At(),a&&=(a.destroy(),null),n.replaceChildren(),e.name){case`home`:o(e),s(St(t));break;case`map`:o(e),s(It(t));break;case`codex`:o(e),s(Pn(t));break;case`settings`:o(e),s(Fn(t));break;case`game`:{let n=t.levels.find(t=>t.id===e.levelId);if(!n){S(v),Z(`搵唔到呢一關喎，帶你返地圖喵～`,{tone:`warn`});return}if(!h(t.save,n.id)){S(v),Z(`呢關仲未解鎖喎，完成前一關先啦喵～`,{tone:`warn`});return}o(e,n.title),s(kn(t,n));break}}}new ue(c).start();let l=()=>{t.audio.init(),window.removeEventListener(`pointerdown`,l,!0),window.removeEventListener(`keydown`,l,!0)};window.addEventListener(`pointerdown`,l,!0),window.addEventListener(`keydown`,l,!0),q(e,`[data-skip-link]`).addEventListener(`click`,e=>{e.preventDefault();let t=n.querySelector(`main`);t?(t.tabIndex=-1,t.focus({preventScroll:!0})):n.focus({preventScroll:!0})})}var zn=document.getElementById(`app`);if(!zn)throw Error(`#app not found`);var Bn=d();s.setEnabled(Bn.settings.sound);var Vn={idioms:r,levels:i,chapters:a,save:Bn,persist:()=>f(Vn.save),audio:s};Rn(zn,Vn),new URLSearchParams(window.location.search).has(`debug`)&&(window.__CAT_IDIOM_DEBUG__={version:1,levels:i,idioms:r,chapters:a,getSave:()=>d()});