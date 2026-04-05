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
    title: "第一步：解题思路总览",
    icon: <BookOpen className="w-5 h-5" />,
    desc: "线段差最值的基本思想：化折为直",
    detail: "1. 和最小：两条线段 PA+PB。作对称点，化同侧为异侧，两点间线段最短。\n2. 差最大：|PA-PB| 最大。作对称点，化异侧为同侧，利用三角形三边关系（两边之差小于第三边）。",
    tts: "同学们好！今天我们来看线段差的最值问题。解决这类问题，我们的基本思想叫‘化折为直’。如果求线段和最小，就把同侧化为异侧；如果求线段差最大，就要把异侧化为同侧，利用三角形两边之差小于第三边来解决。大家先记住这个口诀，接下来我们看具体题目。"
  },
  {
    title: "第二步：分析已知信息与动点轨迹",
    icon: <BookOpen className="w-5 h-5" />,
    desc: "结合面积关系，找出P点运动轨迹L",
    detail: "已知：正方形ABCD边长=3。\n条件：△BCP面积 = 1/2 △ADP面积。\n观察图形，这两个三角形分别以正方形对边BC和AD为底边（底边长相同）。因此从同底边到P的距离（高）比为1:2。\n这说明动点P的运动轨迹是一条平行于AD和BC的直线，设为直线L，且到BC的距离为1，到AD的距离为2。",
    tts: "首先，我们来看看动点P躲在哪里。题目说，三角形BCP的面积是三角形ADP面积的一半。大家看，这两个三角形的底边，不就是正方形的边长吗？它们是相等的！既然底相同，面积比是一比二，那高之比肯定也就是一比二啦。所以点P的运动轨迹，其实就是一条平行于底边的直线L，它距离AD是2，距离BC是1。"
  },
  {
    title: "第三步：作对称点，化异侧为同侧",
    icon: <Edit3 className="w-5 h-5" />,
    desc: "作C点关于L的对称点F，将PA-PC转化为PA-PF",
    detail: "要求 PA-PC 最大值，目前A点和C点分别在直线L的异侧。\n我们需要作其中一点关于L的对称点。设L与CD交于E，则CE⊥BC。因为距AD与BC距离比为2:1，且CD=3，因此CE=1，DE=2。\n在CD上取点F，使得F是C关于L的对称点，此时EF = CE = 1。点F即为所求对称点。从而 PC = PF，那么 PA-PC = PA-PF。",
    tts: "现在要求PA减PC的最大值。因为点A和点C此时在直线L的两侧，我们需要作对称点来把它们化到同一侧。我们让直线L交边CD于点E，因为刚才确定的距离比例，CE等于1，DE等于2。然后我们作出点C关于直线L的对称点，叫它点F，显然由于对称，EF也就等于1。那么线段PC就等于PF啦，求PA减PC的最大值，就巧妙地转化为了求PA减PF的最大值！"
  },
  {
    title: "第四步：寻找极值点G",
    icon: <Triangle className="w-5 h-5" />,
    desc: "延长AF交L于点G，三点共线时取最大差",
    detail: "现在A与F都在直线L的同侧（上方）。根据三角形三边关系：|PA-PF| <= AF。\n当且仅当A、F、P三点共线且F在A与P之间时（即A、F、P顺次共线），等号成立。\n连接AF并延长，与L的交点即为此时的G点。此时PA-PF的最大值就等于固定的线段AF的长度。",
    tts: "既然A和F都在直线L的一侧，根据三角形的两边之差小于等于第三边，只要连接AF，由于两边的差最大不能超过第三边，也就是它俩的差无论如何不会超过线段AF！当且仅当A、F、P这三点在一条直线上的时候，也就是将AF延长与直线L相交，交点记为G，此时如果动点P跑到了G点，差值就能达到最大，也就是固定线段AF的长度。"
  },
  {
    title: "第五步：利用相似比计算最终结果",
    icon: <Calculator className="w-5 h-5" />,
    desc: "通过勾股定理或相似比求解",
    detail: "设L与AB交于点H，显然AH=2，BH=1。\n直线AF交L于G。在 △EFG 与 △HAG 中，因为EF // AH，所以它们相似。\n因为 EF=1，AH=2，相似比为 1:2。即 EG : HG = 1:2。\n因为 HG = HE + EG = 3 + EG，所以 3+EG = 2EG，得到 EG = 3。\n最终求解AF即可：\n在直角 △ADF 中，AD = 3，DF = DE - EF = 2 - 1 = 1。\n根据勾股定理，AF = √(AD² + DF²) = √(3² + 1²) = √10。\n因此，PA-PC 的最大值为 √10。",
    tts: "最后我们来算一算AF的长度，这也就是最终答案。我们可以设直线L去交AB于点H。因为点F向上的距离是1，点A向下的距离是2，通过相似三角形的比例，可以算出水平方向外侧的距离EG是3。当然，直接算AF的话就更简单了，在右上角的直角三角形ADF中，直角边AD长为正方形边长3，另一条直角边DF长为2减去1等于1，根据勾股定理，3的平方加上1的平方再开根号，结果就是根号10！求差最大的题目也是这样的套路，你学会了吗？"
  }
];
