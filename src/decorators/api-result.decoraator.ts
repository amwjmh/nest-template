import { Type, applyDecorators } from "@nestjs/common";
import { getSchemaPath, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { ResultData } from "../common/result";

const baseTypeNames = ["String", "Number", "Boolean"];

export function ApiResult <TModel extends Type<any>>(model?: TModel, isArray?: boolean, isPager?: boolean) {
  let items = null;
  const modelIsBaseType = model && baseTypeNames.includes(model.name);
  if (modelIsBaseType) {
    items = { type: model.name.toLocaleLowerCase() };
  } else {
    items = { $ref: getSchemaPath(model) };
  }
  let prop = null;
  if (isArray && isPager) {
    prop = {
      type: "object",
      properties: {
        list: {
          type: "array",
          items
        },
        total: {
          type: "number",
          default: 0
        }
      }
    };
  } else if (isArray) {
    prop = {
      type: "array",
      items
    };
  } else if (model) {
    prop = items;
  } else {
    prop = { type: "null", default: null };
  }
  return applyDecorators(
    ApiExtraModels(...(model && !modelIsBaseType ? [ResultData, model] : [ResultData])),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResultData) },
          {
            properties: {
              data: prop
            }
          }
        ]
      }
    }),
  );
}
