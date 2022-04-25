import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SdoctorsService } from 'src/app/sdoctors.service';
import { Idoctors } from 'src/app/idoctors';
import { SbookAptService } from 'src/app/sbook-apt.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  bookedApt : any;
  lastEntry : any; 
 
  selectedSpeciality! : string;
  doctors : Idoctors[] = [];
   specDocs : string[] = [];
 
   bookAppointment = new FormGroup(
    {
      FirstName : new FormControl("",Validators.required),
      LastName : new FormControl(""),
      Gender : new FormControl(""),
      Address : new FormControl(""),
      MobileNo : new FormControl(""),
      Email : new FormControl(""),    //,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')),
      DoctorName : new FormControl(""),
      Speciality : new FormControl(""),
      AppointmentDate : new FormControl(new Date().getDate()),
      AppointmentTime : new FormControl(new Date().getTime())
    }
  );
  
  get FirstName() {
    return this.bookAppointment.get('FirstName');
} 
  // patientDetails = {
  //   firstName : this.bookAppointment.get("FirstName")?.value,
  //   lastName : this.bookAppointment.get("LastName")?.value,
  //   mobile_no :this.bookAppointment.get("MobileNo")?.value,
  //   doctorName: this.bookAppointment.get("DoctorName")?.value,
  //   aptdate : this.bookAppointment.get("AppointmentDate")?.value,
  //   apttime : this.bookAppointment.get("AppointmentDate")?.value
  // };

  
  constructor(private docService : SdoctorsService, private book_apt : SbookAptService, private router : Router) { }

  ngOnInit(): void {
	  this.doctors = this.docService.getAllDocs();
  }
    
  // THIS IS POST FUNCTION FOR DB
    addPatient(){
      this.book_apt.addPatient(this.bookAppointment.value).subscribe((data) =>{
        console.log(data);
      });
      console.log(this.bookAppointment.value);
      this.showResponse();
      this.clearForm();
      this.redirectToMessage();
    }

    // THIS IS SPECIFIC DOCTORS
 	 getSpecDoc() {
	  this.selectedSpeciality = this.bookAppointment.get("Speciality")?.value;
    
    this.specDocs=this.docService.getDocBySpec(this.selectedSpeciality);
  }

  // getAppointmentDetails(){
  //   this.patientDetails.firstName = this.bookAppointment.get("pFirstName")?.value;
  //     this.patientDetails.lastName = this.bookAppointment.get("pLastName")?.value;
  //     this.patientDetails.mobile_no = this.bookAppointment.get("mobile")?.value;
  //     this.patientDetails.doctorName = this.bookAppointment.get("doctorName")?.value;
  //     this.patientDetails.aptdate = this.bookAppointment.get("aptdate")?.value;
  //     this.patientDetails.apttime = this.bookAppointment.get("apttime")?.value;

  //     return this.patientDetails;
  // }

redirectToMessage(){
  this.router.navigate(['/msgpage']);
}

  showResponse(){
    alert("Your appointment is booked successfully!\r\n"+"Your appointment details are:\r\n"
    +"First Name: "+this.bookAppointment.get("FirstName")?.value+"\r\n"
    +"Last Name: "+this.bookAppointment.get("LastName")?.value+"\r\n"
    +"Mobile No.: "+this.bookAppointment.get("MobileNo")?.value+"\r\n"
    +"Doctor Name: "+this.bookAppointment.get("DoctorName")?.value+"\r\n"
    +"Appointment Date: "+this.bookAppointment.get("AppointmentDate")?.value+"\r\n"
    +"Appointment Time: "+this.bookAppointment.get("AppointmentTime")?.value+"\r\n");
  }

  clearForm(){
    (<HTMLFormElement>document.getElementById("bookAppointment")).reset();
  }

}
