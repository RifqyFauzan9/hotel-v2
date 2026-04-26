export type InspectionStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
export type InspectionPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface InspectionAttachment {
    id: string;
    originalName: string;
    url: string;
    mimeType: string;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: Date;
}

export interface InspectionLog {
    id: string;
    status: string;
    reason: string;
    createdAt: Date;
    userName: string;
}

export interface InspectionFinding {
    id: string;
    title: string;
    description: string;
    status: string;
    reportedBy: string;
    attachments: InspectionAttachment[];
}

export interface OrderItemDetails {
    name: string;
    description: string;
    hourPrice: number;
    manHours: number;
    totalItemPrice: number;
}

export interface OrderItem {
    id: string;
    status: string;
    type: string;
    attachments: InspectionAttachment[];
    detail: OrderItemDetails;
    programId: string;
}

export interface OrderComponent {
    id: string;
    componentId: string;
    componentName: string;
    componentNumber: string;
    type: string;
    uom: string;
    isFullfilled: boolean;
    quantityRequired: number;
    estimatedUnitPrice: number;
    estimatedTotalPrice: number;
}

export interface InspectionOrder {
    id: string;
    number: string;
    status: InspectionStatus;
    priority: InspectionPriority;
    assetId: string;
    assetName: string;
    assetCategory: string;
    assetType: string;
    plannedDate: Date;
    startedAt: Date;
    finishedAt: Date | null;
    inspectorId: string;
    inspectorName: string;
    estimatedManHours: number;
    notes: string;
    estimateServicePrice: number;
    estimatePartPrice: number;
    grandTotal: number;
    createdAt: Date;
    updatedAt: Date;
    orderItems: OrderItem[];
    orderComponents: OrderComponent[];
    attachments: InspectionAttachment[];
    findings: InspectionFinding[];
    logs: InspectionLog[];
    actualPrice: number;
    totalWorkMinutes: number;
}