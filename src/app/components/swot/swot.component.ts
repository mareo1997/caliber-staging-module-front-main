import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwotItem } from './../../models/swot-model/swot-item';
import { Swot } from './../../models/swot-model/swot';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SwotService } from 'src/app/services/swot/swot.service';
import { Associate } from 'src/app/models/associate-model/associate.model';
import { Manager } from 'src/app/models/manager-model/manager';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';

@Component({
  selector: 'app-swot',
  templateUrl: './swot.component.html',
  styleUrls: ['./swot.component.css'],
})
export class SwotComponent implements OnInit {
  myImage: string = 'assets/img/swot1.png';
  name: string = '';
  type: string = '';
  note: string = '';
  title: string = '';
  i: number = 0;
  hasData: boolean = false;
  @Input() passedId: number;
  message: string = '';
  // CSS styling for forms
  titleBorder: string = '1px solid';
  nameBorder: string = '1px solid';
  typeBorder: string = '1px solid';

  analysisItems: SwotItem[] = [];

  constructor(
    private swotService: SwotService,
    private modalService: NgbActiveModal,
    private toastService: ToastRelayService
  ) {}

  ngOnInit(): void {}

  /**
   * This first checks to see if name and type are blank, if so it highlights their fields in red and shows a message to enter that data
   * If the fields are not blank then it adds the item to the array and calls swotService addSwot to add the swot to the database
   * @param signInForm this is the form with the swot item information
   */
  onSubmit() {
    if (this.isValidSwotForm()) {
      let item: SwotItem = {
        id: 0,
        name: this.name,
        type: this.type,
        note: this.note,
        swotAnalysisId: this.passedId,
      };
      this.message = this.updateMessage();
      this.analysisItems.push(item);
      this.hasData = true;
    } else {
      this.updateStyles();
      this.message = this.updateMessage();
    }
  }

  private updateStyles(): void {
    this.name
      ? (this.nameBorder = '1px solid')
      : (this.nameBorder = '3px solid red');
    this.type
      ? (this.typeBorder = '1px solid')
      : (this.typeBorder = '3px solid red');
    this.title
      ? (this.titleBorder = '1px solid')
      : (this.titleBorder = '3px solid red');
  }

  private updateMessage() {
    if (!this.title) return 'Please enter SWOT title.';
    if (!this.name) return 'Please enter SWOT item name.';
    if (!this.type) return 'Please select a SWOT type.';
    return '';
  }

  private isValidSwotForm(): boolean {
    const validName: boolean = this.name.length != 0;
    const validType: boolean = this.type.length != 0;
    return validName && validType;
  }

  /**
   * This deletes the item from the item array in the user's view on delete click(FILTER METHOD)
   * @param item this is the item to be deleteed
   */
  delete(item: SwotItem): void {
    this.analysisItems = this.analysisItems.filter(
      (swotItem) => swotItem !== item
    );
    this.analysisItems ? (this.hasData = true) : (this.hasData = false);
  }

  /**
   * This checks to see if the description is blank, if blank shows a message to enter the description
   * If not blank then it calls the swotService addSwot method to update the Swot in the database.
   * It then closes the modal.
   */
  addSwot(): void {
    if (this.isValidSwotForm()) {
      const newSwot: Swot = {
        analysisItems: this.analysisItems,
        associate: new Associate(this.passedId),
        description: this.title,
        manager: new Manager(Number(sessionStorage.getItem('managerId'))),
        createdOn: new Date(),
        lastModified: new Date(),
      };
      this.swotService.addSwot(newSwot).subscribe(() => {
        this.toastService.addToast({
          header: `New SWOT created!`,
          body: `For associate ${newSwot.associate.id}`,
        });
        this.modalService.close();
      });
    }
  }
}
