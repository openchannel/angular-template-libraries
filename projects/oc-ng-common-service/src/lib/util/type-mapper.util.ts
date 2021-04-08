import {cloneDeep, each, forIn, get, map, set} from 'lodash';
import {TypeFieldModel, TypeModel} from '../model/api/type-model';

export class TypeMapperUtils {

  /**
   * Inject default value into type fields.
   * @fields:
   * [{
   *   id: 'customData.text',
   *   defaultValue: 'any-value'
   * }]
   * @defaultValues:
   * {
   *   customData: {
   *     text: 'new-value'
   *   }
   * }
   * @return
   * [{
   *   id: 'customData.text',
   *   defaultValue: 'new-value'
   * }]
   */
  public static injectDefaultValues<T extends TypeFieldModel>(fields: T [], defaultValues: any): T[] {
    const clonedFields = cloneDeep(fields);
    if (clonedFields && defaultValues) {
      clonedFields.forEach(field => {
        field.defaultValue = get(defaultValues, field.id, field?.defaultValue);
        if (field?.fields) {
          this.injectDefaultValues(field.fields, defaultValues[field.id]);
        }
      });
    }
    return clonedFields;
  }


  /**
   * Normalize field options for type.
   * @fields: Example:
   * [{
   *  id: 'dropdown'
   *  options: [{
   *    value: 'first'
   *  },{
   *    value: 'second'
   *  }]
   * }]
   * @return: Example:
   * [{
   *  id: 'dropdown'
   *  options: ['first', 'second']
   * }]
   */
  public static normalizeOptions<T extends TypeFieldModel>(fields: T[]): T[] {
    const clonedFields: T[] = cloneDeep(fields);
    each(clonedFields, field => {
      if (field?.options) {
        field.options = map(field.options, (option) => option?.value);
      }
    });
    return clonedFields;
  }

  /**
   * Normalize field path(customData) before REST saving.
   * @data: Example:
   * {
   *  'customData.text': 'any-value;
   * }
   * @return: Example:
   * {
   *   customData: {
   *     text: 'any-value';
   *   }
   * }
   */
  public static buildDataForSaving(data: any): any {
    let result: any = {};
    forIn(data, (value, key) => result = set(result, key, value));
    return result;
  }

  public static createFormConfig<T extends TypeFieldModel>(type: TypeModel<T>, oldData: any): TypeModel<T> {
    if (type) {
      return set({...type}, 'fields', this.normalizeOptions(this.injectDefaultValues(type.fields, oldData)));
    }
    return type;
  }
}
