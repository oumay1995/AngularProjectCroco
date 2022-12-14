import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.css']
})
export class AddChefComponent implements OnInit {
  addChefForm : FormGroup;
  chef  : any = {};
  id    : any = {};
  title : any = {};
  users : any = {};
  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute, private userService : UserService) {}

  ngOnInit(): void {
    this.addChefForm = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      password : [''],
      speciality : [''],
      experience : [''],
      date : [''],
    })

    //this.users = JSON.parse(localStorage.getItem("users") || '[]');
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id);
    if(this.id){
      if(this.id){
        this.title = "Edit chef"
        // for (let i = 0; i < this.users.length; i++) {
        //   if (this.users[i].id == this.id){
        //     this.chef = this.users[i]
        //   }
        // }  
        this.userService.getUser(this.id).subscribe((data)=>{
          console.log(data);
          this.chef = data.user;
        })
      }
    }else{
      this.title = "add chef"
    }
  }
    saveChef(){

      if(this.id){
        //edit

        /*for (let i = 0; i < this.users.length; i++) {
          if(this.users[i].id == this.id){
            this.users[i] = this.chef
            break;
          }          
        }
        localStorage.setItem("users",JSON.stringify(this.users))*/

        this.userService.updateUser(this.chef).subscribe((data)=>{
          console.log(data.message);
        })
      }
      else{
        //add
        // console.log(this.chef)
        // let idUser = JSON.parse(localStorage.getItem("idUser") || "1")
        // let chefs = JSON.parse(localStorage.getItem("users") || "[]")
        // this.chef.id = idUser
        this.chef.role = "chef"
        // chefs.push(this.chef)
        // localStorage.setItem("users",JSON.stringify(chefs))
        // localStorage.setItem("idUser",idUser + 1)
        this.userService.createUser(this.chef).subscribe(()=>{
          console.log("chef created");
        })
      }
    }
  }