export interface ComponentChartStatisticParameterModel {
  id: string;
  label: string;
  active?: boolean;
}

export interface ComponentsChartStatisticFiledModel extends ComponentChartStatisticParameterModel {
  icon?: string;
}

export interface ComponentChartOptions {
  field: ComponentsChartStatisticFiledModel;
  period: ComponentChartStatisticParameterModel;
}

export interface ComponentsChartStatisticDataModel {
  labelsY: number[];
  labelsX: string[] | number[];
}

export interface ComponentsChartStatisticModel {
  layout: ComponentsChartLayoutTypeModel.standard;
  data: ComponentsChartStatisticDataModel;
  fields: ComponentsChartStatisticFiledModel[];
  periods: ComponentChartStatisticParameterModel[];
}

export declare enum ComponentsChartLayoutTypeModel {
  standard = 'standard'
}
