import { UploadService } from './shared/upload.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, UsuarioService, BreadcrumbService, SidebarService , ComboService, PersonalService} from './service.index';
import { AuthInterceptor } from './Interceptors/authconfig.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    BreadcrumbService,
    UsuarioService,
    ComboService,
    PersonalService,
    UploadService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class ServiceModule { }
