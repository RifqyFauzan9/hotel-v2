// inspection-order.entity.ts

export interface Attachment {
    id: string;
    entityId: string;
    entityType: string;
    originalName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: Date;
    deletedAt: null;
    url: string;
    status?: string;
}

export interface Log {
    id: string;
    status: string;
    reason: string;
    created_at: Date;
    user_name: string;
}

export interface Finding {
    id: string;
    title: string;
    description: string;
    status: string;
    reported_by: string;
    attachments: Attachment[];
}

export interface Details {
    name: string;
    description: string;
    tasks: any[];
    hour_price: number;
    man_hours: number;
    total_item_price: number;
}

export interface OrderItem {
    id: string;
    status: string;
    type: string;
    program_id: string;
    issue_id: null;
    attachments: Attachment[];
    details: Details;
}

export interface SerializedComponent {
    id: string;
    componentId: string;
    serialNumber: string;
    stock: number;
    condition: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Uom {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ComponentDetail {
    id: string;
    partNumber: string;
    name: string;
    description: string;
    type: string;
    status: string;
    uomId: string;
    manufacturerId: string;
    minStock: number;
    maxStock: number;
    defaultPurchasePrice: number;
    createdAt: Date;
    updatedAt: Date;
    serializedComponents?: SerializedComponent[];
    nonSerializedComponents?: any[];
    uom?: Uom;
}

export interface OrderComponent {
    id: string;
    inspection_order_id: string;
    component_id: string;
    component_name: string;
    component_number: string;
    type: string;
    uom: string;
    fullfillment_source: string;
    is_fullfilled: boolean;
    quantity_required: number;
    estimated_unit_price: number;
    estimated_total_price: number;
    component_detail: ComponentDetail;
}

export type InspectionStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface InspectionOrder {
    id: string;
    number: string;
    status: InspectionStatus;
    priority: string;
    asset_id: string;
    asset_name: string;
    asset_category: string;
    asset_type: string;
    planned_date: Date;
    started_at: Date;
    finished_at: Date | null;
    actual_price: number;
    total_work_minutes: number;
    inspector_id: string;
    inspector_name: string;
    created_by_name: string;
    estimated_man_hours: number;
    notes: string;
    order_items: OrderItem[];
    order_components: OrderComponent[];
    estimate_service_price: number;
    estimate_part_price: number;
    grand_total: number;
    created_at: Date;
    updated_at: Date;
    attachments: any[];
    findings: Finding[];
    logs: Log[];
}