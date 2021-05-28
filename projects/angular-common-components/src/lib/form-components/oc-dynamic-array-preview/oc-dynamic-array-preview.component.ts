import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldValueModel, PreviewFieldModel } from '../model/dynamic-array.model';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isArray } from 'rxjs/internal-compatibility';
import { FileDetails, FileUploaderService } from '../model/file.model';
import { difference } from 'lodash';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-dynamic-array-preview',
    templateUrl: './oc-dynamic-array-preview.component.html',
    styleUrls: ['./oc-dynamic-array-preview.component.scss'],
})
export class OcDynamicArrayPreviewComponent implements OnInit, OnChanges, OnDestroy {
    readonly DYNAMIC_FIELD_ARRAY_KEY = 'dynamicFieldArray';

    @Input() fieldValues: FieldValueModel[];
    @Input() fieldDefinition: AppTypeFieldModel;
    @Input() dfaForm: FormGroup;
    @Input() hideLabel = false;

    previewFields: PreviewFieldModel[];
    private destroy$: Subject<void> = new Subject();

    constructor(private fileService: FileUploaderService) {
    }

    ngOnInit(): void {
        this.buildFieldsData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (difference(changes.fieldValues.currentValue, changes.fieldValues.previousValue)?.length > 0) {
            this.buildFieldsData();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    buildFieldsData(): void {
        if (this.fieldDefinition?.fields) {
            this.previewFields = this.fieldDefinition.fields.map(field => {
                const result: PreviewFieldModel = {
                    isValidField: false,
                    fieldValue: null,
                    formArrayDFA: null,
                    ...field
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
                    this.getFileDetails(result, tempFiledValue)
                        .subscribe(fileDetails => result.fieldValue = fileDetails);
                } else {
                    result.fieldValue = tempFiledValue;
                }
                return result;
            });
        } else {
            this.previewFields = [];
        }
    }

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

    private getFileDetails(filedModel: PreviewFieldModel, arrayOfIdOrUrl: any): Observable<FileDetails[] | FileDetails> {
        if (filedModel.type === 'multiFile' || filedModel.type === 'multiPrivateFile') {
            return this.convertFileIdToUrl(arrayOfIdOrUrl);
        } else if (filedModel.type === 'singleFile' || filedModel.type === 'privateSingleFile') {
            return this.convertFileIdToUrl([arrayOfIdOrUrl])
                .pipe(map(files => files[0]));
        }
    }

    private convertFileIdToUrl(fileId: string []): Observable<FileDetails[]> {
        if (isArray(fileId)) {
            return forkJoin(fileId.filter(f => typeof f === 'string').map(f => this.fileService.fileDetailsRequest(f))).pipe(
                takeUntil(this.destroy$),
            );
        }
        return of([]);
    }
}
