import type { ComponentType, SVGProps } from 'react';
import type { StatusCardState } from '../../../lib/types/status-card';
import StatusCard from '../ui/status-card';

export interface SectionMetric {
  title: string;
  data: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  state: StatusCardState;
}

interface SectionStatusProps {
  metrics: SectionMetric[];
  skeleton?: React.ReactNode;
  isLoading?: boolean;
}

export default function SectionStatus({ metrics, skeleton, isLoading }: SectionStatusProps) {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  return (
    <div className='flex gap-2'>
      {metrics.map((metric) => (
        <StatusCard
          key={metric.title}
          title={metric.title}
          data={metric.data}
          icon={metric.icon}
          state={metric.state}
        />
      ))}
    </div>
  );
}