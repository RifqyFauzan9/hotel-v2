export interface ProgramDetailResponse {
    success: boolean;
    data: ProgramDetail;
    message: string;
}

export interface ProgramDetail {
    id: string;
    name: string;
    type: string;
    departement: string;
    intervalDays: number;
    hourPrice: number;
    manHours: number;
    status: boolean;
    description: string;
    inspectionProgramApplicabilities: InspectionProgramApplicability[];
    inspectionProgramTask: InspectionProgramTask[];
}

export interface InspectionProgramApplicability {
    id: string;
    inspectionProgramId: string;
    assetCategory: string;
    assetTypeId: string;
    createdAt: Date;
    updatedAt: Date;
    assetType: AssetType;
}

export interface AssetType {
    id: string;
    category: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InspectionProgramTask {
    id: string;
    inspectionProgramId: string;
    parameterName: string;
    description: string;
}

export interface TaskUI extends InspectionProgramTask {
    checked: boolean;
}