import { IInspectionOrderRepository } from "../../repositories/inspection-order.repository";

export class GetInspectionOrderByIdUseCase {
    constructor(private inspectionOrderRepository: IInspectionOrderRepository) { }

    async execute(id: string) {
        return await this.inspectionOrderRepository.getInspectionOrderById(id);
    }
}