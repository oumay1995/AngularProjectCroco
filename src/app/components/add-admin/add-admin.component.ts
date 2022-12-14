import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm : FormGroup;
  user : any = {};
  users : any;
  id :any;
  title : any;
  constructor(private formBuilder : FormBuilder,private activatedRoute : ActivatedRoute , private userService : UserService,private router : Router) {}

  ngOnInit(): void {
    this.addAdminForm = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      password : [''],
      tel : [''],
    })

    // this.users = JSON.parse(localStorage.getItem("users") || '[]');
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id);
    if(this.id){
      /*if(this.id){
        this.title = "Edit user"
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id == this.id){
            this.user = this.users[i]
          }
        }  
      }*/
      this.title = "Edit user";
      this.userService.getUser(this.id).subscribe((data)=>{
        console.log(data);
        this.user = data.user;
      })
    }else{
      this.title = "Add user";
    }
  }
  
  saveAdmin(){
    console.log(this.user)
    if(this.id){
      //edit user
      /*for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].id == this.id){
          this.users[i] = this.user
          break;
        }          
      }
      localStorage.setItem("users",JSON.stringify(this.users))*/
      this.userService.updateUser(this.user).subscribe((data)=>{
        console.log(data.message);
      })
    }else{
      //add user
      // let idUser = JSON.parse(localStorage.getItem("idUser") || "1")
      // let users = JSON.parse(localStorage.getItem("users") || "[]")
      // this.user.id = idUser
      this.user.role = "admin"
      // users.push(this.user)
      // localStorage.setItem("users",JSON.stringify(users))
      // localStorage.setItem("idUser",idUser + 1)

      this.userService.createUser(this.user).subscribe((data)=>{
        console.log(data.message);
      })
    }
    this.router.navigate(["dashboardAdmin"]);

  }
}