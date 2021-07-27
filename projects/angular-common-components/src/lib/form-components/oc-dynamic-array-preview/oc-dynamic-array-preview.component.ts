import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldValueModel, PreviewFieldModel } from '../model/dynamic-array.model';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isArray } from 'rxjs/internal-compatibility';
import { FileDetails, FileUploaderService } from '../model/file.model';
import { difference } from 'lodash';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';

/**
 * Dynamic array preview component.
 * A group of field previews, rendered depending in fields type.
 * Also can contain templates of different entities like rich text, tags, datetime etc.
 */
@Component({
    selector: 'oc-dynamic-array-preview',
    templateUrl: './oc-dynamic-array-preview.component.html',
    styleUrls: ['./oc-dynamic-array-preview.component.css'],
})
export class OcDynamicArrayPreviewComponent implements OnInit, OnChanges, OnDestroy {
    readonly DYNAMIC_FIELD_ARRAY_KEY = 'dynamicFieldArray';

    /**
     * Array of field values.
     * @type {FieldValueModel}.
     */
    @Input() fieldValues: FieldValueModel[];

    /**
     * Field definition, performing its description model.
     * @type {AppTypeFieldModel}.
     */
    @Input() fieldDefinition: AppTypeFieldModel;

    /**
     * A form group instance.
     * Contains form controls.
     * @type {FormGroup}.
     */
    @Input() dfaForm: FormGroup;

    /**
     * Hides or shows label component with text for a specific field.
     * @type {boolean}.
     * @default: false.
     */
    @Input() hideLabel: boolean = false;

    /**
     * Array of preview fields.
     * @type {PreviewFieldModel[]}.
     * @default: false.
     */
    previewFields: PreviewFieldModel[];

    private destroy$: Subject<void> = new Subject();

    constructor(private fileService: FileUploaderService) {}

    /**
     * This method builds fields data on init.
     */
    ngOnInit(): void {
        this.buildFieldsData();
    }

    /**
     * Checks component changes and dynamically updates fields data.
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (difference(changes.fieldValues.currentValue, changes.fieldValues.previousValue)?.length > 0) {
            this.buildFieldsData();
        }
    }

    /**
     * Is called when a user closes component.
     * Unsubscription of subjects.
     */
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    /**
     * Mapping the fields definition, creating new object as a PreviewFieldModel.
     * Returns result object.
     */
    buildFieldsData(): void {
        if (this.fieldDefinition?.fields) {
            this.previewFields = this.fieldDefinition.fields.map(field => {
                const result: PreviewFieldModel = {
                    isValidField: false,
                    fieldValue: null,
                    formArrayDFA: null,
                    ...field,
                };
                let tempFiledValue: any = null;

                if (this.fieldValues && field) {
                    tempFiledValue = this.fieldValues.find(value => field?.id === value.fieldId)?.fieldValue;
                }
                if (result.type === this.DYNAMIC_FIELD_ARRAY_KEY) {
                    result.formArrayDFA = this.dfaForm.get(result.id) as FormArray;
                }

                result.isValidField = this.isValidDataForFieldType(field.type, tempFiledValue);

                if (result.isValidField && this.isFileType(result.type)) {
                    this.getFileDetails(result, tempFiledValue).subscribe(fileDetails => (result.fieldValue = fileDetails));
                } else {
                    result.fieldValue = tempFiledValue;
                }
                return result;
            });
        } else {
            this.previewFields = [];
        }
    }

    /**
     * Private method.
     * Checks field type and returns field value equality as a boolean type.
     */
    private isValidDataForFieldType(type: string, fieldValue: any): boolean {
        switch (type) {
            case 'text':
            case 'richText':
            case 'longText':
            case 'videoUrl':
            case 'websiteUrl':
            case 'emailAddress':
            case 'singleImage':
            case 'singleFile':
            case 'privateSingleFile':
            case 'color':
            case 'dropdownList':
                return !fieldValue || typeof fieldValue === 'string';
            case 'number':
            case 'datetime':
            case 'date':
                return !fieldValue || typeof fieldValue === 'number';
            case 'multiImage':
            case 'multiFile':
            case 'multiPrivateFile':
                return !fieldValue || (Array.isArray(fieldValue) && !(fieldValue as []).find(url => typeof url !== 'string'));
            case 'tags':
            case 'booleanTags':
            case 'numberTags':
            case 'multiselectList':
                return !fieldValue || Array.isArray(fieldValue);
            case 'dynamicFieldArray':
                return Array.isArray(fieldValue) && typeof fieldValue[0] === 'object';
            case 'checkbox':
                return !fieldValue || typeof fieldValue === 'boolean';
            default:
                return false;
        }
    }

    /**
     * Private method.
     * Checks the file type to match one of the field types list.
     * Returns true or false.
     */
    private isFileType(fieldType: string): boolean {
        switch (fieldType) {
            case 'multiFile':
            case 'multiPrivateFile':
            case 'singleFile':
            case 'privateSingleFile':
                return true;
            default:
                return false;
        }
    }

    /**
     * Private method.
     * Checks the filed model type and returns FileDetails object or an array of FileDetails objects.
     * Calls convertFileIdToUrl() method and passes FileDetails as a parameter.
     */
    private getFileDetails(filedModel: PreviewFieldModel, arrayOfIdOrUrl: any): Observable<FileDetails[] | FileDetails> {
        if (filedModel.type === 'multiFile' || filedModel.type === 'multiPrivateFile') {
            return this.convertFileIdToUrl(arrayOfIdOrUrl);
        } else if (filedModel.type === 'singleFile' || filedModel.type === 'privateSingleFile') {
            return this.convertFileIdToUrl([arrayOfIdOrUrl]).pipe(map(files => files[0]));
        }
    }

    /**
     * Private method.
     * Takes fileId, can be string or string array.
     * Converts file ids to paths to files.
     * Returns an array of converted urls.
     */
    private convertFileIdToUrl(fileId: string[]): Observable<FileDetails[]> {
        if (isArray(fileId)) {
            return forkJoin(fileId.filter(f => typeof f === 'string').map(f => this.fileService.fileDetailsRequest(f))).pipe(
                takeUntil(this.destroy$),
            );
        }
        return of([]);
    }
}
