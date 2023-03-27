import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {

  @Input() public formdata: any;
  @Output() taskData: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log("edit");
    console.log(this.formdata.value);
  }

   onSubmit(): void {
    console.log("submittt", this.formdata);
    this.taskData.emit(this.formdata);
    this.closeModal();
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
