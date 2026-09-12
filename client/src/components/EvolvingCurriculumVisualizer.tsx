import React, { useState } from 'react';
import { EvolvedCurriculum } from '../types';
import {
  Sparkles,
  CheckCircle2,
  Minimize2,
  PlusCircle,
  HelpCircle,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  Compass,
  Layers
} from 'lucide-react';

interface Props {
  curriculum: EvolvedCurriculum;
  studentBranch?: string;
  careerGoal?: string;
}

export const EvolvingCurriculumVisualizer: React.FC<Props> = ({
  curriculum,
  studentBranch = 'Engineering',
  careerGoal = 'Industry Specialist'
}) => {
  const [filter, setFilter] = useState<'ALL' | 'KEEP' | 'COMPRESS' | 'ADD'>('ALL');

  const keepCount = curriculum.keep?.length || 0;
  const compressCount = curriculum.compress?.length || 0;
  const addCount = curriculum.add?.length || 0;

  return (
    <div className="space-y-8">
      
      {/* 3-Stage Visual Pipeline: College -> AI Analysis -> Evolved Curriculum */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-200/60">
            The SkillUp Evolution Engine
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2 font-['Outfit']">
            From Static Syllabus to Dynamic Career Path
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            "College gives you one curriculum. SkillUp evolves it for YOU."
          </p>
        </div>

        {/* 3-Stage Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          
          {/* Stage 1: College Curriculum */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between relative group hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Stage 1
                </span>
                <GraduationCap className="h-4 w-4 text-slate-500" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-['Outfit']">College Curriculum</h3>
              <p className="text-xs text-slate-500 mt-1">Static academic syllabus for {studentBranch}</p>
              
              <div className="mt-4 space-y-1.5 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200/60">
                <div className="font-semibold text-slate-700">Subjects Parsed:</div>
                <div className="text-[11px] text-slate-500 truncate">
                  {curriculum.collegeCurriculum?.analyzed?.subjects?.map(s => s.name).join(', ') || 'Core Department Subjects'}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium pt-1 border-t border-slate-100 flex items-center space-x-1">
                  <ShieldCheck className="h-3 w-3 shrink-0" />
                  <span>Mandatory academic topics locked</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Standard Baseline</span>
              <span className="font-medium text-slate-600">Fixed</span>
            </div>
          </div>

          {/* Arrow indicator 1 */}
          <div className="hidden md:flex absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-1.5 text-blue-600 shadow-xs">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Stage 2: SkillUp AI Analysis */}
          <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/60 rounded-xl p-5 border border-blue-200/80 flex flex-col justify-between relative group shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200">
                  Stage 2: AI Brain
                </span>
                <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-['Outfit']">SkillUp AI Analysis</h3>
              <p className="text-xs text-slate-500 mt-1">Cross-referenced with target industry needs</p>
              
              <div className="mt-4 space-y-2 text-xs bg-white/90 p-3 rounded-lg border border-blue-100 text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target Career:</span>
                  <span className="font-semibold text-blue-700 truncate max-w-[140px]">{careerGoal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Gap Analysis:</span>
                  <span className="font-medium text-indigo-600">Dynamic Matching</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Model:</span>
                  <span className="font-mono text-[10px] text-slate-600">Groq llama-3.3-70b</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-100 text-[11px] text-blue-600 font-semibold flex items-center justify-between">
              <span>Deep Alignment</span>
              <span>Intelligent</span>
            </div>
          </div>

          {/* Arrow indicator 2 */}
          <div className="hidden md:flex absolute left-2/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-1.5 text-blue-600 shadow-xs">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Stage 3: Personalized Curriculum */}
          <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200/80 flex flex-col justify-between relative group hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                  Stage 3: Result
                </span>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-['Outfit']">Your Evolved Curriculum</h3>
              <p className="text-xs text-slate-500 mt-1">Calibrated to your exact goal & time</p>
              
              <div className="mt-4 grid grid-cols-3 gap-1.5 text-center text-xs">
                <div className="bg-white p-2 rounded-md border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-bold text-blue-600 block">KEEP</span>
                  <span className="font-extrabold text-sm text-slate-900">{keepCount}</span>
                </div>
                <div className="bg-white p-2 rounded-md border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-bold text-amber-600 block">COMPRESS</span>
                  <span className="font-extrabold text-sm text-slate-900">{compressCount}</span>
                </div>
                <div className="bg-white p-2 rounded-md border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-bold text-emerald-600 block">ADD</span>
                  <span className="font-extrabold text-sm text-slate-900">{addCount}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-700 font-semibold flex items-center justify-between">
              <span>Dynamic Evolution</span>
              <span>100% Tailored</span>
            </div>
          </div>

        </div>

        {/* AI Strategic Synthesis Summary */}
        {curriculum.summary && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 leading-relaxed flex items-start space-x-3">
            <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 mr-1 font-['Outfit']">Strategic Evolution Rationale:</span>
              <span>{curriculum.summary}</span>
            </div>
          </div>
        )}

      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Modifications ({keepCount + compressCount + addCount})
          </button>
          <button
            onClick={() => setFilter('KEEP')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              filter === 'KEEP'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>KEEP ({keepCount})</span>
          </button>
          <button
            onClick={() => setFilter('COMPRESS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              filter === 'COMPRESS'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <Minimize2 className="h-3.5 w-3.5" />
            <span>COMPRESS ({compressCount})</span>
          </button>
          <button
            onClick={() => setFilter('ADD')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              filter === 'ADD'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>ADD ({addCount})</span>
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Showing rationale and industry justification for every topic
        </div>
      </div>

      {/* Cards Grid: KEEP / COMPRESS / ADD */}
      <div className="space-y-4">
        
        {/* KEEP TOPICS */}
        {(filter === 'ALL' || filter === 'KEEP') && curriculum.keep?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span>KEEP — Essential Academic Foundation & Goal Relevance</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.keep.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border-l-4 border-l-blue-500 border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 uppercase">
                        {item.subject || 'Academic Core'}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1.5 font-['Outfit']">{item.topic}</h4>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      {item.importance || 'Mandatory'}
                    </span>
                  </div>

                  {/* Why badge */}
                  <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100/60 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center space-x-1.5 font-semibold text-blue-800">
                      <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                      <span>Why SkillUp kept this?</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-5">
                      "{item.why}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPRESS TOPICS */}
        {(filter === 'ALL' || filter === 'COMPRESS') && curriculum.compress?.length > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Minimize2 className="h-4 w-4 text-amber-600" />
              <span>COMPRESS — Streamlined Low-Relevance & Legacy Content</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.compress.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border-l-4 border-l-amber-500 border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200 uppercase">
                        {item.subject || 'Streamlined Topic'}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1.5 font-['Outfit']">{item.topic}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.timeReduction || 'Compressed'}
                    </span>
                  </div>

                  {/* Why badge */}
                  <div className="p-3 bg-amber-50/40 rounded-lg border border-amber-100/60 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center space-x-1.5 font-semibold text-amber-800">
                      <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                      <span>Why SkillUp compressed this?</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-5">
                      "{item.why}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD TOPICS */}
        {(filter === 'ALL' || filter === 'ADD') && curriculum.add?.length > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <PlusCircle className="h-4 w-4 text-emerald-600" />
              <span>ADD — Critical Industry & Modern Engineering Tooling Missing from College</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.add.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border-l-4 border-l-emerald-500 border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 uppercase">
                        {item.category || 'Industry Requirement'}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1.5 font-['Outfit']">{item.topic}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.industryRelevance || 'High Demand'}
                    </span>
                  </div>

                  {/* Why badge */}
                  <div className="p-3 bg-emerald-50/40 rounded-lg border border-emerald-100/60 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center space-x-1.5 font-semibold text-emerald-800">
                      <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Why SkillUp added this?</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-5">
                      "{item.why}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
