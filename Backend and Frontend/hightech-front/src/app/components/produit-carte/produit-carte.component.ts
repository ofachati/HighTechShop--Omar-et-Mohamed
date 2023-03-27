import { Component, Input, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/Produit';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProduitService } from 'src/app/services/produit.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProduitAddEditComponent } from '../produit-add-edit/produit-add-edit.component';

@Component({
  selector: 'app-produit-carte',
  templateUrl: './produit-carte.component.html',
  styleUrls: ['./produit-carte.component.css']
})
export class ProduitCarteComponent implements OnInit {
  @Input() produit!: Produit;
  constructor(private router: Router, protected loginService:LoginService,private produitService:ProduitService,
    protected userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCardClick(product: Produit) {
   
    if (!this.userService.currentUser?.admin  || this.userService.currentUser == undefined ){
      console.log(product);
    this.router.navigate(['/produit', product.id]);
  }
  
  }
  onEditBtnClick(product: Produit) {
    console.log(product);
      //this.router.navigate(['ajouter-produit'], { state: { optionalProduct: product } });
      const dialogRef = this.dialog.open(ProduitAddEditComponent, {
        data: { optionalProduct: product }
      });
    }
  onDeleteBtnClick(product: Produit) {
    this.produitService.deleteProductById(this.produit.id);
  }


  openLoginDialog() {
    this.dialog.open(ProduitAddEditComponent);
  }
}