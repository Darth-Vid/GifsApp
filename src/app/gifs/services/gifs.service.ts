import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('ultimosResultados')! ) || [];

  }

  private apiKey = '6h8yLNq9uqiI8H7SuRTqORIreYQZB5Le';
  private urlBase = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = [];

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string){

    if(query.trim().length === 0){
      return;
    }

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)) {

      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);
    

    this.http.get<SearchGifsResponse>(`${this.urlBase}/search`, { params })
    .subscribe( ( response ) => {

      this.resultados = response.data;

      localStorage.setItem('ultimosResultados', JSON.stringify(this.resultados));

    } );

  }

}
