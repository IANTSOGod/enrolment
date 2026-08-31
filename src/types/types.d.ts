interface Documentcapturesuccessinterface {
  imageUrl: string;
  copyLabel?: string;
  mrzStatus: { label: string; value: string; valid: boolean };
  nfcStatus: { label: string; value: string; valid: boolean };
}

interface NavigationStepperinterface {
  onBack: () => void;
  onContinue: () => void;
  isfinal: boolean;
  disabled: boolean;
}

type CrossCheckField = {
  key: string;
  label: string;
  ocrValue: string;
  inputValue: string;
};

interface CrossCheckPanelProps {
  confidence: number;
  fields: CrossCheckField[];
  onChange?: (fieldKey: string, value: string) => void;
  onManualVerify?: (fieldKey: string) => void;
}

interface Qualityrowinterface {
  icon: ReactNode;
  label: string;
  status: string;
  success?: boolean;
}

interface VerificationHeaderinterface {
  title: string;
  subtitle: string;
  applicationId: string;
}

interface Documentverificationcininterface {
  onBack: () => void;
  onContinue: () => void;
  isfinal: boolean;
}

interface EnrolmentTypeinterface {
  selectedType: string;
  onTypeChange: (type: string) => void;
  onContinue: (type: string) => void;
  onCancel?: () => void;
}
