import { InspectionOrderFilters, PaginatedResult } from "../../entities/common";
import { InspectionOrder } from "../../entities/inspection-order.entity";
import { IInspectionOrderRepository } from "../../repositories/inspection-order.repository";

export class GetInspectionOrdersUseCase {
    constructor(private inspectionOrderRepository: IInspectionOrderRepository) { }

    async execute(filters?: InspectionOrderFilters): Promise<PaginatedResult<InspectionOrder>> {
        return await this.inspectionOrderRepository.getInspectionOrders(filters);
    }
}