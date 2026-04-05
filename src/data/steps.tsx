import { BookOpen, Edit3, Triangle, Calculator, CheckCircle } from 'lucide-react';
import React from 'react';

export interface StepData {
  title: string;
  icon: React.ReactNode;
  desc: string;
  detail: string;
  tts: string;
}

export const steps: StepData[] = [
  {
    title: "第一步：分析已知条件",
    icon: <BookOpen className="w-5 h-5" />,
    desc: "标注题目已知信息",
    detail: "已知四边形ABCD中，∠A = ∠C = 90°，AD = 2AB。E在CD上，DE = 6。要求四边形ABED面积的最小值。",
    tts: "同学们好！我们来看这道几何题。首先，我们在图中标注出已知条件：角A和角C都是直角，AD的长度是AB的两倍，DE等于6。我们的目标是求出四边形ABED面积的最小值。"
  },
  {
    title: "第二步：作辅助线 AF，寻找突破口",
    icon: <Edit3 className="w-5 h-5" />,
    desc: "看到“点A到CD的距离”，自然想到作垂线。",
    detail: "几何题中遇到“距离”，通常意味着要作垂线。我们从点A向CD边作垂线，垂足记为F。\n\n因为题目已知A到CD的距离为8，所以我们立刻得到：AF = 8。\n\n这样我们就构造出了一个直角三角形 △AFD，为后续计算打下基础。",
    tts: "同学们，看到题目里说‘A到CD的距离为8’，我们第一反应是什么？没错，就是作垂线！我们从点A向CD作一条垂线，垂足叫它F。这样，高AF的长度就是8啦。作这条辅助线，不仅用上了距离的条件，还帮我们构造出了直角三角形AFD，这是解题的关键第一步。"
  },
  {
    title: "第三步：作辅助线 BG，构造“一线三直角”",
    icon: <Triangle className="w-5 h-5" />,
    desc: "利用 ∠BAD = 90°，构造经典几何模型。",
    detail: "观察图形，顶点A处有一个直角（∠BAD = 90°），同时AF⊥CD产生了一个直角（∠AFD = 90°）。\n\n如果我们从点B向AF作垂线，垂足为G，会发生什么？\n\n此时，在直线AF上，出现了三个直角：∠BGA、∠BAD、∠AFD。这就是初中几何非常经典的“一线三直角”模型！",
    tts: "接下来是见证奇迹的时刻！大家注意看顶点A，这里有一个直角。同时我们刚才作的AF也产生了一个直角。如果我们从点B向AF再作一条垂线，垂足记为G。大家看，在直线AF上，是不是连着出现了三个直角？这就是我们初中几何里大名鼎鼎的‘一线三直角’模型！只要看到它，相似三角形就跑不掉了。"
  },
  {
    title: "第四步：证明相似，利用比例设未知数",
    icon: <Calculator className="w-5 h-5" />,
    desc: "证明 △BGA ∽ △AFD，并设未知数。",
    detail: "为什么相似？\n因为 ∠BGA = 90°，所以 ∠ABG + ∠BAG = 90°。\n又因为 ∠BAD = 90°，所以 ∠BAG + ∠DAF = 90°。\n根据同角的余角相等，得出 ∠ABG = ∠DAF！\n因此 △BGA ∽ △AFD。\n\n利用相似比：\n已知 AD = 2AB，所以相似比为 1:2。\n设 AG = x，则对应的 DF = 2x。\n已知 AF = 8，则对应的 BG = 8/2 = 4。",
    tts: "为什么说有一线三直角就有相似呢？大家跟着我推导：因为角BGA是直角，所以角ABG加上角BAG等于90度。又因为角BAD也是直角，所以角BAG加上角DAF也等于90度。同角的余角相等，所以角ABG就等于角DAF啦！这样三角形BGA和三角形AFD就相似了。题目说AD是AB的两倍，所以相似比是1比2。我们设AG为x，那DF就是2x。AF是8，对应的一半，BG就是4。是不是很巧妙？"
  },
  {
    title: "第五步：细化四边形面积组成",
    icon: <Edit3 className="w-5 h-5" />,
    desc: "S = S△ABG + S梯形BGFE + S△AFD",
    detail: "四边形ABED可以被分割为三个规则图形：\n1. 直角△ABG：面积 = 1/2 × BG × AG = 1/2 × 4 × x = 2x\n2. 直角梯形BGFE：上下底为BG=4和FE=6-2x，高为GF=8-x。面积 = 1/2 × (4 + 6 - 2x) × (8 - x) = x² - 13x + 40\n3. 直角△AFD：面积 = 1/2 × AF × DF = 1/2 × 8 × 2x = 8x",
    tts: "为了求四边形ABED的面积，我们把它拆分成三个部分。第一部分是顶部的直角三角形ABG，底是4，高是x，面积就是2x。第二部分是中间的直角梯形BGFE，上底是4，下底是6减2x，高是8减x，利用梯形面积公式算出来是 x的平方减13x加40。第三部分是右侧的直角三角形AFD，底是8，高是2x，面积是8x。这样拆解就非常清晰了。"
  },
  {
    title: "第六步：求二次函数最值与BC长",
    icon: <CheckCircle className="w-5 h-5" />,
    desc: "化简求极值，并利用矩形性质求BC",
    detail: "1. 总面积 S = 2x + (x² - 13x + 40) + 8x = x² - 3x + 40。\n2. 配方得 S = (x - 1.5)² + 37.75。当 x = 1.5 时，面积取得最小值 37.75。\n3. 求BC：因为∠C=90°，AF⊥CD，BG⊥AF，所以四边形BGCF是矩形！因此 BC = GF = 8 - x = 8 - 1.5 = 6.5。",
    tts: "最后一步，我们把这三部分的面积相加，得到总面积S等于 x的平方减3x加40。通过配方，S等于 x减1.5的平方，再加37.75。显然，当x等于1.5时，面积有最小值37.75。那此时BC的长度是多少呢？大家观察图形，因为角C是直角，AF垂直于CD，BG又垂直于AF，所以四边形BGCF其实是一个矩形！因此BC的长度就等于对边GF的长度，也就是8减x，代入x等于1.5，得出BC等于6.5。这道题我们就完美解决了！"
  }
];
