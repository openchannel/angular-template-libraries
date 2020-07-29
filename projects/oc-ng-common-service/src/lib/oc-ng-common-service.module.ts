import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from './UserService/http-request-services';


@NgModule({
  declarations: [],
  imports: [HttpClientModule
  ],
  exports: []
})
export class OcCommonServiceModule {
  public static forRoot(environment: any): ModuleWithProviders {

    return {
      ngModule: OcCommonServiceModule,
      providers: [
        HttpRequestService,
        {
          provide: 'environment', // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
