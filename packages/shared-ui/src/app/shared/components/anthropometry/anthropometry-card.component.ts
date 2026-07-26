import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Anthropometry } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-anthropometry-card',
  templateUrl: './anthropometry-card.component.html',
  styleUrls: ['./anthropometry-card.component.scss'],
})
export class AnthropometryCardComponent implements OnInit {
  @Input() anthropometry: Anthropometry | null = null;
  @Input() showAddButton = false;
  @Output() addClick = new EventEmitter<void>();

  measurements: { key: keyof Anthropometry; label: string; icon: string; unit: string }[] = [];

  constructor(
    private translate: TranslateService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.measurements = [
      { key: 'weight', label: 'ANTHROPOMETRY.WEIGHT', icon: 'scale-outline', unit: 'kg' },
      { key: 'neck', label: 'ANTHROPOMETRY.NECK', icon: 'body-outline', unit: 'cm' },
      { key: 'chest', label: 'ANTHROPOMETRY.CHEST', icon: 'shirt-outline', unit: 'cm' },
      { key: 'bicepsRelaxed', label: 'ANTHROPOMETRY.BICEPS_RELAXED', icon: 'muscle-outline', unit: 'cm' },
      { key: 'bicepsContracted', label: 'ANTHROPOMETRY.BICEPS_CONTRACTED', icon: 'muscle-outline', unit: 'cm' },
      { key: 'waist', label: 'ANTHROPOMETRY.WAIST', icon: 'resize-outline', unit: 'cm' },
      { key: 'abdomen', label: 'ANTHROPOMETRY.ABDOMEN', icon: 'resize-outline', unit: 'cm' },
      { key: 'hip', label: 'ANTHROPOMETRY.HIP', icon: 'resize-outline', unit: 'cm' },
      { key: 'thighContracted', label: 'ANTHROPOMETRY.THIGH_CONTRACTED', icon: 'walk-outline', unit: 'cm' },
      { key: 'thighRelaxed', label: 'ANTHROPOMETRY.THIGH_RELAXED', icon: 'walk-outline', unit: 'cm' },
      { key: 'calf', label: 'ANTHROPOMETRY.CALF', icon: 'walk-outline', unit: 'cm' },
    ];
  }

  get hasData(): boolean {
    if (!this.anthropometry) return false;
    return this.measurements.some(m => this.anthropometry![m.key] !== undefined && this.anthropometry![m.key] !== null);
  }

  get displayDate(): string {
    if (!this.anthropometry?.date) return '';
    const date = new Date(this.anthropometry.date);
    return date.toLocaleDateString(this.translate.currentLang, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  getValue(key: keyof Anthropometry): string {
    const value = this.anthropometry?.[key];
    if (value === undefined || value === null) {
      return this.translate.instant('ANTHROPOMETRY.NO_DATA');
    }
    return `${value} ${this.measurements.find(m => m.key === key)?.unit || ''}`;
  }

  onAddClick(): void {
    this.addClick.emit();
  }
}