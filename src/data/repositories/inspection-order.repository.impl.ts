import { InspectionOrderFilters, PaginatedResult } from "@/src/domain/entities/common";
import { InspectionOrder } from "@/src/domain/entities/inspection-order.entity";
import { IInspectionOrderRepository } from "@/src/domain/repositories/inspection-order.repository";
import { IInspectionOrderRemoteDataSource } from "../data-sources/remote/inspection-order.remote.data-source";
import { InspectionOrderMapper } from "../mappers/inspection-order.mapper";

export class InspectionOrderRepository implements IInspectionOrderRepository {
    constructor(private remoteDataSource: IInspectionOrderRemoteDataSource) { }

    async getInspectionOrders(filters?: InspectionOrderFilters): Promise<PaginatedResult<InspectionOrder>> {
        const response = await this.remoteDataSource.getInspectionOrders(filters);
        return {
            data: response.data.data.map(model => InspectionOrderMapper.toDomain(model)) || [],
            pagination: response.data?.pagination || {
                page: response.data?.pagination.page ?? 1,
                limit: response.data?.pagination.limit ?? 10,
                total: response.data?.pagination.total ?? 0,
                pages: response.data?.pagination.pages ?? 0,
            },
        };
    }

    async getInspectionOrderById(id: string): Promise<InspectionOrder | null> {
        const inspectionOrderModel = await this.remoteDataSource.getInspectionOrderById(id);
        return inspectionOrderModel ? InspectionOrderMapper.toDomain(inspectionOrderModel) : null;
    }

}