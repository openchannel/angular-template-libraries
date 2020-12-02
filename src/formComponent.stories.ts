import { OcCommonLibModule } from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { moduleMetadata } from '@storybook/angular';
import { OcFormComponent } from '../projects/oc-ng-common-component/src/lib/oc-form/oc-form.component';
import {FileDetails, FileUploadDownloadService} from 'oc-ng-common-service';
import {Observable, of} from 'rxjs';

class StubFileUploadDownloadService {
  constructor() {}
  uploadToOpenchannel(file: FormData, isPrivate?: boolean): Observable<any> {
    return new Observable();
  }
  prepareUploadReq(token: any, file: any, isPrivate: any): Observable<any> {
    return new Observable();
  }
  getToken(): Observable<any> {
    return new Observable();
  }
  downloadFileDetails(fileId: any): Observable<FileDetails> {
    return new Observable();
  }
  downloadFileFromUrl(fileUrl: any): Observable<any> {
    return new Observable();
  }
  getVideoData(videoUrl: any): Observable<any> {
    if (videoUrl === 'https://www.youtube.com/watch?v=DGQwd1_dpuc') {
      return of({
        url: 'https://youtu.be/DGQwd1_dpuc',
        meta: {
          author_url: 'https://www.youtube.com/channel/UCjzHeG1KWoonmf9d5KBvSiw',
          canonical: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
          site: 'YouTube',
          media: 'player',
          views: '9224837',
          dislikes: '2056',
          likes: '58760',
          duration: 10913,
          description: 'Relaxing music with beautiful nature videos for ultimate relaxation. Peaceful piano & guitar music ("Happy Times ★152") with ocean waves that can be used as study music, sleep music, music during work or as background music during the day. Instrumental music composed by Peder B. Helland for Soothing Relaxation. Listen to more ► https://www.youtube.com/watch?v=9Q634rbsypE&index=1&list=PLQ_PIlf6OzqIbDAB-ErHx6LYIsseKs8Eg\nDownload on Bandcamp: https://soothingrelaxation.bandcamp.com/track/happy-times-152-short\n\n------------------------------------------------------------------------------\n~Recommended playlists from Soothing Relaxation~\nPiano Music ► https://www.youtube.com/watch?v=lCOF9LN_Zxs&index=1&list=PLQ_PIlf6OzqIbDAB-ErHx6LYIsseKs8Eg\nSleep Music ► https://www.youtube.com/watch?v=MN_JP4gyBNI&index=2&list=PLQ_PIlf6OzqIeQygYMd8DccQ3XnJlSGcG\nCeltic Music ► https://www.youtube.com/watch?v=BiqlZZddZEo&list=PLQ_PIlf6OzqLhEYzczrT-qGZy2lhx_Gga&index=1\nRomantic Music ► https://www.youtube.com/watch?v=aXYtJB7Qslk&list=PLQ_PIlf6OzqI5e0fYBXTN8cSjgEBD-Seh&index=1\nHarp Music ► https://www.youtube.com/watch?v=7TO_oHxuk6c&list=PLQ_PIlf6OzqIhLKzweFz88-N8zntaZm-K&index=1\n\n------------------------------------------------------------------------------\n~My social links~\nInstagram ► https://www.instagram.com/PederBHelland/\nFacebook ► https://www.facebook.com/PederBHelland\nTwitter ► https://twitter.com/PederBHelland\nSnapchat ► @PederBHelland\nSoothing Relaxation on Facebook ► https://www.facebook.com/SoothingRelaxation\n\n------------------------------------------------------------------------------\nMusic by Peder B. Helland. \nStock media provided by Pond5.\n\n------------------------------------------------------------------------------\nI am a composer from Norway and I started this channel with a simple vision: to create a place that you can visit whenever you want to sit down and relax. I compose music that can be labeled as for example: sleep music, calm music, yoga music, study music, peaceful music, beautiful music and relaxing music. I love to compose music and I put a lot of work into it. \n\nThank you very much for listening and for leaving feedback. All your warm support really inspires me to work even harder on my music. If you enjoy my work, I would be very happy if you decided to subscribe and join our community. Have a wonderful day or evening!\n\n~Peder B. Helland\n\n------------------------------------------------------------------------------\n~Places to download my music~\nItunes ► https://itunes.apple.com/us/artist/peder-b.-helland/id670633352\nBandcamp ► http://soothingrelaxation.bandcamp.com\nAmazon ► http://www.amazon.com/s/ref=ntt_srch_drd_B00FGLK06C?ie=UTF8&field-keywords=Peder%20B.%20Helland&index=digital-music&search-type=ss\nGoogle Play ►https://play.google.com/store/music/artist/Peder_B_Helland?id=Aknsdtud7aeouew6ny2zv5d3xhq\nSoothing Relaxation ►https://soothingrelaxation.com/\n\n------------------------------------------------------------------------------\n~My other channels~\nPeder B. Helland ► https://www.youtube.com/user/MusicLoverOriginals\nSoothing Lullabies ► https://www.youtube.com/channel/UC5bksAOJAJtF0IWMXTokvIA\nSoothing Tutorials ►https://www.youtube.com/channel/UCMKyhgW30pNIBu9NMeiGf9Q\n\n\n#relax\n#relaxingmusic\n#guitar\n#piano',
          author: 'Soothing Relaxation',
          date: '2018-10-10T15:45:02.000Z',
          title: 'Relaxing Music with Beautiful Nature - Peaceful Piano & Guitar Music by Soothing Relaxation'
        },
        html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2FDGQwd1_dpuc&amp;key=37e96b37fac1aa5b67e77eb5142641c6" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media *; accelerometer; gyroscope; picture-in-picture"></iframe></div></div>',
      });
    }
    return of({});
  }
}

const modules = {
  imports: [OcCommonLibModule],
  providers: [
    {provide: FileUploadDownloadService, useClass: StubFileUploadDownloadService},
  ],
};

export default {
  title: 'Form Group Component',
  component: OcFormComponent,
  decorators: [
    moduleMetadata(modules),
  ],
  argTypes: { formSubmitted: { action: 'Form Data' }}
};

const FormGroupComponent = (args: OcFormComponent) => ({
  component: OcFormComponent,
  moduleMetadata: modules,
  props: args
});

export const FormWithTestData = FormGroupComponent.bind({});

FormWithTestData.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
    {
      id: 'name',
      label: 'name',
      description: 'test',
      defaultValue: null,
      type: 'text',
      required: null,
      attributes: {
        maxChars: 20,
        required: true,
        minChars: 10
      },
      options: null,
      subFieldDefinitions: null
    },
    {
      id: 'role',
      label: 'role',
      description: '',
      defaultValue: null,
      type: 'dropdownList',
      required: null,
      attributes: {required: true},
      options: ['admin', 'user', 'test'],
      subFieldDefinitions: null
    },
    {
      id: 'aboutme',
      label: 'aboutme',
      description: '',
      defaultValue: null,
      type: 'richText',
      required: null,
      attributes: {
        maxChars: 150,
        required: null,
        minChars: 10
      },
      options: null,
      subFieldDefinitions: null
    },
    {
      id: 'skills',
      label: 'skills',
      description: 'skills',
      defaultValue: ['angular'],
      type: 'tags',
      required: null,
      attributes: {
        minCount: 1,
        maxCount: 5,
        required: true
      }, options: null,
      subFieldDefinitions: null
    }]
  }
};

export const FormWithRequiredOnly = FormGroupComponent.bind({});

FormWithRequiredOnly.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        id: 'name',
        label: 'name',
        description: 'test',
        defaultValue: null,
        type: 'text',
        required: null,
        attributes: {
          maxChars: null,
          required: true,
          minChars: null
        },
        options: null,
        subFieldDefinitions: null
      },
      {
        id: 'role',
        label: 'role',
        description: '',
        defaultValue: null,
        type: 'dropdownList',
        required: null,
        attributes: {required: true},
        options: ['admin', 'user', 'test'],
        subFieldDefinitions: null
      },
      {
        id: 'aboutme',
        label: 'aboutme',
        description: '',
        defaultValue: null,
        type: 'richText',
        required: null,
        attributes: {
          maxChars: null,
          required: null,
          minChars: null
        },
        options: null,
        subFieldDefinitions: null
      },
      {
        id: 'skills',
        label: 'skills',
        description: 'skills',
        defaultValue: ['angular'],
        type: 'tags',
        required: null,
        attributes: {
          minCount: null,
          maxCount: null,
          required: true
        }, options: null,
        subFieldDefinitions: null
      }]
  }
};

export const FormWithNumberInput =  FormGroupComponent.bind({});

FormWithNumberInput.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          max:	25,
          min:	5,
          required:	null,
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	'',
        id:	'test-number',
        isOpen:	false,
        isValid:	true,
        label:	'Test number',
        placeholder:	null,
        type:	'number',
      }
    ]
  }
};

export const FormWithCheckboxComponent = FormGroupComponent.bind({});

FormWithCheckboxComponent.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	true,
        description:	'',
        id:	'test-checkbox',
        isOpen:	false,
        isValid:	true,
        label:	'Test Checkbox',
        placeholder:	null,
        type:	'checkbox'
      }
    ]
  }
};

export const FormWithEmailComponent = FormGroupComponent.bind({});

FormWithEmailComponent.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	'',
        id:	'test-email',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test email',
        placeholder:	'enter email',
        type:	'emailAddress'
      }
    ]
  }
};

export const FormWithUrlComponent = FormGroupComponent.bind({});

FormWithUrlComponent.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-url-component',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test URL component',
        placeholder:	'Enter your link here..',
        type:	'websiteUrl'
      }
    ]
  }
};

export const FormWithColorComponent = FormGroupComponent.bind({});

FormWithColorComponent.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-color-component',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test Color Component',
        placeholder:	'Choose your color',
        type:	'color'
      }
    ]
  }
};

export const FormWithBooleanTags = FormGroupComponent.bind({});

FormWithBooleanTags.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true,
          maxCount:	null,
          minCount:	null
        },
        options: ['true', 'false'],
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-boolean-tags',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test Boolean tags',
        placeholder:	null,
        type:	'booleanTags'
      }
    ]
  }
};

export const FormWithNumberTags = FormGroupComponent.bind({});

FormWithNumberTags.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true,
          maxCount:	2,
          minCount:	1
        },
        options: ['1', '3', '45'],
        category:	'CUSTOM',
        defaultValue:	[],
        description:	null,
        id:	'test-number-tags',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test number tags',
        placeholder:	null,
        type:	'numberTags'
      }
    ]
  }
};

export const FormWithDateAndDateTime = FormGroupComponent.bind({});

FormWithDateAndDateTime.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true,
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-date-picker',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test Date picker',
        placeholder:	null,
        type:	'date'
      },
      {
        attributes:	{
          required:	true,
        },
        category:	'CUSTOM',
        defaultValue:	1602489693553,
        description:	null,
        id:	'test-datetime-picker',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test date-time picker',
        placeholder:	null,
        type:	'datetime'
      }
    ]
  }
};

export const FormWithVideoUrlComponent = FormGroupComponent.bind({});

FormWithVideoUrlComponent.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true,
        },
        category:	'CUSTOM',
        defaultValue:	'https://www.youtube.com/watch?v=DGQwd1_dpuc',
        description:	null,
        id:	'test-video-url-comp',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Test videoUrl component',
        placeholder:	null,
        type:	'videoUrl'
      },
    ]
  }
};

export const FormWithMultiSelect = FormGroupComponent.bind({});

FormWithMultiSelect.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          required:	true,
          maxCount:	3,
          minCount:	2
        },
        options: ['One', 'Two', 'Three', 'Five'],
        category:	'CUSTOM',
        defaultValue:	[],
        description:	null,
        id:	'multi-select-test',
        isOpen:	false,
        isValid:	true,
        deleteable:	false,
        label:	'Multi Select test',
        placeholder:	null,
        type:	'multiselectList'
      }
    ]
  }
};

export const FormWithDynamicFieldArray = FormGroupComponent.bind({});

FormWithDynamicFieldArray.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes: {
          maxCount: 3,
          minCount: 1,
          ordering: 'append',
          required:	true,
          rowLabel:	'field1'
        },
        required: null,
        rowLabel: null,
        category: 'CUSTOM',
        defaultValue: null,
        description: '',
        id: 'test-dynamic-field-array',
        isOpen: false,
        isValid: true,
        label: 'Test Dynamic field array',
        placeholder: null,
        subFieldDefinitions: [
          {
            attributes: {
              maxChars: null,
              minChars: null,
              required: null
            },
            category: 'CUSTOM',
            defaultValue: null,
            description: 'some description',
            id: 'field1',
            isOpen: false,
            isValid: true,
            label: 'field1',
            placeholder: 'write some text',
            type: 'text'
          },
          {
            id:	'long-text-example',
            label: 'Long Text Example',
            type:	'longText',
            placeholder: 'Write your text here...',
            category: 'CUSTOM',
            defaultValue: null,
            attributes: {
              maxChars:	200,
              required:	null,
              minChars:	2
            },
          }
        ],
        type: 'dynamicFieldArray'
      }
    ]
  }
};

export const FormWithDynamicFieldArraySecondLvl = FormGroupComponent.bind({});

FormWithDynamicFieldArraySecondLvl.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes: {
          maxCount: null,
          minCount: null,
          ordering: 'append',
          required:	null,
          rowLabel:	null
        },
        required: null,
        rowLabel: null,
        category: 'CUSTOM',
        defaultValue: null,
        description: '',
        id: 'test-dynamic-field-array',
        isOpen: false,
        isValid: true,
        label: 'Test Dynamic field array',
        placeholder: null,
        subFieldDefinitions: [
          {
            attributes: {
              maxChars: null,
              minChars: null,
              required: null
            },
            category: 'CUSTOM',
            defaultValue: null,
            description: 'some description',
            id: 'field1',
            isOpen: false,
            isValid: true,
            label: 'field1',
            placeholder: 'write some text',
            type: 'text'
          },
          {
            id:	'long-text-example',
            label: 'Long Text Example',
            type:	'longText',
            placeholder: 'Write your text here...',
            category: 'CUSTOM',
            defaultValue: null,
            attributes: {
              maxChars:	200,
              required:	null,
              minChars:	2
            },
          },
          {
            attributes: {
              maxCount: null,
              minCount: null,
              ordering: 'append',
              required:	null,
              rowLabel:	null
            },
            required: null,
            rowLabel: null,
            category: 'CUSTOM',
            defaultValue: null,
            description: '',
            id: 'test-dynamic-field-array-2',
            isOpen: false,
            isValid: true,
            label: 'Test Dynamic field array 2',
            placeholder: null,
            subFieldDefinitions: [
              {
                attributes: {
                  maxChars: null,
                  minChars: null,
                  required: null
                },
                category: 'CUSTOM',
                defaultValue: null,
                description: 'some description',
                id: 'field1',
                isOpen: false,
                isValid: true,
                label: 'field1',
                placeholder: 'write some text',
                type: 'text'
              }
            ],
            type: 'dynamicFieldArray'
          }
        ],
        type: 'dynamicFieldArray'
      }
    ]
  }
};

export const FormWithDynamicFieldArrayThirdLvl = FormGroupComponent.bind({});

FormWithDynamicFieldArrayThirdLvl.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes: {
          maxCount: null,
          minCount: null,
          ordering: 'append',
          required:	null,
          rowLabel:	null
        },
        required: null,
        rowLabel: null,
        category: 'CUSTOM',
        defaultValue: null,
        description: '',
        id: 'test-dynamic-field-array',
        isOpen: false,
        isValid: true,
        label: 'Test Dynamic field array',
        placeholder: null,
        subFieldDefinitions: [
          {
            attributes: {
              maxChars: null,
              minChars: null,
              required: null
            },
            category: 'CUSTOM',
            defaultValue: null,
            description: 'some description',
            id: 'field1',
            isOpen: false,
            isValid: true,
            label: 'field1',
            placeholder: 'write some text',
            type: 'text'
          },
          {
            id:	'long-text-example',
            label: 'Long Text Example',
            type:	'longText',
            placeholder: 'Write your text here...',
            category: 'CUSTOM',
            defaultValue: null,
            attributes: {
              maxChars:	200,
              required:	null,
              minChars:	2
            },
          },
          {
            attributes: {
              maxCount: null,
              minCount: null,
              ordering: 'append',
              required:	null,
              rowLabel:	null
            },
            required: null,
            rowLabel: null,
            category: 'CUSTOM',
            defaultValue: null,
            description: '',
            id: 'test-dynamic-field-array-2',
            isOpen: false,
            isValid: true,
            label: 'Test Dynamic field array 2',
            placeholder: null,
            subFieldDefinitions: [
              {
                attributes: {
                  maxChars: null,
                  minChars: null,
                  required: null
                },
                category: 'CUSTOM',
                defaultValue: null,
                description: 'some description',
                id: 'field2',
                isOpen: false,
                isValid: true,
                label: 'field2',
                placeholder: 'write some text',
                type: 'text'
              },
              {
                attributes: {
                  maxCount: null,
                  minCount: 1,
                  ordering: 'append',
                  required:	false,
                  rowLabel:	null
                },
                required: null,
                rowLabel: null,
                category: 'CUSTOM',
                defaultValue: null,
                description: '',
                id: 'test-dynamic-field-array-3',
                isOpen: false,
                isValid: true,
                label: 'Test Dynamic field array 3',
                placeholder: null,
                subFieldDefinitions: [
                  {
                    id:	'long-text-example2',
                    label: 'Long Text Example2',
                    type:	'longText',
                    placeholder: 'Write your text here...',
                    category: 'CUSTOM',
                    defaultValue: null,
                    attributes: {
                      maxChars:	200,
                      required:	null,
                      minChars:	2
                    },
                  }
                ],
                type: 'dynamicFieldArray'
              }
            ],
            type: 'dynamicFieldArray'
          }
        ],
        type: 'dynamicFieldArray'
      }
    ]
  }
};

export const FormWithUpdatedRichTextEditor = FormGroupComponent.bind({});

FormWithUpdatedRichTextEditor.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        id: 'rich-text-editor',
        label: 'Rich Text Editor',
        description: '',
        defaultValue: null,
        type: 'richText',
        required: null,
        attributes: {
          maxChars: 100,
          required: true,
          minChars: 10
        },
        options: null,
        subFieldDefinitions: null
      }
    ]
  }
};

export const FormWithFileUpload = FormGroupComponent.bind({});

FormWithFileUpload.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        id: 'file-upload',
        label: 'File Upload',
        description: '',
        defaultValue: null,
        type: 'multiFile',
        required: null,
        attributes: {
        },
        options: null,
        subFieldDefinitions: null
      }
    ]
  }
};
