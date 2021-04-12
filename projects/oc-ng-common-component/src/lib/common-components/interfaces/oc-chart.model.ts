export interface ChartStatisticModel {

  layout: ChartLayoutTypeModel.standard;
  data: ChartStatisticDataModel;
  fields: ChartStatisticFiledModel [];
  periods: ChartStatisticParameterModel [];
}

export interface ChartStatisticDataModel {
  labelsY: number [];
  labelsX: string[] | number [];
}

export interface ChartStatisticFiledModel extends ChartStatisticParameterModel {
  icon?: string;
}

export interface ChartOptionsChange {
  field: ChartStatisticFiledModel;
  period: ChartStatisticParameterModel;
}

export interface ChartStatisticParameterModel {
  id: string;
  label: string;
  active?: boolean;
}

export enum ChartLayoutTypeModel {
  standard = 'standard'
}
