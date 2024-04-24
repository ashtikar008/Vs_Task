import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(users: User[], searchText: string): User[] {
    if (!users || !searchText) {
      return users;
    }

    searchText = searchText.toLowerCase();

    return users.filter(user =>
      user.name.toLowerCase().includes(searchText)
    );
  }
}
