import React, { useState } from 'react';
import { useLeaseContext } from '../context/LeaseContext';
import { ModeSelector } from '../components/Contract/ModeSelector';
import { BasicInfoForm } from '../components/Contract/BasicInfoForm';
import { PaymentDetailsForm } from '../components/Contract/PaymentDetailsForm';
import { AdvancedOptionsForm } from '../components/Contract/AdvancedOptionsForm';
import { ContractPreview } from '../components/Contract/ContractPreview';
import { ProgressBar } from '../components/UI/ProgressBar';
import { Button } from '../components/UI/Button';
import { ArrowLeft, ArrowRight, FileText, RefreshCw } from 'lucide-react';

const steps = [
  { id: 1, name: 'Basic Info', component: BasicInfoForm },
  { id: 2, name: 'Payment Details', component: PaymentDetailsForm },
  { id: 3, name: 'Advanced Options', component: AdvancedOptionsForm },
  { id: 4, name: 'Preview & Generate', component: ContractPreview },
];

export function ContractInitiation() {
  const { state, dispatch } = useLeaseContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [modeSelected, setModeSelected] = useState(false);

  const CurrentStepComponent =
    steps.find(step => step.id === currentStep)?.component || BasicInfoForm;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleModeChange = (mode: 'MINIMAL' | 'FULL') => {
    dispatch({ type: 'SET_MODE', payload: mode });
    setModeSelected(true);
  };

  const resetMode = () => {
    setModeSelected(false);
    setCurrentStep(1);
    dispatch({ type: 'SET_MODE', payload: '' });
  };

  if (!modeSelected) {
    return (
      <div className="w-full min-h-screen p-6 space-y-6 bg-slate-100">
        {/* Header box */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-start gap-3 shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Contract Initiation & Approval
            </h1>
            <p className="text-slate-600">
              Select a mode to start creating your lease contract
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <ModeSelector currentMode={state.mode} onModeChange={handleModeChange} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 space-y-6 bg-slate-100">
      {/* Header box */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-start gap-3 shadow">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Contract Initiation & Approval
          </h1>
          <p className="text-slate-600">
            Running in <span className="font-semibold">{state.mode}</span> mode
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar steps={steps} currentStep={currentStep} />

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow h-full">
        <CurrentStepComponent />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={resetMode}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Back to Mode Selection
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                console.log('Generating contract...');
              }}
              className="flex items-center gap-2"
            >
              Generate Contract
              <FileText className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
