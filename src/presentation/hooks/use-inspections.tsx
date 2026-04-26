import { ActiveTabStatus } from "@/app/(auth)/(tabs)/inspections";
import { di } from "@/src/core/di/container";
import { InspectionOrder, InspectionStatus } from "@/src/domain/entities/inspection-order.entity";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export const useInspections = () => {
    const [activeTab, setActiveTab] = useState<ActiveTabStatus>('semua');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const [allInspections, setAllInspections] = useState<InspectionOrder[]>([]);

    const toDetail = (id: string) => {
        router.push(`/inspections/${id}`);
    }

    useEffect(() => {
        const loadAllInspections = async () => {
            setIsLoading(true);
            try {
                const result = await di.getInspectionOrdersUseCase.execute({ limit: 100, page: 1 });
                setAllInspections(result.data);
            } catch (apiError: any) {
                console.log('Gagal fetch inspection orders: ', apiError);
                setError(apiError);
                throw apiError;
            } finally {
                setIsLoading(false);
            }
        };

        loadAllInspections();
    }, []);

    const filteredInspections = useMemo(() => {
        const statusMap: Record<ActiveTabStatus, InspectionStatus[]> = {
            semua: [],
            menunggu: ['OPEN', 'PENDING', 'IN_PROGRESS'],
            selesai: ['COMPLETED', 'VERIFIED', 'REJECTED', 'CANCELLED']
        };

        if (activeTab === 'semua') return allInspections;
        return allInspections.filter((inspection: InspectionOrder) => statusMap[activeTab].includes(inspection.status))
    }, [activeTab, allInspections]);

    return {
        activeTab,
        setActiveTab,
        isLoading,
        error,
        inspections: filteredInspections,
        toDetail
    }
}