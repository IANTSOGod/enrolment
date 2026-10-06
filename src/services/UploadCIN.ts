export async function scanCIN(images: {
  front: File;
  back: File;
}): Promise<CinScanResult> {
  if (images.front.size === 0 || images.back.size === 0) {
    throw new Error("Les images recto et verso sont obligatoires.");
  }

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        identity: {
          first_name: "Jean",
          last_name: "RAKOTOMALALA",
          date_of_birth: "1985-04-15",
          birth_place: "ANTANANARIVO",
          country_of_birth_id: "c02a8808-4745-48a4-8bc2-76235c151031",
          country_of_birth_name: "Madagascar",
          sex: "M",
        },
        confidence: 98,
        mrzStatus: {
          label: "MRZ STATUS",
          value: "Read: Valid",
          valid: true,
        },
        nfcStatus: {
          label: "NFC CHIP",
          value: "Mock read success",
          valid: true,
        },
      });
    }, 400);
  });
}
