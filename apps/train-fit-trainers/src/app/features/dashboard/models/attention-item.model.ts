export type AttentionItemType = 'pending_review' | 'checkin_overdue' | 'plan_ending_soon';

export interface AttentionItem {
  type: AttentionItemType;
  clientId: string;
  clientName: string;
  daysLeft?: number | null;
}
