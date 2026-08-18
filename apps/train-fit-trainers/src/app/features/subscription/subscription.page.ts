import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerBillingApiService } from './services/trainer-billing-api.service';
import { TrainerEntitlements, TrainerTier } from './models/trainer-entitlements.model';

type ViewState = 'loading' | 'error' | 'loaded';

interface PlanCard {
  tier: TrainerTier;
  name: string;
  price: string;
  priceCaption: string;
  clientsLabel: string;
  features: string[];
}

@Component({
  selector: 'app-subscription',
  templateUrl: 'subscription.page.html',
  styleUrls: ['subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  public state: ViewState = 'loading';
  public entitlements: TrainerEntitlements | null = null;

  public readonly plans: PlanCard[] = [
    {
      tier: 'free',
      name: 'Free',
      price: '0€',
      priceCaption: 'para siempre',
      clientsLabel: 'Hasta 3 clientes',
      features: ['Invitar clientes', 'Asignar entrenamientos y objetivos', 'Ver entrenamiento y nutrición'],
    },
    {
      tier: 'trainer_pro',
      name: 'Pro',
      price: '19,90€',
      priceCaption: '/mes',
      clientsLabel: 'Hasta 15 clientes',
      features: ['Todo lo de Free', '2,90€ por cliente extra', 'Soporte prioritario'],
    },
    {
      tier: 'trainer_unlimited',
      name: 'Unlimited',
      price: '59,90€',
      priceCaption: '/mes',
      clientsLabel: 'Clientes ilimitados',
      features: ['Todo lo de Pro', 'Sin límite de clientes', 'Ideal para equipos y academias'],
    },
  ];

  constructor(
    private router: Router,
    private trainerBillingApi: TrainerBillingApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public ionViewWillEnter(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.trainerBillingApi.getEntitlements().subscribe({
      next: (entitlements) => {
        this.entitlements = entitlements;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public close(): void {
    void this.router.navigate(['/tabs/profile']);
  }

  public isCurrentPlan(tier: TrainerTier): boolean {
    return this.entitlements?.tier === tier;
  }

  public get usagePercent(): number {
    const limit = this.entitlements?.limits.clients;
    const used = this.entitlements?.usage.clients || 0;
    if (!limit) return 0;
    return Math.min(100, Math.round((used / limit) * 100));
  }

  public subscribe(plan: PlanCard): void {
    if (plan.tier === 'free' || this.isCurrentPlan(plan.tier)) return;

    this.ionicUtilService.showToast({
      message:
        'Los pagos dentro de la app llegan pronto — estamos configurando las tiendas de aplicaciones.',
      duration: 3500,
    });
  }
}
