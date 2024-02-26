import {CriteriaType, Selection} from "./enums";

export const conditionSettings = {
  numberOptions: [
    {label: 'More', value: 'MORE' },
    {label: 'Less', value: 'LESS'},
    {label: 'Equals', value: 'EQUALS'}
  ],
  textOptions: [
    {label: 'Starts with', value: 'STARTS_WITH' },
    {label: 'Equals', value: 'EQUALS'}
  ],
  dateOptions: [
    {label: 'From', value: 'FROM' },
    {label: 'Until', value: 'UNTIL'}
  ]
};

export const titleSettings = {
  numberOptions: [
    {label: 'Amount', value: 'amount' },
    {label: 'Wight', value: 'weight' }
  ],
  textOptions: [
    {label: 'Title', value: 'title'},
    {label: 'Description', value: 'description'}
  ],
  dateOptions: [
    {label: 'Start date', value: 'start_date' },
    {label: 'End date', value: 'end_date' }
  ]
};
export const getConditionByType = (type: CriteriaType) => {
  return getOptionsByType(type, conditionSettings);
}

export const getTitleByType = (type: CriteriaType) => {
  return getOptionsByType(type, titleSettings);
}
export const getOptionsByType = (type: CriteriaType, settings: any) => {
  switch (type) {
    case CriteriaType.DATE:
      return settings["dateOptions"]
    case CriteriaType.NUMBER:
      return settings["numberOptions"]
    case CriteriaType.TEXT:
      return settings["textOptions"]
  }
}

export const selections = [
  {
    gender: Selection.ONE,
    label: "Selection 1"
  },
  {
    gender: Selection.TWO,
    label: "Selection 2"
  },
  {
    gender: Selection.THREE,
    label: "Selection 3"
  }
]