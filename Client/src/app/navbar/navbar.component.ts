import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './../_Services/account.service';
import { User } from './../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {}
  currentUser$: Observable<User>
  constructor(public accountservice: AccountService) { }

  ngOnInit(): void {
   this.currentUser$ = this.accountservice.currentUser$;
  }

  login(){
    this.accountservice.login(this.model).subscribe(response =>{
        console.log(response);
      },error =>{
        console.log(error);
      }
      )
  }

  logout(){
    this.accountservice.logout();
    
  }

}
