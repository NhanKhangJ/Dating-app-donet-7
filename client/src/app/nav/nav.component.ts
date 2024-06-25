import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_models/userParams';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('loginForm') loginForm: any;
  model: any = {};

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, private memberService: MembersService) {}

  ngOnInit(): void {
  } 

  login(){
    this.accountService.login(this.model).subscribe({
      next: (user) => {
        const userParams =new UserParams(user);
        this.memberService.setUserParams(userParams);
        this.router.navigateByUrl('/members');
        this.model = {};
      }
    })
  }

  logout(){
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }
}
