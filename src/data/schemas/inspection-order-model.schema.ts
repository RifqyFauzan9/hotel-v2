import * as z from "zod";

// ─── Shared Schemas ───────────────────────────────────────

export const AttachmentSchema = z.object({
    id: z.string(),
    entityId: z.string(),
    entityType: z.string(),
    originalName: z.string(),
    filePath: z.string(),
    mimeType: z.string(),
    fileSize: z.number(),
    uploadedBy: z.string(),
    uploadedAt: z.coerce.date(),
    deletedAt: z.null(),
    url: z.string(),
    status: z.string().optional(),
});

export const LogSchema = z.object({
    id: z.string(),
    status: z.string(),
    reason: z.string(),
    created_at: z.coerce.date(),
    user_name: z.string(),
});

export const FindingSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    reported_by: z.string(),
    attachments: z.array(AttachmentSchema),
});

export const DetailsSchema = z.object({
    name: z.string(),
    description: z.string(),
    tasks: z.array(z.any()),
    hour_price: z.number(),
    man_hours: z.number(),
    total_item_price: z.number(),
});

export const OrderItemSchema = z.object({
    id: z.string(),
    status: z.string(),
    type: z.string(),
    program_id: z.string(),
    issue_id: z.null(),
    attachments: z.array(AttachmentSchema),
    details: DetailsSchema,
});

export const SerializedComponentSchema = z.object({
    id: z.string(),
    componentId: z.string(),
    serialNumber: z.string(),
    stock: z.number(),
    condition: z.string(),
    price: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const UomSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const ComponentDetailSchema = z.object({
    id: z.string(),
    partNumber: z.string(),
    name: z.string(),
    description: z.string(),
    type: z.string(),
    status: z.string(),
    uomId: z.string(),
    manufacturerId: z.string(),
    minStock: z.number(),
    maxStock: z.number(),
    defaultPurchasePrice: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    serializedComponents: z.array(SerializedComponentSchema).optional().default([]),
    nonSerializedComponents: z.array(z.any()).optional().default([]),
    uom: UomSchema.optional(),
});

export const OrderComponentSchema = z.object({
    id: z.string(),
    inspection_order_id: z.string(),
    component_id: z.string(),
    component_name: z.string(),
    component_number: z.string(),
    type: z.string(),
    uom: z.string(),
    fullfillment_source: z.string(),
    is_fullfilled: z.boolean(),
    quantity_required: z.number(),
    estimated_unit_price: z.number(),
    estimated_total_price: z.number(),
    component_detail: ComponentDetailSchema,
});

// ─── Base Model (shared fields) ───────────────────────────
export const InspectionStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'PENDING', 'VERIFIED', 'REJECTED']);
export const InspectionOrderBaseSchema = z.object({
    id: z.string(),
    number: z.string(),
    status: InspectionStatusSchema,
    priority: z.string(),
    asset_id: z.string(),
    asset_name: z.string(),
    asset_category: z.string(),
    asset_type: z.string(),
    planned_date: z.coerce.date(),
    started_at: z.coerce.date(),
    finished_at: z.union([z.coerce.date(), z.null()]),
    actual_price: z.number(),
    total_work_minutes: z.number(),
    inspector_id: z.string(),
    inspector_name: z.string(),
    created_by_name: z.string(),
    estimated_man_hours: z.number(),
    notes: z.string(),
    order_items: z.array(OrderItemSchema),
    order_components: z.array(OrderComponentSchema),
    estimate_service_price: z.number(),
    estimate_part_price: z.number(),
    grand_total: z.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    attachments: z.array(z.any()),
    findings: z.array(FindingSchema),
    logs: z.array(LogSchema),
});

// ─── Pagination ────────────────────────────────────────────

export const PaginationSchema = z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    pages: z.number(),
});

// ─── List Response ─────────────────────────────────────────

export const InspectionOrderListResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        data: z.array(InspectionOrderBaseSchema),
        pagination: PaginationSchema,
    }),
    message: z.string(),
});

// ─── Detail Response ───────────────────────────────────────

export const InspectionOrderDetailResponseSchema = z.object({
    success: z.boolean(),
    data: InspectionOrderBaseSchema,
    message: z.string(),
});