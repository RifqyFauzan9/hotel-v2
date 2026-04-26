import { IInspectionOrderRepository } from "../../repositories/inspection-order.repository";

export class GetProgramDetailUseCase {
    constructor(private inspectionOrderRepository: IInspectionOrderRepository) { }

    async execute(id: string) {
        return await this.inspectionOrderRepository.getDetailProgram(id);
    }
}