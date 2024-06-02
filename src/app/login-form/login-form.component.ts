import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  disabled = true; 

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$')]]
    });

    // Disable login button initially
    this.disabled = true;

    // Subscribe to value changes
    this.loginForm.valueChanges.subscribe(() => {
      // Mark all controls as touched
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });

      // Enable login button if form is valid
      this.disabled = !this.loginForm.valid;
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {  
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    // You can replace this with a call to your authentication service
    setTimeout(() => {
      this.disabled = false;
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    }, 2000);
  }
}