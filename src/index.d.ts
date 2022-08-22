export interface Incident {
    id: number,
    title: string,
    description: string,
    status: string,
    severity: string,
    created_at: Date,
    updated_at: Date,
}

declare global {
    interface Window {
        env: {
            API_URL: string
        }
    }
}