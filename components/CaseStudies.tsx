import { PageHeader } from './shared/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, XCircle, ArrowLeft, ArrowRight, RefreshCw, Play, Trophy, RotateCcw, Sparkles, ExternalLink, Home } from 'lucide-react';
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
  // Chosen option per case id; kept so earlier questions can be revisited
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizActive, setQuizActive] = useState(false);

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

  const isRight = (it: QuizItem) => answers[it.c.id] === it.correct;

  const start = (list: CaseStudy[]) => {
    setItems(list.map(toQuizItem));
    setIndex(0);
    setAnswers({});
    setQuizActive(true);
    setPhase('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const choose = (i: number) => {
    const id = items[index].c.id;
    if (answers[id] !== undefined) return;
    setAnswers(a => ({ ...a, [id]: i }));
  };

  const goTo = (i: number) => {
    setIndex(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finish = () => {
    setQuizActive(false);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => { if (index > 0) goTo(index - 1); };
  const next = () => (index < items.length - 1 ? goTo(index + 1) : finish());
  const toHome = () => { setPhase('select'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // Keyboard shortcuts: left / right arrow for previous / next question
  useEffect(() => {
    if (phase !== 'quiz') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ---------- Selection screen ----------
  if (phase === 'select') {
    return (
      <Shell>
        {quizActive && items.length > 0 && (
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
            <span className="text-sm text-indigo-900">
              Devam eden test: <strong>Soru {index + 1} / {items.length}</strong> · {Object.keys(answers).length} yanıt
            </span>
            <button onClick={() => setPhase('quiz')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
              Teste devam et <ArrowRight size={16} />
            </button>
          </div>
        )}
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
    const correctCount = items.filter(isRight).length;
    const pct = Math.round((correctCount / items.length) * 100);
    const wrong = items.filter(it => !isRight(it));
    const skippedCount = items.filter(it => answers[it.c.id] === undefined).length;
    const byTopic = topics
      .map(t => {
        const inTopic = items.filter(it => it.c.topic === t);
        return { t, total: inTopic.length, ok: inTopic.filter(isRight).length };
      })
      .filter(x => x.total > 0);

    return (
      <Shell>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="text-center mb-8">
            <Trophy size={40} className="mx-auto text-amber-500 mb-3" />
            <div className="text-4xl font-bold text-slate-900">{correctCount} / {items.length}</div>
            <div className="text-slate-500 mt-1">%{pct} doğru{skippedCount > 0 && ` · ${skippedCount} soru boş bırakıldı`}</div>
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
              <h3 className="font-bold text-slate-900 mb-3">Yanlış veya boş bırakılan vakalar</h3>
              <ul className="space-y-3">
                {wrong.map(it => (
                  <li key={it.c.id} className="border border-red-100 bg-red-50/50 rounded-xl p-4 text-sm">
                    <div className="font-semibold text-slate-900">{it.c.title}{answers[it.c.id] === undefined && <span className="ml-2 text-xs font-normal text-slate-500">(boş)</span>}</div>
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
  const selected = answers[item.c.id] ?? null;
  const answered = selected !== null;
  const isCorrect = selected === item.correct;
  const score = items.filter(isRight).length;
  const isLast = index === items.length - 1;

  return (
    <Shell>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="w-full bg-slate-100 h-2 rounded-t-2xl overflow-hidden">
          <div className="bg-indigo-500 h-2 transition-all duration-300" style={{ width: `${((index + 1) / items.length) * 100}%` }} />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">Soru {index + 1} / {items.length}</span>
            <span className="flex items-center gap-4 text-sm text-slate-500">
              <span>Puan: <strong className="text-slate-900">{score}</strong></span>
              <button onClick={finish} className="underline">Testi bitir</button>
            </span>
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
              <div className={`p-5 rounded-xl ${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-50 text-red-900'}`} aria-live="polite">
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
            </div>
          )}
        </div>

        <nav aria-label="Soru gezinme"
          className="sticky bottom-0 z-10 grid grid-cols-3 items-center gap-2 px-4 md:px-8 py-3 bg-white/95 backdrop-blur border-t border-slate-200 rounded-b-2xl">
          <button onClick={prev} disabled={index === 0}
            className="justify-self-start flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent">
            <ArrowLeft size={18} /> <span>Önceki<span className="hidden sm:inline"> soru</span></span>
          </button>
          <button onClick={toHome}
            className="justify-self-center flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100">
            <Home size={18} /> <span>Test<span className="hidden sm:inline"> ana sayfası</span></span>
          </button>
          <button onClick={next}
            className={`justify-self-end flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${answered ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200' : 'text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>
            {isLast
              ? <><span>Sonuçlar</span> <Trophy size={18} /></>
              : answered
                ? <><span>Sonraki<span className="hidden sm:inline"> soru</span></span> <ArrowRight size={18} /></>
                : <><span className="sm:hidden">Atla</span><span className="hidden sm:inline">Soruyu atla</span> <ArrowRight size={18} /></>}
          </button>
        </nav>
      </div>
    </Shell>
  );
};

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section id="cases" className="pt-10 md:pt-12 pb-16">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <PageHeader no="06" title="Vaka Testleri" icon={<BookOpen size={20} />}>
          Birinci basamakta sık karşılaşılan klinik senaryolarla bilginizi sınayın. Her açıklama ilgili rehber bölümüne bağlanır.
        </PageHeader>
      </div>
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  </section>
);

export default CaseStudies;
