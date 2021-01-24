import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {
  constructor() { }

  setLocal(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocal(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  clearLocal(key) {
    localStorage.removeItem(key);
  }
}
