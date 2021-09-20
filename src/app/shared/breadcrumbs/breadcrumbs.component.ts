import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/models/breadcrumb';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/shared/breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]> | undefined;
  label: string = '';
  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
    console.log(this.breadcrumbs$);

    this.breadcrumbs$?.subscribe( breadcrumb => this.label = (breadcrumb.length > 0) ? breadcrumb[breadcrumb.length - 1].label: '');
  }



  ngOnInit(): void {
  }

}
