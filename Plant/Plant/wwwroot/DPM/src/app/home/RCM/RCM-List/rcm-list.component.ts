import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonBLService } from 'src/app/shared/BLDL/common.bl.service';
import { CommonLoadingDirective } from 'src/app/shared/Loading/common-loading.directive';
import { RCMContantAPI } from 'src/app/home/RCM/FMEA/Shared/RCMConstant';

@Component({
  selector: 'app-prescriptive-list',
  templateUrl: './rcm-list.component.html',
  styleUrls: ['./rcm-list.component.scss'],
  providers: [MessageService]
})
export class RCMListComponent implements OnInit {

  public RCMId;
  public DeleteTreeName: string = ""
  public fileAttachmentEnable: boolean = false
  public fileUpload: string = ""
  public UploadFileDataResponse: any = []
  public fileToUpload;
  public ImageEnable: boolean = false;
  public PdfEnable: boolean = false;
  public FileSafeUrl: any;
  public FileUrl: any;
  private ParentId: number = 0;
  public CRemarks: string = "";
  public CAttachmentFile: any;
  public prescriptiveRecords: any = [];
  public Table1: boolean = true;
  public Table2: boolean = false;
  public FailureModeDataTabe2: any;
  public Table3: boolean = false;
  public Table4: boolean = false;
  public FailureModeDataTabe3: any;
  public FailureModeDataTabe4: any;
  FMWithConsequenceTree: boolean = false;

  constructor(public http: HttpClient,
    public title: Title,
    public messageService: MessageService,
    public router: Router,
    public commonLoadingDirective: CommonLoadingDirective,
    public changeDetectorRef: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private commonBLService: CommonBLService,
    private prescriptiveContantAPI: RCMContantAPI) {
    this.title.setTitle('Prescriptive List | Dynamic Prescriptive Maintenence')
  }

  ngOnInit() {
    this.getPrescriptiveRecords();
  }



  getPrescriptiveRecords() {
    var url: string = this.prescriptiveContantAPI.FMEATagCheck
    this.commonBLService.getWithoutParameters(url)
      .subscribe(res => {
        this.prescriptiveRecords = res
        console.log(this.prescriptiveRecords)
      }, err => {
        console.log(err.err);
      }
      )
  }

  UpdatePrescriptiveRecords(p) {
    if (localStorage.getItem('PrescriptiveUpdateObject') != null) {
      localStorage.removeItem('PrescriptiveUpdateObject');
    }
    localStorage.setItem('PrescriptiveUpdateObject', JSON.stringify(p));
    if (localStorage.getItem('PrescriptiveUpdateObject') != null) {
      this.router.navigateByUrl('/Home/RCMUpdate');
    }
  }


  DeletePrescriptiveRecords(p) {
    this.RCMId = p.RCMId
    this.DeleteTreeName = p.TagNumber
  }

  SoftDeletePrescriptiveRecords() {
    var url: string = this.prescriptiveContantAPI.FMEAListSingleDelete
    const params = new HttpParams()
      .set("id", this.RCMId)
    this.commonBLService.DeleteWithParam(url, params)
      .subscribe(res => {
        this.getPrescriptiveRecords();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
      }, err => {
        console.log(err)
      });
  }

  ADDConsequenceRecords(p) {
    if (localStorage.getItem('PrescriptiveUpdateObject') != null) {
      localStorage.removeItem('PrescriptiveUpdateObject');
    }
    localStorage.setItem('PrescriptiveUpdateObject', JSON.stringify(p));
    if (localStorage.getItem('PrescriptiveUpdateObject') != null) {
      this.router.navigateByUrl('/Home/Consequences');
      this.getPrescriptiveRecords();
    }
  }

  FailureModeTable(p) {
    this.Table1 = false
    this.Table2 = true
    this.FailureModeDataTabe2 = p.failureModes
  }

  BackToTable1() {
    this.Table1 = true
    this.Table2 = false
    this.Table3 = false
    this.Table4 = false
    this.FailureModeDataTabe3 = []
    this.FailureModeDataTabe2 = []
  }
  BackToTable3() {
    this.Table1 = false
    this.Table2 = false
    this.Table3 = true
    this.Table4 = false
  }


  public uploadFile(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].type === 'application/pdf'
        || event.target.files[0].type === 'image/png'
        || event.target.files[0].type === 'image/jpeg') {
        let fileToUpload = event.target.files[0];
        this.fileUpload = fileToUpload.name;
        this.CAttachmentFile = event.target.files[0];
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: "Only Pdf's and Images are allowed" })
    }
  }
  getAttachmentID(p) {
    this.ParentId = p.RCMId;
    this.CRemarks = p.CRemarks;
    this.fileToUpload = p.CAttachmentDBPath;
    this.fileUpload = p.CAttachmentDBPath.split('/')[1];
  }

  saveAttachment() {
    const formData = new FormData();
    formData.append('file', this.CAttachmentFile);
    formData.append('CRemarks', this.CRemarks);
    formData.append('removePath', this.fileToUpload);

    this.commonBLService.PutData(this.prescriptiveContantAPI.FMEAParentAttachments, formData, this.ParentId)
      .subscribe(res => {
        this.getPrescriptiveRecords();
        this.UploadFileDataResponse = res;
        this.fileAttachmentEnable = true;
        this.CRemarks = "";
        this.fileToUpload = "";
        this.fileUpload = "";
      }, err => { console.log(err.err) }
      )

  }
  ViewAttachment(p) {

    this.FileSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(p.CAttachmentDBPath);
    this.FileUrl = p.CAttachmentDBPath;
    var extension = this.getFileExtension(p.CAttachmentDBPath);
    this.CRemarks = p.CRemarks;
    if (extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'jpeg' || extension.toLowerCase() == 'png') {
      this.ImageEnable = true;
      this.PdfEnable = false;
    } else if (extension.toLowerCase() == 'pdf') {
      this.ImageEnable = false;
      this.PdfEnable = true;
    }

  }
  getFileExtension(filename) {
    const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
    return extension;
  }
  CloseAttachmentModal() {
    this.fileAttachmentEnable = false
    this.fileToUpload = []
  }
  FMEAReports(p) {
    localStorage.setItem('ReportObj', JSON.stringify(p))
  }

  RCMReports(p) {
    let RCMId = p.RCMId;
    localStorage.setItem('RCMReportObjId', RCMId);
    this.router.navigateByUrl('/Home/RCMFunctionalAnalysis');
  }
  viewFMEA(p) {
    localStorage.setItem('FMEAObject', JSON.stringify(p))
    this.router.navigateByUrl('/Home/FMEASHEET')
  }

  getFCAData(p) {
    localStorage.setItem('FCAObject', JSON.stringify(p))
    this.router.navigateByUrl('/Home/FCA');
  }

  getMSSData(p) {
    localStorage.setItem('MSSObject', JSON.stringify(p))
    this.router.navigateByUrl('/Home/MSS');
  }
  RoutetoCBA() {
    this.router.navigateByUrl('/Home/CBA');
  }

  getMSSTable(p) {
    this.FailureModeDataTabe3 = p.failureModes
    this.Table3 = true
    this.Table2 = false
    this.Table1 = false
    this.Table4 = false
  }

  getMSSStrategyTable(p) {
    this.FailureModeDataTabe4 = p.MSS
    this.Table4 = true
    this.Table3 = false
    this.Table2 = false
    this.Table1 = false
  }

  public DownloadPDF(url: string) {
    window.open(url, "_blank");
  }
}
