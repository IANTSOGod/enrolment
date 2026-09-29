import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { BadgeCheck, Check, FileImage, MapPin, ScanFace, ShieldCheck, UserRound } from "lucide-react";
import NavigationLv1stepper from "../../../components/custom/steppermanagement/NavigationLv1stepper";
import { submitEnrolmentDraft } from "../../../services/enrolement.api";

export default function EnrolmentBio({
  onBack,
  draft,
}: {
  onBack: () => void;
  draft: EnrolmentDraft;
}) {
  const frontPreviewRef = useRef<HTMLImageElement>(null);
  const backPreviewRef = useRef<HTMLImageElement>(null);
  const submission = useMutation({
    mutationFn: () => submitEnrolmentDraft(draft),
  });
  const completedItems = [
    Object.values(draft.identity).every(Boolean),
    Boolean(draft.documents?.front && draft.documents.back),
    Boolean(
      draft.faceCapture.front &&
      draft.faceCapture.leftProfile &&
      draft.faceCapture.rightProfile,
    ),
    Object.values(draft.address).every(Boolean),
    Boolean(
      draft.consent.truthAccepted &&
      draft.consent.biometricAccepted &&
      draft.consent.signature,
    ),
  ].filter(Boolean).length;

  useEffect(() => {
    const previews = [
      { image: frontPreviewRef.current, file: draft.documents?.front },
      { image: backPreviewRef.current, file: draft.documents?.back },
    ];
    const urls = previews.map(({ image, file }) => {
      if (!image || !file) return null;
      const url = URL.createObjectURL(file);
      image.src = url;
      return url;
    });

    return () => {
      previews.forEach(({ image }) => image?.removeAttribute("src"));
      urls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [draft.documents]);

  return (
    <div className="w-full max-w-5xl">
      <header className="mb-6 flex flex-col gap-3 border-b border-[#d5d7e2] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-[#71717a]">Étape finale</p>
          <h2 className="mt-1 text-2xl font-bold text-[#202124]">
            Récapitulatif du dossier
          </h2>
          <p className="mt-1 text-sm text-[#52525b]">
            Vérifiez les informations recueillies avant de terminer.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-[#173d68]">
          <ShieldCheck className="size-5" aria-hidden="true" />
          {completedItems}/5 sections complètes
        </div>
      </header>

      {submission.isSuccess && (
        <div role="status" className="mb-5 flex items-center gap-2 border-l-4 border-emerald-600 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <BadgeCheck className="size-5 shrink-0" aria-hidden="true" />
          Le dossier a été envoyé avec succès.
        </div>
      )}

      {submission.isError && (
        <div role="alert" className="mb-5 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">
          {submission.error instanceof Error
            ? submission.error.message
            : "L’envoi du dossier a échoué. Vérifiez votre connexion et réessayez."}
        </div>
      )}

      <div className="space-y-5">
        <SummarySection title="Identité" icon={<UserRound className="size-4" />}>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryValue label="Prénom" value={draft.identity.first_name} />
            <SummaryValue label="Nom" value={draft.identity.last_name} />
            <SummaryValue label="Date de naissance" value={draft.identity.date_of_birth} />
            <SummaryValue label="Lieu de naissance" value={draft.identity.birth_place} />
            <SummaryValue label="Pays de naissance" value={draft.identity.country_of_birth_name} />
            <SummaryValue label="Sexe" value={draft.identity.sex} />
          </div>
        </SummarySection>

        <SummarySection title="Pièce d’identité" icon={<FileImage className="size-4" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <DocumentPreview title="Recto" imageRef={frontPreviewRef} file={draft.documents?.front ?? null} />
            <DocumentPreview title="Verso" imageRef={backPreviewRef} file={draft.documents?.back ?? null} />
          </div>
        </SummarySection>

        <SummarySection title="Biométrie faciale" icon={<ScanFace className="size-4" />}>
          <div className="grid gap-4 sm:grid-cols-3">
            <FaceCapturePreview label="De face" capture={draft.faceCapture.front} />
            <FaceCapturePreview label="Profil gauche" capture={draft.faceCapture.leftProfile} />
            <FaceCapturePreview label="Profil droit" capture={draft.faceCapture.rightProfile} />
          </div>
        </SummarySection>

        <SummarySection title="Adresse et résidence" icon={<MapPin className="size-4" />}>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryValue label="Adresse complète" value={draft.address.house_number} />
            <SummaryValue label="Pays" value={draft.address.country_name} />
            <SummaryValue label="Région" value={draft.address.region_name} />
            <SummaryValue label="District" value={draft.address.district_name} />
            <SummaryValue label="Commune" value={draft.address.commune_name} />
            <SummaryValue label="Fokontany" value={draft.address.fokontany_name} />
            <SummaryValue label="Statut de résidence" value={draft.address.occupancy_type_name} />
          </div>
        </SummarySection>

        <SummarySection title="Consentement et signature" icon={<ShieldCheck className="size-4" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ConsentStatus label="Déclaration d’exactitude" accepted={draft.consent.truthAccepted} />
            <ConsentStatus label="Consentement biométrique" accepted={draft.consent.biometricAccepted} />
          </div>
          <div className="mt-4 border-t border-[#e4e4e7] pt-4">
            <p className="mb-2 text-xs font-medium text-[#71717a]">Signature</p>
            {draft.consent.signature ? (
              <img src={draft.consent.signature} alt="Signature du demandeur" className="h-20 max-w-full border border-[#e4e4e7] bg-white object-contain" />
            ) : (
              <MissingValue>Signature absente</MissingValue>
            )}
          </div>
        </SummarySection>
      </div>

      <NavigationLv1stepper
        onBack={onBack}
        onContinue={() => submission.mutate()}
        isfinal={true}
        disabled={completedItems < 5 || submission.isPending || submission.isSuccess}
      ></NavigationLv1stepper>
      {submission.isPending && (
        <p role="status" className="mt-2 text-right text-xs text-[#52525b]">
          Téléversement des images et envoi du dossier...
        </p>
      )}
      {completedItems < 5 && (
        <p className="mt-2 text-right text-xs text-amber-700">
          Certaines sections sont incomplètes. Revenez en arrière pour les compléter.
        </p>
      )}
    </div>
  );
}

function SummarySection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-y border-[#d5d7e2] bg-white px-4 py-4 sm:px-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#202124]">
        <span className="text-[#173d68]">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function SummaryValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-[#71717a]">{label}</p>
      {value ? (
        <p className="mt-1 wrap-break-word text-sm font-medium text-[#202124]">{value}</p>
      ) : (
        <p className="mt-1 text-sm italic text-amber-700">Non renseigné</p>
      )}
    </div>
  );
}

function DocumentPreview({
  title,
  imageRef,
  file,
}: {
  title: string;
  imageRef: React.RefObject<HTMLImageElement | null>;
  file: File | null;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {file ? (
        <img ref={imageRef} alt={`Aperçu du ${title.toLowerCase()}`} className="h-24 w-32 rounded border border-[#e4e4e7] bg-[#f8f9fb] object-contain" />
      ) : (
        <div className="flex h-24 w-32 items-center justify-center rounded border border-dashed border-[#d5d7e2] bg-[#f8f9fb] text-xs text-[#71717a]">
          Image absente
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#202124]">{title}</p>
        <p className="max-w-44 truncate text-xs text-[#71717a]">{file?.name ?? "Aucun fichier"}</p>
      </div>
    </div>
  );
}

function ConsentStatus({ label, accepted }: { label: string; accepted: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-sm ${accepted ? "text-emerald-700" : "text-amber-700"}`}>
      {accepted ? <Check className="size-4" aria-hidden="true" /> : <span aria-hidden="true">!</span>}
      {label}: {accepted ? "Accepté" : "Non accepté"}
    </p>
  );
}

function MissingValue({ children }: { children: React.ReactNode }) {
  return <p className="text-sm italic text-amber-700">{children}</p>;
}

function FaceCapturePreview({
  label,
  capture,
}: {
  label: string;
  capture: PhotoCapture | null;
}) {
  return (
    <div className="min-w-0">
      {capture ? (
        <img
          src={capture.image}
          alt={`Capture biométrique ${label.toLowerCase()}`}
          className="h-48 w-full rounded border border-[#e4e4e7] bg-[#f8f9fb] object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center rounded border border-dashed border-[#d5d7e2] bg-[#f8f9fb] text-sm text-[#71717a]">
          Capture absente
        </div>
      )}
      <p className="mt-2 text-sm font-medium text-[#202124]">{label}</p>
      {capture && (
        <p className="mt-1 flex items-center gap-1 text-xs text-emerald-700">
          <Check className="size-3.5" aria-hidden="true" />
          {capture.embedding.length} valeurs biométriques
        </p>
      )}
    </div>
  );
}

