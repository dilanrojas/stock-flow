export type StatusCardState = 'excelent' | 'good' | 'poor' | 'critical';

export interface StatusCardProps {
  title: string;
  state: StatusCardState;
  data: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
