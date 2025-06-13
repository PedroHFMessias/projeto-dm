import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonItem, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonButton, 
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircle, location, checkmarkCircle } from 'ionicons/icons';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon
  ],
})
export class RegisterPage implements OnInit {
  customerForm: FormGroup;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ personCircle, location, checkmarkCircle });
    
    this.customerForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      cidade: ['', [Validators.required, Validators.minLength(2)]],
      bairro: ['', [Validators.required, Validators.minLength(2)]],
      estado: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    // Verificar se há um cliente existente para edição
    const existingCustomer = this.customerService.getCustomer();
    if (existingCustomer) {
      this.isEditing = true;
      this.customerForm.patchValue(existingCustomer);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  formatCep(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    this.customerForm.get('cep')?.setValue(value);
  }

  async onSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;
      
      // Salvar dados do cliente
      this.customerService.saveCustomer(customerData);
      
      // Mostrar toast de sucesso
      const toast = await this.toastController.create({
        message: this.isEditing ? 'Dados atualizados com sucesso!' : 'Cliente cadastrado com sucesso!',
        duration: 2000,
        position: 'bottom',
        color: 'success',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      
      await toast.present();
      
      // Voltar para a página de conta
      this.router.navigate(['/tabs/tab2']);
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.customerForm.controls).forEach(key => {
        const control = this.customerForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      
      // Mostrar toast de erro
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos obrigatórios.',
        duration: 3000,
        position: 'bottom',
        color: 'danger',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      
      await toast.present();
    }
  }
}