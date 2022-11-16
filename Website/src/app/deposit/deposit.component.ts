import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../models/transaction.model';
import { MatchService } from '../service/match.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  formData: any;
  depositAmount: number = 0;
  availableAmount: number = 0;

  constructor(private matchService: MatchService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.formData = new FormGroup({
      depositAmount: new FormControl("0")
    });

    this.getAvailableAmount();

  }

  onSubmit(data: { depositAmount: number; }) {

    // check if minimum deposit condition is met 
    if(data.depositAmount > 9) {

      this.availableAmount = this.availableAmount + Number(data.depositAmount);
      sessionStorage.setItem("availableAmount", this.availableAmount.toString());

      transaction.toAccount = data.depositAmount;
      transaction.transaction = 'UPLATA NA RAČUN'
      transaction.availableAmount = this.availableAmount;
      transaction.dateTime = new Date;

      // save transaction to DB
      this.matchService.addTransaction(transaction)
      .subscribe(
        response => {
          console.log(response);
        }
      );
      this.toastr.success('Uspješno ste uplatili iznos od ' + data.depositAmount + 'KN na račun', '');
    }
    else {
      this.toastr.error('Minimalan iznos uplate je 10kn!', 'Greška');
    }

  }

  // get current available amount
  getAvailableAmount(){
    this.matchService.getTransactions()
    .subscribe(
      response => {
        this.availableAmount = response[response.length-1].availableAmount;
        sessionStorage.setItem("availableAmount", this.availableAmount.toString());
      }
    );
  }

}

//initialize transaction object
var transaction: Transaction = {
  transactionId: 0,
  dateTime: new Date,
  transaction: '',
  toAccount: 0,
  fromAccount: 0,
  availableAmount: 0
};
