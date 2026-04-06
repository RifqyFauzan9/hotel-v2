import { InspectionStatus } from "@/src/domain/entities/inspection.entity";

export function formatInspectionStatus(status: InspectionStatus) {
    switch (status) {
        case 'COMPLETED':
            return 'Completed';
        case 'IN_PROGRESS':
            return 'In Progress';
        case 'OPEN':
            return 'Open';
        default:
            return 'Unknown'
    }
}