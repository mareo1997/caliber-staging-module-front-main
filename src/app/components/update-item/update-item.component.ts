import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Swot } from 'src/app/models/swot-model/swot';
import { SwotItem } from 'src/app/models/swot-model/swot-item';
import { ActivatedRoute } from '@angular/router';
import { SwotService } from 'src/app/services/swot/swot.service';
import { NgForm } from '@angular/forms';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  swot : Swot = new Swot();
  swotItem : SwotItem = new SwotItem(0,"","","");
  myImage: string = "assets/img/swot1.png";
  @Input() passedSwotItem: SwotItem;
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private swotService: SwotService,
              private modalService: NgbModal,
              private toastService: ToastRelayService) { }

  ngOnInit(): void {
    this.swotItem = this.passedSwotItem;
  }


  /**
   * This is called whenever the form is submitted. If the form data is valid it PUTs the information to the server to update the item in the database.
   * 
   * @param itemForm 
   */
  onSubmit(itemForm: NgForm) {
    this.swotService.updateItem(this.swotItem)
      .subscribe(data => {
        this.toastService.addToast({
          header:'SWOT item updated',
          body:`Current name: ${this.swotItem.name}`
        })
      });
    this.modalService.dismissAll();
  }


  confirmDeleteVisibility:string = 'hidden';
  /**
   * This toggles the visibility of the span containing the deleteItem() button.
   */
  toggleConfirmDelete(){
    if(this.confirmDeleteVisibility == 'hidden') this.confirmDeleteVisibility = 'visible';
    else this.confirmDeleteVisibility = 'hidden';
  }

  /**
   * This emits an event which will trigger a DELETE call to the server and remove the item from the database.
   */
  deleteItem() {
    this.deleteEmitter.emit(this.swotItem.id);
    this.modalService.dismissAll();
  }

}
