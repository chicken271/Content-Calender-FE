import { Status } from "./status";
import { Type } from "./type";

export interface IContent {
  id?: number,
  title: String,
  description: String,
  status: Status,
  contentType: Type,
  dateCreated: Date,
  dateUpdated?: Date | null,
  url: String
}