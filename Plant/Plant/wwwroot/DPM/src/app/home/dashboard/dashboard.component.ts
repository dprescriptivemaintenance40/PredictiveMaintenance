import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from './DashboardService/-dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public plant: any;
  keyData: any;


  constructor(public router: Router, public http: HttpClient, private service: DashboardServiceService) { }

  ngOnInit(): void {
    this.getPowerBiKeys();
    const firstTime = localStorage.getItem('key')
    if (!firstTime) {
      localStorage.setItem('key', 'loaded')
      location.reload()
    } else {
      localStorage.removeItem('key')
    }
  }

  async ngAfterViewInit() {
    this.plant = await this.getTreeData();
  }

  async getTreeData() {
    return await this.http.get("api/PlantAPI/GetPlant").toPromise();
  }

  public plantShow(id: any) {
    this.router.navigateByUrl('/Home/VisNetwork', { state: { PlantId: id } })
  }

  getPowerBiKeys() {
    this.service.getKeyApi().subscribe(
      res => {
        this.keyData = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  report() {
    this.router.navigate(["Home/report"])
  }
  newTab(url: string) {
    window.open(url, "_blank");
  }
  HelpTab(url: string) {
    window.open(url, "dist/DPM/assets/ISO14224.xlsx");
  }
}
