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
          country_of_birth_id: "9d4a3e6b-4971-4baa-94ea-aa42489a2c54",
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
