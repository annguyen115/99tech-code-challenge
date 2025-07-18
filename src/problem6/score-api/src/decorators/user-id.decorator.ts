import { User } from './user.decorator';
import { UserPayload } from '@appTypes/user-payload';

export const UserId = () => User('userId' as keyof UserPayload);
