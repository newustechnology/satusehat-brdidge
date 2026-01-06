class CompositionDTO {
  data: CompositionData;

  constructor({
    resourceType,
    category,
    author,
    section,
    ...body
  }: CompositionData) {
    this.data = {
      ...body,
      resourceType: resourceType || "Composition",
      category: category || [],
      author: author || [],
      section: section || [],
    };
  }

  static fromRequestBody(body: CompositionData) {
    return new CompositionDTO(body);
  }

  static formatCompositionData(body: CompositionData): CompositionData {
    const { data } = this.fromRequestBody(body);

    return data;
  }

  static formatCompositionPatchData(patchBody: any[]): any[] {
    if (!Array.isArray(patchBody)) {
      throw new Error("Body PATCH harus berupa array JSON Patch!");
    }
    return patchBody.map((operation) => {
      if (!operation.op || !operation.path || operation.value === undefined) {
        throw new Error("Format JSON Patch tidak valid!");
      }
      return operation;
    });
  }
}

export default CompositionDTO;
