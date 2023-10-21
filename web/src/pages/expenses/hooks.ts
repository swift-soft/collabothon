import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/api';
import { selectProfile } from '@/auth/state';
import { useAppSelector } from '@/store';
import {formatDayStats, formatMonthStats, formatWeekStats, formatYearStats} from '@/utils/string'

export const getUserStats = () => {
  const user = useAppSelector(selectProfile);
  const [isSender, setIsSender] = useState(false);

  const { id } = useParams();
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .rpc('get_user_stats', {from: new Date(), to: new Date()})
          .select()
          .returns<{ category: string; total: number; products: any[] }>();

        if (error) {
          throw new Error(error.message);
        } else {
          const userStatistics = data[0];
          setStatistics(userStatistics.products.map((product) => ({
            name: product.name,
            value: product.price * product.amount,
          })));
          setIsSender(userStatistics.source_account === user?.account_number);
        }
      } catch (err) {
        console.error((err as Error)?.message);
      }
    };

    fetchStatistics();
  }, [id, user]);

  return { statistics, user, isSender };
}
