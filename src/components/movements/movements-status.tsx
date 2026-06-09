import { useMemo } from 'react';
import type { StatusCardState } from '../../../lib/types/status-card';
import { ChartBar, ChevronDoubleDown, ChevronDoubleUp } from '../../assets/icons';
import { useMovementStats } from '../../contexts/movement-stats-context';
import StatusCard from '../ui/status-card';

export default function MovementsStatus() {
  const { stats, isLoading } = useMovementStats();

  const metrics = useMemo(() => {
    if (!stats) return [];

    const { totalMovements, totalInflows, totalOutflows } = stats;

    return [
      {
        title: 'Total Movements',
        data: totalMovements,
        icon: ChartBar,
        state: 'excelent',
      },
      {
        title: 'Inflows',
        data: totalInflows,
        icon: ChevronDoubleUp,
        state: 'good',
      },
      {
        title: 'Outflows',
        data: totalOutflows,
        icon: ChevronDoubleDown,
        state: totalOutflows > totalInflows ? 'critical' : 'good',
      },
    ];
  }, [stats]);

  if (isLoading || !stats) {
    return (
      <div className='flex gap-2'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='flex-1 h-24 rounded-lg bg-gray-200 animate-pulse'
          />
        ))}
      </div>
    );
  }

  return (
    <div className='flex gap-2'>
      {metrics.map((metric) => (
        <StatusCard
          key={metric.title}
          title={metric.title}
          data={metric.data}
          icon={metric.icon}
          state={metric.state as StatusCardState}
        />
      ))}
    </div>
  );
}
