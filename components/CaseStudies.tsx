import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, XCircle, ArrowRight, RefreshCw, Play, Trophy, RotateCcw, Sparkles, ExternalLink } from 'lucide-react';
import { cases, CaseStudy, Topic, topicLabels } from './cases/caseData';

interface QuizItem {
  c: CaseStudy;
  options: string[];
  correct: number;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Shuffle answer options so the correct one is not always in the same position
const toQuizItem = (c: CaseStudy): QuizItem => {
  const order = shuffle(c.options.map((_, i) => i));
  return { c, options: order.map(i => c.options[i]), correct: order.indexOf(c.correctAnswer) };
};

const topics = Object.keys(topicLabels) as Topic[];

const CaseStudies: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useState<Set<Topic>>(new Set(topics));
  const [onlyNew, setOnlyNew] = useState(false);
  const [phase, setPhase] = useState<'select' | 'quiz' | 'result'>('select');
  const [items, setItems] = useState<QuizItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const pool = useMemo(
    () => cases.filter(c => selectedTopics.has(c.topic) && (!onlyNew || c.isNew)),
    [selectedTopics, onlyNew],
  );

  const countFor = (t: Topic) => cases.filter(c => c.topic === t && (!onlyNew || c.isNew)).length;

  const toggleTopic = (t: Topic) => setSelectedTopics(prev => {
    const next = new Set(prev);
    next.has(t) ? next.delete(t) : next.add(t);
    return next;
  });

  const start = (list: CaseStudy[]) => {
    setItems(list.map(toQuizItem));
    setIndex(0);
    setSelected(null);
    setResults({});
    setPhase('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const item = items[index];
    setResults(r => ({ ...r, [item.c.id]: i === item.correct }));
  };

  const next = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setPhase('result');
    }
  };

  // ---------- Selection screen ----------
  if (phase === 'select') {
    return (
      <Shell>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-1">Konuları seçin</h3>
          <p className="text-sm text-slate-500 mb-6">Seçtiğiniz konulardaki vakalar sırayla sorulur; seçenekler her testte karıştırılır.</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {topics.map(t => {
              const on = selectedTopics.has(t);
              const n = countFor(t);
              return (
                <button key={t} onClick={() => toggleTopic(t)} aria-pressed={on} disabled={n === 0}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors disabled:opacity-40 ${on ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                  {topicLabels[t]} <span className={on ? 'text-indigo-200' : 'text-slate-400'}>({n})</span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700 mb-8">
            <input type="checkbox" checked={onlyNew} onChange={e => setOnlyNew(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
            Yalnızca TEMD 2026 ile eklenen yeni vakalar
          </label>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-slate-600 text-sm"><strong className="text-slate-900 text-lg">{pool.length}</strong> vaka seçildi</span>
            <button onClick={() => start(pool)} disabled={pool.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-200">
              <Play size={18} /> Teste başla
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  // ---------- Result screen ----------
  if (phase === 'result') {
    const correctCount = items.filter(it => results[it.c.id]).length;
    const pct = Math.round((correctCount / items.length) * 100);
    const wrong = items.filter(it => !results[it.c.id]);
    const byTopic = topics
      .map(t => {
        const inTopic = items.filter(it => it.c.topic === t);
        return { t, total: inTopic.length, ok: inTopic.filter(it => results[it.c.id]).length };
      })
      .filter(x => x.total > 0);

    return (
      <Shell>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="text-center mb-8">
            <Trophy size={40} className="mx-auto text-amber-500 mb-3" />
            <div className="text-4xl font-bold text-slate-900">{correctCount} / {items.length}</div>
            <div className="text-slate-500 mt-1">%{pct} doğru</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 mb-8">
            {byTopic.map(x => (
              <div key={x.t} className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-sm">
                <span className="text-slate-700">{topicLabels[x.t]}</span>
                <span className={`font-bold ${x.ok === x.total ? 'text-green-700' : 'text-slate-900'}`}>{x.ok}/{x.total}</span>
              </div>
            ))}
          </div>

          {wrong.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-3">Yanlış yanıtlanan vakalar</h3>
              <ul className="space-y-3">
                {wrong.map(it => (
                  <li key={it.c.id} className="border border-red-100 bg-red-50/50 rounded-xl p-4 text-sm">
                    <div className="font-semibold text-slate-900">{it.c.title}</div>
                    <div className="text-slate-700 mt-1"><span className="text-green-700 font-semibold">Doğru yanıt:</span> {it.options[it.correct]}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {wrong.length > 0 && (
              <button onClick={() => start(wrong.map(w => w.c))}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <RotateCcw size={18} /> Yanlışları tekrar çöz
              </button>
            )}
            <button onClick={() => setPhase('select')}
              className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <RefreshCw size={18} /> Yeni test
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  // ---------- Quiz screen ----------
  const item = items[index];
  const answered = selected !== null;
  const isCorrect = selected === item.correct;
  const score = Object.values(results).filter(Boolean).length;

  return (
    <Shell>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="w-full bg-slate-100 h-2">
          <div className="bg-indigo-500 h-2 transition-all duration-300" style={{ width: `${((index + 1) / items.length) * 100}%` }} />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">Soru {index + 1} / {items.length}</span>
            <span className="text-sm text-slate-500">Puan: <strong className="text-slate-900">{score}</strong></span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{topicLabels[item.c.topic]}</span>
            {item.c.isNew && <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full flex items-center gap-1"><Sparkles size={12} /> TEMD 2026</span>}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">{item.c.title}</h3>

          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-slate-700 leading-relaxed">{item.c.description}</p>
            {item.c.findings && (
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                {item.c.findings.map(f => (
                  <li key={f} className="text-sm text-slate-800 flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />{f}</li>
                ))}
              </ul>
            )}
          </div>

          <h4 className="text-xl font-bold text-slate-900 mb-4">{item.c.question}</h4>

          <div className="space-y-3">
            {item.options.map((option, idx) => {
              let cls = 'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ';
              if (answered) {
                if (idx === item.correct) cls += 'border-green-500 bg-green-50 text-green-800';
                else if (idx === selected) cls += 'border-red-500 bg-red-50 text-red-800';
                else cls += 'border-slate-100 text-slate-400 opacity-60';
              } else {
                cls += 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700';
              }
              return (
                <button key={idx} onClick={() => choose(idx)} disabled={answered} className={cls}>
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold
                    ${answered && idx === item.correct ? 'border-green-600 bg-green-600 text-white'
                      : answered && idx === selected ? 'border-red-500 text-red-500' : 'border-slate-300 text-slate-500'}`}>
                    {answered && idx === item.correct ? <CheckCircle size={14} />
                      : answered && idx === selected ? <XCircle size={14} />
                      : String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-8">
              <div className={`p-5 rounded-xl mb-6 ${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-50 text-red-900'}`} aria-live="polite">
                <div className="font-bold mb-2 flex items-center gap-2 text-lg">
                  {isCorrect ? <><CheckCircle className="text-green-600" /> Doğru!</> : <><XCircle className="text-red-600" /> Yanlış</>}
                </div>
                <p className="text-sm leading-relaxed">{item.c.explanation}</p>
                {item.c.link && (
                  <Link to={item.c.link.path} className="inline-flex items-center gap-1 mt-3 text-sm font-semibold underline underline-offset-2">
                    {item.c.link.label} bölümüne git <ExternalLink size={14} />
                  </Link>
                )}
              </div>
              <div className="flex justify-between items-center">
                <button onClick={() => setPhase('result')} className="text-sm text-slate-500 underline">Testi bitir</button>
                <button onClick={next}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200">
                  {index < items.length - 1 ? <>Sonraki soru <ArrowRight size={20} /></> : <>Sonuçları gör <Trophy size={18} /></>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
};

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section id="cases" className="py-16 bg-slate-100 min-h-screen">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
          <BookOpen size={32} />
        </div>
        <span className="block w-fit mx-auto text-xs font-bold uppercase tracking-wider text-primary bg-sky-100 px-3 py-1 rounded-full mb-3">TEMD 2026 ile güncellendi</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Vaka Testleri</h2>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          Birinci basamakta sık karşılaşılan klinik senaryolarla bilginizi sınayın. Her açıklama ilgili rehber bölümüne bağlanır.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  </section>
);

export default CaseStudies;
