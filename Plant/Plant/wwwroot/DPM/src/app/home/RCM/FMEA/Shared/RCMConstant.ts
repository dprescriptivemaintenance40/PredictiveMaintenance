import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RCMContantAPI {
    //#region  FMEA - Add, configuration, consequence, display, list,  FCA, MSS API's

   
    public FMEATagCheck: string = '/RCMAPI';
    public AssetData:string = '/RCMAPI/GetAssetList';
    public ApplicationData:string = '/RCMAPI/GetApplicationList';
    public SubUnitData:string = '/RCMAPI/GetSubUnitList';
    public AssetType:string = '/RCMAPI/GetAssetType';
    public FMEAConfiguration: string = '/PrescriptiveLookupMasterAPI';


    public FMEATreeSave: string = '/RCMAPI/SaveFMEA';
    public SaveConsequence: string = '/RCMAPI/SaveConsequence';
    public FMEAFileUpload: string = '/RCMAPI/UploadFile';
    public FMEADeleteFileUpload: string = '/RCMAPI/UpdateFileUpload';
    public FMEADropdownData: string = '/PrescriptiveLookupMasterAPI/GetRecords';
    public FMEASaveConsequence: string = '/RCMAPI/PrescriptiveAdd';
    public PrescriptiveRecordsForFCA: string = '/RCMAPI/GetPrescriptiveRecordsForFCA';
    public PrescriptiveRecordsForMSS: string = '/RCMAPI/GetPrescriptiveRecordsForMSS';
    public PrescriptiveRecordsForCBA: string = '/RCMAPI/GetPrescriptiveRecordsForCBA';
    public FCASave: string = '/RCMAPI/PrespectivePattern';
    public FCAWebal: string = '/RCMAPI/WebalAlgo';
    public FCAWebalWithDetails: string = '/PrescriptiveAPI/WebalAlgoritmWithDetails';
    public MSSSave: string = '/RCMAPI/UpdatePrespectiveMSS';
    
    public FMEAListSingleDelete: string = '/RCMAPI/DeletePrespectiveModel';
    public FMEAParentAttachments: string = '/PrescriptiveAPI/CompontentAttachment';
    //#endregion

    public CBASheet:string = '/RCMAPI/SaveCBASheetData'
    public CBARecordsForReport = '/RCMAPI/GetCBARecordsForReportById';

    //#region  FMEA Update API's only

    public SaveFailureModeUpdate: string = '/RCMAPI/EditConsequenceTree';
    public UpdateChanges: string = '/RCMAPI/FunctionModeAndConsequenceUpdate';
    public DeleteFailureModeFrommTree: string = '/RCMAPI/FailureModeDelete';
    public SaveUpdatedPattern: string = '/RCMAPI/UpdatePrespectivePattern';
    public UpdateMSSToTree: string = '/PrescriptiveAPI/PrescriptiveUpdateSingleFMMSSUpdate';
    public SaveFunction: string = '/RCMAPI/FunctionUpdate';

    //#endregion

    //Network Diagram
    public PlantNetwork:string = '/RAMAPI/SavePlantNetwork';
    public GetPlantNetwork:string = '/RAMAPI/GetPlantNetworkList';
    public GetPlantNetworkbyId = '/RAMAPI/GetPlantNetworkListbyId';
    public NetworkMasterData = '/RAMAPI/GetNetworkMasterList';
    public PlantMasterData = '/RAMAPI/GetMasterPlantData';
    public PlantListSingleDelete: string = '/RAMAPI/DeletePlantModel';

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