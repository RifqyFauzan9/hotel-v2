import { InspectionOrderFilters, PaginatedResult } from "../entities/common";
import { InspectionOrder } from "../entities/inspection-order.entity";

/**
 * Inspection Order Repository Interface
 * Defines contract for inspection order data operations
 */
export interface IInspectionOrderRepository {
    /**
     * Get all inspection orders with optional filtering
     */
    getInspectionOrders(filters?: InspectionOrderFilters): Promise<PaginatedResult<InspectionOrder>>;

    /**
     * Get a single inspection order by ID
     */
    getInspectionOrderById(id: string): Promise<InspectionOrder | null>;
}