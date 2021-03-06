import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private userService: UserService,private _router:Router,private global:GlobalService) { }

  @ViewChild('formLog')
  formLog: any;

  @ViewChild('formSign')
  formSign: any;


  email: string;
  password: string;
  userName: string;
  tempResult: string;

  ngOnInit() {
    this.email = "";
    this.password = "";
    this.userName = "";
    this.tempResult = "";
  }

  onSubmitLogIn() {
    if (this.formLog.valid) {
      let user = {password: this.formLog.value.psw, email: this.formLog.value.uemail};

      console.log(user);
      this.userService.CheckAuthentication(user).subscribe(
        data => {
          this.tempResult="";
          console.log(data);
          this.saveTokenLocalStorage(data);
          this.onCancleLogIn();
          this.fetchUserName();
          this._router.navigate(['/team']);
        },
        err => {
          console.log(err);
          this.tempResult="";
          for (let x of err.error.errors) {
           this.tempResult += x.msg + ", ";
            console.log(x);
          }

        },
        () => console.log('login is done'));
    }
  }

  onSubmitSignUp() {
    if (this.formSign.valid) {
      let user = {
        name: this.formSign.value.uname,
        password: this.formSign.value.psw, email: this.formSign.value.uemail
      };

      console.log(user);
      this.userService.ResigterUser(user).subscribe(
        data => {
          this.tempResult="";
          console.log(data);
          this.onCancleSignUp();
        },
        err => {
          console.log(err);
          this.tempResult="";
          for (let x of err.error.errors) {
            this.tempResult += x.msg + ", ";
            console.log(this.tempResult);
          }

        },
        () => console.log('registration is done'));
    }
  }


  onCancleLogIn() {
    this.formLog.reset();
    document.getElementById('id01').style.display='none'
   
  }

  
  onCancleSignUp() {
    this.formSign.reset();
    document.getElementById('id02').style.display='none'
    
  }

  saveTokenLocalStorage(res){
    localStorage.setItem('token',res.token);
  }

  fetchUserName(){
    this.userService.getUser().subscribe(data=>{
      this.global.name=data["name"];
      localStorage.setItem('name',data["name"]);
    });
  }

}
