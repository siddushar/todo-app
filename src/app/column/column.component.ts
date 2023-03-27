import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {

  tasks: any[] = []
  inProgressTasks: any[] = []
  openTasks: any[] = []
  completedTasks: any[] = []
  formdata: any;
  columns: any;

  constructor(private _taskService: TaskService, private modalService: NgbModal) {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (localStorage.getItem("tasks") === null || this.tasks.length === 0) {
      this.tasks = this._taskService.getTasks();
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  async ngOnInit() {
    this.initiaizeColumns();
    this.filterTasks();
    this.initialiseForm();
  }

  initiaizeColumns() {
    this.columns = [
      {
        value: "open",
        title: "Open", 
        order: 1,
      },
      {
        value: "inProgress",
        title: "In Progress", 
        order: 2,
      },
      {
        value: "completed",
        title: "Completed", 
        order: 3,
      }
    ]
  }

  filterTasks() {
    this.inProgressTasks = this.tasks.filter(data=> data.status === "inProgress");
    this.openTasks = this.tasks.filter(data=> data.status === "open");
    this.completedTasks = this.tasks.filter(data=> data.status === "completed");
  }
  initialiseForm() {
    this.formdata = new FormGroup({
      id : new FormControl("", []),
      title : new FormControl("", [Validators.required]),
      issueType : new FormControl("", [Validators.required]),
      status : new FormControl("", [Validators.required]),
      description : new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {
    this.tasks.push(this.formdata.value);
    this.completedTasks.push(this.formdata.value);
  }
  
  createTask() {
    this.openModal();
  }

  editForm(editTask: any) {
    const task = this.tasks.filter(function(ele) {
      return ele.id === editTask.id;
    })[0];
    this.formdata.get('id')?.setValue(task.id);
    this.formdata.get('title')?.setValue(task.title);
    this.formdata.get('status')?.setValue(task.status);
    this.formdata.get('issueType')?.setValue(task.issueType);
    this.formdata.get('description')?.setValue(task.description);
    this.openModal();
  }

  openModal() {
    const modalRef = this.modalService.open(TaskModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });

      modalRef.componentInstance.taskData.subscribe((result: any) => {
        if (result.value.id === '') {
          this.addTask(result.value);
        } else {
          this.updateTask(result.value);
        }
      })

     modalRef.componentInstance.formdata = this.formdata;

  }

  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  addTask(task: any) {
    task.id = this.generateUUID();
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.filterTasks();
  }

  updateTask(task: any) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '');
    this.tasks = this.tasks.filter(function(ele) { return ele.id !== task.id; })
    this.addTask(task);
  }

  deleteTask(task: any) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '');
    this.tasks = this.tasks.filter(function(ele) { return ele.id !== task.id; })
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.filterTasks();
  }
  
  onDrop(event: CdkDragDrop<string[]>) {
    debugger;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.changeStatus(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  changeStatus(event: CdkDragDrop<string[]>) {
    let item: any = event.previousContainer.data[event.previousIndex];
    var currentList = event.container.id; 
    debugger;
    switch(currentList) { 
      case "inProgress": { 
        item.status = 'inProgress';
        break; 
      } 
      case "open": { 
        item.status = 'open';
        break; 
      } 
      case "completed": {
        item.status = 'completed';
        break;
      }  
      default: { 
          console.log("Invalid choice"); 
          break;              
      } 
    }
    this.updateTask(item);
  }

}
