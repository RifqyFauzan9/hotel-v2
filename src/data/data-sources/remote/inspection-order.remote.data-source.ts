import { IHttpClient } from "@/src/core/http/http-client";
import { ApiResponse, PaginatedResponse } from "@/src/core/types/common";
import { InspectionOrderFilters } from "@/src/domain/entities/common";
import { ZodError } from "zod";
import { InspectionOrderModel } from "../../models/inspection-order.model";
import { InspectionOrderDetailResponseSchema, InspectionOrderListResponseSchema } from "../../schemas/inspection-order-model.schema";

export interface IInspectionOrderRemoteDataSource {
    getInspectionOrders(filters?: InspectionOrderFilters): Promise<ApiResponse<PaginatedResponse<InspectionOrderModel>>>;
    getInspectionOrderById(id: string): Promise<InspectionOrderModel | null>;
}

export class InspectionOrderRemoteDataSource implements IInspectionOrderRemoteDataSource {
    constructor(private httpClient: IHttpClient) { }

    async getInspectionOrders(filters: InspectionOrderFilters): Promise<ApiResponse<PaginatedResponse<InspectionOrderModel>>> {
        try {
            const params = new URLSearchParams();

            if (filters.page) params.append('page', filters.page.toString());
            if (filters.limit) params.append('limit', filters.limit.toString());
            if (filters.search) params.append('search', filters.search);
            if (filters.assetId) params.append('assetId', filters.assetId);
            if (filters.status) params.append('status', filters.status);
            if (filters.priority) params.append('priority', filters.priority);
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);
            if (filters.sortBy) params.append('sortBy', filters.sortBy);
            if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

            const queryString = params.toString();
            const url = queryString ? `/inspection-orders?${queryString}` : "/inspection-orders";

            const response = await this.httpClient.get<ApiResponse<PaginatedResponse<InspectionOrderModel>>>(url);

            // Validate API Response
            const validated = InspectionOrderListResponseSchema.parse(response);
            return validated;
        } catch (error: any) {
            if (error instanceof ZodError) {
                console.error("❌ Inspection Order Validation Error:", error.issues);
                throw new Error("Invalid response from server");
            }

            throw new Error(error.message || "Failed to fetch inspection orders");
        }
    }

    async getInspectionOrderById(id: string): Promise<InspectionOrderModel | null> {
        try {
            const response = await this.httpClient.get<ApiResponse<InspectionOrderModel>>(`/inspection-orders/${id}`);

            // Validate API response
            const validated = InspectionOrderDetailResponseSchema.parse(response);
            return validated.data;
        } catch (error: any) {
            if (error.status === 404) return null;
            if (error instanceof ZodError) {
                console.error("❌ Inspection Order Validation Error:", error.issues);
                throw new Error("Invalid response from server");
            }
            throw new Error(error.message || "Failed to fetch inspection order");
        }
    }
}