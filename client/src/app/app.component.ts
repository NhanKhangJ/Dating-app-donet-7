import { animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string = 'client';
  users?: {
    id: number,
    userName: string
  }[];

  constructor(private http: HttpClient){
    
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5001/api/users').subscribe({
      next: (response: any) => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request completed'),
    });
  }
}
