import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private _tasks: any[] = require('./data.json');

  getTasks(): any[] {
    return this._tasks;
  }
}
