import { InspectionOrder } from "@/src/domain/entities/inspection-order.entity";
import { ProgramDetail } from "@/src/domain/entities/program-detail.entity";
import { InspectionOrderModel } from "../models/inspection-order.model";
import { ProgramDetailModel } from "../schemas/program-detail-model.schema";

export class InspectionOrderMapper {
    static toDomain(model: InspectionOrderModel): InspectionOrder {
        return {
            id: model.id,
            number: model.number,
            status: model.status,
            priority: model.priority,
            assetId: model.asset_id,
            assetName: model.asset_name,
            assetCategory: model.asset_category,
            assetType: model.asset_type,
            plannedDate: model.planned_date,
            startedAt: model.started_at,
            finishedAt: model.finished_at,
            actualPrice: model.actual_price,
            totalWorkMinutes: model.total_work_minutes,
            inspectorId: model.inspector_id,
            inspectorName: model.inspector_name,
            estimatedManHours: model.estimated_man_hours,
            notes: model.notes,
            estimateServicePrice: model.estimate_service_price,
            estimatePartPrice: model.estimate_part_price,
            grandTotal: model.grand_total,
            createdAt: model.created_at,
            updatedAt: model.updated_at,
            attachments: model.attachments,
            orderItems: model.order_items.map(item => ({
                id: item.id,
                programId: item.program_id,
                status: item.status,
                type: item.type,
                attachments: item.attachments.map(a => ({
                    id: a.id,
                    originalName: a.originalName,
                    url: a.url,
                    mimeType: a.mimeType,
                    fileSize: a.fileSize,
                    uploadedBy: a.uploadedBy,
                    uploadedAt: a.uploadedAt,
                })),
                detail: {
                    description: item.details.description,
                    hourPrice: item.details.hour_price,
                    manHours: item.details.man_hours,
                    name: item.details.name,
                    totalItemPrice: item.details.total_item_price,
                },
            })),
            orderComponents: model.order_components.map(comp => ({
                id: comp.id,
                componentId: comp.component_id,
                componentName: comp.component_name,
                componentNumber: comp.component_number,
                type: comp.type,
                uom: comp.uom,
                isFullfilled: comp.is_fullfilled,
                quantityRequired: comp.quantity_required,
                estimatedUnitPrice: comp.estimated_unit_price,
                estimatedTotalPrice: comp.estimated_total_price,
            })),
            findings: model.findings.map(finding => ({
                id: finding.id,
                title: finding.title,
                description: finding.description,
                status: finding.status,
                reportedBy: finding.reported_by,
                attachments: finding.attachments.map(att => ({
                    id: att.id,
                    entityId: att.entityId,
                    entityType: att.entityType,
                    originalName: att.originalName,
                    filePath: att.filePath,
                    mimeType: att.mimeType,
                    fileSize: att.fileSize,
                    uploadedBy: att.uploadedBy,
                    uploadedAt: att.uploadedAt,
                    deletedAt: att.deletedAt,
                    url: att.url,
                    status: att.status,
                })),
            })),
            logs: model.logs.map(log => ({
                id: log.id,
                status: log.status,
                reason: log.reason,
                createdAt: log.created_at,
                userName: log.user_name,
            })),
        };
    }

    static toProgramDetailDomain(model: ProgramDetailModel): ProgramDetail {
        return {
            id: model.id,
            departement: model.departement,
            description: model.description,
            hourPrice: model.hourPrice,
            inspectionProgramApplicabilities: model.inspectionProgramApplicabilities,
            inspectionProgramTask: model.inspectionProgramTask,
            intervalDays: model.intervalDays,
            manHours: model.manHours,
            name: model.name,
            status: model.status,
            type: model.type,
        }
    }
}