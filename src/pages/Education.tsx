import React, { useState } from 'react';
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Award, 
  ArrowRight,
  FileText,
  Calculator,
  Target
} from 'lucide-react';

const courseModules = [
  {
    id: 1,
    title: 'IFRS 16 Fundamentals',
    description: 'Scope, exemptions, key definitions, and initial recognition principles.',
    duration: '30 min',
    level: 'Beginner',
    modules: 5,
    progress: 0,
    topics: [
      'Scope & exemptions',
      'Lease definitions',
      'Initial recognition',
      'Subsequent measurement',
      'Disclosures'
    ]
  },
  {
    id: 2,
    title: 'Lease Data Intake & Contract Interpretation',
    description: 'Identify lease components, determine term, classify payments.',
    duration: '25 min',
    level: 'Beginner',
    modules: 5,
    progress: 0,
    topics: [
      'Lease vs non-lease components',
      'Lease term determination',
      'Payment classification',
      'IDC & incentives',
      'Common pitfalls'
    ]
  },
  {
    id: 3,
    title: 'Liability & ROU Modelling',
    description: 'Cashflow building, discounting, measurement, and remeasurements.',
    duration: '35 min',
    level: 'Intermediate',
    modules: 5,
    progress: 0,
    topics: [
      'Cashflow schedules',
      'Discount rate application',
      'Initial measurement',
      'Remeasurements',
      'Worked examples'
    ]
  },
  {
    id: 4,
    title: 'Journal Entries & Reporting',
    description: 'Accounting entries, financial statement impacts, and disclosures.',
    duration: '20 min',
    level: 'Intermediate',
    modules: 4,
    progress: 0,
    topics: [
      'Lessee accounting entries',
      'ROU depreciation',
      'P&L impacts',
      'Disclosure requirements'
    ]
  },
  {
    id: 5,
    title: 'Advanced Modelling & Automation',
    description: 'Portfolio modelling, scenarios, and automation controls.',
    duration: '40 min',
    level: 'Advanced',
    modules: 6,
    progress: 0,
    topics: [
      'Portfolio modelling',
      'Scenario analysis',
      'Lease modifications',
      'Automation opportunities',
      'System integration',
      'Controls'
    ]
  }
];

const achievements = [
  { id: 1, title: 'First Module Completed', completed: false, date: null },
  { id: 2, title: 'Intermediate Learner', completed: false, date: null },
  { id: 3, title: 'Advanced Modeller', completed: false, date: null }
];

const assessmentResults = [
  { module: 'IFRS 16 Fundamentals - Quiz 1', score: 0, maxScore: 100, passed: false }
];

export function Education() {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  return (
    <div className="w-full px-6 py-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Teach Yourself IFRS 16</h1>
            <p className="text-slate-600">Interactive e-learning course with certification</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <nav className="flex space-x-8">
          {['courses', 'progress', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {!selectedCourse ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseModules.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                          course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{course.modules} modules</span>
                    </div>
                  </div>

                  <div className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                    <span>{course.progress > 0 ? 'Continue Course' : 'Start Course'}</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedCourse.title}</h2>
                  <p className="text-slate-600 mt-1">{selectedCourse.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Back to Courses
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Duration', value: selectedCourse.duration, icon: Clock, color: 'blue' },
                  { label: 'Modules', value: selectedCourse.modules, icon: FileText, color: 'emerald' },
                  { label: 'Level', value: selectedCourse.level, icon: Target, color: 'amber' },
                  { label: 'Progress', value: `${selectedCourse.progress}%`, icon: Calculator, color: 'purple' }
                ].map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div key={idx} className={`bg-${info.color}-50 p-4 rounded-lg text-center`}>
                      <Icon className={`h-8 w-8 text-${info.color}-600 mx-auto mb-2`} />
                      <p className={`text-sm text-${info.color}-900 font-medium`}>{info.label}</p>
                      <p className={`text-lg font-bold text-${info.color}-600`}>{info.value}</p>
                    </div>
                  );
                })}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-4">Course Content</h3>
              <div className="space-y-3">
                {selectedCourse.topics.map((topic: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <span className="flex-1 text-slate-900">{topic}</span>
                    {index < selectedCourse.progress / (100 / selectedCourse.modules) ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <PlayCircle className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  {selectedCourse.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Learning Progress</h2>
            <div className="space-y-4">
              {courseModules.map((course) => (
                <div key={course.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-900">{course.title}</h3>
                    <span className="text-sm text-slate-600">{course.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">
                    {course.progress > 0 ? `${Math.floor(course.progress / (100 / course.modules))} of ${course.modules} modules completed` : 'Not started'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Assessment Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Assessment
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {assessmentResults.map((result, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{result.module}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className="font-medium text-slate-900">{result.score}</span>
                        <span className="text-slate-500">/{result.maxScore}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`border rounded-lg p-6 ${
                    achievement.completed ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${achievement.completed ? 'bg-emerald-100' : 'bg-slate-200'} p-3 rounded-full`}>
                      <Award className={`h-6 w-6 ${achievement.completed ? 'text-emerald-600' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${achievement.completed ? 'text-emerald-900' : 'text-slate-600'}`}>
                        {achievement.title}
                      </h3>
                      {achievement.completed && achievement.date ? (
                        <p className="text-sm text-emerald-600">Earned on {achievement.date}</p>
                      ) : (
                        <p className="text-sm text-slate-500">Not yet earned</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Keep Learning!</h3>
            <p className="text-blue-100 mb-4">
              Complete more courses and assessments to unlock new achievements and demonstrate your IFRS 16 expertise.
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
