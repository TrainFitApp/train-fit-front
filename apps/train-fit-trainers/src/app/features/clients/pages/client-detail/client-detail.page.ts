import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: 'client-detail.page.html',
  styleUrls: ['client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {
  public name = '';
  public scopes: string = '';

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.name = this.route.snapshot.queryParamMap.get('name') || '';
    this.scopes = this.route.snapshot.queryParamMap.get('scopes') || '';
  }
}
