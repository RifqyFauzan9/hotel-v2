import * as z from "zod";

export const AssetTypeSchema = z.object({
    "id": z.string(),
    "category": z.string(),
    "name": z.string(),
    "createdAt": z.coerce.date(),
    "updatedAt": z.coerce.date(),
});

export const InspectionProgramTaskSchema = z.object({
    "id": z.string(),
    "inspectionProgramId": z.string(),
    "parameterName": z.string(),
    "description": z.string(),
});

export const InspectionProgramApplicabilitySchema = z.object({
    "id": z.string(),
    "inspectionProgramId": z.string(),
    "assetCategory": z.string(),
    "assetTypeId": z.string(),
    "createdAt": z.coerce.date(),
    "updatedAt": z.coerce.date(),
    "assetType": AssetTypeSchema,
});

export const ProgramDetailSchema = z.object({
    "id": z.string(),
    "name": z.string(),
    "type": z.string(),
    "departement": z.string(),
    "intervalDays": z.number(),
    "hourPrice": z.number(),
    "manHours": z.number(),
    "status": z.boolean(),
    "description": z.string(),
    "inspectionProgramApplicabilities": z.array(InspectionProgramApplicabilitySchema),
    "inspectionProgramTask": z.array(InspectionProgramTaskSchema),
});

export const ProgramDetailResponseSchema = z.object({
    "success": z.boolean(),
    "data": ProgramDetailSchema,
    "message": z.string(),
});

export type ProgramDetailModelResponse = z.infer<typeof ProgramDetailResponseSchema>;
export type AssetTypeModel = z.infer<typeof AssetTypeSchema>;
export type ProgramDetailModel = z.infer<typeof ProgramDetailSchema>;
export type InspectionProgramApplicabilityModel = z.infer<typeof InspectionProgramApplicabilitySchema>;
export type InspectionProgramTaskModel = z.infer<typeof InspectionProgramTaskSchema>;