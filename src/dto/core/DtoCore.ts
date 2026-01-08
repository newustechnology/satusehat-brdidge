import { contactPurpose } from "../../constan";

export class DtoCore {
  // private pushTelecomItems
  private pushTelecomItems = (
    result: FhirContactPoint[],
    system: FhirContactPoint["system"],
    items?: TelecomItem[]
  ) => {
    if (!items) return;
    items.forEach(({ value, use }) => {
      result.push({ system, value, use });
    });
  };
  /**
   *  Build Telecom
   * @param data
   * @returns
   */
  protected buildTelecom(
    data: TelecomInputSimple | TelecomInputArray[]
  ): FhirContactPoint[] {
    const result: FhirContactPoint[] = [];

    // ✅ Mode advanced (array of structured input)
    if (Array.isArray(data)) {
      data.forEach((item) => {
        this.pushTelecomItems(result, "phone", item.phone);
        this.pushTelecomItems(result, "email", item.email);
        this.pushTelecomItems(result, "url", item.url);
      });
      return result;
    }

    // ✅ Mode simple (string array → default work)
    return [
      ...(data.phone ?? []).map((value) => ({
        system: "phone" as const,
        value,
        use: "work" as const,
      })),
      ...(data.email ?? []).map((value) => ({
        system: "email" as const,
        value,
        use: "work" as const,
      })),
      ...(data.url ?? []).map((value) => ({
        system: "url" as const,
        value,
        use: "work" as const,
      })),
    ];
  }

  protected buildAddress(data: {
    street?: string;
    city?: string;
    postalCode?: string;

    provincecode?: string;
    citycode?: string;
    districtcode?: string;
    villagecode?: string;
    rt?: string;
    rw?: string;
  }): Array<FhirAddress> {
    if (!data.street || !data.city || !data.postalCode) return [];

    return [
      {
        use: "work",
        type: "both",
        line: [data.street],
        city: data.city,
        postalCode: data.postalCode,
        country: "ID",
        extension: [
          {
            url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
            extension: [
              ...(data.provincecode
                ? [{ url: "province", valueCode: data.provincecode }]
                : []),
              ...(data.citycode
                ? [{ url: "city", valueCode: data.citycode }]
                : []),
              ...(data.districtcode
                ? [{ url: "district", valueCode: data.districtcode }]
                : []),
              ...(data.villagecode
                ? [{ url: "village", valueCode: data.villagecode }]
                : []),
              ...(data.rw ? [{ url: "rw", valueCode: data.rw }] : []),
              ...(data.rt ? [{ url: "rt", valueCode: data.rt }] : []),
            ],
          },
        ],
      },
    ];
  }

  protected buildContact(
    contact?: Array<{
      purpose_code: ContactPurposeCode; // http://terminology.hl7.org/CodeSystem/contactentity-type
      name: string;
      phone?: string;
      email?: string;
      url?: string;
    }>
  ) {
    if (!contact?.length) return undefined;

    return contact.map((e) => ({
      purpose: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/contactentity-type",
            code: e.purpose_code,
            display:
              contactPurpose.find((c) => c.code === e.purpose_code)?.display ||
              "",
          },
        ],
      },
      name: {
        use: "official",
        text: e.name,
      },
      telecom: this.buildTelecom({
        phone: e.phone ? [e.phone] : undefined,
        email: e.email ? [e.email] : undefined,
        url: e.url ? [e.url] : undefined,
      }),
    }));
  }
}
