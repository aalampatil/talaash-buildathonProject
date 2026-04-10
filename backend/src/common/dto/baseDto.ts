import { type } from "arktype";

class BaseDTO {
  static schema = type({});

  static getType() {
    return this.schema.infer;
  }

  static parse(data: unknown) {
    return this.schema(data);
  }
}

export default BaseDTO;
