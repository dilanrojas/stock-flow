import { useMemo } from 'react';
import { ChartBar, ChevronDoubleDown, ChevronDoubleUp } from '../../assets/icons';
import { useMovementStats } from '../../contexts/movements/movement-stats-context';
import StatusSkeleton from '../skeletons/status-skeleton';
import SectionStatus, { type SectionMetric } from '../ui/section-status';

export default function MovementsStatus() {
  const { stats, isLoading } = useMovementStats();

  const metrics = useMemo<SectionMetric[]>(() => {
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

  return (
    <SectionStatus
      metrics={metrics}
      isLoading={isLoading || !stats}
      skeleton={<StatusSkeleton count={3} />}
    />
  );
}
