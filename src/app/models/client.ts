import { Bill } from './bill';
import { Region } from './region';

export class Client {
  name: String;
  last_name: String;
  id: Number;
  create_at: String;
  email: String;
  image: String;
  region: Region;
  bills: Bill[] =[];
}
