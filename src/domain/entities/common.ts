/**
 * Inspection Order filters for domain layer
 */
export interface InspectionOrderFilters {
    page?: number;
    limit?: number;
    search?: string;
    assetId?: string;
    status?: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    }
}