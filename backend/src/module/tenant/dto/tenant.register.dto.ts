import { type } from "arktype";
import BaseDTO from "../../../common/dto/baseDto.js";

class RegisterDTO extends BaseDTO {
  static schema = type({
    name: type("string.trim").to("string >= 3"),
    email: "string.email",
    phone: "string",
    role: type("string").default("tenant"),
  });
}

export default RegisterDTO;
