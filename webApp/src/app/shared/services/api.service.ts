import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Error_Message } from '../enums/common.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private storageKey = 'users';

  constructor() { }

  public getLocalStorageUsers(): User[] {
    const usersString = localStorage.getItem(this.storageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  private setLocalStorageUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  getUsers(): Observable<User[]> {
    return of(this.getLocalStorageUsers());
  }

  addUser(user: User): Observable<User> {
    let users = this.getLocalStorageUsers();
    user.id = users.length + 1; // Generate a unique ID
    users.push(user);
    this.setLocalStorageUsers(users);
    return of(user);
  }

  getUserById(id: number): User {
    const users = this.getLocalStorageUsers();
    const user = users.find(u => u.id === id);
    if (user) {
      return user;
    } else {
      throw new Error(Error_Message.USER_NOT_FOUND);
    }
  }
  updateUser(user: User, index: number): Observable<User> {
    let users = this.getLocalStorageUsers();
    if (index >= 0 && index < users.length) {
      users[index] = user;
      this.setLocalStorageUsers(users);
      return of(user);
    } else {
      return throwError(Error_Message.USER_NOT_FOUND);
    }
  }

  deleteUser(index: number): Observable<void> {
    let users = this.getLocalStorageUsers();
    if (index >= 0 && index < users.length) {
      users.splice(index, 1);
      this.setLocalStorageUsers(users);
      return of(undefined);
    } else {
      return throwError(Error_Message.USER_NOT_FOUND);
    }
  }
}  