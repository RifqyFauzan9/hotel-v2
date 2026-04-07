import { InspectionStatus } from "@/src/domain/entities/inspection-order.entity";

export function formatInspectionStatus(status: InspectionStatus) {
    switch (status) {
        case 'COMPLETED':
            return 'Completed';
        case 'IN_PROGRESS':
            return 'In Progress';
        case 'OPEN':
            return 'Open';
        case 'CANCELLED':
            return 'Cancelled';
        case 'PENDING':
            return 'Pending';
        case 'REJECTED':
            return 'Rejected';
        case 'VERIFIED':
            return 'Verified';
        default:
            return 'Unknown'
    }
}