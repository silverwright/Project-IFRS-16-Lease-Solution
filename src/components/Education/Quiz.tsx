import React, { useState } from 'react';
import { Button } from '../UI/Button';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';

interface QuizProps {
  moduleId: number;
  onComplete: () => void;
  onBack: () => void;
}

const quizData: { [key: number]: any } = {
  1: {
    title: 'IFRS 16 Fundamentals',
    content: `
      <h3>Part 1 — IFRS 16 Fundamentals</h3>
      <ul>
        <li>Scope & exemptions (short-term ≤12 months, low-value assets)</li>
        <li>Key definitions: Lease, ROU Asset, Lease Liability, IBR</li>
        <li>Initial recognition: PV of lease payments; ROU = Liability + IDC + Prepayments − Incentives</li>
        <li>Subsequent measurement: interest unwind, principal, depreciation</li>
        <li>Disclosures: maturity analysis (undiscounted), interest, cash outflow</li>
      </ul>
    `,
    questions: [
      {
        question: 'Which lease is exempt from recognition under IFRS 16?',
        options: ['24-month vehicle lease', '10-month printer lease', '5-year office lease', '3-year equipment lease'],
        correct: 1,
        explanation: 'Short-term leases (≤12 months) without purchase option are exempt.'
      },
      {
        question: 'At commencement, the lessee recognises:',
        options: ['Only an expense', 'ROU asset and lease liability', 'A provision', 'Equity reserve'],
        correct: 1,
        explanation: 'Lessee recognises both a ROU asset and a lease liability at commencement.'
      },
      {
        question: 'ROU initial cost equals:',
        options: ['Liability + IDC + Prepayments − Incentives', 'Liability only', 'Only IDC', 'FX effects'],
        correct: 0,
        explanation: 'ROU = Liability + IDC + Prepayments − Incentives per IFRS 16.'
      }
    ]
  },
  2: {
    title: 'Lease Data Intake & Contract Interpretation',
    content: `
      <h3>Part 2 — Lease Data Intake & Contract Interpretation</h3>
      <ul>
        <li>Lease vs. non-lease components; embedded leases</li>
        <li>Lease term: renewal/termination included only if reasonably certain</li>
        <li>Payments: fixed, in-substance fixed, usage-based (exclude), CPI-linked</li>
        <li>IDC, incentives, prepayments; timing (advance/arrears)</li>
        <li>Pitfalls: restoration, FX, implicit variables</li>
      </ul>
    `,
    questions: [
      {
        question: 'Which payment is excluded from the lease liability at commencement?',
        options: ['Fixed payments', 'In-substance fixed payments', 'Usage-based variable payments', 'Purchase option price (reasonably certain)'],
        correct: 2,
        explanation: 'Usage-based variable payments are expensed when incurred.'
      },
      {
        question: 'Renewal periods are included if they are:',
        options: ['Possible', 'Probable', 'Reasonably certain', 'Always'],
        correct: 2,
        explanation: 'IFRS 16 requires including periods reasonably certain to be exercised.'
      }
    ]
  }
};

export function Quiz({ moduleId, onComplete, onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const module = quizData[moduleId];
  const questions = module?.questions || [];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
        return count + (answer === questions[index]?.correct ? 1 : 0);
      }, 0);
      setScore(correctAnswers);
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const isPassed = (score / totalQuestions) >= 0.75;

  if (showResults) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
            isPassed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isPassed ? (
              <Award className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-slate-900">
            {isPassed ? 'Congratulations!' : 'Not Quite There'}
          </h3>
          
          <p className="text-slate-600">
            You scored {score} out of {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
          </p>
          
          {isPassed ? (
            <p className="text-green-600 font-medium">
              You passed! You need ≥75% to complete this module.
            </p>
          ) : (
            <p className="text-red-600 font-medium">
              You need ≥75% to pass. Please review the material and try again.
            </p>
          )}

          <div className="flex gap-3 justify-center pt-4">
            {isPassed ? (
              <Button onClick={onComplete} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Complete Module
              </Button>
            ) : (
              <Button onClick={restartQuiz} variant="outline">
                Try Again
              </Button>
            )}
            <Button variant="outline" onClick={onBack}>
              Back to Modules
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="text-sm text-slate-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>

      {currentQuestion === 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">{module.title}</h2>
          <div 
            className="prose prose-slate max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: module.content }}
          />
        </div>
      )}

      {question && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {question.question}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`
                    w-full p-4 text-left border border-slate-200 rounded-lg transition-colors
                    ${selectedAnswers[currentQuestion] === index 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:border-slate-300 hover:bg-slate-50'
                    }
                  `}
                >
                  <span className="font-medium text-slate-700">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <div className="w-full bg-slate-200 rounded-full h-2 mr-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="flex-shrink-0"
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}