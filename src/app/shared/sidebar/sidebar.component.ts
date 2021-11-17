import { Component, Input } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

constructor( private gifsService: GifsService ){}

  get historial(){

    return this.gifsService.historial;

  }

  buscar(query: string){

    this.gifsService.buscarGifs( query );
  }
  
}
