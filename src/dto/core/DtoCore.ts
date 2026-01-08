import { contactPurpose } from "../../constan";

export class DtoCore {
  protected buildTelecom(data: {
    phone?: string[];
    email?: string[];
    url?: string[];
  }): Array<FhirContactPoint> {
    return [
      ...(data.phone
        ? data.phone.map((phone) => ({
            system: "phone" as const,
            value: phone,
            use: "work" as const,
          }))
        : []),
      ...(data.email
        ? data.email.map((email) => ({
            system: "email" as const,
            value: email,
            use: "work" as const,
          }))
        : []),
      ...(data.url
        ? data.url.map((url) => ({
            system: "url" as const,
            value: url,
            use: "work" as const,
          }))
        : []),
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
}
