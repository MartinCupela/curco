import {ConvertOptions} from "@converter/libs.fixerio/src/types";

export interface ConvertSuccessResponse {
  "success": true,
  "query": ConvertOptions,
  "info": {
    "timestamp": number;
    "rate": number;
  },
  "date": string;
  "result": number;
}