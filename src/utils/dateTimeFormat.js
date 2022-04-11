import daysjs from 'dayjs';
import { DATETIME_FORMAT } from '../const/common';

export default function dateTimeFormat(params = '') {
    return `${daysjs(params).format(DATETIME_FORMAT)}`
}