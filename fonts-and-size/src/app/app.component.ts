import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'fonts-and-size';
    text = 'Exemplo de tamanho de fonte para design de sites responsivos'

    public getScreenWidth: any;
    public getScreenHeight: any;
    public widthContent: any;

    ngOnInit() {
        console.log('**** No ngOnInit ****')
        this.getScreenWidth = window.innerWidth;
        this.getScreenHeight = window.innerHeight;
        console.log('width: ', this.getScreenWidth, 'height:', this.getScreenHeight)
        this.widthContent = document.getElementById('content-id')?.offsetWidth + 'px';
        console.log('widthContent: ', this.widthContent)
    }
    
    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        console.log('**** No onWindowResize ****')
        this.getScreenWidth = window.innerWidth;
        this.getScreenHeight = window.innerHeight;
        console.log('width: ', this.getScreenWidth, 'height:', this.getScreenHeight)
        this.widthContent = document.getElementById('content-id')?.offsetWidth + 'px';
        console.log('widthContent: ', this.widthContent)
    }
    
    
}
