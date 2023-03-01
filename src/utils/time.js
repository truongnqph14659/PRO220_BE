import dayjs from 'dayjs';
export const getStartAndEndOfByTime = (type, time) => {
    switch (type) {
        case 'date':
            return {
                start: dayjs(time).startOf('day')['$d'],
                end: dayjs(time).endOf('day')['$d'],
            };
        case 'week':
            const startIncrease = dayjs(time).startOf('w');
            const endIncrease = dayjs(time).endOf('w');
            return {
                start: dayjs(startIncrease).add(1, 'd')['$d'],
                end: dayjs(endIncrease).add(1, 'd')['$d'],
            };
        case 'month':
            return {
                start: dayjs(time).startOf('M')['$d'],
                end: dayjs(time).endOf('M')['$d'],
            };
        case 'year':
            return {
                start: dayjs(time).startOf('y')['$d'],
                end: dayjs(time).endOf('y')['$d'],
            };
        default:
            return {
                start: dayjs(time[0])['$d'],
                end: dayjs(time[1])['$d'],
            };
    }
};
