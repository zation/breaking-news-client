import { schema } from 'relient/reducers';

export const user = new schema.Entity('user', {}, { idAttribute: 'address' });
export const news = new schema.Entity('news');
