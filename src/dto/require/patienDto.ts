export class PatientDto {
  private buildIdentifier(
    createBy: "nik" | "mother_nik",
    data: { nik: string; kk?: string }
  ):
    | Array<{
        use: "official";
        system: string;
        value: string;
      }>
    | undefined {
    const identifierArray: Array<{
      use: "official";
      system: string;
      value: string;
    }> = [];

    if (createBy === "nik") {
      if (data.nik) {
        identifierArray.push({
          use: "official",
          system: "https://fhir.kemkes.go.id/id/nik",
          value: data.nik,
        });
      }
      if (data.kk) {
        identifierArray.push({
          use: "official",
          system: "https://fhir.kemkes.go.id/id/kk",
          value: data.kk,
        });
      }
    } else if (createBy === "mother_nik") {
      if (data.nik) {
        identifierArray.push({
          use: "official",
          system: "https://fhir.kemkes.go.id/id/nik-ibu",
          value: data.nik,
        });
      }
    }

    return identifierArray.length > 0 ? identifierArray : undefined;
  }

  private buildMaritalStatus(maritalStatus: MarriedStatusIdentifier): {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  } {
    const maritalData = maritalStatus.find(
      (item: (typeof maritalStatus)[number]) =>
        item.identifier === maritalStatus
    )!;
    return {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
          code: maritalData.code,
          display: maritalData.display,
        },
      ],
      text: maritalData.display,
    };
  }

  private buildContact(
    contact: Array<{ name: string; type: "phone" | "email"; value: string }>
  ): Array<ContactInterface> | undefined {
    if (contact && contact.length > 0) {
      return contact.map((item) => ({
        relationship: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                code: "C",
              },
            ],
          },
        ],
        name: {
          use: "official",
          text: item.name,
        },
        telecom: [
          {
            system: item.type,
            value: item.value,
            use: item.type === "phone" ? "mobile" : "home",
          },
        ],
      }));
    }
    return undefined;
  }

  private buildExtensions(data: { birthPlace?: { city: string } }): Array<{
    url: string;
    valueAddress?: { city: string; country: string };
    valueCode?: string;
  }> {
    const ext = [];
    if (data.birthPlace?.city) {
      ext.push({
        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace",
        valueAddress: { city: data.birthPlace.city, country: "ID" },
      });
    }
    ext.push({
      url: "https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus",
      valueCode: "WNI",
    });
    return ext;
  }

  private buildAddress({
    address,
  }: {
    address?: {
      line: string;
      city: string;
      postalCode?: string;
      country: string;

      provinceCode: string;
      cityCode: string;
      districtCode: string;
      villageCode: string;
      rt: string;
      rw: string;
    };
  }):
    | Array<{
        use: "home";
        line: string[];
        city: string;
        postalCode?: string;
        country: string;
        extension: Array<{
          url: string;
          extension: Array<{
            url: string;
            valueCode: string;
          }>;
        }>;
      }>
    | undefined {
    if (!address) return undefined;
    return [
      {
        use: "home" as const,
        line: [...(address.line ?? [])],
        city: address.city,
        postalCode: address.postalCode,
        country: "ID" as const,
        extension: [
          {
            url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
            extension: [
              {
                url: "province",
                valueCode: address.provinceCode,
              },
              {
                url: "city",
                valueCode: address.cityCode,
              },
              {
                url: "district",
                valueCode: address.districtCode,
              },
              {
                url: "village",
                valueCode: address.villageCode,
              },
              {
                url: "rw",
                valueCode: address.rw,
              },
              {
                url: "rt",
                valueCode: address.rt,
              },
            ],
          },
        ],
      },
    ];
  }

  /**
   * Format Create Patient Payload
   * @param createBy "nik" | "mother_nik"
   * @param data CreatePatientInput
   * @returns  FhirCreatePatient
   */
  formatCreatePayload(
    createBy: "nik" | "mother_nik",
    data: CreatePatientInput
  ): FhirCreatePatient {
    const nameParts = data.name.split(/\s+/);
    const family = nameParts.length > 1 ? nameParts.slice(-1)[0] : undefined;
    const given =
      nameParts.length > 1 ? nameParts.slice(0, -1) : [nameParts[0]];
    return {
      resourceType: "Patient",
      meta: {
        profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"],
      },
      identifier: this.buildIdentifier(createBy, data),
      active: true,
      name: [
        {
          use: "official",
          text: data.name,
          family: family,
          given: given.length > 0 ? given : undefined,
        },
      ],
      telecom: data.contact
        ? data.contact.flatMap((contact) => ({
            system: contact.type,
            value: contact.value,
            use: contact.type === "phone" ? "mobile" : "home",
          }))
        : undefined,
      gender: data.gender,
      birthDate: data.birthDate,
      deceasedBoolean: data.deceased ? data.deceased : undefined,
      address: this.buildAddress({ address: data.address })!,
      maritalStatus: this.buildMaritalStatus(data.maritalStatus),
      multipleBirthInteger: data.multipleBirthInteger
        ? data.multipleBirthInteger
        : 0,
      contact: this.buildContact(data.contact ?? []),
      communication: [
        {
          language: {
            coding: [
              {
                system: "urn:ietf:bcp:47",
                code: "id-ID",
                display: "Indonesian",
              },
            ],
            text: "Indonesian",
          },
          preferred: true,
        },
      ],
      extension: this.buildExtensions({ birthPlace: data.birthPlace }),
    };
  }

  /**
   * Format Patch Patient Payload
   * @param data PatchPatientInput
   * @param existingData ExistingPatient
   * @returns FhirPatchPatient[]
   */
  fromatPatchPayload(
    data: PatchPatientInput,
    existingData: ExistingPatient
  ): FhirPatchPatient[] {
    if (!data || !existingData) {
      throw new Error(
        "⚠️ Data baru dan data lama wajib disediakan untuk PATCH penuh."
      );
    }

    const patchOps: FhirPatchPatient[] = [];

    // ✅ Helper test & replace
    const testAndReplace = (
      path: string,
      oldValue: unknown,
      newValue: unknown
    ) => {
      if (
        oldValue === undefined ||
        oldValue === null ||
        newValue === undefined ||
        newValue === null
      ) {
        throw new Error(
          `⚠️ Field '${path}' wajib ada di data lama dan baru untuk PATCH.`
        );
      }
      patchOps.push({ op: "test", path, value: oldValue });
      patchOps.push({ op: "replace", path, value: newValue });
    };

    // 🔹 Name
    if (data.name) {
      testAndReplace("/name", existingData.name, [
        { use: "official", text: data.name },
      ]);
    }

    // 🔹 Gender
    if (data.gender) {
      testAndReplace("/gender", existingData.gender, data.gender);
    }

    // 🔹 BirthDate
    if (data.birthDate) {
      testAndReplace("/birthDate", existingData.birthDate, data.birthDate);
    }

    // 🔹 Identifier
    if (data.nik || data.ihs) {
      if (!existingData.identifier) {
        throw new Error(
          "⚠️ Field 'identifier' lama tidak ditemukan. PATCH dibatalkan."
        );
      }

      const newIdentifiers: ExistingPatient["identifier"] = [];

      if (data.nik) {
        newIdentifiers.push({
          system: "https://fhir.kemkes.go.id/id/nik",
          use: "official",
          value: data.nik,
        });
      }

      if (data.ihs) {
        newIdentifiers.push({
          system: "https://fhir.kemkes.go.id/id/ihs-number",
          use: "official",
          value: data.ihs,
        });
      }

      patchOps.push({
        op: "test",
        path: "/identifier",
        value: existingData.identifier,
      });

      patchOps.push({
        op: "replace",
        path: "/identifier",
        value: newIdentifiers,
      });
    }

    // 🔹 Marital Status
    if (data.maritalStatus) {
      const mapped = this.buildMaritalStatus(data.maritalStatus);

      patchOps.push({
        op: "replace",
        path: "/maritalStatus",
        value: mapped,
      });
    }

    // 🔹 Address
    if (data.address) {
      if (!existingData.address) {
        throw new Error(
          "⚠️ Field 'address' lama tidak ditemukan. PATCH dibatalkan."
        );
      }

      const newAddress = {
        use: "home",
        line: data.address.line ? [data.address.line] : [],
        city: data.address.city,
        postalCode: data.address.postalCode,
        country: "ID",
        extension: [
          {
            url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
            extension: [
              data.address.provinceCode && {
                url: "province",
                valueCode: data.address.provinceCode,
              },
              data.address.cityCode && {
                url: "city",
                valueCode: data.address.cityCode,
              },
              data.address.districtCode && {
                url: "district",
                valueCode: data.address.districtCode,
              },
              data.address.villageCode && {
                url: "village",
                valueCode: data.address.villageCode,
              },
              data.address.rt && {
                url: "rt",
                valueCode: data.address.rt,
              },
              data.address.rw && {
                url: "rw",
                valueCode: data.address.rw,
              },
            ].filter(Boolean),
          },
        ],
      };

      patchOps.push({
        op: "test",
        path: "/address",
        value: existingData.address,
      });

      patchOps.push({
        op: "replace",
        path: "/address",
        value: [newAddress],
      });
    }

    if (patchOps.length === 0) {
      throw new Error("⚠️ Tidak ada field yang bisa diubah.");
    }

    return patchOps;
  }
}
