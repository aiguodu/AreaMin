import React, { useState, useEffect } from 'react';
import { steps } from './data/steps';
import { GeometrySVG } from './components/GeometrySVG';
import { StepPanel } from './components/StepPanel';
import { AnimatePresence, motion } from 'motion/react';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState('');

  // 模拟 TTS 播放 (使用浏览器原生 SpeechSynthesis)
  const toggleTTS = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setSubtitle('');
      return;
    }

    const text = steps[currentStep].tts;
    setSubtitle(text);
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setSubtitle('');
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setSubtitle('');
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setSubtitle('');
  }, [currentStep]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 md:p-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[800px]">
        
        {/* Global Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">
              几何动点
            </span>
            <h1 className="text-lg font-bold text-slate-800">
              四边形面积最值问题：求面积与线段长
            </h1>
          </div>
          <div className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
            进度 {currentStep + 1} / {steps.length}
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          
          {/* Left: Visual Area */}
          <div className="lg:w-[55%] relative bg-[#f8fafc] border-r border-slate-100 p-6 flex flex-col">
            <div className="flex-1 relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center">
              <GeometrySVG step={currentStep} />
            </div>

            {/* Subtitle Overlay */}
            <AnimatePresence>
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-10 left-10 right-10 z-10"
                >
                  <div className="bg-[#334155]/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg">
                    <p className="text-base leading-relaxed font-medium tracking-wide">
                      {subtitle}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Explanation Area */}
          <div className="lg:w-[45%] p-6 bg-white flex flex-col">
            <StepPanel
              steps={steps}
              currentStep={currentStep}
              isPlaying={isPlaying}
              onTogglePlay={toggleTTS}
            />
          </div>
        </div>

        {/* Global Footer */}
        <footer className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
          <button 
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            重新开始
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-1 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              上一步
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium shadow-sm"
            >
              下一步
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
