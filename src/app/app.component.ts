import { Component, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import data from '../assets/locaciones.json';
import { Location } from '../app/modules/location.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map | undefined;

  ngOnInit(): void {
    console.log(data);
    const locationList = data as Location[];

    // Create the map
    var uis = new google.maps.LatLng(7.1408367,-73.1206476);
    var mapProp = {
      center: uis,
      zoom: 18.3,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);

    var markersList: google.maps.Marker[] = [];

    // Only one inforWindow object must exist
    var infowindow = new google.maps.InfoWindow();

    // Add markers for each place
    for (const location of locationList) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.coor[0], location.coor[1]),
        map: this.map,
        title: location.name,
      });

      // add event listener to open info window
      marker.addListener(
        'click',
        ((marker, pMap, pInfowindow) => {
          return () => {
            pInfowindow.setContent(
              `<div id="content">
            <div id="siteNotice">
            </div>
            <h1 id="firstHeading" class="firstHeading">${location.name}</h1>
            <div id="bodyContent">
            <p>Resultados: </br>${location.descripcion}</p>
            <iframe width="100%" height="auto" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${location.sound_number}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><div>
            </div>
            </div>
            `
            );
            pInfowindow.open(pMap, marker);
          };
        })(marker, this.map, infowindow)
      );
      markersList.push(marker);
    }
  }
}
