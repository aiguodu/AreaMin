import React from 'react';
import { motion } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

export const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  // 坐标系设定 (Scale = 20)
  const F = { x: 400, y: 300 };
  const A = { x: 400, y: 140 };
  const D = { x: 480, y: 300 };
  const G = { x: 400, y: 180 };
  const B = { x: 320, y: 180 };
  const E = { x: 360, y: 300 };
  const C = { x: 320, y: 300 };

  // 辅助函数：绘制直角标记
  const RightAngle = ({ p, p1, p2 }: { p: any, p1: any, p2: any }) => {
    const size = 12;
    const v1 = { x: Math.sign(p1.x - p.x) || 0, y: Math.sign(p1.y - p.y) || 0 };
    const v2 = { x: Math.sign(p2.x - p.x) || 0, y: Math.sign(p2.y - p.y) || 0 };
    
    // 简单的直角标记逻辑，适用于水平/垂直线
    let dx1 = v1.x * size, dy1 = v1.y * size;
    let dx2 = v2.x * size, dy2 = v2.y * size;

    // 对于倾斜的A点直角，手动指定
    if (p === A) {
      return (
        <path d={`M 391.05 144.47 L 395.52 153.41 L 404.47 148.94`} fill="none" stroke="#666" strokeWidth="1.5" />
      );
    }

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
    <svg viewBox="180 50 440 350" className="w-full h-full">
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
      
      {/* 目标区域 ABED 高亮 */}
      <motion.polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${E.x},${E.y} ${D.x},${D.y}`}
        fill="rgba(59, 130, 246, 0.08)"
        stroke="transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* 基础线段 */}
      <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#334155" strokeWidth="2.5" />
      <line x1={E.x} y1={E.y} x2={D.x} y2={D.y} stroke="#334155" strokeWidth="2.5" />
      <line x1={B.x} y1={B.y} x2={E.x} y2={E.y} stroke="#3b82f6" strokeWidth="2.5" />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#334155" strokeWidth="2.5" />

      {/* 直角标记 */}
      <RightAngle p={A} p1={B} p2={D} />
      <RightAngle p={C} p1={B} p2={D} />

      {/* 步骤 1: 辅助线 AF */}
      {step >= 1 && (
        <motion.g>
          <motion.line 
            x1={A.x} y1={A.y} x2={F.x} y2={F.y} 
            stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <RightAngle p={F} p1={A} p2={D} />
            <text x={F.x + 8} y={F.y + 15} className="text-sm fill-red-500 font-serif">F</text>
            <text x={A.x + 8} y={(A.y + F.y) / 2} className="text-sm fill-red-500 font-bold">8</text>
          </motion.g>
        </motion.g>
      )}

      {/* 步骤 2: 辅助线 BG */}
      {step >= 2 && (
        <motion.g>
          <motion.line 
            x1={B.x} y1={B.y} x2={G.x} y2={G.y} 
            stroke="#10b981" strokeWidth="2" strokeDasharray="6,4" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <RightAngle p={G} p1={B} p2={A} />
            <text x={G.x + 8} y={G.y - 5} className="text-sm fill-emerald-500 font-serif">G</text>
          </motion.g>
        </motion.g>
      )}

      {/* 步骤 3: 相似三角形高亮 & 变量 */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${G.x},${G.y}`} fill="rgba(16, 185, 129, 0.2)" />
          <polygon points={`${A.x},${A.y} ${F.x},${F.y} ${D.x},${D.y}`} fill="rgba(239, 68, 68, 0.2)" />
          
          <text x={(A.x + G.x) / 2 - 15} y={(A.y + G.y) / 2 + 5} className="text-sm fill-emerald-600 font-bold">x</text>
          <text x={(F.x + D.x) / 2} y={F.y - 5} className="text-sm fill-red-600 font-bold">2x</text>
          <text x={(B.x + G.x) / 2} y={B.y - 5} className="text-sm fill-emerald-600 font-bold">4</text>
        </motion.g>
      )}

      {/* 步骤 4: 梯形高亮 & 边长 */}
      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <polygon points={`${B.x},${B.y} ${G.x},${G.y} ${F.x},${F.y} ${E.x},${E.y}`} fill="rgba(245, 158, 11, 0.2)" />
          <text x={G.x + 5} y={(G.y + F.y) / 2} className="text-sm fill-amber-600 font-bold">8-x</text>
          <text x={(E.x + F.x) / 2 - 15} y={E.y + 15} className="text-sm fill-amber-600 font-bold">6-2x</text>
        </motion.g>
      )}

      {/* 顶点标签 */}
      <text x={A.x - 20} y={A.y + 5} className="text-lg fill-slate-800 font-serif italic">A</text>
      <text x={B.x - 20} y={B.y + 15} className="text-lg fill-slate-800 font-serif italic">B</text>
      <text x={C.x + 5} y={C.y + 15} className="text-lg fill-slate-800 font-serif italic">C</text>
      <text x={D.x + 10} y={D.y} className="text-lg fill-slate-800 font-serif italic">D</text>
      <text x={E.x - 10} y={E.y - 10} className="text-lg fill-slate-800 font-serif italic">E</text>

      {/* 已知条件标注 */}
      {step === 0 && (
        <motion.text x={(D.x + E.x) / 2 - 5} y={D.y + 15} className="text-sm fill-blue-600 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          6
        </motion.text>
      )}
    </svg>
  );
};
