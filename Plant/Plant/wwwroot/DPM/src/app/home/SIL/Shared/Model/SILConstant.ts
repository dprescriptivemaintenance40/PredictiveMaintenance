import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SILConstantAPI {

    public SIFSave: string = '/SILClassificationAPI/SaveSheetData';
    public CalculationSave: string = '/SILClassificationAPI/SaveCalculations';

}