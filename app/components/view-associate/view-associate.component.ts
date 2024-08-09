import { Associate } from './../../models/associate-model/associate.model';
import { SwotComponent } from './../swot/swot.component';
import { AssociateService } from '../../services/associate/associate.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateAssociateComponent } from '../update-associate/update-associate.component';
import { SwotService } from 'src/app/services/swot/swot.service';
import { Router } from '@angular/router';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';
import { Swot } from 'src/app/models/swot-model/swot';

@Component({
  selector: 'app-view-associate',
  templateUrl: './view-associate.component.html',
  styleUrls: ['./view-associate.component.css'],
})
export class ViewAssociateComponent implements OnInit, OnDestroy {
  associates: Associate[];
  swotIsEmpty: boolean;
  managerId: number;
  associateFilter = '';
  isNewAssociateView: boolean = true;

  constructor(
    private associateService: AssociateService,
    private modalService: NgbModal,
    private swotService: SwotService,
    private router: Router,
    private toastService: ToastRelayService
  ) {}

  get assocFilter(): string {
    return this.associateFilter;
  }

  set assocFilter(temp: string) {
    this.associateFilter = temp;
  }

  /**
   * This initializes the page with the list of all associates relative to a manager
   */
  ngOnInit(): void {
    this.managerId = parseInt(sessionStorage.getItem('managerId'));
    this.getAllAssociates(this.managerId);
    this.swotIsEmpty = false;
  }

  ngOnDestroy(): void {}

  /**
   * This method returns the list of associates filtered by the user input
   * If no filter, returns the list of associates
   */
  getFilteredAssociates(): Associate[] {
    if (this.associateFilter) {
      return this.performFilter(this.associateFilter);
    } else {
      return this.associates;
    }
  }

  /**
   * This methods filters the associates by the input the user enters
   * @param filterBy is the input entered by the user
   */
  private performFilter(filterBy: string): Associate[] {
    filterBy = filterBy.toLowerCase();
    return this.associates.filter(
      (assoc: Associate) =>
        assoc.firstName.toLowerCase().indexOf(filterBy) != -1 ||
        assoc.firstName.toLowerCase().indexOf(filterBy) != -1 ||
        assoc.email.toLowerCase().indexOf(filterBy) != -1 ||
        assoc.status.toLowerCase().indexOf(filterBy) != -1 ||
        assoc.batch.toString().indexOf(filterBy) != -1 ||
        assoc.id.toString().indexOf(filterBy) != -1 ||
        assoc.salesforceId.toString().toLowerCase().indexOf(filterBy) != -1
    );
  }

  /**
   * This method isNewAssociateViews the view button from View All to View New
   * in regards to associates
   */
  toggleAssociateView() {
    if (this.isNewAssociateView) {
      this.getAllNewAssociates(this.managerId);
    } else {
      this.getAllAssociates(this.managerId);
    }
    this.isNewAssociateView = !this.isNewAssociateView;
  }

  trackItem(index: number, item: Associate) {
    return `${item.id}-${index}`;
  }

  /**
   * This opens up a modal page in order to add a new SWOT
   */
  open(associateId: number) {
    const modalRef = this.modalService.open(SwotComponent);
    modalRef.componentInstance.passedId = associateId;
    modalRef.componentInstance.passedIsEmpty = this.swotIsEmpty;
  }

  /**
   * This method gets all the associates relative to a manager
   * @param id is the id of the manager
   */
  getAllAssociates(managerId: number): void {
    this.associateService.getAllAssociates(managerId).subscribe((data) => {
      this.associates = data;
    });
  }

  /**
   * This method gets all the new associates relative to a manager
   * @param id is the id of the manager
   */
  getAllNewAssociates(id: number): void {
    this.associateService.getAllNewAssociates(id).subscribe((data) => {
      this.associates = data;
    });
  }

  /**
   * This opens up a modal page in order to update a batch
   */
  updateBatch(associateId: number, batchId: number, statusId: number): void {
    const modalRef = this.modalService.open(UpdateAssociateComponent);
    modalRef.componentInstance.associateId = associateId;
    modalRef.componentInstance.curBatchId = batchId;
    modalRef.componentInstance.curStatusId = statusId;
  }

  /**
   * This method checks if a SWOT is available to view for an associate,
   * otherwise prompts the user to create a SWOT for said associate
   */
  checkSwotsValid(associateId: number): void {
    this.swotService
      .getSwotByAssociatedId(associateId)
      .subscribe((data: Swot[]) => {
        if (data.length === 0) {
          this.toastService.addToast({
            header: 'No SWOTs exist yet',
            body: 'Please create a SWOT first',
          });
        } else {
          this.router.navigate([`/view/${associateId}`]);
        }
      });
  }
}
