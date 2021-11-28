import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BoulotService } from 'src/app/api/boulot.service';
import { Boulot } from 'src/app/models/boulot';


@Component({
  selector: 'app-demande-boulot',
  templateUrl: './demande-boulot.component.html',
  styleUrls: ['./demande-boulot.component.css']
})
export class DemandeBoulotComponent implements OnInit {



  constructor(private BoulotService:BoulotService, private _snackBar: MatSnackBar,private router: Router, private route: ActivatedRoute) { }

  boulot = new Boulot();
  boulot2 : any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
   
    this.boulot2 = this.BoulotService.get(id);
    this.boulot.titre=this.boulot2.titre;
    this.boulot.description=this.boulot2.description;
    this.boulot.prix=this.boulot2.prix;
    this.boulot.date_fin=this.boulot2.date_fin;
    this.boulot.recruteur=this.boulot2.recruteur;
  
    
    
  }
  
  DemandeBoulot(){
       
    this.BoulotService.add(this.boulot).subscribe(res => {
      this._snackBar.open("Succes", "Close", {
        duration: 1000
      });
      console.log("Boulot :",res)
      this.router.navigate(['/etudiant/profil']);
    }, err => {
      this._snackBar.open(err, "Close", {
        duration: 2000
      });
    })
  }

 

}