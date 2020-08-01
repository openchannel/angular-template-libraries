import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from './service/http-request-services';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';


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
        HttpRequestService, { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        {
          provide: 'environment', // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
