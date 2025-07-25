export const endpoints = {

    authentication: {
        login: '/admin/login'
    },

    home: {
        statistics: '/dashboard/statistics',
        analysis: '/dashboard/charts',
        topArtists: '/dashboard/artists/performance?limit=3'
    },

    users: {
        getUsers: '/admin/users',
        sendMessage: 'send-message',
    },

    admins: {
        getAdmins: '/admin/admins',
    },

    orders: {
        getOrders: '/admin/orders',
    },

    rates: {
        getRates: '/admin/reviews',
    },

    reports: {
        getReports: '/admin/reports',
    },

    salesAnalysis: {
        getStatistics: '/dashboard/sales/analytics',
        topArtists: '/dashboard/sales/top-artists',
        trendData: '/dashboard/sales/trends',
    }

}