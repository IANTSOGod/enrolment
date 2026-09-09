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

type StatOverview = {
  enrolmentsToday: number;
  pendingSync: number;
};

type ActivityRow = {
  id: number;
  applicantName: string;
  reference: string;
  time: string;
  status: "synced" | "local-only";
};

interface Dashboardinterface {
  stats: StatOverview;
  recentActivity: ActivityRow[];
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  agent?: {
    id: string;
    username: string;
    roleId: string;
    centreId: string;
  };
}

interface Country {
  id: string;
  iso2_code: string;
  iso3_code: string;
  name: string;
  nationality_name: string;
  created_at: string;
  updated_at: string | null;
}

interface Region {
  id: string;
  country_id: string;
  name: string;
  created_at: string;
  updated_at: string | null;
}

interface District {
  id: string;
  region_id: string;
  name: string;
  created_at: string;
  updated_at: string | null;
}

interface Commune {
  id: string;
  district_id: string;
  name: string;
  created_at: string;
  updated_at: string | null;
}

interface Fokotany {
  id: string;
  commune_id: string;
  name: string;
  created_at: string;
  updated_at: string | null;
}

interface OccupancyType {
  value: string;
  label: string;
}

interface EnrolmentPayload {
  person: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    birth_place: string;
    country_of_birth_id: string;
    sex: string;
  };
  address: {
    house_number: string;
    fokontany_id: string;
    occupancy_type: string;
  };
  contacts: Array<{
    type: string;
    value: string;
    is_primary: boolean;
    is_verified: boolean;
  }>;
  relationships: Array<{
    related_person_id: string;
    related_person_name: string;
    relationship_type: string;
  }>;
  documents: Array<{
    document_type_id: string;
    front_file_path: string;
    back_file_path: string;
  }>;
  face_biometrics: Array<{
    image_file_path: string;
    model_name: string;
    model_version: string;
    embeding: string;
    quality_score: number;
    face_detected: boolean;
  }>;
  created_offline: boolean;
  enrolment_type: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: Array<{ id: string; name: string }> | OccupancyType[];
  onChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

interface SessionMetadata {
  agentName: string;
  agentId: string;
  timestamp: string;
  applicationId: string;
}

interface DocumentSuppProps {
  onBack: () => void;
  onContinue: () => void;
}

interface PhotoCapture {
  image: string;
  embedding: number[];
}

interface DocumentVerificationStep2Props {
  onValidatePhoto: (capture: PhotoCapture) => void;
}
interface ConsentementProps {
  onBack: () => void;
  onContinue: () => void;
}
