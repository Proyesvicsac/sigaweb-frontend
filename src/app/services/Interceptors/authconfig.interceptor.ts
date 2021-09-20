import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: UsuarioService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}
