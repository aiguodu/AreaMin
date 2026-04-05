import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

export const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  const A = { x: 150, y: 100 };
  const B = { x: 150, y: 280 };
  const C = { x: 330, y: 280 };
  const D = { x: 330, y: 100 };
  
  const H = { x: 150, y: 220 };
  const E = { x: 330, y: 220 };
  const F = { x: 330, y: 160 };
  const G = { x: 510, y: 220 };

  const RightAngle = ({ p, p1, p2 }: { p: any, p1: any, p2: any }) => {
    const size = 12;
    const v1 = { x: Math.sign(p1.x - p.x) || 0, y: Math.sign(p1.y - p.y) || 0 };
    const v2 = { x: Math.sign(p2.x - p.x) || 0, y: Math.sign(p2.y - p.y) || 0 };
    let dx1 = v1.x * size, dy1 = v1.y * size;
    let dx2 = v2.x * size, dy2 = v2.y * size;
    return (
      <path
        d={`M ${p.x + dx1} ${p.y + dy1} L ${p.x + dx1 + dx2} ${p.y + dy1 + dy2} L ${p.x + dx2} ${p.y + dy2}`}
        fill="none"
        stroke="#666"
        strokeWidth="1.5"
      />
    );
  };

  return (
    <svg viewBox="100 50 480 280" className="w-full h-full">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
        </pattern>
      </defs>

      {/* 背景网格 */}
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* 基础图形 ABCD */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* 初始状态: 原始题目图形还原 (Step 0) */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <polygon points={`${B.x},${B.y} ${C.x},${C.y} ${200},${220}`} fill="rgba(245, 158, 11, 0.3)" />
            <line x1={A.x} y1={A.y} x2={200} y2={220} stroke="#334155" strokeWidth="2.5" />
            <line x1={B.x} y1={B.y} x2={200} y2={220} stroke="#334155" strokeWidth="2.5" />
            <line x1={C.x} y1={C.y} x2={200} y2={220} stroke="#334155" strokeWidth="2.5" />
            <circle cx={200} cy={220} r={5} fill="#334155" />
            <text x={200 + 5} y={220 + 20} className="text-xl fill-slate-800 font-serif italic font-bold">P</text>
          </motion.g>
        )}
      </AnimatePresence>

      <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#334155" strokeWidth="2.5" />
      <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="#334155" strokeWidth="2.5" />
      <line x1={E.x} y1={E.y} x2={C.x} y2={C.y} stroke="#334155" strokeWidth="2.5" />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#334155" strokeWidth="2.5" />
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#334155" strokeWidth="2.5" />
      
      <RightAngle p={A} p1={B} p2={D} />
      <RightAngle p={B} p1={A} p2={C} />
      <RightAngle p={C} p1={B} p2={D} />
      <RightAngle p={D} p1={C} p2={A} />

      {/* 步骤 1: 辅助线 L 与面积关系 */}
      {step >= 1 && (
        <motion.g>
          <motion.line 
            x1={100} y1={220} x2={550} y2={220} 
            stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.text x={530} y={210} className="text-sm fill-blue-500 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>L</motion.text>
          
          <motion.text x={160} y={165} className="text-sm fill-slate-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>2</motion.text>
          <motion.text x={160} y={255} className="text-sm fill-slate-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>1</motion.text>

          {/* 展现面积关系 */}
          <AnimatePresence>
            {step === 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <polygon points={`${A.x},${A.y} ${D.x},${D.y} ${260},${220}`} fill="rgba(59, 130, 246, 0.2)" />
                <polygon points={`${B.x},${B.y} ${C.x},${C.y} ${260},${220}`} fill="rgba(245, 158, 11, 0.2)" />
                <line x1={A.x} y1={A.y} x2={260} y2={220} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={D.x} y1={D.y} x2={260} y2={220} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={B.x} y1={B.y} x2={260} y2={220} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1={C.x} y1={C.y} x2={260} y2={220} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
                <circle cx={260} cy={220} r={5} fill="#3b82f6" />
                <text x={260 + 10} y={220 + 20} className="text-xl fill-blue-600 font-serif italic font-bold">P</text>
              </motion.g>
            )}
          </AnimatePresence>
        </motion.g>
      )}

      {/* 步骤 2: 对称点 F */}
      {step >= 2 && (
        <motion.g>
          <motion.line 
            x1={C.x} y1={C.y} x2={F.x} y2={F.y} 
            stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.circle cx={F.x} cy={F.y} r={4} fill="#ef4444" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
          <motion.text x={F.x + 8} y={F.y + 5} className="text-lg fill-red-500 font-serif italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>F</motion.text>
          
          <motion.text x={340} y={250} className="text-sm fill-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>1</motion.text>
          <motion.text x={340} y={190} className="text-sm fill-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>1</motion.text>
        </motion.g>
      )}

      {/* 步骤 3: 找极大值点 G */}
      {step >= 3 && (
        <motion.g>
          <motion.line 
            x1={A.x} y1={A.y} x2={G.x} y2={G.y} 
            stroke="#10b981" strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.circle cx={G.x} cy={G.y} r={4} fill="#10b981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
          <motion.text x={G.x + 5} y={G.y - 10} className="text-lg fill-emerald-600 font-serif italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>G</motion.text>
        </motion.g>
      )}

      {/* 步骤 4: 相似三角形 */}
      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <polygon points={`${F.x},${F.y} ${E.x},${E.y} ${G.x},${G.y}`} fill="rgba(16, 185, 129, 0.2)" />
          <polygon points={`${A.x},${A.y} ${H.x},${H.y} ${G.x},${G.y}`} fill="rgba(239, 68, 68, 0.1)" />
          
          <text x={(E.x + G.x) / 2} y={E.y + 15} className="text-sm fill-emerald-600 font-bold">3</text>
          <text x={(D.x + F.x) / 2 + 10} y={(D.y + F.y) / 2} className="text-sm fill-slate-600 font-bold">1</text>
        </motion.g>
      )}

      {/* 顶点标签 */}
      <text x={A.x - 20} y={A.y + 5} className="text-lg fill-slate-800 font-serif italic">A</text>
      <text x={B.x - 20} y={B.y + 15} className="text-lg fill-slate-800 font-serif italic">B</text>
      <text x={C.x + 5} y={C.y + 15} className="text-lg fill-slate-800 font-serif italic">C</text>
      <text x={D.x + 10} y={D.y} className="text-lg fill-slate-800 font-serif italic">D</text>
      {step >= 1 && <text x={E.x + 5} y={E.y + 20} className="text-lg fill-slate-800 font-serif italic">E</text>}
      {step >= 1 && <text x={H.x - 20} y={H.y + 5} className="text-lg fill-slate-800 font-serif italic">H</text>}

      {/* 步骤 2 动点P巡游动画：展示动点轨迹 */}
      {step === 2 && (
        <motion.g
          animate={{ x: [0, 200, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <circle cx={H.x + 50} cy={H.y} r={5} fill="#3b82f6" />
          <text x={H.x + 40} y={H.y - 10} className="text-lg fill-blue-600 font-serif italic font-bold">P</text>
        </motion.g>
      )}

    </svg>
  );
};
