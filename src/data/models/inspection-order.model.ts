import * as z from 'zod';
import {
    AttachmentSchema,
    ComponentDetailSchema,
    DetailsSchema,
    FindingSchema,
    InspectionOrderBaseSchema,
    InspectionOrderDetailResponseSchema,
    InspectionOrderListResponseSchema,
    InspectionStatusSchema,
    LogSchema,
    OrderComponentSchema,
    OrderItemSchema,
    PaginationSchema,
    SerializedComponentSchema,
    UomSchema
} from '../schemas/inspection-order-model.schema';

export type Attachment = z.infer<typeof AttachmentSchema>;

export type Log = z.infer<typeof LogSchema>;

export type Finding = z.infer<typeof FindingSchema>;

export type Details = z.infer<typeof DetailsSchema>;

export type OrderItem = z.infer<typeof OrderItemSchema>;

export type SerializedComponent = z.infer<typeof SerializedComponentSchema>;

export type Uom = z.infer<typeof UomSchema>;

export type ComponentDetail = z.infer<typeof ComponentDetailSchema>;

export type OrderComponent = z.infer<typeof OrderComponentSchema>;

export type InspectionOrderModel = z.infer<typeof InspectionOrderBaseSchema>;

export type InspectionStatusModel = z.infer<typeof InspectionStatusSchema>;

export type Pagination = z.infer<typeof PaginationSchema>;

export type InspectionOrderListResponse = z.infer<typeof InspectionOrderListResponseSchema>;

export type InspectionOrderDetailResponse = z.infer<typeof InspectionOrderDetailResponseSchema>;
