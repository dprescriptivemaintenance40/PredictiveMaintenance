import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RCMContantAPI {
    //#region  FMEA - Add, configuration, consequence, display, list,  FCA, MSS API's

    public FMEATagCheck: string = '/PrescriptiveAPI';
    public FMEATreeSave: string = '/RCMAPI/SaveFMEA';
    public SaveConsequence: string = '/RCMAPI/SaveConsequence';
    public FMEAFileUpload: string = '/RCMAPI/UploadFile';
    public FMEADeleteFileUpload: string = '/RCMAPI/UpdateFileUpload';
    public FMEASaveConsequence: string = '/PrescriptiveAPI/CFPrescriptiveAdd';
    public PrescriptiveRecordsForFCA: string = '/RCMAPI/GetPrescriptiveRecordsForFCA';
    public PrescriptiveRecordsForMSS: string = '/RCMAPI/GetPrescriptiveRecordsForMSS';
    public FCASave: string = '/RCMAPI/PrespectivePattern';
    public FCAWebal: string = '/RCMAPI/WebalAlgo';
    public FCAWebalWithDetails: string = '/PrescriptiveAPI/WebalAlgoritmWithDetails';
    public MSSSave: string = '/RCMAPI/UpdatePrespectiveMSS';
    public FMEAConfiguration: string = '/PrescriptiveLookupMasterAPI';
    public FMEAListSingleDelete: string = '/PrescriptiveAPI/DeletePrespectiveModel';
    public FMEAParentAttachments: string = '/PrescriptiveAPI/CompontentAttachment';
    //#endregion


    //#region  FMEA Update API's only

    public SaveFailureModeUpdate: string = '/PrescriptiveAPI/EditConsequenceTree';
    public UpdateChanges: string = '/PrescriptiveAPI/FunctionModeAndConsequenceUpdate';
    public DeleteFailureModeFrommTree: string = '/PrescriptiveAPI/FailureModeDelete';
    public SaveUpdatedPattern: string = '/PrescriptiveAPI/UpdatePrespectivePattern';
    public UpdateMSSToTree: string = '/PrescriptiveAPI/PrescriptiveUpdateSingleFMMSSUpdate';
    public SaveFunction: string = '/PrescriptiveAPI/FunctionUpdate';

    //#endregion


    //#region RCA API

    public RCASaveAPI: string = '/RCAAPI/SaveNewRCA';
    public RCAGetAPI: string = '/RCAAPI/GetAllRCARecords';
    public RCAGetHeatExchangerFMAPI: string = '/PrescriptiveLookupMasterAPI/RCAHeatExchanger';
    public RCADeleteAPI: string = '/RCAAPI/DeleteRCARecord';
    public RCAUpdateAttachment: string = '/PrescriptiveAPI/UpdateFileUpload'
    public RCAUpdateAPI: string = '/RCAAPI/RCAUpdate'
    public RCAOnlyTreeSaveAPI: string = '/RCAAPI/RCATreeUpdate';

    //#endregion

    //#region PCR 
    
    public GetAllConfigurationRecords : string = '/PSRClientContractorAPI/GetAllConfigurationRecords';
    public GetRecordById : string = '/PSRClientContractorAPI/GetRecordById';
    public PSRClientContractorAPI : string = '/PSRClientContractorAPI';

    public MSSStrategyGetAllRecords : string = "/MSSStartegyAPI/GetAllConfigurationRecords";
    public MSSStartegyAPI : string = "/MSSStartegyAPI";


    public UserProductionDetailAPI = '/UserProductionAPI';
    public GetUserProductionDetail = '/UserProductionAPI/GetAllConfigurationRecords';

    //#endregion

}