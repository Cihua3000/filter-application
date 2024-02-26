import {CriteriaType} from "./enums";

export type Filter = {
  name: string,
  selection: string,
  criteria: Criteria[]
};

export type Criteria = {
  title: string,
  value: any | null,
  condition: string,
  type: string
};

export type FilterDetail = {
  filter: Filter
};


export type CriteriaRowType = {
  title: string,
  value: string,
  condition: string,
  type: CriteriaType
}

export type FilterFormData = {login: string; password: string, rememberLogin: boolean};